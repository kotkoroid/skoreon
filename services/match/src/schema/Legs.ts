import { base } from '#schema/Base';
import { matches } from '#schema/Matches';
import { ties } from '#schema/Ties';
import { isNull, sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const legs = sqliteTable(
  'legs',
  {
    ...base(),
    tieId: text('tie_id')
      .notNull()
      .references(() => ties.id),
    matchId: text('match_id')
      .notNull()
      .references(() => matches.id),
    legNumber: integer('leg_number').notNull(),
  },
  (t) => [
    uniqueIndex('legs_tie_id_leg_number_unq').on(t.tieId, t.legNumber).where(isNull(t.deletedAt)),
    check('legs_leg_number_positive', sql`${t.legNumber} > 0`),
  ],
);
