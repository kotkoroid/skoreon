import { base } from '#schema/Base';
import { LineupRole } from '#schema/Enums';
import { lineups } from '#schema/Lineups';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const lineupEntries = sqliteTable(
  'lineup_entries',
  {
    ...base(),
    lineupId: text('lineup_id')
      .notNull()
      .references(() => lineups.id),
    registrationId: text('registration_id').notNull(),
    role: text('role', { enum: LineupRole.literals }).notNull(),
  },
  (t) => [
    uniqueIndex('lineup_entries_lineup_id_registration_id_unq')
      .on(t.lineupId, t.registrationId)
      .where(isNull(t.deletedAt)),
  ],
);
