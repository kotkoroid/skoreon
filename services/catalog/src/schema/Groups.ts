import { base } from '#schema/Base';
import { phases } from '#schema/Phases';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const groups = sqliteTable(
  'groups',
  {
    ...base(),
    name: text('name').notNull(),
    phaseId: text('phase_id')
      .notNull()
      .references(() => phases.id),
  },
  (t) => [uniqueIndex('groups_phase_id_name_unq').on(t.phaseId, t.name).where(isNull(t.deletedAt))],
);
