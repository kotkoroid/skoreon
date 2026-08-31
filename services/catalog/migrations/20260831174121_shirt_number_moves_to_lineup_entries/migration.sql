PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_registrations` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`participation_id` text NOT NULL,
	`player_id` text NOT NULL,
	CONSTRAINT `fk_registrations_participation_id_participations_id_fk` FOREIGN KEY (`participation_id`) REFERENCES `participations`(`id`),
	CONSTRAINT `fk_registrations_player_id_players_id_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`)
);
--> statement-breakpoint
INSERT INTO `__new_registrations`(`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `participation_id`, `player_id`) SELECT `id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `participation_id`, `player_id` FROM `registrations`;--> statement-breakpoint
DROP TABLE `registrations`;--> statement-breakpoint
ALTER TABLE `__new_registrations` RENAME TO `registrations`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
DROP INDEX IF EXISTS `registrations_participation_id_shirt_number_unq`;--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_participation_id_player_id_unq` ON `registrations` (`participation_id`,`player_id`) WHERE ("registrations"."deleted_at" is null);