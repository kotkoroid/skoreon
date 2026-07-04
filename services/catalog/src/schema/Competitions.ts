import { associations } from '#schema/Associations';
import { base } from '#schema/Base';
import { TeamKind } from '#schema/Enums';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const competitions = sqliteTable(
  'competitions',
  {
    ...base(),
    name: text('name').notNull(),
    code: text('code').notNull(),
    teamKind: text('team_kind', { enum: TeamKind.literals }).notNull(),
    associationId: text('association_id')
      .notNull()
      .references(() => associations.id),
  },
  (t) => [
    uniqueIndex('competitions_association_id_code_unq')
      .on(t.associationId, t.code)
      .where(isNull(t.deletedAt)),
  ],
);
