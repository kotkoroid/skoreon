import { base } from '#schema/Base';
import { matches } from '#schema/Matches';
import { sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const substitutions = sqliteTable(
  'substitutions',
  {
    ...base(),
    matchId: text('match_id')
      .notNull()
      .references(() => matches.id),
    participationId: text('participation_id').notNull(),
    outgoingRegistrationId: text('outgoing_registration_id').notNull(),
    incomingRegistrationId: text('incoming_registration_id').notNull(),
    minute: integer('minute').notNull(),
    stoppageMinute: integer('stoppage_minute'),
  },
  (t) => [
    check(
      'substitutions_registrations_distinct',
      sql`${t.outgoingRegistrationId} <> ${t.incomingRegistrationId}`,
    ),
    check('substitutions_minute_non_negative', sql`${t.minute} >= 0`),
  ],
);
