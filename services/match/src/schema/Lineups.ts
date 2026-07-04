import { base } from '#schema/Base';
import { matches } from '#schema/Matches';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const lineups = sqliteTable(
  'lineups',
  {
    ...base(),
    matchId: text('match_id')
      .notNull()
      .references(() => matches.id),
    participationId: text('participation_id').notNull(),
  },
  (t) => [
    uniqueIndex('lineups_match_id_participation_id_unq')
      .on(t.matchId, t.participationId)
      .where(isNull(t.deletedAt)),
  ],
);
