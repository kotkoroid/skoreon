import { base } from '#schema/Base';
import { competitions } from '#schema/Competitions';
import { SplitPointsCarryover } from '#schema/Enums';
import { isNull } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const competitionRules = sqliteTable(
  'competition_rules',
  {
    ...base(),
    competitionId: text('competition_id')
      .notNull()
      .references(() => competitions.id),
    pointsForWin: integer('points_for_win').notNull(),
    pointsForDraw: integer('points_for_draw').notNull(),
    yellowCardsForSuspension: integer('yellow_cards_for_suspension'),
    splitPointsCarryover: text('split_points_carryover', { enum: SplitPointsCarryover.literals }),
  },
  (t) => [
    uniqueIndex('competition_rules_competition_id_unq')
      .on(t.competitionId)
      .where(isNull(t.deletedAt)),
  ],
);
