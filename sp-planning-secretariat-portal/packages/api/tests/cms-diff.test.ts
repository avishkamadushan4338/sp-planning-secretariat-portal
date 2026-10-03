import { describe, expect, test } from "bun:test";

/**
 * ── Revision diff tests ────────────────────────────────────────────────────────
 *
 * The revision history panel shows a field-level diff so an editor can see what
 * a restore would actually change. Getting this wrong is costly in both
 * directions: a diff that misses a change makes a restore look safe when it is
 * not, and one that reports phantom changes makes every restore look reckless.
 *
 * `diffPaths` is duplicated from `CmsRevisionHistory.tsx` for the same reason as
 * in cms-workflow.test.ts — that module is React and cannot load in a test
 * process. Keep the two in step.
 */

function diffPaths(a: unknown, b: unknown, prefix = ""): string[] {
  if (JSON.stringify(a) === JSON.stringify(b)) return [];

  const isObj = (v: unknown): v is Record<string, unknown> =>
    typeof v === "object" && v !== null && !Array.isArray(v);

  // Arrays compare as whole values. Item-level array diffing produces noisy
  // output for reordered content and is rarely how an editor reads a change.
  if (Array.isArray(a) || Array.isArray(b)) return [prefix || "(root)"];
  if (!isObj(a) || !isObj(b)) return [prefix || "(root)"];

  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  const out: string[] = [];
  for (const key of keys) {
    const path = prefix ? `${prefix}.${key}` : key;
    out.push(...diffPaths(a[key], b[key], path));
  }
  return out;
}

describe("diffPaths", () => {
  test("identical objects produce no differences", () => {
    expect(diffPaths({ title: "a" }, { title: "a" })).toEqual([]);
  });

  test("reports a changed top-level field", () => {
    expect(diffPaths({ title: "a" }, { title: "b" })).toEqual(["title"]);
  });

  test("reports nested paths with dot notation", () => {
    const before = { name: { en: "Old", si: "පරණ" } };
    const after = { name: { en: "New", si: "පරණ" } };
    expect(diffPaths(before, after)).toEqual(["name.en"]);
  });

  test("reports a key added in the newer version", () => {
    expect(diffPaths({ a: 1 }, { a: 1, b: 2 })).toEqual(["b"]);
  });

  test("reports a key removed in the newer version", () => {
    expect(diffPaths({ a: 1, b: 2 }, { a: 1 })).toEqual(["b"]);
  });

  test("treats an array as a single opaque value", () => {
    // Reordering a list is not a content change an editor needs itemised, so it
    // reports the whole field rather than every index.
    const before = { images: ["a", "b", "c"] };
    const after = { images: ["c", "b", "a"] };
    expect(diffPaths(before, after)).toEqual(["images"]);
  });

  test("reports a type change on a leaf", () => {
    expect(diffPaths({ featured: "yes" }, { featured: true })).toEqual(["featured"]);
  });

  test("detects a change from an empty object to a populated one", () => {
    expect(diffPaths({}, { title: "new" })).toEqual(["title"]);
  });

  test("handles primitives at the root", () => {
    expect(diffPaths("old", "new")).toEqual(["(root)"]);
  });

  test("does not recurse into null", () => {
    expect(diffPaths({ photo: "a.png" }, { photo: null })).toEqual(["photo"]);
  });

  test("returns multiple paths in a stable order", () => {
    const before = { a: 1, b: 2, c: 3 };
    const after = { a: 9, b: 2, c: 8 };
    expect(diffPaths(before, after)).toEqual(["a", "c"]);
  });
});