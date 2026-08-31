import { base } from '#schema/Base';
import { editions } from '#schema/Editions';
import { SplitPointsCarryover } from '#schema/Enums';
import { isNull } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const editionRules = sqliteTable(
  'edition_rules',
  {
    ...base(),
    editionId: text('edition_id')
      .notNull()
      .references(() => editions.id),
    // Null for formats that do not accumulate points, such as a knockout cup.
    pointsForWin: integer('points_for_win'),
    pointsForDraw: integer('points_for_draw'),
    yellowCardsForSuspension: integer('yellow_cards_for_suspension'),
    splitPointsCarryover: text('split_points_carryover', { enum: SplitPointsCarryover.literals }),
  },
  (t) => [uniqueIndex('edition_rules_edition_id_unq').on(t.editionId).where(isNull(t.deletedAt))],
);
