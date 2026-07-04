import { base } from '#schema/Base';
import { AbsenceReason } from '#schema/Enums';
import { matches } from '#schema/Matches';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const absences = sqliteTable(
  'absences',
  {
    ...base(),
    matchId: text('match_id')
      .notNull()
      .references(() => matches.id),
    registrationId: text('registration_id').notNull(),
    reason: text('reason', { enum: AbsenceReason.literals }).notNull(),
  },
  (t) => [
    uniqueIndex('absences_match_id_registration_id_unq')
      .on(t.matchId, t.registrationId)
      .where(isNull(t.deletedAt)),
  ],
);
