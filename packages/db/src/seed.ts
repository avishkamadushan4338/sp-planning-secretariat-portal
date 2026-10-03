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

async function ensureCmsContentItems(db: any, contentType: string, items: Array<{ id: string; data: Record<string, unknown> }>) {
  for (const item of items) {
    const existing = await db
      .select()
      .from(schema.cmsContentItems)
      .where(eq(schema.cmsContentItems.id, item.id))
      .limit(1);

    if (!existing || existing.length === 0) {
      const payload = { ...item.data, id: item.id };
      await db.insert(schema.cmsContentItems).values({
        id: item.id,
        contentType,
        slug: (item.data.slug as string) || null,
        status: "published",
        data: payload,
        publishedData: payload,
        currentVersion: 1,
        publishedVersion: 1,
        publishedAt: new Date(),
        createdBy: "seed",
        updatedBy: "seed",
      });

      await db.insert(schema.cmsContentRevisions).values({
        id: crypto.randomUUID(),
        contentId: item.id,
        contentType,
        version: 1,
        data: payload,
        note: "Initial seed data",
        createdBy: "seed",
      });
    }
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

  // Published News Articles
  await ensureCmsContentItems(db, "news", [
    {
      id: "news-annual-planning-review-2025",
      data: {
        title: "Annual Planning Review 2025 Successfully Completed",
        titleSi: "2025 වාර්ෂික සැලසුම් සමාලෝචනය සාර්ථකව අවසන් විය",
        titleTa: "2025 ஆம் ஆண்டிற்கான திட்டமிடல் மறுஆய்வு வெற்றிகரமாக முடிவடைந்தது",
        category: "Planning",
        date: "2026-01-15",
        status: "Published",
        featured: true,
        excerpt: "The Southern Province Planning Secretariat concluded its comprehensive annual review session with provincial department directors to evaluate 2025 progress and finalize strategic targets for 2026.",
        imageUrl: "/branding/hero.webp",
      },
    },
    {
      id: "news-provincial-development-symposium",
      data: {
        title: "Provincial Development Symposium Held in Galle",
        titleSi: "දකුණු පළාත් සංවර්ධන සම්මන්ත්‍රණය ගාල්ලේදී පැවැත්විණි",
        titleTa: "காலி நகரில் தென் மாகாண வளர்ச்சி கருத்தரங்கு நடைபெற்றது",
        category: "Development",
        date: "2026-02-10",
        status: "Published",
        featured: false,
        excerpt: "Key regional stakeholders, sector experts, and provincial administrators assembled at the Southern Province Secretariat complex to explore sustainable economic initiatives and resource distribution.",
        imageUrl: "/branding/sec-prof.webp",
      },
    },
    {
      id: "news-green-infrastructure-initiative",
      data: {
        title: "Southern Province Green Infrastructure Strategy Launched",
        titleSi: "දකුණු පළාත් හරිත යටිතල පහසුකම් උපායමාර්ගය ආරම්භ කෙරේ",
        titleTa: "தென் மாகாண பசுமை உள்கட்டமைப்பு உத்தி தொடங்கப்பட்டது",
        category: "Infrastructure",
        date: "2026-02-28",
        status: "Published",
        featured: false,
        excerpt: "A newly ratified regional policy framework prioritizes coastal conservation, climate-resilient road networks, and sustainable urban drainage systems across Galle, Matara, and Hambantota.",
        imageUrl: "",
      },
    },
  ]);

  // Official Notices
  await ensureCmsContentItems(db, "notice", [
    {
      id: "notice-circular-guidelines-2026",
      data: {
        title: "Submission Guidelines for Capital Budget Proposals 2026/2027",
        titleSi: "2026/2027 ප්‍රාග්ධන අයවැය යෝජනා ඉදිරිපත් කිරීමේ මාර්ගෝපදේශ",
        titleTa: "2026/2027 மூலதன வரவு செலவுத் திட்ட முன்மொழிவுகளுக்கான வழிகாட்டுதல்கள்",
        type: "Circular",
        category: "Circular",
        ref: "SP/PLN/CIR/2026/01",
        date: "2026-02-01",
        deadline: "2026-04-30",
        status: "Active",
        isNew: true,
        downloadAccess: "Everyone",
        description: "All departmental heads and zonal planning units must submit their prioritized capital budget applications by the deadline.",
      },
    },
    {
      id: "notice-recruitment-development-officers",
      data: {
        title: "Notice: Field Project Validation Schedules — Q1 2026",
        titleSi: "දැන්වීම: ක්ෂේත්‍ර ව්‍යාපෘති තහවුරු කිරීමේ කාලසටහන — 2026 පළමු කාර්තුව",
        titleTa: "அறிவிப்பு: கள திட்ட சரிபார்ப்பு அட்டவணை — Q1 2026",
        type: "Notice",
        category: "Notice",
        ref: "SP/PLN/NOT/2026/04",
        date: "2026-02-15",
        deadline: "2026-03-31",
        status: "Active",
        isNew: false,
        downloadAccess: "Everyone",
        description: "Notice regarding dates for field inspections of provincial road development and drainage rehabilitation programs.",
      },
    },
  ]);

  // Downloads
  await ensureCmsContentItems(db, "download", [
    {
      id: "dl-provincial-statistical-handbook-2025",
      data: {
        titleEn: "Southern Province Statistical Handbook 2024/2025",
        titleSi: "දකුණු පළාත් සංඛ්‍යාලේඛන අත්පොත 2024/2025",
        titleTa: "தென் மாகாண புள்ளியியல் கையேடு 2024/2025",
        title: "Southern Province Statistical Handbook 2024/2025",
        category: "Reports",
        fileUrl: "https://drive.google.com",
        fileName: "sp-statistical-handbook-2024-2025.pdf",
        fileType: "pdf",
        fileSize: "4.8 MB",
        date: "2026-01-10",
        status: "Active",
        downloadAccess: "Everyone",
        description: "Official statistical indicators encompassing demographics, economy, agriculture, and educational attainments across Galle, Matara, and Hambantota districts.",
      },
    },
    {
      id: "dl-capital-budget-proposal-form",
      data: {
        titleEn: "Capital Budget Project Application Form (Form P-01)",
        titleSi: "ප්‍රාග්ධන අයවැය ව්‍යාපෘති අයදුම් පත්‍රය (ආකෘති පත්‍රය P-01)",
        titleTa: "மூலதன வரவு செலவுத் திட்ட விண்ணப்பப் படிவம் (படிவம் P-01)",
        title: "Capital Budget Project Application Form (Form P-01)",
        category: "Forms",
        fileUrl: "https://drive.google.com",
        fileName: "form-p01-budget-application.docx",
        fileType: "docx",
        fileSize: "320 KB",
        date: "2026-02-01",
        status: "Active",
        downloadAccess: "Everyone",
        description: "Standard project formulation template required for all provincial sector proposals seeking funding under the 2026/2027 fiscal plan.",
      },
    },
  ]);

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
