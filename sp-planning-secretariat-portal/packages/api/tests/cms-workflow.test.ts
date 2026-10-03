import { describe, expect, test } from "bun:test";

/**
 * ── CMS workflow unit tests ────────────────────────────────────────────────────
 *
 * Covers the pure decision logic behind the editor UI. These are the rules that
 * were previously implicit and silently wrong: which badge an item shows, and
 * whether the publish button should offer an action.
 *
 * The logic is duplicated here from `CmsStatusBadge.tsx` rather than imported,
 * because that module pulls in React and framer-motion, which a Bun test process
 * has no DOM for. If you change the badge rules, change them here too — the
 * duplication is deliberate and confined to these few lines.
 */

type Status = "draft" | "published" | "archived";

type Item = { status: Status; hasUnpublishedChanges?: boolean };

// ── Mirrors badgeVariantFor() in CmsStatusBadge.tsx ──────────────────────────
function badgeVariantFor(item: Item): string {
  if (item.status === "archived") return "archived";
  if (item.hasUnpublishedChanges) return "unpublished";
  if (item.status === "published") return "published";
  return "draft";
}

// ── Mirrors the togglePublish() decision in useCmsCollection ─────────────────
function shouldUnpublish(item: Item): boolean {
  return item.status === "published" && !item.hasUnpublishedChanges;
}

describe("badgeVariantFor", () => {
  test("a published item with no pending edits reads as Live", () => {
    expect(badgeVariantFor({ status: "published" })).toBe("published");
  });

  test("a never-published item reads as Draft", () => {
    expect(badgeVariantFor({ status: "draft" })).toBe("draft");
  });

  test("archived outranks everything else", () => {
    // Even a dirty archived item must read as Archived, otherwise the UI would
    // offer to publish something that was deliberately taken down.
    expect(badgeVariantFor({ status: "archived", hasUnpublishedChanges: true })).toBe(
      "archived"
    );
  });

  test("unpublished changes outrank a published status", () => {
    // The case that matters: the item is live on an older version AND has newer
    // edits. Showing "Live" here would hide the fact that visitors have not
    // seen the editor's work.
    expect(
      badgeVariantFor({ status: "published", hasUnpublishedChanges: true })
    ).toBe("unpublished");
  });
});

describe("shouldUnpublish", () => {
  test("a clean published item can be taken down", () => {
    expect(shouldUnpublish({ status: "published" })).toBe(true);
  });

  test("a published item with pending edits is republished, not taken down", () => {
    // Toggling must push the editor's work live rather than discarding it.
    expect(
      shouldUnpublish({ status: "published", hasUnpublishedChanges: true })
    ).toBe(false);
  });

  test("a draft is never unpublished, only published", () => {
    expect(shouldUnpublish({ status: "draft" })).toBe(false);
  });
});

describe("hasUnpublishedChanges derivation", () => {
  // Mirrors toEditorItem() in packages/api/src/routers/cms/index.ts
  const hasUnpublishedChanges = (currentVersion: number, publishedVersion: number | null) =>
    publishedVersion !== null && publishedVersion !== currentVersion;

  test("a never-published item has no unpublished *changes* — it has no live copy", () => {
    // This reads as "Draft", not "Unpublished changes": there is nothing to
    // compare against yet, and the badge for that state already says Draft.
    expect(hasUnpublishedChanges(3, null)).toBe(false);
  });

  test("saving without publishing leaves the versions unequal", () => {
    expect(hasUnpublishedChanges(2, 1)).toBe(true);
  });

  test("publishing brings the versions back in line", () => {
    expect(hasUnpublishedChanges(2, 2)).toBe(false);
  });

  test("unpublishing clears the published version entirely", () => {
    expect(hasUnpublishedChanges(2, null)).toBe(false);
  });
});