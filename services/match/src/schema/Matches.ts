import { base } from '#schema/Base';
import { MatchStatus } from '#schema/Enums';
import { sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const matches = sqliteTable(
  'matches',
  {
    ...base(),
    editionId: text('edition_id').notNull(),
    roundId: text('round_id').notNull(),
    groupId: text('group_id'),
    homeParticipationId: text('home_participation_id').notNull(),
    awayParticipationId: text('away_participation_id').notNull(),
    status: text('status', { enum: MatchStatus.literals }).notNull(),
    kickoffAt: integer('kickoff_at', { mode: 'timestamp_ms' }).notNull(),
    timezone: text('timezone').notNull(),
    homeScore: integer('home_score'),
    awayScore: integer('away_score'),
  },
  (t) => [
    check(
      'matches_participations_distinct',
      sql`${t.homeParticipationId} <> ${t.awayParticipationId}`,
    ),
    check(
      'matches_scores_non_negative',
      sql`(${t.homeScore} is null or ${t.homeScore} >= 0) and (${t.awayScore} is null or ${t.awayScore} >= 0)`,
    ),
  ],
);
