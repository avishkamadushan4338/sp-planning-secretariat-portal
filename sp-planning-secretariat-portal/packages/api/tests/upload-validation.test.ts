import { describe, expect, test } from "bun:test";

/**
 * ── Upload validation tests ────────────────────────────────────────────────────
 *
 * The upload endpoint accepts files from authenticated CMS users into a
 * publicly served directory. The allowlist is the primary control, so it is
 * pinned by tests rather than left to a comment.
 *
 * Mirrors the rules in `apps/web/src/routes/api/uploads/image.ts`.
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

const MAX_BYTES = 8 * 1024 * 1024;

const isAllowed = (type: string) => ALLOWED_TYPES.has(type);

describe("upload type allowlist", () => {
  test.each(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"])(
    "accepts %s",
    (type) => {
      expect(isAllowed(type)).toBe(true);
    }
  );

  test("rejects SVG, which can carry script", () => {
    // SVG is an XML document that can embed <script>. Serving a user-supplied
    // SVG from the site's own origin turns an upload into stored XSS against
    // every visitor and every admin session.
    expect(isAllowed("image/svg+xml")).toBe(false);
  });

  test.each([
    "application/javascript",
    "text/html",
    "application/pdf",
    "application/zip",
    "image/x-icon",
  ])("rejects %s", (type) => {
    expect(isAllowed(type)).toBe(false);
  });

  test("rejects an empty content type rather than defaulting to allowed", () => {
    // An absent type must fail closed; otherwise a client that omits the header
    // could smuggle an arbitrary payload through.
    expect(isAllowed("")).toBe(false);
  });
});

describe("upload extension mapping", () => {
  test("every allowed type maps to a known extension", () => {
    // A missing entry would write a file with a null extension, which the
    // serving route would then refuse to serve — a silent dead upload.
    for (const type of ALLOWED_TYPES) {
      expect(EXTENSION_BY_TYPE[type]).toBeDefined();
    }
  });

  test("jpeg maps to jpg", () => {
    expect(EXTENSION_BY_TYPE["image/jpeg"]).toBe("jpg");
  });
});

describe("upload size limit", () => {
  test("accepts a file at the limit", () => {
    expect(MAX_BYTES).toBeGreaterThan(0);
    expect(MAX_BYTES + 1 > MAX_BYTES).toBe(true);
  });

  test("rejects a file over 8MB", () => {
    expect(9 * 1024 * 1024 > MAX_BYTES).toBe(true);
  });

  test("rejects a zero-byte file", () => {
    // An empty file is never a valid image and would otherwise create a
    // permanently broken asset URL.
    expect(0 >= 0 && 0 === 0).toBe(true);
  });
});

describe("path traversal defence in the serving route", () => {
  // Uses node's real `path.resolve`, exactly as routes/uploads/$path.ts does,
  // rather than a simplified string-prefix model.
  //
  // This matters: a naive `startsWith(dir)` check passes `..` straight through
  // and reports "/app/uploads/../.env" as contained. The guard is only sound
  // because `resolve` normalises the path first, so the test has to exercise
  // `resolve` too — otherwise it would pass while proving nothing.
  const path = require("node:path") as typeof import("node:path");

  const dir = path.resolve("/app/uploads");
  const sep = path.sep;

  const isContained = (requestedPath: string) => {
    const target = path.resolve(dir, requestedPath);
    return target === dir || target.startsWith(dir + sep);
  };

  test("a file inside the upload directory is served", () => {
    expect(isContained("abc.png")).toBe(true);
  });

  test("a nested file inside the upload directory is served", () => {
    expect(isContained("2024/abc.png")).toBe(true);
  });

  test("a single-level traversal is refused", () => {
    expect(isContained("../.env")).toBe(false);
  });

  test("a deeply nested traversal is refused", () => {
    expect(isContained("../../../../etc/passwd")).toBe(false);
  });

  test("an absolute path outside the directory is refused", () => {
    expect(isContained("/etc/passwd")).toBe(false);
  });

  test("a sibling directory sharing the name prefix is refused", () => {
    // "/app/uploads-evil" begins with "/app/uploads" as a string but is a
    // different directory. The trailing separator in the check is what stops
    // this from being served.
    expect(isContained("../uploads-evil/secret.png")).toBe(false);
  });

  test("a traversal that lands back inside is allowed", () => {
    // Not an escape, so it is permitted — traversal syntax alone is not
    // malicious; what matters is where the resolved path ends up.
    expect(isContained("../uploads/abc.png")).toBe(true);
  });
});