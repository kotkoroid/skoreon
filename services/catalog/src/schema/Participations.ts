import { base } from '#schema/Base';
import { editions } from '#schema/Editions';
import { teams } from '#schema/Teams';
import { isNull } from 'drizzle-orm';
import { sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';

export const participations = sqliteTable(
  'participations',
  {
    ...base(),
    editionId: text('edition_id')
      .notNull()
      .references(() => editions.id),
    teamId: text('team_id')
      .notNull()
      .references(() => teams.id),
  },
  (t) => [
    uniqueIndex('participations_edition_id_team_id_unq')
      .on(t.editionId, t.teamId)
      .where(isNull(t.deletedAt)),
  ],
);
