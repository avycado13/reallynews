import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import type { Schema } from "./schema";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle<typeof Schema>({ client: pool });
export default db;
