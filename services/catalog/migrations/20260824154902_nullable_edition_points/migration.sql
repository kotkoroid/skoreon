PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_edition_rules` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`edition_id` text NOT NULL,
	`points_for_win` integer,
	`points_for_draw` integer,
	`yellow_cards_for_suspension` integer,
	`split_points_carryover` text,
	CONSTRAINT `fk_edition_rules_edition_id_editions_id_fk` FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_edition_rules`(`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `edition_id`, `points_for_win`, `points_for_draw`, `yellow_cards_for_suspension`, `split_points_carryover`) SELECT `id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `edition_id`, `points_for_win`, `points_for_draw`, `yellow_cards_for_suspension`, `split_points_carryover` FROM `edition_rules`;--> statement-breakpoint
DROP TABLE `edition_rules`;--> statement-breakpoint
ALTER TABLE `__new_edition_rules` RENAME TO `edition_rules`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `edition_rules_edition_id_unq` ON `edition_rules` (`edition_id`) WHERE ("edition_rules"."deleted_at" is null);