import { publicProcedure, protectedProcedure } from "../../index";
import * as schema from "@sp-planning/db/schema/index";
import { eq } from "drizzle-orm";
import { z } from "zod";

export const smpRouter = {
  categories: {
    list: publicProcedure.handler(async ({ context }) => {
      const rows = await context.db.select().from(schema.smpCategories);
      return rows.map((r) => r.data as any);
    }),
  },

  items: {
    list: publicProcedure.handler(async ({ context }) => {
      const rows = await context.db.select().from(schema.smpItems);
      return rows.map((r) => r.data as any);
    }),
    save: protectedProcedure
      .input(z.record(z.any()))
      .handler(async ({ context, input }) => {
        const id = input.id || crypto.randomUUID();
        const now = new Date().toISOString();
        const record = { ...input, id, updatedAt: now };

        const existing = await context.db
          .select()
          .from(schema.smpItems)
          .where(eq(schema.smpItems.id, id))
          .limit(1);

        if (existing.length > 0) {
          await context.db
            .update(schema.smpItems)
            .set({ data: record as any, updatedAt: new Date() })
            .where(eq(schema.smpItems.id, id));
        } else {
          await context.db.insert(schema.smpItems).values({
            id,
            data: { ...record, createdAt: now } as any,
          });
        }
        return record;
      }),
  },

  disposals: {
    list: publicProcedure.handler(async ({ context }) => {
      const rows = await context.db.select().from(schema.smpDisposals);
      return rows.map((r) => r.data as any);
    }),
  },

  transactions: {
    list: publicProcedure.handler(async ({ context }) => {
      const rows = await context.db.select().from(schema.smpTransactions);
      return rows.map((r) => r.data as any);
    }),
  },

  reports: {
    summary: publicProcedure.handler(async ({ context }) => {
      const [items, categories, disposals, transactions] = await Promise.all([
        context.db.select().from(schema.smpItems),
        context.db.select().from(schema.smpCategories),
        context.db.select().from(schema.smpDisposals),
        context.db.select().from(schema.smpTransactions),
      ]);
      return {
        totalItems: items.length,
        totalCategories: categories.length,
        totalDisposals: disposals.length,
        totalTransactions: transactions.length,
      };
    }),
  },
};
