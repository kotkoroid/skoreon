import { associations } from '#schema/Associations';
import { competitionRules } from '#schema/CompetitionRules';
import { competitions } from '#schema/Competitions';
import { editions } from '#schema/Editions';
import { groupAssignments } from '#schema/GroupAssignments';
import { groups } from '#schema/Groups';
import { participations } from '#schema/Participations';
import { persons } from '#schema/Persons';
import { phases } from '#schema/Phases';
import { players } from '#schema/Players';
import { registrations } from '#schema/Registrations';
import { rounds } from '#schema/Rounds';
import { teams } from '#schema/Teams';
import { tiebreakerCriteria } from '#schema/TiebreakerCriteria';
import { defineRelations } from 'drizzle-orm';

export const schema = {
  associations,
  teams,
  competitions,
  editions,
  phases,
  groups,
  rounds,
  participations,
  groupAssignments,
  persons,
  players,
  registrations,
  competitionRules,
  tiebreakerCriteria,
};

export const relations = defineRelations(schema, (r) => ({
  associations: {
    governingAssociation: r.one.associations({
      from: r.associations.governingAssociationId,
      to: r.associations.id,
      alias: 'associationHierarchy',
    }),
    governedAssociations: r.many.associations({
      alias: 'associationHierarchy',
    }),
    competitions: r.many.competitions(),
  },
  teams: {
    participations: r.many.participations(),
  },
  competitions: {
    association: r.one.associations({
      from: r.competitions.associationId,
      to: r.associations.id,
      optional: false,
    }),
    editions: r.many.editions(),
    rules: r.one.competitionRules({
      from: r.competitions.id,
      to: r.competitionRules.competitionId,
    }),
    tiebreakerCriteria: r.many.tiebreakerCriteria(),
  },
  editions: {
    competition: r.one.competitions({
      from: r.editions.competitionId,
      to: r.competitions.id,
      optional: false,
    }),
    phases: r.many.phases(),
    participations: r.many.participations(),
  },
  phases: {
    edition: r.one.editions({
      from: r.phases.editionId,
      to: r.editions.id,
      optional: false,
    }),
    groups: r.many.groups(),
    rounds: r.many.rounds(),
  },
  groups: {
    phase: r.one.phases({
      from: r.groups.phaseId,
      to: r.phases.id,
      optional: false,
    }),
    groupAssignments: r.many.groupAssignments(),
  },
  rounds: {
    phase: r.one.phases({
      from: r.rounds.phaseId,
      to: r.phases.id,
      optional: false,
    }),
  },
  participations: {
    edition: r.one.editions({
      from: r.participations.editionId,
      to: r.editions.id,
      optional: false,
    }),
    team: r.one.teams({
      from: r.participations.teamId,
      to: r.teams.id,
      optional: false,
    }),
    groupAssignments: r.many.groupAssignments(),
    registrations: r.many.registrations(),
  },
  groupAssignments: {
    participation: r.one.participations({
      from: r.groupAssignments.participationId,
      to: r.participations.id,
      optional: false,
    }),
    group: r.one.groups({
      from: r.groupAssignments.groupId,
      to: r.groups.id,
      optional: false,
    }),
  },
  persons: {
    players: r.many.players(),
  },
  players: {
    person: r.one.persons({
      from: r.players.personId,
      to: r.persons.id,
      optional: false,
    }),
    registrations: r.many.registrations(),
  },
  registrations: {
    participation: r.one.participations({
      from: r.registrations.participationId,
      to: r.participations.id,
      optional: false,
    }),
    player: r.one.players({
      from: r.registrations.playerId,
      to: r.players.id,
      optional: false,
    }),
  },
  competitionRules: {
    competition: r.one.competitions({
      from: r.competitionRules.competitionId,
      to: r.competitions.id,
      optional: false,
    }),
  },
  tiebreakerCriteria: {
    competition: r.one.competitions({
      from: r.tiebreakerCriteria.competitionId,
      to: r.competitions.id,
      optional: false,
    }),
  },
}));
