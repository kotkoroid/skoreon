import { base } from '#schema/Base';
import { LineupRole } from '#schema/Enums';
import { lineups } from '#schema/Lineups';
import { isNull, sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const lineupEntries = sqliteTable(
  'lineup_entries',
  {
    ...base(),
    lineupId: text('lineup_id')
      .notNull()
      .references(() => lineups.id),
    registrationId: text('registration_id').notNull(),
    role: text('role', { enum: LineupRole.literals }).notNull(),
    // Shirt numbers are not stable across a season — reports show the same player
    // in different numbers from one match to the next, and a number freed by one
    // player is reused by another within the same round. The number is therefore a
    // fact about the team sheet, not about the registration.
    shirtNumber: integer('shirt_number').notNull(),
    // Captain at kickoff, as marked [K] on the team sheet. The armband may change
    // hands during a match — reports do not record that, so this is deliberately
    // the starting fact and not a claim about who wore it later.
    isStartingCaptain: integer('is_starting_captain', { mode: 'boolean' }).notNull().default(false),
  },
  (t) => [
    uniqueIndex('lineup_entries_lineup_id_registration_id_unq')
      .on(t.lineupId, t.registrationId)
      .where(isNull(t.deletedAt)),
    uniqueIndex('lineup_entries_lineup_id_shirt_number_unq')
      .on(t.lineupId, t.shirtNumber)
      .where(isNull(t.deletedAt)),
    uniqueIndex('lineup_entries_lineup_id_starting_captain_unq')
      .on(t.lineupId)
      .where(sql`${t.deletedAt} is null and ${t.isStartingCaptain} = 1`),
    check('lineup_entries_shirt_number_positive', sql`${t.shirtNumber} > 0`),
  ],
);
