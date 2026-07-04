import { base } from '#schema/Base';
import { editions } from '#schema/Editions';
import { PhaseFormat, PhaseRole } from '#schema/Enums';
import { isNull, sql } from 'drizzle-orm';
import { check, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const phases = sqliteTable(
  'phases',
  {
    ...base(),
    name: text('name').notNull(),
    editionId: text('edition_id')
      .notNull()
      .references(() => editions.id),
    format: text('format', { enum: PhaseFormat.literals }).notNull(),
    role: text('role', { enum: PhaseRole.literals }).notNull(),
    startsOn: text('starts_on').notNull(),
    endsOn: text('ends_on').notNull(),
  },
  (t) => [
    uniqueIndex('phases_edition_id_name_unq').on(t.editionId, t.name).where(isNull(t.deletedAt)),
    check('phases_dates_ordered', sql`${t.endsOn} >= ${t.startsOn}`),
  ],
);
