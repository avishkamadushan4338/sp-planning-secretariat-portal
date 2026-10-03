import { publicProcedure, contentProcedure } from "../../index";
import { ORPCError } from "@orpc/server";
import * as schema from "@sp-planning/db/schema/index";
import { CMS_CONTENT_TYPES, CMS_SINGLETON_IDS, isCmsContentType } from "@sp-planning/db/schema/cms";
import type { CmsContentType } from "@sp-planning/db/schema/cms";
import { and, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

/**
 * ── Unified CMS router ─────────────────────────────────────────────────────────
 *
 * Single write path for every content type. The previous code had one
 * hand-written router per table and several editor components called methods
 * that were never defined, so saves threw or silently did nothing. Every edit
 * now goes through the same three operations — `saveDraft`, `publish`,
 * `restore` — which is what makes draft/publish and version history tractable.
 *
 * Invariants enforced here:
 *   1. Saving never changes what the public sees. Only `publish` does.
 *   2. Every save appends an immutable revision. Nothing overwrites history.
 *   3. `publishedData` is the only thing the public read path returns.
 *   4. Public procedures cannot see drafts at all.
 */

const contentTypeSchema = z.enum(CMS_CONTENT_TYPES);

/** Editor identity for revision attribution; falls back to "unknown". */
const actorId = (ctx: { session?: { user?: { id?: string } } | null }) =>
  ctx.session?.user?.id ?? "unknown";

const nowIso = () => new Date().toISOString();

/** Rejects an operation that does not apply to this content type's shape. */
const badRequest = (message: string) =>
  new ORPCError("BAD_REQUEST", { message });

const notFound = (id: string) =>
  new ORPCError("NOT_FOUND", { message: `No CMS content found with id "${id}"` });

/** Shapes a row for editor consumption: working copy + workflow metadata. */
const toEditorItem = (row: typeof schema.cmsContentItems.$inferSelect) => ({
  id: row.id,
  contentType: row.contentType,
  slug: row.slug,
  status: row.status,
  data: row.data,
  publishedData: row.publishedData,
  currentVersion: row.currentVersion,
  publishedVersion: row.publishedVersion,
  publishedAt: row.publishedAt,
  updatedAt: row.updatedAt,
  createdAt: row.createdAt,
  /** True when the working copy differs from what is live. */
  hasUnpublishedChanges:
    row.publishedVersion !== null &&
    row.publishedVersion !== row.currentVersion,
});

export const cmsRouter = {
  /**
   * Content types the CMS manages, for building the UI navigation.
   */
  contentTypes: publicProcedure.handler(async () => ({
    types: CMS_CONTENT_TYPES,
    singletons: CMS_SINGLETON_IDS,
  })),

  /**
   * Editor listing. Returns every row regardless of status, including
   * draft-only records, plus workflow metadata for badges and filters.
   */
  list: contentProcedure
    .input(
      z.object({
        contentType: contentTypeSchema,
        status: z.enum(["draft", "published", "archived"]).optional(),
      })
    )
    .handler(async ({ context, input }) => {
      const conditions = [eq(schema.cmsContentItems.contentType, input.contentType)];
      if (input.status) {
        conditions.push(eq(schema.cmsContentItems.status, input.status));
      }

      const rows = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(and(...conditions))
        .orderBy(schema.cmsContentItems.updatedAt);

      return rows.map(toEditorItem);
    }),

  /**
   * Public read. Returns ONLY the published copy, and only for rows that
   * actually have one. Drafts and unpublished edits are invisible here.
   */
  published: publicProcedure
    .input(
      z.object({
        contentType: contentTypeSchema,
        slug: z.string().optional(),
      })
    )
    .handler(async ({ context, input }) => {
      const conditions = [
        eq(schema.cmsContentItems.contentType, input.contentType),
        sql`${schema.cmsContentItems.publishedData} is not null`,
        eq(schema.cmsContentItems.status, "published"),
      ];
      if (input.slug) {
        conditions.push(eq(schema.cmsContentItems.slug, input.slug));
      }

      const rows = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(and(...conditions));

      return rows.map((r) => r.publishedData as Record<string, unknown>);
    }),

  /** Public read of a single published record by id. */
  publishedById: publicProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(
          and(
            eq(schema.cmsContentItems.id, input.id),
            eq(schema.cmsContentItems.status, "published"),
            sql`${schema.cmsContentItems.publishedData} is not null`
          )
        )
        .limit(1);

      return row ? (row.publishedData as Record<string, unknown>) : null;
    }),

  /** Editor read of one record including its unpublished working copy. */
  get: contentProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, input.id))
        .limit(1);

      return row ? toEditorItem(row) : null;
    }),

  /**
   * Read a singleton by content type. Returns null when the singleton has
   * never been saved, which the UI treats as "use the empty form".
   */
  getSingleton: contentProcedure
    .input(z.object({ contentType: contentTypeSchema }))
    .handler(async ({ context, input }) => {
      const id = CMS_SINGLETON_IDS[input.contentType];
      if (!id) {
        throw badRequest(`"${input.contentType}" is not a singleton content type`);
      }
      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, id))
        .limit(1);

      return row ? toEditorItem(row) : null;
    }),

  /** Public read of a singleton's published copy. */
  publishedSingleton: publicProcedure
    .input(z.object({ contentType: contentTypeSchema }))
    .handler(async ({ context, input }) => {
      const id = CMS_SINGLETON_IDS[input.contentType];
      if (!id) {
        throw badRequest(`"${input.contentType}" is not a singleton content type`);
      }
      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(
          and(
            eq(schema.cmsContentItems.id, id),
            eq(schema.cmsContentItems.status, "published"),
            sql`${schema.cmsContentItems.publishedData} is not null`
          )
        )
        .limit(1);

      return row ? (row.publishedData as Record<string, unknown>) : null;
    }),

  /**
   * Save the working copy. This is what every "Save" button in the CMS calls.
   *
   * Increments `currentVersion`, writes an immutable revision snapshot, and
   * deliberately leaves `publishedData` and `publishedVersion` untouched — an
   * editor saving a draft must not change the live site.
   */
  saveDraft: contentProcedure
    .input(
      z.object({
        contentType: contentTypeSchema,
        id: z.string().optional(),
        slug: z.string().optional(),
        data: z.record(z.string(), z.unknown()),
        note: z.string().optional(),
      })
    )
    .handler(async ({ context, input }) => {
      const now = nowIso();
      const userId = actorId(context);

      // Singletons are pinned to their well-known id so repeated saves update
      // one row instead of appending a new document every time.
      const singletonId = CMS_SINGLETON_IDS[input.contentType];
      const id = singletonId ?? input.id ?? crypto.randomUUID();

      // `id` is owned by the row key, so strip it from the payload to avoid
      // two sources of truth for the same value.
      const { id: _ignored, ...payload } = input.data as Record<string, unknown>;
      const data = { ...payload, id, updatedAt: now } as Record<string, unknown>;

      const [existing] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, id))
        .limit(1);

      const nextVersion = (existing?.currentVersion ?? 0) + 1;

      if (existing) {
        await context.db
          .update(schema.cmsContentItems)
          .set({
            data,
            slug: input.slug ?? existing.slug,
            currentVersion: nextVersion,
            updatedBy: userId,
            updatedAt: new Date(),
          })
          .where(eq(schema.cmsContentItems.id, id));
      } else {
        await context.db.insert(schema.cmsContentItems).values({
          id,
          contentType: input.contentType,
          slug: input.slug ?? null,
          status: "draft",
          data,
          currentVersion: nextVersion,
          createdBy: userId,
          updatedBy: userId,
        });
      }

      await context.db.insert(schema.cmsContentRevisions).values({
        id: crypto.randomUUID(),
        contentId: id,
        contentType: input.contentType,
        version: nextVersion,
        data,
        note: input.note ?? null,
        createdBy: userId,
      });

      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, id))
        .limit(1);

      if (!row) {
        throw notFound(id);
      }

      return toEditorItem(row);
    }),

  /**
   * Publish the working copy. This is the ONLY operation that changes what the
   * public sees. Copies `data` into `publishedData` and records the version.
   */
  publish: contentProcedure
    .input(
      z.object({
        id: z.string(),
        /** Optional note recorded on a revision describing the publication. */
        note: z.string().optional(),
      })
    )
    .handler(async ({ context, input }) => {
      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, input.id))
        .limit(1);

      if (!row) {
        throw notFound(input.id);
      }

      await context.db
        .update(schema.cmsContentItems)
        .set({
          status: "published",
          publishedData: row.data,
          publishedVersion: row.currentVersion,
          publishedAt: new Date(),
          updatedBy: actorId(context),
          updatedAt: new Date(),
        })
        .where(eq(schema.cmsContentItems.id, input.id));

      return { ok: true, publishedVersion: row.currentVersion };
    }),

  /**
   * Withdraw from the live site. Clearing `publishedData` means the public read
   * path returns nothing for this record rather than serving stale content.
   */
  unpublish: contentProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      await context.db
        .update(schema.cmsContentItems)
        .set({
          status: "draft",
          publishedData: null,
          publishedVersion: null,
          publishedAt: null,
          updatedBy: actorId(context),
          updatedAt: new Date(),
        })
        .where(eq(schema.cmsContentItems.id, input.id));

      return { ok: true };
    }),

  /** Soft-delete: removes from public view and the editor's default listing. */
  archive: contentProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      await context.db
        .update(schema.cmsContentItems)
        .set({
          status: "archived",
          publishedData: null,
          publishedVersion: null,
          updatedBy: actorId(context),
          updatedAt: new Date(),
        })
        .where(eq(schema.cmsContentItems.id, input.id));

      return { ok: true };
    }),

  /**
   * Hard delete. Singletons are protected — deleting one would strand the UI,
   * which expects a document to exist at a fixed id.
   */
  remove: contentProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, input.id))
        .limit(1);

      if (row && CMS_SINGLETON_IDS[row.contentType] === row.id) {
        throw badRequest(
          `"${row.contentType}" is a singleton and cannot be deleted; clear its content instead`
        );
      }

      await context.db
        .delete(schema.cmsContentRevisions)
        .where(eq(schema.cmsContentRevisions.contentId, input.id));
      await context.db
        .delete(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, input.id));

      return { ok: true };
    }),

  /** Revision history for one record, newest first. */
  revisions: contentProcedure
    .input(z.object({ contentId: z.string() }))
    .handler(async ({ context, input }) => {
      const rows = await context.db
        .select({
          id: schema.cmsContentRevisions.id,
          version: schema.cmsContentRevisions.version,
          note: schema.cmsContentRevisions.note,
          createdBy: schema.cmsContentRevisions.createdBy,
          createdAt: schema.cmsContentRevisions.createdAt,
        })
        .from(schema.cmsContentRevisions)
        .where(eq(schema.cmsContentRevisions.contentId, input.contentId))
        .orderBy(desc(schema.cmsContentRevisions.version));

      return rows;
    }),

  /** Full snapshot for a single revision, for diff preview. */
  revisionData: contentProcedure
    .input(z.object({ revisionId: z.string() }))
    .handler(async ({ context, input }) => {
      const [row] = await context.db
        .select()
        .from(schema.cmsContentRevisions)
        .where(eq(schema.cmsContentRevisions.id, input.revisionId))
        .limit(1);

      return row ?? null;
    }),

  /**
   * Restore an old revision into the working copy.
   *
   * Deliberately does NOT publish: restoring puts the old content back in the
   * draft so an editor can review before it goes live. Restoring is itself
   * recorded as a new revision, so history stays append-only.
   */
  restore: contentProcedure
    .input(z.object({ revisionId: z.string() }))
    .handler(async ({ context, input }) => {
      const [revision] = await context.db
        .select()
        .from(schema.cmsContentRevisions)
        .where(eq(schema.cmsContentRevisions.id, input.revisionId))
        .limit(1);

      if (!revision) {
        throw notFound(input.revisionId);
      }

      const [row] = await context.db
        .select()
        .from(schema.cmsContentItems)
        .where(eq(schema.cmsContentItems.id, revision.contentId))
        .limit(1);

      if (!row) {
        throw notFound(revision.contentId);
      }

      const now = nowIso();
      const nextVersion = row.currentVersion + 1;
      const data = {
        ...(revision.data as Record<string, unknown>),
        updatedAt: now,
      };

      await context.db
        .update(schema.cmsContentItems)
        .set({
          data,
          currentVersion: nextVersion,
          updatedBy: actorId(context),
          updatedAt: new Date(),
        })
        .where(eq(schema.cmsContentItems.id, row.id));

      await context.db.insert(schema.cmsContentRevisions).values({
        id: crypto.randomUUID(),
        contentId: row.id,
        contentType: row.contentType,
        version: nextVersion,
        data,
        note: `Restored from version ${revision.version}`,
        createdBy: actorId(context),
      });

      return { ok: true, currentVersion: nextVersion };
    }),
};

/** Narrowing helper re-exported so the UI can reuse the same type list. */
export const isContentType = isCmsContentType;
export type { CmsContentType };
