import { base } from '#schema/Base';
import { GoalKind } from '#schema/Enums';
import { matches } from '#schema/Matches';
import { sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const goals = sqliteTable(
  'goals',
  {
    ...base(),
    matchId: text('match_id')
      .notNull()
      .references(() => matches.id),
    participationId: text('participation_id').notNull(),
    registrationId: text('registration_id'),
    kind: text('kind', { enum: GoalKind.literals }).notNull(),
    minute: integer('minute').notNull(),
    stoppageMinute: integer('stoppage_minute'),
  },
  (t) => [check('goals_minute_non_negative', sql`${t.minute} >= 0`)],
);
