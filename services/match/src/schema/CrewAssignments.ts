import { base } from '#schema/Base';
import { OfficialRole } from '#schema/Enums';
import { matches } from '#schema/Matches';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const crewAssignments = sqliteTable(
  'crew_assignments',
  {
    ...base(),
    matchId: text('match_id')
      .notNull()
      .references(() => matches.id),
    personId: text('person_id').notNull(),
    role: text('role', { enum: OfficialRole.literals }).notNull(),
  },
  (t) => [
    uniqueIndex('crew_assignments_match_id_person_id_unq')
      .on(t.matchId, t.personId)
      .where(isNull(t.deletedAt)),
  ],
);
