import { base } from '#schema/Base';
import { BroadcastMedium } from '#schema/Enums';
import { matches } from '#schema/Matches';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const broadcasts = sqliteTable('broadcasts', {
  ...base(),
  matchId: text('match_id')
    .notNull()
    .references(() => matches.id),
  medium: text('medium', { enum: BroadcastMedium.literals }).notNull(),
  url: text('url'),
});
