import { base } from '#schema/Base';
import { sql } from 'drizzle-orm';
import { check, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const ties = sqliteTable(
  'ties',
  {
    ...base(),
    roundId: text('round_id').notNull(),
    homeParticipationId: text('home_participation_id').notNull(),
    awayParticipationId: text('away_participation_id').notNull(),
    winnerParticipationId: text('winner_participation_id'),
  },
  (t) => [
    check(
      'ties_participations_distinct',
      sql`${t.homeParticipationId} <> ${t.awayParticipationId}`,
    ),
  ],
);
