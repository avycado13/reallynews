import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { articlesTable, reportersTable } from './db/schema';
import z from 'zod';

export const ReporterSelectSchema = createSelectSchema(reportersTable);
export const ReporterInsertSchema = createInsertSchema(reportersTable);
export type ReporterSelect = z.infer<typeof ReporterSelectSchema>;
export type ReporterInsert = z.infer<typeof ReporterInsertSchema>;

export const ArticleSelectSchema = createSelectSchema(articlesTable);
export const ArticleInsertSchema = createInsertSchema(articlesTable);
export type ArticleSelect = z.infer<typeof ArticleSelectSchema>;
export type ArticleInsert = z.infer<typeof ArticleInsertSchema>;