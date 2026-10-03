import { cmsApi, type CmsContentType, type CmsEditorItem } from "../cmsContentApi";

/**
 * ── DB-backed collection store ────────────────────────────────────────────────
 *
 * Drop-in replacement for the `localStorage` calls the dashboard used for news,
 * notices, gallery albums and downloads.
 *
 * Why this existed before: those collections were written straight to
 * `localStorage`, so content lived in one browser profile. A second admin saw
 * an empty site, visitors saw whatever the last editor happened to have saved
 * on their own machine, and clearing browser data destroyed the content. The
 * read-transform-write pattern used throughout `CMSDashboard` is preserved here
 * so those call sites keep working while the data moves to Postgres.
 *
 * ── How writes behave ─────────────────────────────────────────────────────────
 *
 * Each call maps to a real CMS operation:
 *   add     → create a draft (must be published to go live)
 *   update  → save into the working copy (live copy untouched)
 *   remove  → archive, so the record leaves the public site but its history
 *             survives for rollback
 *
 * The dashboard shows a Draft badge on anything not yet published, so editors
 * are never surprised by a record that saved but did not appear.
 *
 * ── Cache ─────────────────────────────────────────────────────────────────────
 *
 * Reads are served from an in-memory cache refreshed on every mutation, so the
 * existing synchronous `get(key)` accessors keep working inside render while
 * the underlying source of truth is the database.
 */

export type CollectionKey = "news" | "notices" | "downloads" | "gallery";

const CONTENT_TYPE_BY_KEY: Record<CollectionKey, CmsContentType> = {
  news: "news",
  notices: "notice",
  downloads: "download",
  gallery: "galleryAlbum",
};

const LABEL_BY_KEY: Record<CollectionKey, string> = {
  news: "News article",
  notices: "Notice",
  downloads: "Download",
  gallery: "Gallery album",
};

type Cache = Record<CollectionKey, Record<string, unknown>[]>;

const EMPTY: Cache = { news: [], notices: [], downloads: [], gallery: [] };

let cache: Cache = { ...EMPTY };

/** Subscribers notified after every cache change, mirroring a storage event. */
const listeners = new Set<() => void>();

const notify = () => {
  for (const listener of listeners) listener();
};

export const subscribeCmsStore = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

/**
 * Loads one collection from the server into the cache.
 *
 * Returns the working copies so the CMS keeps showing unpublished drafts to
 * editors. The public portal reads `published()` separately and therefore never
 * sees draft-only records.
 */
export const loadCollection = async (key: CollectionKey): Promise<Record<string, unknown>[]> => {
  try {
    const rows = (await cmsApi.list(CONTENT_TYPE_BY_KEY[key])) as CmsEditorItem[];
    const data = rows.map((r) => ({ ...(r.data as Record<string, unknown>), id: r.id }));
    cache = { ...cache, [key]: data };
    notify();
    return data;
  } catch {
    // A failed load must not wipe content the editor is looking at.
    return cache[key];
  }
};

export const loadAllCollections = async () => {
  await Promise.all((Object.keys(CONTENT_TYPE_BY_KEY) as CollectionKey[]).map(loadCollection));
};

/** Synchronous read used by the dashboard during render. */
export const getCollection = (key: CollectionKey): Record<string, unknown>[] => cache[key];

/** Replaces the cached array after a mutation, then notifies subscribers. */
const setCache = (key: CollectionKey, items: Record<string, unknown>[]) => {
  cache = { ...cache, [key]: items };
  notify();
};

/** Creates a new draft record. */
export const addToCollection = async (
  key: CollectionKey,
  item: Record<string, unknown>
): Promise<void> => {
  await cmsApi.saveDraft({ contentType: CONTENT_TYPE_BY_KEY[key], data: item });
  await loadCollection(key);
};

/**
 * Saves an edit into the working copy.
 *
 * The live version is intentionally left alone: the editor must publish
 * explicitly, which is the entire point of the draft/publish split.
 */
export const updateInCollection = async (
  key: CollectionKey,
  item: Record<string, unknown>
): Promise<void> => {
  await cmsApi.saveDraft({
    contentType: CONTENT_TYPE_BY_KEY[key],
    id: String(item.id),
    data: item,
  });
  await loadCollection(key);
};

/** Archives a record: removed from the public site, history retained. */
export const removeFromCollection = async (key: CollectionKey, id: string): Promise<void> => {
  await cmsApi.archive(id);
  setCache(
    key,
    cache[key].filter((item) => item.id !== id)
  );
};

/** Publishes a record's working copy. */
export const publishItem = async (key: CollectionKey, id: string): Promise<void> => {
  await cmsApi.publish(id);
  await loadCollection(key);
};

/** Withdraws a record from the live site, keeping the draft. */
export const unpublishItem = async (key: CollectionKey, id: string): Promise<void> => {
  await cmsApi.unpublish(id);
  await loadCollection(key);
};

/**
 * ── Page visibility & site publish mode ───────────────────────────────────────
 *
 * Single-document settings rather than collections, so they are stored as CMS
 * singletons and fetched directly instead of riding the collection cache.
 */

export const getPageVisibility = async (): Promise<Record<string, boolean>> => {
  try {
    const item = await cmsApi.publishedSingleton("pageVisibility");
    return (item?.pages as Record<string, boolean>) ?? {};
  } catch {
    return {};
  }
};

/**
 * Persists page-level visibility flags.
 *
 * Saved as a draft: taking a page down is an editorial decision that should be
 * visible in the history and reversible, so it follows the same
 * draft-then-publish flow as any other content.
 */
export const savePageVisibility = async (map: Record<string, boolean>): Promise<void> => {
  await cmsApi.saveDraft({
    contentType: "pageVisibility",
    data: { pages: map } as Record<string, unknown>,
  });
};

/**
 * Reads the public site mode.
 *
 * This previously lived in `localStorage` under `site_publish_mode`, meaning a
 * visitor only saw "coming soon" in the browser of the admin who set it. It now
 * lives in the database and is read publicly, so every visitor sees the same
 * state. Defaults to live when nothing has been published yet.
 */
export const getPublishMode = async (): Promise<boolean> => {
  try {
    const item = await cmsApi.publishedSingleton("sitePublishMode");
    return item?.isLive !== false;
  } catch {
    return true;
  }
};

/**
 * Sets the site-wide live/coming-soon flag and publishes it immediately.
 *
 * Published straight away rather than left as a draft: this is an operational
 * switch for the whole site, and holding it in draft would mean the toggle
 * appeared to do nothing.
 */
export const savePublishMode = async (isLive: boolean): Promise<void> => {
  const saved = await cmsApi.saveDraft({
    contentType: "sitePublishMode",
    data: { isLive } as Record<string, unknown>,
  });
  await cmsApi.publish(saved.id);
};

export { CONTENT_TYPE_BY_KEY, LABEL_BY_KEY };