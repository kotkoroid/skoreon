import { base } from '#schema/Base';
import { ShootoutKickOutcome } from '#schema/Enums';
import { matches } from '#schema/Matches';
import { isNull, sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const shootoutKicks = sqliteTable(
  'shootout_kicks',
  {
    ...base(),
    matchId: text('match_id')
      .notNull()
      .references(() => matches.id),
    participationId: text('participation_id').notNull(),
    registrationId: text('registration_id'),
    outcome: text('outcome', { enum: ShootoutKickOutcome.literals }).notNull(),
    sequence: integer('sequence').notNull(),
  },
  (t) => [
    uniqueIndex('shootout_kicks_match_id_sequence_unq')
      .on(t.matchId, t.sequence)
      .where(isNull(t.deletedAt)),
    check('shootout_kicks_sequence_positive', sql`${t.sequence} > 0`),
  ],
);
