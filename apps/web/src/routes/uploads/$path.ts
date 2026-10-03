import { createFileRoute } from "@tanstack/react-router";

/**
 * ── Serves uploaded images ─────────────────────────────────────────────────────
 *
 * Files live on disk under `UPLOAD_DIR` rather than in `public/`, because
 * `public/` is copied at build time and would not pick up runtime uploads. This
 * route reads them back so `resolveUploadUrl('/uploads/…')` keeps working
 * unchanged.
 */

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
};

async function handle({ params }: { params: { path: string } }) {
  const path = await import("node:path");
  const { readFile } = await import("node:fs/promises");

  const dir = path.resolve(process.cwd(), UPLOAD_DIR);

  // Resolve against the upload directory and confirm the result is still inside
  // it. Without this check, `/uploads/../../.env` would escape the directory.
  const target = path.resolve(dir, params.path);
  if (target !== dir && !target.startsWith(dir + path.sep)) {
    return new Response("Not found", { status: 404 });
  }

  const ext = path.extname(target).toLowerCase();
  const contentType = CONTENT_TYPES[ext];
  if (!contentType) {
    // Only known image extensions are served. Never echo a file whose type we
    // have not explicitly allowlisted.
    return new Response("Not found", { status: 404 });
  }

  try {
    const file = await readFile(target);
    return new Response(new Uint8Array(file), {
      headers: {
        "Content-Type": contentType,
        // Immutable: names embed a UUID, so the bytes at a given URL never change.
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}

export const Route = createFileRoute("/uploads/$path")({
  server: {
    handlers: {
      GET: handle,
    },
  },
});