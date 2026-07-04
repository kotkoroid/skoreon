import { base } from '#schema/Base';
import { FifaCountry, Sex } from '#schema/Enums';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const persons = sqliteTable('persons', {
  ...base(),
  givenName: text('given_name').notNull(),
  familyName: text('family_name').notNull(),
  sex: text('sex', { enum: Sex.literals }).notNull(),
  nationality: text('nationality', { enum: FifaCountry.literals }).notNull(),
  dateOfBirth: text('date_of_birth').notNull(),
});
