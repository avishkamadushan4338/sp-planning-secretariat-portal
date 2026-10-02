import { pgTable, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import type {
  StaffData,
  FaqData,
  DepartmentData,
  ContactData,
} from "./valibot-schemas";

// Staff table with typed JSONB column
export const cmsStaff = pgTable("cms_staff", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<StaffData>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// FAQs table with typed JSONB column
export const cmsFaqs = pgTable("cms_faqs", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<FaqData>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Home content table (hero, vision, mission, etc.)
export const cmsHomeContent = pgTable("cms_home_content", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Departments table with typed JSONB column
export const cmsDepartments = pgTable("cms_departments", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<DepartmentData>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Site Settings table (publish status, contact details)
export const cmsSiteSettings = pgTable("cms_site_settings", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// About Overview
export const cmsAboutOverview = pgTable("cms_about_overview", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// About Functions
export const cmsAboutFunctions = pgTable("cms_about_functions", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Org Structure
export const cmsOrgStructure = pgTable("cms_org_structure", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// About History
export const cmsAboutHistory = pgTable("cms_about_history", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// Contact Inquiries / Complaints with typed JSONB column
export const portalContacts = pgTable("portal_contacts", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<ContactData>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

// News Bar Ticker
export const portalNewsBar = pgTable("portal_news_bar", {
  id: text("id").primaryKey(),
  data: jsonb("data").$type<Record<string, unknown>[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
