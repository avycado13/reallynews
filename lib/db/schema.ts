import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const reportersTable = pgTable("reporters", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  specialty: text().notNull(),
  yearsOfExperience: integer().notNull(),
  keyTrait: text().notNull(),
  notableAchievement: text().notNull(),
  styleDescription: text().notNull(),
  biography: text().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const articlesTable = pgTable("articles", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reporterId: integer()
    .notNull()
    .references(() => reportersTable.id, { onDelete: "cascade" }),
  title: text().notNull(),
  content: text().notNull(),
  imageUrl: text(),
  excerpt: text(),
  createdAt: timestamp().notNull().defaultNow(),
});

export const Schema = {
  reportersTable,
  articlesTable,
};
