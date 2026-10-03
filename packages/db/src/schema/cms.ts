import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * ── Unified CMS content store ─────────────────────────────────────────────────
 *
 * Every editable content type (articles, notices, gallery albums, downloads,
 * events, staff, FAQs, departments, and the singleton page/settings blobs) lives
 * in this one table. The previous design spread content across a dozen
 * near-identical `{ id, data }` tables with no workflow, which meant every
 * editor needed its own bespoke CRUD and half of them silently failed to save.
 *
 * ── Draft vs published ───────────────────────────────────────────────────────
 *
 * Two JSONB columns carry the workflow:
 *
 *   data           the working copy. Editors write here and nowhere else.
 *   publishedData  the live copy. The public portal reads ONLY this column.
 *
 * A save never touches `publishedData`, so an unpublished edit is invisible to
 * visitors. Publishing copies `data` into `publishedData` and records which
 * version went live. Unpublishing clears the live copy, so the public portal
 * falls back to nothing rather than continuing to serve content the editor has
 * taken down.
 *
 * A row whose `publishedData` is NULL is effectively a draft-only record, which
 * is why `status` alone is not sufficient to decide public visibility —
 * `publishedData` is the single source of truth for "is this live".
 *
 * ── Content types ────────────────────────────────────────────────────────────
 *
 * `contentType` partitions the table. Collection types (news, notices, staff…)
 * have many rows; singleton types (home content, site settings, about pages,
 * page visibility, publish mode) are pinned to one well-known `id` so they
 * behave like a single document.
 */

export const cmsContentItems = pgTable(
  "cms_content_items",
  {
    id: text("id").primaryKey(),

    /** Content partition, e.g. "news" | "staff" | "homeContent". */
    contentType: text("content_type").notNull(),

    /** URL segment. NULL for singletons and for types without public URLs. */
    slug: text("slug"),

    /** Workflow state: "draft" | "published" | "archived". */
    status: text("status").default("draft").notNull(),

    /** Working copy written by editors. Never served publicly. */
    data: jsonb("data").$type<Record<string, unknown>>().notNull(),

    /** Live copy served by the public portal. NULL until first publish. */
    publishedData: jsonb("published_data").$type<Record<string, unknown>>(),

    /** Incremented on every save; identifies a point in the revision history. */
    currentVersion: integer("current_version").default(1).notNull(),

    /** Which `currentVersion` is currently live, or NULL if never published. */
    publishedVersion: integer("published_version"),

    publishedAt: timestamp("published_at"),
    createdBy: text("created_by"),
    updatedBy: text("updated_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("cms_content_items_type_status_idx").on(
      table.contentType,
      table.status
    ),
    // Slugs are unique per content type, but only for rows that have one.
    // PostgreSQL treats NULLs as distinct, so the many singleton rows
    // (all with slug = NULL) do not collide here.
    uniqueIndex("cms_content_items_type_slug_idx").on(
      table.contentType,
      table.slug
    ),
  ]
);

/**
 * ── Revision history ──────────────────────────────────────────────────────────
 *
 * Append-only. Every save writes one immutable snapshot of `data` tagged with
 * the version it produced, so any edit can be inspected and rolled back. The
 * table is intentionally never updated or deleted by the application.
 *
 * Snapshots duplicate the content rather than diffing it: content payloads here
 * are small JSON documents, and storing whole documents means a restore is a
 * single row copy with no reconstruction logic that could drift out of sync.
 */
export const cmsContentRevisions = pgTable(
  "cms_content_revisions",
  {
    id: text("id").primaryKey(),

    /** The `cms_content_items.id` this snapshot belongs to. */
    contentId: text("content_id").notNull(),

    /** Denormalised so history can be listed without joining the item. */
    contentType: text("content_type").notNull(),

    /** Matches `cms_content_items.currentVersion` at the time of the save. */
    version: integer("version").notNull(),

    /** Full snapshot of the working copy after this save. */
    data: jsonb("data").$type<Record<string, unknown>>().notNull(),

    /** Optional editor-supplied note describing what changed and why. */
    note: text("note"),

    createdBy: text("created_by"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("cms_content_revisions_item_idx").on(
      table.contentId,
      table.version
    ),
    index("cms_content_revisions_created_idx").on(table.createdAt),
  ]
);

/**
 * ── Content type registry ─────────────────────────────────────────────────────
 *
 * The canonical list of partitions held in `cmsContentItems`. Both the API and
 * the UI validate against this so an unknown type fails loudly instead of
 * silently writing rows nothing will ever read.
 */
export const CMS_CONTENT_TYPES = [
  // Collections
  "news",
  "notice",
  "galleryAlbum",
  "download",
  "homeEvent",
  "newsBar",
  "staff",
  "faq",
  "department",
  // Singletons (pinned to a fixed id)
  "homeContent",
  "siteSettings",
  "aboutOverview",
  "aboutFunctions",
  "orgStructure",
  "aboutHistory",
  "pageVisibility",
  "sitePublishMode",
] as const;

export type CmsContentType = (typeof CMS_CONTENT_TYPES)[number];

export const isCmsContentType = (v: string): v is CmsContentType =>
  (CMS_CONTENT_TYPES as readonly string[]).includes(v);

/**
 * Content types that hold exactly one row at a known id.
 *
 * `newsBar` is deliberately absent: the ticker holds several independent items
 * that are added, edited and deleted individually, so it is a collection like
 * news or notices. Pinning it here would make `saveDraft` overwrite one shared
 * row on every save and collapse the whole ticker into a single entry.
 */
export const CMS_SINGLETON_IDS: Record<string, string> = {
  homeContent: "home_content",
  siteSettings: "site_settings",
  aboutOverview: "about_overview",
  aboutFunctions: "about_functions",
  orgStructure: "org_structure",
  aboutHistory: "about_history",
  pageVisibility: "page_visibility",
  sitePublishMode: "site_publish_mode",
};
