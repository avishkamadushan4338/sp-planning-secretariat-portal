import { createDb } from "./index";
import * as schema from "./schema/index";
import { eq } from "drizzle-orm";
// @ts-ignore
import seedData from "./seedData.cjs";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:7000/sp_planning_secretariat";

async function ensureTableData(db: any, table: any, rows: any[]) {
  for (const row of rows) {
    const existing = await db.select().from(table).where(eq(table.id, row.id)).limit(1);
    if (!existing || existing.length === 0) {
      await db.insert(table).values({
        id: row.id,
        data: row,
      });
    }
  }
}

async function ensureSingleRow(db: any, table: any, id: string, data: any) {
  const existing = await db.select().from(table).where(eq(table.id, id)).limit(1);
  if (!existing || existing.length === 0) {
    await db.insert(table).values({
      id,
      data,
    });
  }
}

export async function runContentSeed(db: any) {
  const now = new Date().toISOString();

  // SMP Categories
  const categories = [
    { id: "cat-stationery", name: "Stationery", color: "#C79A2B", createdAt: now },
    { id: "cat-furniture", name: "Furniture", color: "#6366F1", createdAt: now },
    { id: "cat-electronics", name: "Electronics", color: "#0EA5E9", createdAt: now },
    { id: "cat-cleaning", name: "Cleaning", color: "#22C55E", createdAt: now },
    { id: "cat-printing", name: "Printing", color: "#F97316", createdAt: now },
    { id: "cat-borrowable", name: "Borrowable", color: "#EC4899", createdAt: now },
    { id: "cat-equipment", name: "Equipment", color: "#8B5CF6", createdAt: now },
    { id: "cat-tools", name: "Tools", color: "#64748B", createdAt: now },
  ];
  await ensureTableData(db, schema.smpCategories, categories);

  // Portal CMS Staff
  if (seedData.staffSeed) {
    await ensureTableData(
      db,
      schema.cmsStaff,
      seedData.staffSeed.map((r: any) => ({ ...r, createdAt: now, updatedAt: now }))
    );
  }

  // FAQs
  if (seedData.faqsSeed) {
    await ensureTableData(
      db,
      schema.cmsFaqs,
      seedData.faqsSeed.map((r: any) => ({ ...r, createdAt: now, updatedAt: now }))
    );
  }

  // Departments
  if (seedData.departmentsSeed) {
    await ensureTableData(
      db,
      schema.cmsDepartments,
      seedData.departmentsSeed.map((r: any) => ({ ...r, createdAt: now, updatedAt: now }))
    );
  }

  // Home Content
  if (seedData.homeContentSeed) {
    await ensureSingleRow(db, schema.cmsHomeContent, "home_content", {
      ...seedData.homeContentSeed,
      updatedAt: now,
    });
  }

  // Site Settings
  if (seedData.siteSettingsSeed) {
    await ensureSingleRow(db, schema.cmsSiteSettings, "site_settings", {
      ...seedData.siteSettingsSeed,
      updatedAt: now,
    });
  }

  // About Overview
  if (seedData.aboutOverviewSeed) {
    await ensureSingleRow(db, schema.cmsAboutOverview, "about_overview", {
      ...seedData.aboutOverviewSeed,
      updatedAt: now,
    });
  }

  // About Functions
  if (seedData.aboutFunctionsSeed) {
    await ensureSingleRow(db, schema.cmsAboutFunctions, "about_functions", {
      ...seedData.aboutFunctionsSeed,
      updatedAt: now,
    });
  }

  // Org Structure
  if (seedData.orgStructureSeed) {
    await ensureSingleRow(db, schema.cmsOrgStructure, "org_structure", {
      ...seedData.orgStructureSeed,
      updatedAt: now,
    });
  }

  // About History
  if (seedData.aboutHistorySeed) {
    await ensureSingleRow(db, schema.cmsAboutHistory, "about_history", {
      ...seedData.aboutHistorySeed,
      updatedAt: now,
    });
  }

  console.log("[db] Initial CMS and SMP content records seeded.");
}

if (import.meta.main) {
  const db = createDb({ DATABASE_URL });
  runContentSeed(db)
    .then(() => {
      console.log("[seed] Complete.");
      process.exit(0);
    })
    .catch((err) => {
      console.error("[seed] Error:", err);
      process.exit(1);
    });
}
