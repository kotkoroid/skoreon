import { base } from '#schema/Base';
import { FifaCountry, TeamKind } from '#schema/Enums';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const teams = sqliteTable('teams', {
  ...base(),
  name: text('name').notNull(),
  kind: text('kind', { enum: TeamKind.literals }).notNull(),
  country: text('country', { enum: FifaCountry.literals }).notNull(),
  establishedOn: text('established_on').notNull(),
});
