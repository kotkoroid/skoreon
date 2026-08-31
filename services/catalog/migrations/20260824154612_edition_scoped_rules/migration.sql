CREATE TABLE `edition_rules` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`edition_id` text NOT NULL,
	`points_for_win` integer NOT NULL,
	`points_for_draw` integer NOT NULL,
	`yellow_cards_for_suspension` integer,
	`split_points_carryover` text,
	CONSTRAINT `fk_edition_rules_edition_id_editions_id_fk` FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`)
);
--> statement-breakpoint
CREATE TABLE `edition_tiebreakers` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`edition_id` text NOT NULL,
	`criterion` text NOT NULL,
	`position` integer NOT NULL,
	CONSTRAINT `fk_edition_tiebreakers_edition_id_editions_id_fk` FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`)
);
--> statement-breakpoint
DROP INDEX IF EXISTS `competition_rules_competition_id_unq`;--> statement-breakpoint
DROP INDEX IF EXISTS `tiebreaker_criteria_competition_id_position_unq`;--> statement-breakpoint
CREATE UNIQUE INDEX `edition_rules_edition_id_unq` ON `edition_rules` (`edition_id`) WHERE ("edition_rules"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `edition_tiebreakers_edition_id_position_unq` ON `edition_tiebreakers` (`edition_id`,`position`) WHERE ("edition_tiebreakers"."deleted_at" is null);--> statement-breakpoint
DROP TABLE `competition_rules`;--> statement-breakpoint
DROP TABLE `tiebreaker_criteria`;