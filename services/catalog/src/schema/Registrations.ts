import { base } from '#schema/Base';
import { participations } from '#schema/Participations';
import { players } from '#schema/Players';
import { isNull, sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const registrations = sqliteTable(
  'registrations',
  {
    ...base(),
    participationId: text('participation_id')
      .notNull()
      .references(() => participations.id),
    playerId: text('player_id')
      .notNull()
      .references(() => players.id),
    shirtNumber: integer('shirt_number').notNull(),
  },
  (t) => [
    uniqueIndex('registrations_participation_id_player_id_unq')
      .on(t.participationId, t.playerId)
      .where(isNull(t.deletedAt)),
    uniqueIndex('registrations_participation_id_shirt_number_unq')
      .on(t.participationId, t.shirtNumber)
      .where(isNull(t.deletedAt)),
    check('registrations_shirt_number_positive', sql`${t.shirtNumber} > 0`),
  ],
);
