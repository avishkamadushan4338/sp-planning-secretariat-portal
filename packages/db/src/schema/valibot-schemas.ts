import * as v from "valibot";

// Localized string schema
export const LocalizedStringSchema = v.object({
  en: v.optional(v.string(), ""),
  si: v.optional(v.string(), ""),
  ta: v.optional(v.string(), ""),
});
export type LocalizedString = v.InferOutput<typeof LocalizedStringSchema>;

// Localized string list schema
export const LocalizedStringListSchema = v.object({
  en: v.optional(v.array(v.string()), []),
  si: v.optional(v.array(v.string()), []),
  ta: v.optional(v.array(v.string()), []),
});
export type LocalizedStringList = v.InferOutput<typeof LocalizedStringListSchema>;

// Staff Data Schema
export const StaffDataSchema = v.object({
  id: v.string(),
  name: LocalizedStringSchema,
  position: LocalizedStringSchema,
  photo: v.optional(v.string(), ""),
  phone: v.optional(v.string(), ""),
  email: v.optional(v.string(), ""),
  office: v.optional(v.string(), ""),
  bio: v.optional(LocalizedStringSchema),
  experience: v.optional(LocalizedStringSchema),
  responsibilities: v.optional(LocalizedStringListSchema),
  departmentId: v.optional(v.nullable(v.string())),
  tier: v.optional(v.string(), "department-head"),
  positionRank: v.optional(v.nullable(v.number())),
  positionNumber: v.optional(v.nullable(v.string())),
  featured: v.optional(v.boolean(), false),
  showInDirectory: v.optional(v.boolean(), true),
  order: v.optional(v.number(), 0),
  slug: v.optional(v.string(), ""),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type StaffData = v.InferOutput<typeof StaffDataSchema>;

// Contact Data Schema
export const ContactDataSchema = v.object({
  id: v.string(),
  name: v.string(),
  email: v.string(),
  phone: v.optional(v.nullable(v.string())),
  type: v.string(),
  dept: v.optional(v.nullable(v.string())),
  subject: v.string(),
  message: v.string(),
  status: v.string(),
  createdAt: v.string(),
});
export type ContactData = v.InferOutput<typeof ContactDataSchema>;

// FAQ Data Schema
export const FaqDataSchema = v.object({
  id: v.string(),
  question: LocalizedStringSchema,
  answer: LocalizedStringSchema,
  category: v.optional(v.string(), "General"),
  order: v.optional(v.number(), 0),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type FaqData = v.InferOutput<typeof FaqDataSchema>;

// Department Data Schema
export const DepartmentDataSchema = v.object({
  id: v.string(),
  slug: v.string(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  functions: v.optional(LocalizedStringListSchema),
  head: v.optional(v.nullable(v.string())),
  order: v.optional(v.number(), 0),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type DepartmentData = v.InferOutput<typeof DepartmentDataSchema>;

// SMP Item Data Schema
export const SmpItemDataSchema = v.object({
  id: v.string(),
  name: v.string(),
  itemCode: v.optional(v.string(), ""),
  categoryId: v.string(),
  quantity: v.number(),
  unit: v.string(),
  status: v.string(),
  description: v.optional(v.string(), ""),
  location: v.optional(v.string(), ""),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type SmpItemData = v.InferOutput<typeof SmpItemDataSchema>;

// SMP Category Data Schema
export const SmpCategoryDataSchema = v.object({
  id: v.string(),
  name: v.string(),
  color: v.string(),
  createdAt: v.optional(v.string()),
});
export type SmpCategoryData = v.InferOutput<typeof SmpCategoryDataSchema>;
