CREATE TABLE `absences` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`registration_id` text NOT NULL,
	`reason` text NOT NULL,
	CONSTRAINT `fk_absences_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`)
);
--> statement-breakpoint
CREATE TABLE `broadcasts` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`medium` text NOT NULL,
	`url` text,
	CONSTRAINT `fk_broadcasts_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`)
);
--> statement-breakpoint
CREATE TABLE `call_ups` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`participation_id` text NOT NULL,
	`player_id` text NOT NULL,
	`status` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `cards` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`participation_id` text NOT NULL,
	`registration_id` text NOT NULL,
	`kind` text NOT NULL,
	`minute` integer NOT NULL,
	`stoppage_minute` integer,
	CONSTRAINT `fk_cards_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`),
	CONSTRAINT "cards_minute_non_negative" CHECK("minute" >= 0)
);
--> statement-breakpoint
CREATE TABLE `crew_assignments` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`person_id` text NOT NULL,
	`role` text NOT NULL,
	CONSTRAINT `fk_crew_assignments_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`)
);
--> statement-breakpoint
CREATE TABLE `goals` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`participation_id` text NOT NULL,
	`registration_id` text,
	`kind` text NOT NULL,
	`minute` integer NOT NULL,
	`stoppage_minute` integer,
	CONSTRAINT `fk_goals_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`),
	CONSTRAINT "goals_minute_non_negative" CHECK("minute" >= 0)
);
--> statement-breakpoint
CREATE TABLE `legs` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`tie_id` text NOT NULL,
	`match_id` text NOT NULL,
	`leg_number` integer NOT NULL,
	CONSTRAINT `fk_legs_tie_id_ties_id_fk` FOREIGN KEY (`tie_id`) REFERENCES `ties`(`id`),
	CONSTRAINT `fk_legs_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`),
	CONSTRAINT "legs_leg_number_positive" CHECK("leg_number" > 0)
);
--> statement-breakpoint
CREATE TABLE `lineup_entries` (
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
	CONSTRAINT `fk_lineup_entries_lineup_id_lineups_id_fk` FOREIGN KEY (`lineup_id`) REFERENCES `lineups`(`id`)
);
--> statement-breakpoint
CREATE TABLE `lineups` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`participation_id` text NOT NULL,
	CONSTRAINT `fk_lineups_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
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
	`kickoff_at` integer NOT NULL,
	`timezone` text NOT NULL,
	`home_score` integer,
	`away_score` integer,
	CONSTRAINT "matches_participations_distinct" CHECK("home_participation_id" <> "away_participation_id"),
	CONSTRAINT "matches_scores_non_negative" CHECK(("home_score" is null or "home_score" >= 0) and ("away_score" is null or "away_score" >= 0))
);
--> statement-breakpoint
CREATE TABLE `shootout_kicks` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`participation_id` text NOT NULL,
	`registration_id` text,
	`outcome` text NOT NULL,
	`sequence` integer NOT NULL,
	CONSTRAINT `fk_shootout_kicks_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`),
	CONSTRAINT "shootout_kicks_sequence_positive" CHECK("sequence" > 0)
);
--> statement-breakpoint
CREATE TABLE `substitutions` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`match_id` text NOT NULL,
	`participation_id` text NOT NULL,
	`outgoing_registration_id` text NOT NULL,
	`incoming_registration_id` text NOT NULL,
	`minute` integer NOT NULL,
	`stoppage_minute` integer,
	CONSTRAINT `fk_substitutions_match_id_matches_id_fk` FOREIGN KEY (`match_id`) REFERENCES `matches`(`id`),
	CONSTRAINT "substitutions_registrations_distinct" CHECK("outgoing_registration_id" <> "incoming_registration_id"),
	CONSTRAINT "substitutions_minute_non_negative" CHECK("minute" >= 0)
);
--> statement-breakpoint
CREATE TABLE `ties` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`round_id` text NOT NULL,
	`home_participation_id` text NOT NULL,
	`away_participation_id` text NOT NULL,
	`winner_participation_id` text,
	CONSTRAINT "ties_participations_distinct" CHECK("home_participation_id" <> "away_participation_id")
);
--> statement-breakpoint
CREATE UNIQUE INDEX `absences_match_id_registration_id_unq` ON `absences` (`match_id`,`registration_id`) WHERE ("absences"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `call_ups_participation_id_player_id_unq` ON `call_ups` (`participation_id`,`player_id`) WHERE ("call_ups"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `crew_assignments_match_id_person_id_unq` ON `crew_assignments` (`match_id`,`person_id`) WHERE ("crew_assignments"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `legs_tie_id_leg_number_unq` ON `legs` (`tie_id`,`leg_number`) WHERE ("legs"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `lineup_entries_lineup_id_registration_id_unq` ON `lineup_entries` (`lineup_id`,`registration_id`) WHERE ("lineup_entries"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `lineups_match_id_participation_id_unq` ON `lineups` (`match_id`,`participation_id`) WHERE ("lineups"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `shootout_kicks_match_id_sequence_unq` ON `shootout_kicks` (`match_id`,`sequence`) WHERE ("shootout_kicks"."deleted_at" is null);