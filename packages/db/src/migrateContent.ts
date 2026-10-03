/**
 * ── Legacy content migration ──────────────────────────────────────────────────
 *
 * Moves existing CMS content out of the old one-table-per-type layout and into
 * the unified `cms_content_items` / `cms_content_revisions` pair.
 *
 * Everything migrated here is marked **published**, because it is already live
 * on the public portal today. Promoting it to draft would silently blank out
 * pages that currently work. Editors get a proper draft from their first save
 * onwards, which is when the draft/publish split starts doing real work.
 *
 * Idempotent: re-running skips content that is already present in the new
 * tables, so it is safe to invoke after adding a new legacy source.
 *
 * Run with:  bun run db:migrate-content
 */

import { createDb } from "./index";
import * as schema from "./schema/index";
import { eq } from "drizzle-orm";
import type { Database } from "./index";

const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres:password@localhost:7000/sp_planning_secretariat";

/** Each legacy table mapped onto a content type in the unified store. */
const LEGACY_SOURCES: Array<{
  contentType: string;
  table: any;
  /** Row id used for singleton sources; ignored for collections. */
  singletonId?: string;
  /**
   * True when one legacy row holds an ARRAY of items. Each element is imported
   * as its own row instead of being collapsed into a single document.
   */
  isArray?: boolean;
}> = [
  { contentType: "staff", table: schema.cmsStaff },
  { contentType: "faq", table: schema.cmsFaqs },
  { contentType: "department", table: schema.cmsDepartments },
  { contentType: "homeContent", table: schema.cmsHomeContent, singletonId: "home_content" },
  { contentType: "siteSettings", table: schema.cmsSiteSettings, singletonId: "site_settings" },
  { contentType: "aboutOverview", table: schema.cmsAboutOverview, singletonId: "about_overview" },
  { contentType: "aboutFunctions", table: schema.cmsAboutFunctions, singletonId: "about_functions" },
  { contentType: "orgStructure", table: schema.cmsOrgStructure, singletonId: "org_structure" },
  { contentType: "aboutHistory", table: schema.cmsAboutHistory, singletonId: "about_history" },
  {
    // The legacy ticker stored an ARRAY of items in a single row. It is a
    // collection, so each array element becomes its own row rather than being
    // squashed into one document.
    contentType: "newsBar",
    table: schema.portalNewsBar,
    isArray: true,
  },
];

/** Inserts one published content row plus its baseline revision, if new. */
const insertItem = async (
  db: Database,
  contentType: string,
  id: string,
  data: Record<string, unknown>
): Promise<number> => {
    const [existing] = await db
      .select()
      .from(schema.cmsContentItems)
      .where(eq(schema.cmsContentItems.id, id))
      .limit(1);

    if (existing) return 0;

    // The row key owns `id`; make sure the payload agrees with it so the
    // editor never sees two different ids for the same record.
    const payload: Record<string, unknown> = { ...data, id };

    await db.insert(schema.cmsContentItems).values({
      id,
      contentType,
      slug: typeof payload.slug === "string" ? payload.slug : null,
      status: "published",
      data: payload,
      publishedData: payload,
      currentVersion: 1,
      publishedVersion: 1,
      createdBy: "migration",
      updatedBy: "migration",
    });

    // Seed the revision log with the imported state so "restore" has a
    // meaningful baseline to return to on the very first edit.
    await db.insert(schema.cmsContentRevisions).values({
      id: crypto.randomUUID(),
      contentId: id,
      contentType,
      version: 1,
      data: payload,
      note: "Imported from legacy CMS table",
      createdBy: "migration",
    });

    return 1;
};

const migrateSource = async (db: Database, source: (typeof LEGACY_SOURCES)[number]) => {
  const rows = await db.select().from(source.table);
  if (rows.length === 0) return 0;

  let migrated = 0;

  for (const row of rows) {
    if (source.isArray) {
      // Expand one legacy row holding many items into one row per item.
      const items = Array.isArray(row.data) ? row.data : [];
      for (const item of items) {
        const data = (item ?? {}) as Record<string, unknown>;
        const id =
          typeof data.id === "string" && data.id ? data.id : crypto.randomUUID();
        migrated += await insertItem(db, source.contentType, id, data);
      }
      continue;
    }

    // Singletons collapse onto one row; collections keep their original id so
    // existing deep links and seeded references stay valid.
    const id = source.singletonId ?? row.id;
    const data = (row.data ?? {}) as Record<string, unknown>;

    migrated += await insertItem(db, source.contentType, id, data);
  }

  return migrated;
};


export const runLegacyContentMigration = async (db: Database) => {
  let total = 0;

  for (const source of LEGACY_SOURCES) {
    try {
      const count = await migrateSource(db, source);
      total += count;
      if (count > 0) {
        console.log(`[migrate] ${source.contentType}: imported ${count} record(s)`);
      }
    } catch (error) {
      // One missing legacy table must not abort the rest of the migration.
      console.warn(
        `[migrate] skipped ${source.contentType}:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  console.log(`[migrate] done — ${total} record(s) imported into the unified CMS store`);
  return total;
};

// Run directly when invoked as a script.
if (import.meta.main) {
  const db = createDb({ DATABASE_URL });
  runLegacyContentMigration(db)
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("[migrate] failed:", error);
      process.exit(1);
    });
}
