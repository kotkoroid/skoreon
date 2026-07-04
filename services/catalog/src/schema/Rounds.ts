import { base } from '#schema/Base';
import { phases } from '#schema/Phases';
import { isNull, sql } from 'drizzle-orm';
import { check, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const rounds = sqliteTable(
  'rounds',
  {
    ...base(),
    name: text('name').notNull(),
    position: integer('position').notNull(),
    phaseId: text('phase_id')
      .notNull()
      .references(() => phases.id),
  },
  (t) => [
    uniqueIndex('rounds_phase_id_position_unq')
      .on(t.phaseId, t.position)
      .where(isNull(t.deletedAt)),
    check('rounds_position_positive', sql`${t.position} > 0`),
  ],
);
