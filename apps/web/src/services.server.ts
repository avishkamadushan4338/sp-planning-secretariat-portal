import { createAuth, ensureBootstrapUsers } from "@sp-planning/auth";
import { createDb } from "@sp-planning/db";

const DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:7000/sp_planning_secretariat";
const BETTER_AUTH_URL = process.env.BETTER_AUTH_URL || "http://localhost:7001";
const BETTER_AUTH_SECRET = process.env.BETTER_AUTH_SECRET || "sp-planning-super-secret-key-32-chars-long!";

/**
 * Hardcoded auth secrets make every deployment share signing keys, so a
 * cookie minted on one instance is valid on any other. The dev fallback is
 * tolerated locally but refused in production, where a missing secret must fail
 * startup rather than silently downgrade authentication.
 */
if (process.env.NODE_ENV === "production" && !process.env.BETTER_AUTH_SECRET) {
  throw new Error(
    "BETTER_AUTH_SECRET must be set in production. Refusing to start with the development fallback."
  );
}

export const db = createDb({ DATABASE_URL });
export const auth = createAuth(
  {
    BETTER_AUTH_URL,
    BETTER_AUTH_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    STORE_PASSWORD: process.env.STORE_PASSWORD,
    PRINCIPAL_PASSWORD: process.env.PRINCIPAL_PASSWORD,
  },
  db
);

// Bootstrap user accounts on start
try {
  await ensureBootstrapUsers(db, {
    BETTER_AUTH_URL,
    BETTER_AUTH_SECRET,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    STORE_PASSWORD: process.env.STORE_PASSWORD,
    PRINCIPAL_PASSWORD: process.env.PRINCIPAL_PASSWORD,
  });
} catch (e) {
  console.error("[auth] Bootstrap warning:", e);
}
