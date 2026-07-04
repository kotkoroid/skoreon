import { integer, text } from 'drizzle-orm/sqlite-core';

// TODO: This should be moved into `@falkara/experience-sdk/backend` package
export const base = () => ({
  id: text('id').primaryKey(),
  createdAt: integer('created_at', { mode: 'timestamp_ms' }).notNull(),
  createdBy: text('created_by').notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp_ms' }).notNull(),
  updatedBy: text('updated_by').notNull(),
  deletedAt: integer('deleted_at', { mode: 'timestamp_ms' }),
  deletedBy: text('deleted_by'),
});
