import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import type { DatabaseConfig } from "./config";
import * as schema from "./schema/index";

export const createDb = (env: DatabaseConfig) => {
  const pool = new pg.Pool({
    connectionString: env.DATABASE_URL,
  });
  return drizzle(pool, { schema });
};

export type Database = ReturnType<typeof createDb>;
export { schema };
