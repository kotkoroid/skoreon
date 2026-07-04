import { base } from '#schema/Base';
import { CallUpStatus } from '#schema/Enums';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const callUps = sqliteTable(
  'call_ups',
  {
    ...base(),
    participationId: text('participation_id').notNull(),
    playerId: text('player_id').notNull(),
    status: text('status', { enum: CallUpStatus.literals }).notNull(),
  },
  (t) => [
    uniqueIndex('call_ups_participation_id_player_id_unq')
      .on(t.participationId, t.playerId)
      .where(isNull(t.deletedAt)),
  ],
);
