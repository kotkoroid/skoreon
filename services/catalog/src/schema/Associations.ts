import { base } from '#schema/Base';
import { AssociationCode, AssociationKind } from '#schema/Enums';
import { isNull } from 'drizzle-orm';
import { type AnySQLiteColumn, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const associations = sqliteTable(
  'associations',
  {
    ...base(),
    name: text('name').notNull(),
    code: text('code', { enum: AssociationCode.literals }).notNull(),
    kind: text('kind', { enum: AssociationKind.literals }).notNull(),
    governingAssociationId: text('governing_association_id').references(
      (): AnySQLiteColumn => associations.id,
    ),
  },
  (t) => [uniqueIndex('associations_code_unq').on(t.code).where(isNull(t.deletedAt))],
);
