ALTER TABLE `lineup_entries` RENAME COLUMN `is_captain` TO `is_starting_captain`;--> statement-breakpoint
DROP INDEX IF EXISTS `lineup_entries_lineup_id_captain_unq`;--> statement-breakpoint
CREATE UNIQUE INDEX `lineup_entries_lineup_id_starting_captain_unq` ON `lineup_entries` (`lineup_id`) WHERE "lineup_entries"."deleted_at" is null and "lineup_entries"."is_starting_captain" = 1;