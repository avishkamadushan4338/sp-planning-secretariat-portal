import { useCallback, useEffect, useState } from "react";
import { cmsApi, type CmsContentType } from "@/features/cms/cmsContentApi";

/**
 * ── Public published-content hook ─────────────────────────────────────────────
 *
 * Reads site content for visitors via the public `published` endpoints, which
 * return only records that have actually been published.
 *
 * These pages previously read `localStorage`, which meant a visitor saw nothing
 * unless the CMS had been used in that exact browser. Content is now served from
 * the database, so it is identical for every visitor and reflects whatever the
 * editors last published.
 */

/** Loads every published record of a content type. */
export function usePublishedContent<T = Record<string, unknown>>(
  contentType: CmsContentType
): { items: T[]; loading: boolean; reload: () => void } {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await cmsApi.published(contentType);
      setItems(data as T[]);
    } catch {
      // A failed read leaves the page with whatever it already had rather than
      // blanking the section entirely.
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { items, loading, reload };
}

/** Loads the published copy of a singleton document (home content, settings…). */
export function usePublishedSingleton<T = Record<string, unknown>>(
  contentType: CmsContentType
): { data: T | null; loading: boolean; reload: () => void } {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      setData(((await cmsApi.publishedSingleton(contentType)) as T) ?? null);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [contentType]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { data, loading, reload };
}

/**
 * Site-wide live/coming-soon flag.
 *
 * Stored as a published CMS singleton so every visitor sees the same state.
 * Defaults to live when nothing has been published.
 */
export function useSitePublishMode(): boolean {
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    let cancelled = false;
    cmsApi
      .publishedSingleton("sitePublishMode")
      .then((item) => {
        if (!cancelled) setIsLive((item?.isLive as boolean) !== false);
      })
      .catch(() => {
        if (!cancelled) setIsLive(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return isLive;
}

export default usePublishedContent;