import { base } from '#schema/Base';
import { participations } from '#schema/Participations';
import { players } from '#schema/Players';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

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
  },
  (t) => [
    uniqueIndex('registrations_participation_id_player_id_unq')
      .on(t.participationId, t.playerId)
      .where(isNull(t.deletedAt)),
  ],
);
