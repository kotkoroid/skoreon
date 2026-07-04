import { base } from '#schema/Base';
import { PlayerPosition } from '#schema/Enums';
import { persons } from '#schema/Persons';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const players = sqliteTable(
  'players',
  {
    ...base(),
    personId: text('person_id')
      .notNull()
      .references(() => persons.id),
    primaryPosition: text('primary_position', { enum: PlayerPosition.literals }).notNull(),
  },
  (t) => [uniqueIndex('players_person_id_unq').on(t.personId).where(isNull(t.deletedAt))],
);
