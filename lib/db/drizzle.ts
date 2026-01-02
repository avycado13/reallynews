import { drizzle } from "drizzle-orm/node-postgres";
import { Schema } from "./schema";
import dotenv from 'dotenv';
dotenv.config({path: '.env.local'});

const db = drizzle<typeof Schema>(process.env.DATABASE_URL!);
export default db;
