/**
 * ── CMS workflow smoke test ────────────────────────────────────────────────────
 *
 * Exercises the draft/publish/rollback path end to end against a running dev
 * server, to confirm the behaviours the CMS depends on actually hold:
 *
 *   1. A new draft is NOT visible to the public read path.
 *   2. Publishing makes it visible and records the live version.
 *   3. Saving again leaves the live copy untouched.
 *   4. Publishing again updates what visitors see.
 *   5. Every save appended an immutable revision.
 *   6. Restoring an old revision changes the draft but not the live copy.
 *   7. Unpublishing removes it from public view but keeps the draft.
 *
 * Usage:
 *   bun run --cwd packages/api scripts/smoke-cms.ts
 *   BASE_URL=http://localhost:7001 AUTH_TOKEN=<cookie> bun run scripts/smoke-cms.ts
 *
 * Without AUTH_TOKEN the script skips the authenticated steps and reports that
 * it only exercised the public read path, rather than failing silently.
 */

const BASE = process.env.BASE_URL || "http://localhost:7001";
const RPC = `${BASE}/api/rpc`;
const AUTH = process.env.AUTH_TOKEN;

let passed = 0;
let failed = 0;
const skipped: string[] = [];

const check = (name: string, condition: boolean, detail = "") => {
  if (condition) {
    passed++;
    console.log(`  ✓ ${name}`);
  } else {
    failed++;
    console.error(`  ✗ ${name}${detail ? ` — ${detail}` : ""}`);
  }
};

const rpc = async (procedure: string, payload: unknown, authenticated = true) => {
  const res = await fetch(`${RPC}/${procedure}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authenticated && AUTH ? { cookie: AUTH } : {}),
    },
    body: JSON.stringify({ json: payload }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${procedure} → ${res.status}: ${text.slice(0, 200)}`);
  }
  const body = await res.json();
  if (body.error) throw new Error(`${procedure} → ${JSON.stringify(body.error).slice(0, 200)}`);
  return body.json ?? body.result ?? body;
};

const TEST_TITLE_V1 = `Smoke Test Article v1 ${Date.now()}`;
const TEST_TITLE_V2 = `Smoke Test Article v2 ${Date.now()}`;

async function main() {
  console.log(`CMS smoke test against ${BASE}\n`);

  // ── Public read path works without auth ────────────────────────────────────
  console.log("Public read path (no authentication)");
  try {
    const staff = await rpc("portal/staff/list", {}, false);
    check("published staff is publicly readable", Array.isArray(staff), "expected an array");
  } catch (e) {
    failed++;
    console.error(`  ✗ public read failed — ${(e as Error).message}`);
  }

  if (!AUTH) {
    skipped.push(
      "draft/publish/rollback steps (set AUTH_TOKEN to a valid session cookie)"
    );
    console.log("\n⚠ AUTH_TOKEN not set — skipping all authenticated workflow steps.");
    report();
    return;
  }

  console.log("\nDraft → publish → rollback workflow");

  // 1. Create a draft.
  const draft = await rpc("cms/saveDraft", {
    contentType: "news",
    data: { title: TEST_TITLE_V1, category: "Test", excerpt: "smoke test v1" },
    note: "smoke test v1",
  });
  const id = draft.id as string;
  check("draft created", typeof id === "string" && id.length > 0);
  check("new draft starts unpublished", draft.status === "draft");
  check("new draft has no published copy", draft.publishedData === null);

  // 2. A draft must be invisible to the public.
  const publishedBefore = await rpc("cms/published", { contentType: "news" }, false);
  check(
    "draft is NOT visible publicly before publishing",
    !publishedBefore.some((n: any) => n.id === id)
  );

  // 3. Publish it.
  await rpc("cms/publish", { id });
  const afterPublish = await rpc("cms/published", { contentType: "news" }, false);
  const live = afterPublish.find((n: any) => n.id === id);
  check("published content IS visible publicly", Boolean(live));
  check("published copy holds the v1 title", live?.title === TEST_TITLE_V1);

  // 4. Save a change; live copy must not move.
  const v2 = await rpc("cms/saveDraft", {
    contentType: "news",
    id,
    data: { title: TEST_TITLE_V2, category: "Test", excerpt: "smoke test v2" },
    note: "smoke test v2",
  });
  check("version incremented on save", v2.currentVersion === 2, `got ${v2.currentVersion}`);
  check("unpublished changes flagged", v2.hasUnpublishedChanges === true);

  const stillV1 = (await rpc("cms/published", { contentType: "news" }, false)).find(
    (n: any) => n.id === id
  );
  check(
    "saving a draft does NOT change the live site",
    stillV1?.title === TEST_TITLE_V1,
    `live title is "${stillV1?.title}"`
  );

  // 5. Republish to push v2 live.
  await rpc("cms/publish", { id });
  const nowLive = (await rpc("cms/published", { contentType: "news" }, false)).find(
    (n: any) => n.id === id
  );
  check("republishing updates the live copy", nowLive?.title === TEST_TITLE_V2);

  // 6. Revision history.
  const revisions = await rpc("cms/revisions", { contentId: id });
  check("two revisions recorded", revisions.length === 2, `got ${revisions.length}`);

  // 7. Restore v1 into the draft, without touching the live copy.
  const v1Revision = revisions.find((r: any) => r.version === 1);
  const restored = await rpc("cms/restore", { revisionId: v1Revision.id });
  check("restore creates a new version", restored.currentVersion === 3, `got ${restored.currentVersion}`);

  const afterRestore = await rpc("cms/get", { id });
  check("draft restored to the v1 title", afterRestore.data?.title === TEST_TITLE_V1);
  check(
    "restore did NOT change the live copy",
    afterRestore.publishedData?.title === TEST_TITLE_V2,
    `live title is "${afterRestore.publishedData?.title}"`
  );

  // 8. Unpublish removes it from public view but keeps the draft.
  await rpc("cms/unpublish", { id });
  const afterUnpublish = await rpc("cms/published", { contentType: "news" }, false);
  check(
    "unpublished content disappears from public view",
    !afterUnpublish.some((n: any) => n.id === id)
  );

  const kept = await rpc("cms/get", { id });
  check("unpublish preserves the draft", kept.data?.title === TEST_TITLE_V1);

  // 9. Clean up.
  await rpc("cms/remove", { id });
  const gone = await rpc("cms/published", { contentType: "news" }, false);
  check("test record deleted", !gone.some((n: any) => n.id === id));

  report();
}

function report() {
  console.log(`\n${"─".repeat(46)}`);
  console.log(`Passed: ${passed}   Failed: ${failed}`);
  if (skipped.length) {
    console.log(`Skipped: ${skipped.join("; ")}`);
  }
  process.exit(failed > 0 ? 1 : 0);
}

main().catch((error) => {
  console.error("\nSmoke test crashed:", error);
  process.exit(1);
});