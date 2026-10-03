import * as v from "valibot";

// ── Shared primitives ────────────────────────────────────────────────────────

export const LocalizedStringSchema = v.object({
  en: v.optional(v.string(), ""),
  si: v.optional(v.string(), ""),
  ta: v.optional(v.string(), ""),
});
export type LocalizedString = v.InferOutput<typeof LocalizedStringSchema>;

export const LocalizedStringListSchema = v.object({
  en: v.optional(v.array(v.string()), []),
  si: v.optional(v.array(v.string()), []),
  ta: v.optional(v.array(v.string()), []),
});
export type LocalizedStringList = v.InferOutput<typeof LocalizedStringListSchema>;

/**
 * Loosely-typed record used for the singleton page/settings blobs (home
 * content, about pages, org structure, page visibility). These payloads are
 * large, deeply nested, and shaped per-screen, so they are validated as
 * "JSON object" and versioned rather than pinned to a rigid schema that would
 * need a migration on every copy tweak.
 */
export const FreeformObjectSchema = v.record(v.string(), v.unknown());
export type FreeformObject = v.InferOutput<typeof FreeformObjectSchema>;

// ── Collection content types ─────────────────────────────────────────────────

export const NewsDataSchema = v.object({
  id: v.string(),
  slug: v.optional(v.string(), ""),
  title: v.string(),
  titleSi: v.optional(v.string(), ""),
  titleTa: v.optional(v.string(), ""),
  excerpt: v.optional(v.string(), ""),
  excerptSi: v.optional(v.string(), ""),
  excerptTa: v.optional(v.string(), ""),
  body: v.optional(v.string(), ""),
  bodySi: v.optional(v.string(), ""),
  bodyTa: v.optional(v.string(), ""),
  category: v.optional(v.string(), "General"),
  imageUrl: v.optional(v.string(), ""),
  author: v.optional(v.string(), ""),
  /** Editor-facing workflow state mirrored from the item row. */
  status: v.optional(v.string(), "draft"),
  featured: v.optional(v.boolean(), false),
  views: v.optional(v.number(), 0),
  publishedAt: v.optional(v.string(), ""),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type NewsData = v.InferOutput<typeof NewsDataSchema>;

export const NoticeDataSchema = v.object({
  id: v.string(),
  title: v.string(),
  titleSi: v.optional(v.string(), ""),
  titleTa: v.optional(v.string(), ""),
  body: v.optional(v.string(), ""),
  category: v.optional(v.string(), "General"),
  attachmentUrl: v.optional(v.string(), ""),
  /** Notices carry their own expiry, independent of the workflow status. */
  expiresAt: v.optional(v.string(), ""),
  status: v.optional(v.string(), "draft"),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type NoticeData = v.InferOutput<typeof NoticeDataSchema>;

export const GalleryAlbumDataSchema = v.object({
  id: v.string(),
  title: v.string(),
  titleSi: v.optional(v.string(), ""),
  titleTa: v.optional(v.string(), ""),
  description: v.optional(v.string(), ""),
  category: v.optional(v.string(), "General"),
  coverImage: v.optional(v.string(), ""),
  images: v.optional(v.array(v.string()), []),
  eventDate: v.optional(v.string(), ""),
  status: v.optional(v.string(), "draft"),
  order: v.optional(v.number(), 0),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type GalleryAlbumData = v.InferOutput<typeof GalleryAlbumDataSchema>;

export const DownloadDataSchema = v.object({
  id: v.string(),
  title: v.string(),
  titleSi: v.optional(v.string(), ""),
  titleTa: v.optional(v.string(), ""),
  description: v.optional(v.string(), ""),
  category: v.optional(v.string(), "General"),
  /** External link (Drive/Dropbox/OneDrive) or an uploaded asset path. */
  fileUrl: v.optional(v.string(), ""),
  fileName: v.optional(v.string(), ""),
  fileSize: v.optional(v.string(), ""),
  fileType: v.optional(v.string(), ""),
  status: v.optional(v.string(), "draft"),
  downloadCount: v.optional(v.number(), 0),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type DownloadData = v.InferOutput<typeof DownloadDataSchema>;

export const HomeEventDataSchema = v.object({
  id: v.string(),
  titleEn: v.optional(v.string(), ""),
  titleSi: v.optional(v.string(), ""),
  titleTa: v.optional(v.string(), ""),
  descriptionEn: v.optional(v.string(), ""),
  descriptionSi: v.optional(v.string(), ""),
  descriptionTa: v.optional(v.string(), ""),
  date: v.optional(v.string(), ""),
  endDate: v.optional(v.string(), ""),
  time: v.optional(v.string(), ""),
  location: v.optional(v.string(), ""),
  imageUrl: v.optional(v.string(), ""),
  category: v.optional(v.string(), "Event"),
  status: v.optional(v.string(), "draft"),
  featured: v.optional(v.boolean(), false),
  order: v.optional(v.number(), 0),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type HomeEventData = v.InferOutput<typeof HomeEventDataSchema>;

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
  positionNumber: v.optional(v.string(), ""),
  featured: v.optional(v.boolean(), false),
  showInDirectory: v.optional(v.boolean(), true),
  order: v.optional(v.number(), 0),
  slug: v.optional(v.string(), ""),
  status: v.optional(v.string(), "draft"),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type StaffData = v.InferOutput<typeof StaffDataSchema>;

export const FaqDataSchema = v.object({
  id: v.string(),
  question: LocalizedStringSchema,
  answer: LocalizedStringSchema,
  category: v.optional(v.string(), "General"),
  order: v.optional(v.number(), 0),
  status: v.optional(v.string(), "draft"),
  featured: v.optional(v.boolean(), false),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type FaqData = v.InferOutput<typeof FaqDataSchema>;

export const DepartmentDataSchema = v.object({
  id: v.string(),
  slug: v.string(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  functions: v.optional(LocalizedStringListSchema),
  head: v.optional(v.nullable(v.string())),
  order: v.optional(v.number(), 0),
  status: v.optional(v.string(), "draft"),
  createdAt: v.optional(v.string()),
  updatedAt: v.optional(v.string()),
});
export type DepartmentData = v.InferOutput<typeof DepartmentDataSchema>;

// ── Contact submissions (not CMS-editable; listed in the dashboard) ──────────

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

// ── Legacy SMP shapes (retained for the store module) ────────────────────────

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

export const SmpCategoryDataSchema = v.object({
  id: v.string(),
  name: v.string(),
  color: v.string(),
  createdAt: v.optional(v.string()),
});
export type SmpCategoryData = v.InferOutput<typeof SmpCategoryDataSchema>;
