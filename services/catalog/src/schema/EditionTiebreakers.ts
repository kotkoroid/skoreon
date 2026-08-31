import { base } from '#schema/Base';
import { editions } from '#schema/Editions';
import { TiebreakerCriterion } from '#schema/Enums';
import { isNull } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const editionTiebreakers = sqliteTable(
  'edition_tiebreakers',
  {
    ...base(),
    editionId: text('edition_id')
      .notNull()
      .references(() => editions.id),
    criterion: text('criterion', { enum: TiebreakerCriterion.literals }).notNull(),
    position: integer('position').notNull(),
  },
  (t) => [
    uniqueIndex('edition_tiebreakers_edition_id_position_unq')
      .on(t.editionId, t.position)
      .where(isNull(t.deletedAt)),
  ],
);
