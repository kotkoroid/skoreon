CREATE TABLE `associations` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`kind` text NOT NULL,
	`governing_association_id` text,
	CONSTRAINT `fk_associations_governing_association_id_associations_id_fk` FOREIGN KEY (`governing_association_id`) REFERENCES `associations`(`id`)
);
--> statement-breakpoint
CREATE TABLE `competition_rules` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`competition_id` text NOT NULL,
	`points_for_win` integer NOT NULL,
	`points_for_draw` integer NOT NULL,
	`yellow_cards_for_suspension` integer,
	`split_points_carryover` text,
	CONSTRAINT `fk_competition_rules_competition_id_competitions_id_fk` FOREIGN KEY (`competition_id`) REFERENCES `competitions`(`id`)
);
--> statement-breakpoint
CREATE TABLE `competitions` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`name` text NOT NULL,
	`code` text NOT NULL,
	`team_kind` text NOT NULL,
	`association_id` text NOT NULL,
	CONSTRAINT `fk_competitions_association_id_associations_id_fk` FOREIGN KEY (`association_id`) REFERENCES `associations`(`id`)
);
--> statement-breakpoint
CREATE TABLE `editions` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`competition_id` text NOT NULL,
	`starts_on` text NOT NULL,
	`ends_on` text NOT NULL,
	CONSTRAINT `fk_editions_competition_id_competitions_id_fk` FOREIGN KEY (`competition_id`) REFERENCES `competitions`(`id`),
	CONSTRAINT "editions_dates_ordered" CHECK("ends_on" >= "starts_on")
);
--> statement-breakpoint
CREATE TABLE `group_assignments` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`participation_id` text NOT NULL,
	`group_id` text NOT NULL,
	CONSTRAINT `fk_group_assignments_participation_id_participations_id_fk` FOREIGN KEY (`participation_id`) REFERENCES `participations`(`id`),
	CONSTRAINT `fk_group_assignments_group_id_groups_id_fk` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`)
);
--> statement-breakpoint
CREATE TABLE `groups` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`name` text NOT NULL,
	`phase_id` text NOT NULL,
	CONSTRAINT `fk_groups_phase_id_phases_id_fk` FOREIGN KEY (`phase_id`) REFERENCES `phases`(`id`)
);
--> statement-breakpoint
CREATE TABLE `participations` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`edition_id` text NOT NULL,
	`team_id` text NOT NULL,
	CONSTRAINT `fk_participations_edition_id_editions_id_fk` FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`),
	CONSTRAINT `fk_participations_team_id_teams_id_fk` FOREIGN KEY (`team_id`) REFERENCES `teams`(`id`)
);
--> statement-breakpoint
CREATE TABLE `persons` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`given_name` text NOT NULL,
	`family_name` text NOT NULL,
	`sex` text NOT NULL,
	`nationality` text NOT NULL,
	`date_of_birth` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `phases` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`name` text NOT NULL,
	`edition_id` text NOT NULL,
	`format` text NOT NULL,
	`role` text NOT NULL,
	`starts_on` text NOT NULL,
	`ends_on` text NOT NULL,
	CONSTRAINT `fk_phases_edition_id_editions_id_fk` FOREIGN KEY (`edition_id`) REFERENCES `editions`(`id`),
	CONSTRAINT "phases_dates_ordered" CHECK("ends_on" >= "starts_on")
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`person_id` text NOT NULL,
	`primary_position` text NOT NULL,
	CONSTRAINT `fk_players_person_id_persons_id_fk` FOREIGN KEY (`person_id`) REFERENCES `persons`(`id`)
);
--> statement-breakpoint
CREATE TABLE `registrations` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`participation_id` text NOT NULL,
	`player_id` text NOT NULL,
	`shirt_number` integer NOT NULL,
	CONSTRAINT `fk_registrations_participation_id_participations_id_fk` FOREIGN KEY (`participation_id`) REFERENCES `participations`(`id`),
	CONSTRAINT `fk_registrations_player_id_players_id_fk` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`),
	CONSTRAINT "registrations_shirt_number_positive" CHECK("shirt_number" > 0)
);
--> statement-breakpoint
CREATE TABLE `rounds` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`name` text NOT NULL,
	`position` integer NOT NULL,
	`phase_id` text NOT NULL,
	CONSTRAINT `fk_rounds_phase_id_phases_id_fk` FOREIGN KEY (`phase_id`) REFERENCES `phases`(`id`),
	CONSTRAINT "rounds_position_positive" CHECK("position" > 0)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`name` text NOT NULL,
	`kind` text NOT NULL,
	`country` text NOT NULL,
	`established_on` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `tiebreaker_criteria` (
	`id` text PRIMARY KEY,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL,
	`updated_at` integer NOT NULL,
	`updated_by` text NOT NULL,
	`deleted_at` integer,
	`deleted_by` text,
	`competition_id` text NOT NULL,
	`criterion` text NOT NULL,
	`position` integer NOT NULL,
	CONSTRAINT `fk_tiebreaker_criteria_competition_id_competitions_id_fk` FOREIGN KEY (`competition_id`) REFERENCES `competitions`(`id`)
);
--> statement-breakpoint
CREATE UNIQUE INDEX `associations_code_unq` ON `associations` (`code`) WHERE ("associations"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `competition_rules_competition_id_unq` ON `competition_rules` (`competition_id`) WHERE ("competition_rules"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `competitions_association_id_code_unq` ON `competitions` (`association_id`,`code`) WHERE ("competitions"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `editions_competition_id_starts_on_unq` ON `editions` (`competition_id`,`starts_on`) WHERE ("editions"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `group_assignments_participation_id_group_id_unq` ON `group_assignments` (`participation_id`,`group_id`) WHERE ("group_assignments"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `groups_phase_id_name_unq` ON `groups` (`phase_id`,`name`) WHERE ("groups"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `participations_edition_id_team_id_unq` ON `participations` (`edition_id`,`team_id`) WHERE ("participations"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `phases_edition_id_name_unq` ON `phases` (`edition_id`,`name`) WHERE ("phases"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `players_person_id_unq` ON `players` (`person_id`) WHERE ("players"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_participation_id_player_id_unq` ON `registrations` (`participation_id`,`player_id`) WHERE ("registrations"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `registrations_participation_id_shirt_number_unq` ON `registrations` (`participation_id`,`shirt_number`) WHERE ("registrations"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `rounds_phase_id_position_unq` ON `rounds` (`phase_id`,`position`) WHERE ("rounds"."deleted_at" is null);--> statement-breakpoint
CREATE UNIQUE INDEX `tiebreaker_criteria_competition_id_position_unq` ON `tiebreaker_criteria` (`competition_id`,`position`) WHERE ("tiebreaker_criteria"."deleted_at" is null);