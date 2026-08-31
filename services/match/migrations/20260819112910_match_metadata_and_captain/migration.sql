ALTER TABLE `lineup_entries` ADD `is_captain` integer DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `matches` ADD `number` text;--> statement-breakpoint
ALTER TABLE `matches` ADD `venue` text;--> statement-breakpoint
ALTER TABLE `matches` ADD `home_half_time_score` integer;--> statement-breakpoint
ALTER TABLE `matches` ADD `away_half_time_score` integer;--> statement-breakpoint
ALTER TABLE `matches` ADD `attendance` integer;--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_matches` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`edition_id` text NOT NULL,
	`round_id` text NOT NULL,
	`group_id` text,
	`home_participation_id` text NOT NULL,
	`away_participation_id` text NOT NULL,
	`status` text NOT NULL,
	`number` text,
	`kickoff_at` integer NOT NULL,
	`timezone` text NOT NULL,
	`venue` text,
	`home_score` integer,
	`away_score` integer,
	`home_half_time_score` integer,
	`away_half_time_score` integer,
	`attendance` integer,
	CONSTRAINT "matches_participations_distinct" CHECK("home_participation_id" <> "away_participation_id"),
	CONSTRAINT "matches_scores_non_negative" CHECK(("home_score" is null or "home_score" >= 0) and ("away_score" is null or "away_score" >= 0)),
	CONSTRAINT "matches_half_time_scores_non_negative" CHECK(("home_half_time_score" is null or "home_half_time_score" >= 0) and ("away_half_time_score" is null or "away_half_time_score" >= 0)),
	CONSTRAINT "matches_half_time_scores_within_full_time" CHECK(("home_half_time_score" is null or "home_score" is null or "home_half_time_score" <= "home_score") and ("away_half_time_score" is null or "away_score" is null or "away_half_time_score" <= "away_score")),
	CONSTRAINT "matches_attendance_non_negative" CHECK("attendance" is null or "attendance" >= 0)
);
--> statement-breakpoint
INSERT INTO `__new_matches`(`id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `edition_id`, `round_id`, `group_id`, `home_participation_id`, `away_participation_id`, `status`, `kickoff_at`, `timezone`, `home_score`, `away_score`) SELECT `id`, `created_at`, `created_by`, `updated_at`, `updated_by`, `deleted_at`, `deleted_by`, `edition_id`, `round_id`, `group_id`, `home_participation_id`, `away_participation_id`, `status`, `kickoff_at`, `timezone`, `home_score`, `away_score` FROM `matches`;--> statement-breakpoint
DROP TABLE `matches`;--> statement-breakpoint
ALTER TABLE `__new_matches` RENAME TO `matches`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `matches_number_unq` ON `matches` (`number`) WHERE ("matches"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `lineup_entries_lineup_id_captain_unq` ON `lineup_entries` (`lineup_id`) WHERE "lineup_entries"."deleted_at" is null and "lineup_entries"."is_captain" = 1;