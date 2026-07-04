import { base } from '#schema/Base';
import { competitions } from '#schema/Competitions';
import { isNull, sql } from 'drizzle-orm';
import { check, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const editions = sqliteTable(
  'editions',
  {
    ...base(),
    competitionId: text('competition_id')
      .notNull()
      .references(() => competitions.id),
    startsOn: text('starts_on').notNull(),
    endsOn: text('ends_on').notNull(),
  },
  (t) => [
    uniqueIndex('editions_competition_id_starts_on_unq')
      .on(t.competitionId, t.startsOn)
      .where(isNull(t.deletedAt)),
    check('editions_dates_ordered', sql`${t.endsOn} >= ${t.startsOn}`),
  ],
);
