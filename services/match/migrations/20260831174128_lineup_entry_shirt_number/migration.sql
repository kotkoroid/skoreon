ALTER TABLE `lineup_entries` ADD `shirt_number` integer NOT NULL;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_lineup_entries` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`lineup_id` text NOT NULL,
	`registration_id` text NOT NULL,
	`role` text NOT NULL,
	`shirt_number` integer NOT NULL,
	`is_starting_captain` integer DEFAULT false NOT NULL,
	CONSTRAINT `fk_lineup_entries_lineup_id_lineups_id_fk` FOREIGN KEY (`lineup_id`) REFERENCES `lineups`(`id`),
	CONSTRAINT "lineup_entries_shirt_number_positive" CHECK("shirt_number" > 0)
);
--> statement-breakpoint
INSERT INTO `__new_lineup_entries`(`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `lineup_id`, `registration_id`, `role`, `is_starting_captain`) SELECT `id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `lineup_id`, `registration_id`, `role`, `is_starting_captain` FROM `lineup_entries`;--> statement-breakpoint
DROP TABLE `lineup_entries`;--> statement-breakpoint
ALTER TABLE `__new_lineup_entries` RENAME TO `lineup_entries`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `lineup_entries_lineup_id_registration_id_unq` ON `lineup_entries` (`lineup_id`,`registration_id`) WHERE ("lineup_entries"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `lineup_entries_lineup_id_shirt_number_unq` ON `lineup_entries` (`lineup_id`,`shirt_number`) WHERE ("lineup_entries"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `lineup_entries_lineup_id_starting_captain_unq` ON `lineup_entries` (`lineup_id`) WHERE "lineup_entries"."deleted_at" is null and "lineup_entries"."is_starting_captain" = 1;