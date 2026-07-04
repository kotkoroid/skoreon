import { base } from '#schema/Base';
import { groups } from '#schema/Groups';
import { participations } from '#schema/Participations';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const groupAssignments = sqliteTable(
  'group_assignments',
  {
    ...base(),
    participationId: text('participation_id')
      .notNull()
      .references(() => participations.id),
    groupId: text('group_id')
      .notNull()
      .references(() => groups.id),
  },
  (t) => [
    uniqueIndex('group_assignments_participation_id_group_id_unq')
      .on(t.participationId, t.groupId)
      .where(isNull(t.deletedAt)),
  ],
);
