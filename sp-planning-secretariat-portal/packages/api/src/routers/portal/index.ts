import { publicProcedure, protectedProcedure, contentProcedure } from "../../index";
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

  save: contentProcedure
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

  delete: contentProcedure
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

  save: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const id = input.id || crypto.randomUUID();
      const now = new Date().toISOString();
      const record = { ...input, id, updatedAt: now };

      const existing = await context.db
        .select()
        .from(schema.cmsFaqs)
        .where(eq(schema.cmsFaqs.id, id))
        .limit(1);

      if (existing.length > 0) {
        await context.db
          .update(schema.cmsFaqs)
          .set({ data: record as any, updatedAt: new Date() })
          .where(eq(schema.cmsFaqs.id, id));
      } else {
        await context.db.insert(schema.cmsFaqs).values({
          id,
          data: { ...record, createdAt: now } as any,
        });
      }
      return record;
    }),

  delete: contentProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      await context.db.delete(schema.cmsFaqs).where(eq(schema.cmsFaqs.id, input.id));
      return { ok: true };
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

  save: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const payload = { ...input, id: "home_content", updatedAt: new Date().toISOString() };
      const existing = await context.db
        .select()
        .from(schema.cmsHomeContent)
        .where(eq(schema.cmsHomeContent.id, "home_content"))
        .limit(1);
      if (existing.length > 0) {
        await context.db
          .update(schema.cmsHomeContent)
          .set({ data: payload as any, updatedAt: new Date() })
          .where(eq(schema.cmsHomeContent.id, "home_content"));
      } else {
        await context.db.insert(schema.cmsHomeContent).values({
          id: "home_content",
          data: payload as any,
        });
      }
      return payload;
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
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      const [row] = await context.db
        .select()
        .from(schema.cmsDepartments)
        .where(eq(schema.cmsDepartments.id, input.id))
        .limit(1);
      return row ? (row.data as any) : null;
    }),

  save: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const id = input.id || crypto.randomUUID();
      const now = new Date().toISOString();
      const record = { ...input, id, updatedAt: now };

      const existing = await context.db
        .select()
        .from(schema.cmsDepartments)
        .where(eq(schema.cmsDepartments.id, id))
        .limit(1);

      if (existing.length > 0) {
        await context.db
          .update(schema.cmsDepartments)
          .set({ data: record as any, updatedAt: new Date() })
          .where(eq(schema.cmsDepartments.id, id));
      } else {
        await context.db.insert(schema.cmsDepartments).values({
          id,
          data: { ...record, createdAt: now } as any,
        });
      }
      return record;
    }),

  delete: contentProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      await context.db.delete(schema.cmsDepartments).where(eq(schema.cmsDepartments.id, input.id));
      return { ok: true };
    }),
};

export const siteSettingsRouter = {
  get: publicProcedure.handler(async ({ context }) => {
    const [row] = await context.db
      .select()
      .from(schema.cmsSiteSettings)
      .where(eq(schema.cmsSiteSettings.id, "org"))
      .limit(1);
    return row ? (row.data as any) : null;
  }),
  update: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const payload = { ...input, id: "org", updatedAt: new Date().toISOString() };
      const existing = await context.db
        .select()
        .from(schema.cmsSiteSettings)
        .where(eq(schema.cmsSiteSettings.id, "org"))
        .limit(1);
      if (existing.length > 0) {
        await context.db
          .update(schema.cmsSiteSettings)
          .set({ data: payload as any, updatedAt: new Date() })
          .where(eq(schema.cmsSiteSettings.id, "org"));
      } else {
        await context.db.insert(schema.cmsSiteSettings).values({ id: "org", data: payload as any });
      }
      return payload;
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

  saveOverview: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const payload = { ...input, id: "about_overview", updatedAt: new Date().toISOString() };
      const existing = await context.db
        .select()
        .from(schema.cmsAboutOverview)
        .where(eq(schema.cmsAboutOverview.id, "about_overview"))
        .limit(1);
      if (existing.length > 0) {
        await context.db
          .update(schema.cmsAboutOverview)
          .set({ data: payload as any, updatedAt: new Date() })
          .where(eq(schema.cmsAboutOverview.id, "about_overview"));
      } else {
        await context.db.insert(schema.cmsAboutOverview).values({ id: "about_overview", data: payload as any });
      }
      return payload;
    }),

  saveFunctions: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const payload = { ...input, id: "about_functions", updatedAt: new Date().toISOString() };
      const existing = await context.db
        .select()
        .from(schema.cmsAboutFunctions)
        .where(eq(schema.cmsAboutFunctions.id, "about_functions"))
        .limit(1);
      if (existing.length > 0) {
        await context.db
          .update(schema.cmsAboutFunctions)
          .set({ data: payload as any, updatedAt: new Date() })
          .where(eq(schema.cmsAboutFunctions.id, "about_functions"));
      } else {
        await context.db.insert(schema.cmsAboutFunctions).values({ id: "about_functions", data: payload as any });
      }
      return payload;
    }),

  saveOrgStructure: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const payload = { ...input, id: "org_structure", updatedAt: new Date().toISOString() };
      const existing = await context.db
        .select()
        .from(schema.cmsOrgStructure)
        .where(eq(schema.cmsOrgStructure.id, "org_structure"))
        .limit(1);
      if (existing.length > 0) {
        await context.db
          .update(schema.cmsOrgStructure)
          .set({ data: payload as any, updatedAt: new Date() })
          .where(eq(schema.cmsOrgStructure.id, "org_structure"));
      } else {
        await context.db.insert(schema.cmsOrgStructure).values({ id: "org_structure", data: payload as any });
      }
      return payload;
    }),

  saveHistory: contentProcedure
    .input(z.record(z.any()))
    .handler(async ({ context, input }) => {
      const payload = { ...input, id: "about_history", updatedAt: new Date().toISOString() };
      const existing = await context.db
        .select()
        .from(schema.cmsAboutHistory)
        .where(eq(schema.cmsAboutHistory.id, "about_history"))
        .limit(1);
      if (existing.length > 0) {
        await context.db
          .update(schema.cmsAboutHistory)
          .set({ data: payload as any, updatedAt: new Date() })
          .where(eq(schema.cmsAboutHistory.id, "about_history"));
      } else {
        await context.db.insert(schema.cmsAboutHistory).values({ id: "about_history", data: payload as any });
      }
      return payload;
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
  update: contentProcedure
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

  update: contentProcedure
    .input(z.object({ id: z.string() }).and(z.record(z.any())))
    .handler(async ({ context, input }) => {
      const { id, ...rest } = input as { id: string } & Record<string, any>;
      const [existing] = await context.db
        .select()
        .from(schema.portalContacts)
        .where(eq(schema.portalContacts.id, id))
        .limit(1);
      if (!existing) return null;
      const record = { ...(existing.data as any), ...rest, id };
      await context.db
        .update(schema.portalContacts)
        .set({ data: record as any, updatedAt: new Date() })
        .where(eq(schema.portalContacts.id, id));
      return record;
    }),

  delete: contentProcedure
    .input(z.object({ id: z.string() }))
    .handler(async ({ context, input }) => {
      await context.db.delete(schema.portalContacts).where(eq(schema.portalContacts.id, input.id));
      return { ok: true };
    }),
};
