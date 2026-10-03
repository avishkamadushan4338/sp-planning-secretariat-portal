import type { Database } from "@sp-planning/db";
import { user, account } from "@sp-planning/db/schema/auth";
import { hashPassword } from "better-auth/crypto";
import { and, eq, or } from "drizzle-orm";
import type { AuthConfig } from "./index";

// ── Fixed seat identifiers ────────────────────────────────────────────────────
//
// Usernames are operational constants — both the admin and all seat-holders
// know them. Passwords are the per-deployment secret kept in env.
// Keeping usernames out of env removes a class of misconfiguration.

export const ADMIN_USERNAME     = "admin";
export const STORE_USERNAME     = "store";
export const SECRETARY_USERNAME = "secretary";

// Real institutional addresses. Seeded already-verified because these accounts
// are created from server-side env secrets, not self-service.
export const ADMIN_EMAIL     = "admin@splanning.gov.lk";
export const STORE_EMAIL     = "store@splanning.gov.lk";
export const SECRETARY_EMAIL = "secretary@splanning.gov.lk";

// ── Core bootstrap helper ─────────────────────────────────────────────────────

interface BootstrapAccountConfig {
  /** Fixed login username, e.g. "admin". */
  username: string;
  /** Institutional address — used if no existing account is found. */
  email: string;
  /** Initial password, read from env. Only used on first creation. */
  password: string;
  /** Display name shown in the UI. */
  name: string;
  /** Auth role, e.g. "admin", "storeAdmin", "secretary". */
  role: string;
}

/**
 * Bootstraps one named account using direct database operations —
 * bypassing Better Auth's HTTP layer.
 *
 * **Password is NEVER re-asserted once the credential row exists.**
 * A password changed through the CMS Settings panel must survive server
 * restarts. Re-deriving from env on every boot looks like a feature
 * ("env stays the source of truth") but is a security hole: a password
 * rotated after a compromise appears to have taken effect while the old
 * value still opens the account. Only a *missing* credential row is
 * repaired — that is the creation path, not a reset.
 *
 * Profile fields (role, name, email) are re-asserted on every start so
 * a seat seeded under an older scheme settles onto the current values.
 * `banned` is deliberately excluded — a seat an administrator has banned
 * must stay banned across a restart.
 *
 * Idempotent: safe to call on every server start.
 */
const ensureBootstrapAccount = async (
  database: Database,
  { username, email, password, name, role }: BootstrapAccountConfig
): Promise<void> => {
  const accountUsername = username.toLowerCase();
  const accountEmail    = email.toLowerCase();

  const [existing] = await database
    .select()
    .from(user)
    .where(or(eq(user.username, accountUsername), eq(user.email, accountEmail)))
    .limit(1);

  let userId: string;

  if (existing) {
    // Account exists — re-assert profile, leave password alone.
    userId = existing.id;
    await database
      .update(user)
      .set({ role, name, email: accountEmail })
      .where(eq(user.id, userId));

    const [existingAccount] = await database
      .select()
      .from(account)
      .where(
        and(eq(account.userId, userId), eq(account.providerId, "credential"))
      )
      .limit(1);

    // Only repair a *missing* credential row. An existing password row is
    // intentionally left untouched — see the doc comment above.
    if (!existingAccount) {
      const hash = await hashPassword(password);
      await database.insert(account).values({
        id:         crypto.randomUUID(),
        accountId:  userId,
        providerId: "credential",
        userId,
        password:   hash,
      });
      console.log(`[auth] Repaired missing credential row for ${accountUsername}`);
    } else {
      console.log(`[auth] Credential row present for ${accountUsername}; left exactly as found`);
    }

    console.log(`[auth] Ensured ${role} account (${accountUsername})`);
  } else {
    // No account found — create user + credential from scratch.
    userId = crypto.randomUUID();
    const hash = await hashPassword(password);

    await database.insert(user).values({
      id:              userId,
      name,
      email:           accountEmail,
      emailVerified:   true,
      username:        accountUsername,
      displayUsername: accountUsername,
      role,
    });

    await database.insert(account).values({
      id:         crypto.randomUUID(),
      accountId:  userId,
      providerId: "credential",
      userId,
      password:   hash,
    });

    console.log(`[auth] Ensured ${role} account (${accountUsername})`);
    console.log(`[auth] Created ${role} user row (${userId})`);
  }
};

// ── Public entrypoint ─────────────────────────────────────────────────────────

/**
 * Bootstraps the three system accounts (admin, store, secretary) from env.
 *
 * Called on every server start, so missing accounts are created and changed
 * roles/names/emails are restored. It does **not** re-assert a password that
 * already exists — see `ensureBootstrapAccount` for why.
 *
 * Default passwords (used only when no existing account is found):
 *   admin     → env.ADMIN_PASSWORD     || "Admin@12345"
 *   store     → env.STORE_PASSWORD     || "Store@123"
 *   secretary → env.PRINCIPAL_PASSWORD || "Secretary@123"
 *
 * Default emails can be overridden via env; usernames are fixed constants
 * and are never configurable.
 */
export const ensureBootstrapUsers = async (
  database: Database,
  env: AuthConfig
): Promise<void> => {
  await Promise.all([
    ensureBootstrapAccount(database, {
      username: ADMIN_USERNAME,
      email:    ADMIN_EMAIL,
      password: env.ADMIN_PASSWORD || "Admin@12345",
      name:     "System Administrator",
      role:     "admin",
    }),
    ensureBootstrapAccount(database, {
      username: STORE_USERNAME,
      email:    STORE_EMAIL,
      password: env.STORE_PASSWORD || "Store@123",
      name:     "Store Administrator",
      role:     "storeAdmin",
    }),
    ensureBootstrapAccount(database, {
      username: SECRETARY_USERNAME,
      email:    SECRETARY_EMAIL,
      password: env.PRINCIPAL_PASSWORD || "Secretary@123",
      name:     "Deputy Chief Secretary",
      role:     "secretary",
    }),
  ]);
};
