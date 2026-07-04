import { base } from '#schema/Base';
import { competitions } from '#schema/Competitions';
import { TiebreakerCriterion } from '#schema/Enums';
import { isNull } from 'drizzle-orm';
import { integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const tiebreakerCriteria = sqliteTable(
  'tiebreaker_criteria',
  {
    ...base(),
    competitionId: text('competition_id')
      .notNull()
      .references(() => competitions.id),
    criterion: text('criterion', { enum: TiebreakerCriterion.literals }).notNull(),
    position: integer('position').notNull(),
  },
  (t) => [
    uniqueIndex('tiebreaker_criteria_competition_id_position_unq')
      .on(t.competitionId, t.position)
      .where(isNull(t.deletedAt)),
  ],
);
