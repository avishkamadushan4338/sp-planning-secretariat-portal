import { createFileRoute } from "@tanstack/react-router";
import { getRequest } from "@tanstack/react-start/server";
import { auth } from "@/services.server";

/**
 * ── Image upload endpoint ──────────────────────────────────────────────────────
 *
 * `cmsApi.js` has always posted to `/api/uploads/image`, but this route did not
 * exist, so every image field in the CMS — staff photos, gallery covers, home
 * banners, About imagery — silently failed to upload. Editors saw an error and
 * moved on, which is worse than a visible failure because the content still
 * "saved" with no image.
 *
 * Uploads are restricted to content managers. The write path is unauthenticated
 * in the sense that anyone who can reach the endpoint could otherwise fill the
 * disk, so the session and role are both checked before the body is read.
 */

/**
 * Only raster images are accepted. SVG is excluded on purpose: it is an XML
 * document that can carry script, and serving user-supplied SVG from the site's
 * own origin turns an upload into stored XSS.
 */
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const EXTENSION_BY_TYPE: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

/** 8 MB ceiling — comfortably above a hero image, well below a disk-exhaustion risk. */
const MAX_BYTES = 8 * 1024 * 1024;

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

async function handle({ request }: { request: Request }) {
  // ── Authorise before touching the request body ─────────────────────────────
  const request_ = getRequest();
  const session = await auth.api.getSession({ headers: request_.headers }).catch(() => null);

  if (!session?.user) {
    return Response.json({ error: "Authentication required" }, { status: 401 });
  }

  const role = (session.user as { role?: string }).role;
  if (role !== "admin" && role !== "secretary") {
    return Response.json(
      { error: "Your account does not have permission to upload images" },
      { status: 403 }
    );
  }

  // ── Validate the upload ────────────────────────────────────────────────────
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return Response.json({ error: "Expected a multipart form upload" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return Response.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return Response.json(
      {
        error: `Unsupported image type "${file.type || "unknown"}". Allowed: JPEG, PNG, WebP, GIF, AVIF.`,
      },
      { status: 415 }
    );
  }

  if (file.size > MAX_BYTES) {
    return Response.json(
      { error: `Image is ${(file.size / 1024 / 1024).toFixed(1)}MB — the limit is 8MB.` },
      { status: 413 }
    );
  }

  if (file.size === 0) {
    return Response.json({ error: "File is empty" }, { status: 400 });
  }

  // ── Persist ────────────────────────────────────────────────────────────────
  // The stored name is generated, never derived from user input, so a crafted
  // filename cannot traverse directories or overwrite an existing asset.
  const ext = EXTENSION_BY_TYPE[file.type];
  const name = `${Date.now()}-${crypto.randomUUID()}.${ext}`;

  const { mkdir, writeFile } = await import("node:fs/promises");
  const path = await import("node:path");

  const dir = path.resolve(process.cwd(), UPLOAD_DIR);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return Response.json({
    url: `/uploads/${name}`,
    name,
    size: file.size,
    type: file.type,
  });
}

export const Route = createFileRoute("/api/uploads/image")({
  server: {
    handlers: {
      POST: handle,
    },
  },
});