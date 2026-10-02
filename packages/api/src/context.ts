import type { Auth } from "@sp-planning/auth";
import type { Database } from "@sp-planning/db";

export interface Context {
  db: Database;
  session?: {
    user?: {
      id: string;
      name: string;
      email: string;
      role?: string;
    };
  } | null;
  auth?: Auth;
  headers?: Headers;
}
