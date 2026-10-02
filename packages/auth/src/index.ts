import type { Database } from "@sp-planning/db";
import * as schema from "@sp-planning/db/schema/auth";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

export interface AuthConfig {
  BETTER_AUTH_URL: string;
  BETTER_AUTH_SECRET: string;
  /** Initial password for the admin seat. Only used on first creation. */
  ADMIN_PASSWORD?: string;
  /** Initial password for the store seat. Only used on first creation. */
  STORE_PASSWORD?: string;
  /** Initial password for the secretary seat. Only used on first creation. */
  PRINCIPAL_PASSWORD?: string;
}

export const createAuth = (env: AuthConfig, database: Database) =>
  betterAuth({
    database: drizzleAdapter(database, {
      provider: "pg",
      schema,
    }),
    trustedOrigins: [env.BETTER_AUTH_URL],
    secret: env.BETTER_AUTH_SECRET || "sp-planning-super-secret-key-32-chars-long!",
    baseURL: env.BETTER_AUTH_URL,
    emailAndPassword: { enabled: true },
    user: {
      additionalFields: {
        role: {
          type: "string",
          required: false,
          defaultValue: "user",
          input: false,
        },
      },
    },
    plugins: [
      username(),
      tanstackStartCookies(),
    ],
  });

export type Auth = ReturnType<typeof createAuth>;
export { ensureBootstrapUsers } from "./admin";
