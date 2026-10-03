# Handover — CMS rebuild (`sp-planning-secretariat-portal`)

**Read this first.** Nothing in this work is committed. Everything below lives in the
working tree on branch `migration`, on top of `7fbd692`. Start with
`git status` and `git diff` before you change anything, and do not assume the
repo on disk matches `origin`.

---

## 1. What the task actually was

The brief was "fix the CMS". The real finding was that the CMS was not editing
code files at all — that was never its job. The actual problem was that **site
content was spread across three different storage mechanisms**, only one of which
was a database:

| Mechanism | What lived there | State before |
|---|---|---|
| oRPC routers | staff, faqs, departments, homeContent, siteSettings, about, contacts | Partially broken |
| `localStorage` | news, notices, gallery, downloads, home events, page visibility, publish mode | **Browser-local — invisible to every other admin and every visitor** |
| Dead endpoints | `/api/news-bar`, `/api/uploads/image` | Referenced by the UI, never implemented |

Content in `localStorage` was the worst of it: an editor could publish a notice
that no visitor would ever see, because the notice lived in their browser.

### Pre-existing bugs that were live before this work

These were **not** introduced by the CMS rebuild — they were found because the
rebuild forced every write path to be typed and exercised:

- `faqsApi` and `departmentsApi` exposed only `list()`, but the UI called
  `.create()`, `.update()`, `.remove()`. Those calls threw `TypeError` at
  runtime. **Saving a FAQ or a department did nothing.**
- `homeContentApi.save()` called `get()`. **Saving home content read instead of
  wrote.**
- Three About editors (`CMSAboutOverview`, `CMSAboutFunctions`,
  `CMSOrgStructure`) called `.save()` on modules that had no `save` at all.
- Two API adapter files (`cmsContentApi.js`, `cmsAuth.js`) were untyped
  JavaScript. TypeScript could not see through them, which is precisely why all
  of the above survived to production.

---

## 2. Decisions taken (agreed with the user)

1. **Draft vs published, with versioned drafts.** Saving never changes what the
   public sees. Publishing is a separate, explicit action.
2. **Migrate everything to the DB**, including the `localStorage` sections. No
   hybrid.

---

## 3. Architecture

### Data model

One table for all content, not one table per section.

`packages/db/src/schema/cms.ts` (new):

- **`cmsContentItems`** — `contentType` partitions the table.
  - `data` — the **working copy**. Editors write here and nowhere else.
  - `publishedData` — the **live copy**. The public portal reads *only* this.
  - `status` (`draft` | `published` | `archived`), `currentVersion`,
    `publishedVersion`, `publishedAt`, `slug`, `createdBy` / `updatedBy`.
- **`cmsContentRevisions`** — append-only snapshots of `data`, one per save,
  tagged with the version it produced. Never updated or deleted by the app.
- **`CMS_CONTENT_TYPES`** — the canonical registry (16 types). Both API and UI
  validate against it, so an unknown type fails loudly instead of writing rows
  nothing will ever read.
- **`CMS_SINGLETON_IDS`** — pinned `id`s for the single-document types
  (`homeContent`, `siteSettings`, `aboutOverview`, `aboutFunctions`,
  `orgStructure`, `aboutHistory`, `pageVisibility`, `sitePublishMode`).

**The central invariant — `publishedData IS NULL` means "not live", not
`status !== 'published'`.** `status` is a UI convenience label; it can drift.
`publishedData` is the single source of truth for public visibility, and it
cannot drift because it is only ever written by `publish`.

Collection types: `news`, `notice`, `galleryAlbum`, `download`, `homeEvent`,
`newsBar`, `staff`, `faq`, `department`.

### API

`packages/api/src/routers/cms/index.ts` (new) — one router, all content types:

```
list  published  publishedById  get  getSingleton  publishedSingleton
saveDraft  publish  unpublish  archive  remove
revisions  revisionData  restore
```

Reads (`published*`) are public. **Every** mutation is `contentProcedure`.

`packages/api/src/index.ts` — new `contentProcedure` middleware. Requires a
session **and** a content role (`admin` or `secretary`). See §6.

### Client

- `apps/web/src/features/cms/cmsContentApi.ts` (new, **typed**) — the `cmsApi`
  client plus legacy shims (`staffApi`, `faqsApi`, `departmentsApi`,
  `siteSettingsApi`, `homeContentApi`, `aboutOverviewApi`, `aboutFunctionsApi`,
  `orgStructureApi`, `aboutHistoryApi`) so unmigrated sections keep compiling.
  This replaces the deleted untyped `cmsContentApi.js`.
- `apps/web/src/features/cms/shared/` — `CmsStatusBadge`, `CmsPublishBar`,
  `CmsRevisionHistory`, `useCmsCollection`, `cmsCollectionStore`.
- `apps/web/src/features/portal/shared/usePublishedContent.ts` — public reads.

### Data migration

`packages/db/src/migrateContent.ts` (`bun run db:migrate-content`) — one-off
importer. Brought **54 legacy records** in as **published**, each with a
revision baseline so history is non-empty from day one. Idempotent: re-running
imports 0 rows.

Applied via `bun run db:push`.

---

## 4. What is done

### Migrated to the DB + full draft/publish UI

| Section | File | Status |
|---|---|---|
| Staff | `CMSStaff.tsx` | **Complete**, incl. revision history |
| FAQs | `CMSFaqs.tsx` | Complete (badge + publish toggle) |
| Departments | `CMSDepartments.tsx` | Complete (badge + publish toggle) |
| News bar | `CMSHomeNewsBar.tsx` | Rewired off dead `/api/news-bar` → per-item `cmsApi` records. **See §4a — two real bugs found and fixed here.** |
| Home events | `CMSHomeEvents.tsx` | Off `localStorage` → `cmsApi` |

### Migrated off `localStorage` (via `cmsCollectionStore`)

`CMSDashboard.tsx`: news, notices, gallery albums, downloads, publish mode, page
visibility. `cmsCollectionStore.ts` is a drop-in replacement for the old
`localStorage` calls with the same surface, so the 5,688-line dashboard did not
have to be rewritten.

> **Note for whoever picks this up:** `CMSDashboard.tsx` still reads
> `localStorage['cms_page_hold']` at lines ~1127 and ~5308 as a *synchronous
> render cache*, then persists authoritatively to the DB via `savePageVisibility`.
> That dual-write is intentional (it avoids a render flash), but the localStorage
> copy is now only a cache. It is safe to delete once you add a loading state.

### 4a. Two real bugs found in `CMSHomeNewsBar` while writing this handover

These were **not** in my earlier notes — I found them by auditing the file
against the server while documenting the work. Both were live bugs.

**Bug 1 — `toggleStatus` and `executeDelete` threw `ReferenceError`.**
The section called `persistItem(...)` and `removeItem(...)`, but **neither
function was ever defined** in the file. Both were dead references left over
from the rewrite off `/api/news-bar`. Any editor who clicked the Active toggle
or Delete on a ticker item got an exception and a "Failed to update" toast, and
nothing was written. `fetchItems` was also still hitting `/api/news-bar`, which
returns **404** — so the section never loaded anything in the first place.

Fixed: both helpers now exist and go through `cmsApi`. The editor's
`Active`/`Draft` field is folded into the CMS publish status rather than stored
separately, so the two cannot disagree.

**Bug 2 — `newsBar` was registered as a singleton but used as a collection.**
`CMS_SINGLETON_IDS` pinned `newsBar: "news_bar"`. In `saveDraft`,
`const id = singletonId ?? input.id ?? crypto.randomUUID()` means a pinned type
**ignores the client-supplied id entirely**. Adding a second ticker item would
have overwritten the first — the whole ticker collapsing into one entry. Note
that `CMS_CONTENT_TYPES` already listed `newsBar` under **Collections**, so the
registry contradicted itself, and the legacy `portal_news_bar.data` column is an
*array*, which confirms it was always meant to be a collection.

Fixed by removing `newsBar` from `CMS_SINGLETON_IDS`, with a comment explaining
why it must stay out. Also updated `migrateContent.ts`, which had been importing
the legacy row as one document via `{ ...data, id }` — spreading an array into an
object produces `{0: …, 1: …}`, silently garbage. It now expands each array
element into its own row (`isArray: true`).

**Verified live after the fix** (admin cookie, real RPC calls):
- Two `saveDraft` calls → two distinct ids (`0306a878…`, `8f9cf0ac…`), no collapse.
- `publish` on the first → public `published` returns only that one item.
- Editor `list` shows `published FIRST ticker item` and `draft SECOND ticker item`.
- Both test rows deleted afterwards; `newsBar` count back to 0.

### Upload (new, working)

- `apps/web/src/routes/api/uploads/image.ts` — 401 unauthenticated, 403 wrong
  role, 415 non-image, 413 over 8MB. SVG rejected.
- `apps/web/src/routes/uploads/$path.ts` — serves uploads; path-traversal guarded
  with a real `path.resolve` containment check (a naive `startsWith` check would
  be wrong and a test for the naive version was caught and corrected).

All of the above verified live: 401, 415 ×2, 200 on upload, 200 `image/png` on
serve-back.

---

## 5. What is NOT done — carry these on

### 5a. Six sections still on the legacy shims (highest priority)

These work — they read and write the DB through `cmsContentApi.ts` shims — but
they have **no status badge, no publish bar, and no revision history**. Editors
saving in these sections cannot tell a draft from a live record.

| Section | File | Currently calls |
|---|---|---|
| About Functions | `CMSAboutFunctions.tsx` | `aboutFunctionsApi.get()` / `.save()` |
| About History | `CMSAboutHistory.tsx` | `aboutHistoryApi.get()` / `.save()` |
| About Overview | `CMSAboutOverview.tsx` | `aboutOverviewApi.get()` / `.save()` |
| Home Content | `CMSHomeContent.tsx` | `homeContentApi.get()` / `.save()` |
| Org Structure | `CMSOrgStructure.tsx` | `orgStructureApi.get()` / `.save()` |
| Site Settings | `CMSSiteSettings.tsx` | `siteSettingsApi.get()` / `.save()` |

Each is a singleton type with a pinned id. The pattern to copy is
`CMSStaff.tsx` / `CMSFaqs.tsx`: swap the shim for `cmsApi.getSingleton(...)` /
`cmsApi.saveDraft(...)`, then mount `CmsPublishBar` and `CmsStatusBadge` from
`shared/`. This is mechanical — the shims are already correct, they just lack
the workflow UI.

### 5b. `apps/web/scripts/ui-check.mjs` — broken, last thing I touched

A headless-Chrome CDP check. **It crashes.** Do not trust a green run you did not
watch.

What works: route guard ✓, login form renders ✓, form accepts input ✓, button is
clickable ✓, home and FAQ render ✓.

What breaks: clicking submit starts a **client-side navigation that tears down
the CDP execution context**, and the next `Runtime.evaluate` hangs for the full
60s timeout and kills the run.

Two fixes were attempted and **both failed**:
1. A polling `waitFor()` helper — destabilised CDP further.
2. Real mouse click + `Emulation.setDeviceMetricsOverride(1440×2000)` +
   re-entering `/cms/dashboard` via `goto` — still times out at the evaluate
   *after* the click.

**This is a test-harness bug, not an application bug.** The underlying behaviour
is verified independently:
- The login API returns **200**.
- `curl` with the session cookie to `/cms/dashboard` returns **200 with 63KB of
  HTML**.

**Suggested fix (not tried):** stop clicking entirely. Set the session cookie
directly with `Network.setCookie`, then `Page.navigate` to `/cms/dashboard`.
This sidesteps the teardown entirely and removes the fragile interaction
synthesis. If you must click, do the click as the *last* action before a fresh
`Page.navigate`, and never evaluate across the navigation boundary.

### 5c. `apps/web/uploads/` is untracked and not gitignored

Two 69-byte test PNGs from the upload verification are sitting in the working
tree. **Do not commit them.** Either add `apps/web/uploads/` to `.gitignore` or
delete the files before committing.

---

## 6. Security fixes (all verified live)

These were found during the work and are the highest-severity items in the
diff. If you revert anything, do not revert these.

1. **Privilege escalation on content writes.** Every write was gated on
   `session.user` alone. The `store` seat exists for SMP inventory management
   and must not be able to rewrite public pages — but it could. Added
   `contentProcedure` (`packages/api/src/index.ts`) restricting mutations to
   `admin` / `secretary`. Verified: `store` now gets **403**.
2. **Client-side-only route guard.** `/cms/dashboard` was protected by a
   redirect that ran in the browser. Added a server-side `beforeLoad` guard.
   Verified: anonymous request gets **307 → /cms**.
3. **Unauthenticated OpenAPI.** The oRPC schema dump exposed the full API
   surface to anyone. Now gated to authenticated content managers. Verified:
   **404** anonymous.
4. **Hardcoded credential.** `cmsAuth.js` contained a hardcoded `Admin@123` and
   a client-side password comparison. **Deleted.**
5. **Hardcoded signing key.** `apps/web/src/services.server.ts` still contains
   the literal dev fallback
   `"sp-planning-super-secret-key-32-chars-long!"`, and it is **committed**.
   Startup now throws when `NODE_ENV === "production"` and the variable is
   unset, so a production deploy can no longer silently sign cookies with a key
   from the public repo.

   **Residual risk worth closing:** the guard is keyed on `NODE_ENV`. A
   non-production deploy (a staging box, a preview environment) still boots
   with the committed key, and anyone with repo access knows it. The durable fix
   is to remove the literal from the source entirely and read the variable
   unconditionally, keeping a separate untracked `.env` for local development.
6. **`PRINCIPAL_PASSWORD` not passed through.** Now supplied in
   `apps/web/src/services.server.ts`.

---

## 7. How to run things

```bash
bun run db:start          # docker compose up -d postgres
bun run dev               # web on :7001

bun run test              # 46 unit tests -> must be 46 pass / 0 fail
bun run check-types       # backend packages

# integration smoke (18 assertions against a live server + DB)
# needs a real session cookie; without AUTH_TOKEN it only checks the public path
AUTH_TOKEN=<full signed cookie value> bun run --filter @sp-planning/api smoke

# headless UI check (currently broken — see §5b)
cd apps/web && node scripts/ui-check.mjs
```

### Environment gotchas on this machine (Windows / Git Bash)

These cost real time. Don't rediscover them:

- `tsc` is at `node_modules/.bin/tsc` — **not** in `apps/web`.
- `psql` is not installed. Use
  `docker exec sp-planning-postgres psql -U postgres -d sp_planning_secretariat`.
- `/tmp` paths get mangled in `curl -F file=@/tmp/...`. Use repo-relative paths.
- `run_terminal_command` with `process_type: "BACKGROUND"` **is not
  implemented**. Use `nohup ... &` and poll. Commands time out at ~240s.
- `write_todos` / `read_files` / `str_replace` intermittently reject arguments.
  `str_replace` needs its `replacements` array, not top-level old/new strings.
- **The login cookie is the full signed value from the `set-cookie` header**,
  not the raw token. Copy the whole thing.

### Current baseline numbers

| Check | Result |
|---|---|
| `bun test` (packages/api) | **46 pass, 0 fail** |
| Backend `tsc -b` (db, api, auth) | **clean, exit 0** |
| Smoke script (authenticated) | **18/18 pass** — recorded when last run |
| Smoke script (no `AUTH_TOKEN`) | 1 pass, auth steps skipped — expected |
| `db:migrate-content` re-run | 0 imported (idempotent) |
| `apps/web` `tsc --noEmit` | **3,226 errors — ALL pre-existing** |
| `ui-check.mjs` | **crashes — see §5b** |

The web typecheck baseline was 3,228 before the `newsBar` fix and is **3,226**
after it. The net change is minus two because typing the two new helpers removed
two implicit-`any` errors. No new errors were introduced.

### About the 3,226 web typecheck errors

These are **pre-existing and not caused by this work**. They are dominated by:

- `TS7006` / `TS7031` implicit-`any` — ~500+ across `CMSDashboard.tsx` and the
  portal components.
- `TS2322` Framer Motion `Variants` mismatch (`ease: number[]`) — ~150+.
- `TS2339 Property 'id' does not exist on type 'never'` — 84, mostly from the
  untyped `.js` shims (`resolveUploadUrl.js`, `useSitePublish.js`, `cmsApi.js`).

The web package is not type-clean and was not type-clean before this work. Do
**not** try to fix them as part of CMS work — it is a separate, large task. But
be aware this is exactly why the original CMS bugs survived: **the untyped `.js`
adapters made `tsc` blind to them.** The fix here was to type the new code, not
to clean up the old.

There is a **remaining `apps/web/src/features/cms/cmsApi.js`** (tracked, axios
`uploadImage` helper) that predates this work and is imported by
`CMSDashboard.tsx`. It is a typed blind spot of the same kind. Consider migrating
it to the new upload route and deleting it.

---

## 8. Suggested order of work

1. Add `apps/web/uploads/` to `.gitignore` (or delete the test PNGs).
2. Commit the current diff **as-is** — it is a large, coherent, tested change
   and there is value in landing it before starting §5a. Nothing here is
   committed yet.
3. Fix `ui-check.mjs` via the `Network.setCookie` approach (§5b).
4. Migrate the six shim sections (§5a).
5. Consider deleting `cmsApi.js` and converting its caller.

---

## 9. Credentials for local verification

Seeded in `.env` (git-ignored). Bootstrapped users: `admin`/`admin`,
`store`/`storeAdmin`, `secretary`/`secretary`.

To obtain a session cookie:

```bash
curl -i -X POST http://localhost:7001/api/auth/sign-in/username \
  -H 'Content-Type: application/json' \
  -d '{"username":"admin","password":"Admin@12345"}'
```

Take the **entire** value of the `set-cookie` header, not just the token.

> Do not commit anything from `.env`, and do not carry these credentials into
> any other environment.
