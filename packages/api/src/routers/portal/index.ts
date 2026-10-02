import { publicProcedure, protectedProcedure } from "../../index";
import * as schema from "@sp-planning/db/schema/index";
import { eq } from "drizzle-orm";
import { z } from "zod";

// Zod schemas for validation
export const localizedStringSchema = z.object({
  en: z.string().default(""),
  si: z.string().default(""),
  ta: z.string().default(""),
});

export const contactSubmitInputSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional().nullable(),
  type: z.string().default("General Inquiry"),
  dept: z.string().optional().nullable(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const staffRouter = {
  list: publicProcedure.handler(async ({ context }) => {
    const rows = await context.db.select().from(schema.cmsStaff);
    return rows.map((r) => r.data as any).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const [row] = await context.db
        .select()
        .from(schema.cmsStaff)
        .where(eq(schema.cmsStaff.id, input.id))
        .limit(1);
      return row ? (row.data as any) : null;
    }),

  save: protectedProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: localizedStringSchema,
        position: localizedStringSchema,
        photo: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().optional(),
        office: z.string().optional(),
        bio: localizedStringSchema.optional(),
        experience: localizedStringSchema.optional(),
        responsibilities: z.object({
          en: z.array(z.string()).default([]),
          si: z.array(z.string()).default([]),
          ta: z.array(z.string()).default([]),
        }).optional(),
        departmentId: z.string().nullable().optional(),
        tier: z.string().default("department-head"),
        positionRank: z.number().nullable().optional(),
        positionNumber: z.string().nullable().optional(),
        featured: z.boolean().default(false),
        showInDirectory: z.boolean().default(true),
        order: z.number().default(0),
        slug: z.string().default(""),
      })
    )
    .handler(async ({ context, input }) => {
      const id = input.id || crypto.randomUUID();
      const now = new Date().toISOString();
      const record = {
        ...input,
        id,
        updatedAt: now,
      };

      const existing = await context.db
        .select()
        .from(schema.cmsStaff)
        .where(eq(schema.cmsStaff.id, id))
        .limit(1);

      if (existing.length > 0) {
        await context.db
          .update(schema.cmsStaff)
          .set({ data: record as any, updatedAt: new Date() })
          .where(eq(schema.cmsStaff.id, id));
      } else {
        await context.db.insert(schema.cmsStaff).values({
          id,
          data: { ...record, createdAt: now } as any,
        });
      }
      return record;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      await context.db.delete(schema.cmsStaff).where(eq(schema.cmsStaff.id, input.id));
      return { ok: true };
    }),
};

export const faqsRouter = {
  list: publicProcedure.handler(async ({ context }) => {
    const rows = await context.db.select().from(schema.cmsFaqs);
    return rows.map((r) => r.data as any).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  }),
};

export const homeContentRouter = {
  get: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.cmsHomeContent)
      .where(eq(schema.cmsHomeContent.id, "home_content"))
      .limit(1);
    return row ? (row.data as any) : null;
  }),
};

export const departmentsRouter = {
  list: publicProcedure.handler(async ({ context }) => {
    const rows = await context.db.select().from(schema.cmsDepartments);
    return rows.map((r) => r.data as any);
  }),
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .handler(async ({ context, input }) => {
      const rows = await context.db.select().from(schema.cmsDepartments);
      const matched = rows.find((r) => (r.data as any)?.slug === input.slug);
      return matched ? (matched.data as any) : null;
    }),
};

export const siteSettingsRouter = {
  get: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.cmsSiteSettings)
      .where(eq(schema.cmsSiteSettings.id, "site_settings"))
      .limit(1);
    return row ? (row.data as any) : null;
  }),
  update: protectedProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      await context.db
        .update(schema.cmsSiteSettings)
        .set({ data: input, updatedAt: new Date() })
        .where(eq(schema.cmsSiteSettings.id, "site_settings"));
      return input;
    }),
};

export const aboutRouter = {
  getOverview: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.cmsAboutOverview)
      .where(eq(schema.cmsAboutOverview.id, "about_overview"))
      .limit(1);
    return row ? (row.data as any) : null;
  }),
  getFunctions: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.cmsAboutFunctions)
      .where(eq(schema.cmsAboutFunctions.id, "about_functions"))
      .limit(1);
    return row ? (row.data as any) : null;
  }),
  getOrgStructure: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.cmsOrgStructure)
      .where(eq(schema.cmsOrgStructure.id, "org_structure"))
      .limit(1);
    return row ? (row.data as any) : null;
  }),
  getHistory: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.cmsAboutHistory)
      .where(eq(schema.cmsAboutHistory.id, "about_history"))
      .limit(1);
    return row ? (row.data as any) : null;
  }),
};

export const newsBarRouter = {
  list: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.portalNewsBar)
      .where(eq(schema.portalNewsBar.id, "news_bar"))
      .limit(1);
    return row ? (row.data as any) : [];
  }),
  update: protectedProcedure
    .input(z.array(z.any()))
    .handler(async ({ context, input }) => {
      const existing = await context.db
        .select()
        .from(schema.portalNewsBar)
        .where(eq(schema.portalNewsBar.id, "news_bar"))
        .limit(1);
      if (existing.length > 0) {
        await context.db
          .update(schema.portalNewsBar)
          .set({ data: input, updatedAt: new Date() })
          .where(eq(schema.portalNewsBar.id, "news_bar"));
      } else {
        await context.db.insert(schema.portalNewsBar).values({
          id: "news_bar",
          data: input,
        });
      }
      return { ok: true };
    }),
};

export const contactRouter = {
  submit: publicProcedure
    .input(contactSubmitInputSchema)
    .handler(async ({ context, input }) => {
      const id = String(Date.now());
      const now = new Date().toISOString();
      const record = {
        id,
        createdAt: now,
        status: "New",
        ...input,
      };
      await context.db.insert(schema.portalContacts).values({
        id,
        data: record,
      });
      return { ok: true, id };
    }),
  list: protectedProcedure.handler(async ({ context }) => {
    const rows = await context.db.select().from(schema.portalContacts);
    return rows.map((r) => r.data as any);
  }),
};
