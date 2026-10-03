import { client } from "@/utils/orpc";
import type { CmsContentType } from "@sp-planning/db/schema/cms";

/**
 * ── Typed CMS client ──────────────────────────────────────────────────────────
 *
 * Replaces the old untyped `cmsContentApi.js`, which declared only `list()` for
 * FAQs and Departments while the editors called `create`/`update`/`remove` —
 * every one of those saves threw a TypeError at runtime, and the untyped module
 * meant TypeScript could not catch it.
 *
 * This client is typed end-to-end from the oRPC router, so a missing procedure
 * is a compile error rather than a production bug.
 *
 * ── Draft vs published ────────────────────────────────────────────────────────
 *
 * `saveDraft` writes the working copy. Nothing becomes visible to the public
 * until `publish` is called. The CMS UI pairs these with a status badge so it
 * is always obvious whether an edit is live.
 */

export type { CmsContentType };

/** Workflow states a content item can be in. */
export type CmsStatus = "draft" | "published" | "archived";

/** Shape returned by every editor-facing read. */
export type CmsEditorItem<T = Record<string, unknown>> = {
  id: string;
  contentType: string;
  slug: string | null;
  status: CmsStatus;
  data: T;
  publishedData: T | null;
  currentVersion: number;
  publishedVersion: number | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  /** Working copy differs from what is currently live. */
  hasUnpublishedChanges: boolean;
};

export type CmsRevision = {
  id: string;
  version: number;
  note: string | null;
  createdBy: string | null;
  createdAt: Date;
};

export const cmsApi = {
  /** Every content type the CMS understands, for building navigation. */
  contentTypes: () => client.cms.contentTypes(),

  /** Editor listing, including drafts and unpublished edits. */
  list: (contentType: CmsContentType, status?: CmsStatus) =>
    client.cms.list({ contentType, status }),

  /** Public read path. Returns only published content. */
  published: (contentType: CmsContentType, slug?: string) =>
    client.cms.published({ contentType, slug }),

  publishedById: (id: string) => client.cms.publishedById({ id }),

  get: (id: string) => client.cms.get({ id }),

  getSingleton: (contentType: CmsContentType) =>
    client.cms.getSingleton({ contentType }),

  publishedSingleton: (contentType: CmsContentType) =>
    client.cms.publishedSingleton({ contentType }),

  /**
   * Save the working copy. Returns the updated item including its new version
   * number. Does NOT make the change public.
   */
  saveDraft: (args: {
    contentType: CmsContentType;
    id?: string;
    slug?: string;
    data: Record<string, unknown>;
    note?: string;
  }) => client.cms.saveDraft(args),

  /** Make the current working copy live. The only operation visitors see. */
  publish: (id: string, note?: string) => client.cms.publish({ id, note }),

  /** Withdraw from the live site while keeping the working copy. */
  unpublish: (id: string) => client.cms.unpublish({ id }),

  /** Soft delete: hidden from the public and from default editor listings. */
  archive: (id: string) => client.cms.archive({ id }),

  /** Hard delete. Not permitted for singleton content types. */
  remove: (id: string) => client.cms.remove({ id }),

  /** Version history for one item, newest first. */
  revisions: (contentId: string) => client.cms.revisions({ contentId }),

  /** Full snapshot of a revision, for diff preview. */
  revisionData: (revisionId: string) => client.cms.revisionData({ revisionId }),

  /**
   * Restore an old revision into the working copy. Intentionally does not
   * publish — the editor reviews the restored draft before going live.
   */
  restore: (revisionId: string) => client.cms.restore({ revisionId }),
};

/**
 * ── Backwards-compatible shims ────────────────────────────────────────────────
 *
 * The existing editor components and public portal pages import named adapters
 * (`staffApi`, `faqsApi`, …) shaped like the old axios client. These shims keep
 * those call sites working while routing everything through the new API, so the
 * migration can proceed section by section instead of all at once.
 *
 * They are deliberately thin. Once each section is ported to `cmsApi` directly,
 * its shim is deleted.
 */

/** Legacy `{ data }` envelope shape returned by the old axios client. */
const envelope = async <T>(p: Promise<T>) => ({ data: await p });

export const staffApi = {
  list: () => envelope(cmsApi.published("staff")),
  get: (id: string) => envelope(cmsApi.publishedById(id)),
  create: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "staff", data: d })),
  update: (id: string, d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "staff", id, data: d })),
  remove: (id: string) => envelope(cmsApi.remove(id)),
};

export const faqsApi = {
  list: () => envelope(cmsApi.published("faq")),
  create: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "faq", data: d })),
  update: (id: string, d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "faq", id, data: d })),
  remove: (id: string) => envelope(cmsApi.remove(id)),
};

export const departmentsApi = {
  list: () => envelope(cmsApi.published("department")),
  get: (slug: string) => envelope(cmsApi.published("department", slug)),
  create: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "department", data: d })),
  update: (id: string, d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "department", id, data: d })),
  remove: (id: string) => envelope(cmsApi.remove(id)),
};

export const siteSettingsApi = {
  get: () => envelope(cmsApi.publishedSingleton("siteSettings")),
  save: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "siteSettings", data: d })),
};

export const homeContentApi = {
  get: () => envelope(cmsApi.publishedSingleton("homeContent")),
  save: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "homeContent", data: d })),
};

export const aboutOverviewApi = {
  get: () => envelope(cmsApi.publishedSingleton("aboutOverview")),
  save: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "aboutOverview", data: d })),
};

export const aboutFunctionsApi = {
  get: () => envelope(cmsApi.publishedSingleton("aboutFunctions")),
  save: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "aboutFunctions", data: d })),
};

export const orgStructureApi = {
  get: () => envelope(cmsApi.publishedSingleton("orgStructure")),
  save: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "orgStructure", data: d })),
};

export const aboutHistoryApi = {
  get: () => envelope(cmsApi.publishedSingleton("aboutHistory")),
  save: (d: Record<string, unknown>) =>
    envelope(cmsApi.saveDraft({ contentType: "aboutHistory", data: d })),
};
