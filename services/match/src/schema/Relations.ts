import { absences } from '#schema/Absences';
import { broadcasts } from '#schema/Broadcasts';
import { callUps } from '#schema/CallUps';
import { cards } from '#schema/Cards';
import { crewAssignments } from '#schema/CrewAssignments';
import { goals } from '#schema/Goals';
import { legs } from '#schema/Legs';
import { lineupEntries } from '#schema/LineupEntries';
import { lineups } from '#schema/Lineups';
import { matches } from '#schema/Matches';
import { shootoutKicks } from '#schema/ShootoutKicks';
import { substitutions } from '#schema/Substitutions';
import { ties } from '#schema/Ties';
import { defineRelations } from 'drizzle-orm';

export const schema = {
  matches,
  ties,
  legs,
  shootoutKicks,
  lineups,
  lineupEntries,
  absences,
  crewAssignments,
  callUps,
  goals,
  cards,
  substitutions,
  broadcasts,
};

export const relations = defineRelations(schema, (r) => ({
  matches: {
    legs: r.many.legs(),
    shootoutKicks: r.many.shootoutKicks(),
    lineups: r.many.lineups(),
    absences: r.many.absences(),
    crewAssignments: r.many.crewAssignments(),
    goals: r.many.goals(),
    cards: r.many.cards(),
    substitutions: r.many.substitutions(),
    broadcasts: r.many.broadcasts(),
  },
  ties: {
    legs: r.many.legs(),
  },
  legs: {
    tie: r.one.ties({ from: r.legs.tieId, to: r.ties.id, optional: false }),
    match: r.one.matches({ from: r.legs.matchId, to: r.matches.id, optional: false }),
  },
  shootoutKicks: {
    match: r.one.matches({ from: r.shootoutKicks.matchId, to: r.matches.id, optional: false }),
  },
  lineups: {
    match: r.one.matches({ from: r.lineups.matchId, to: r.matches.id, optional: false }),
    lineupEntries: r.many.lineupEntries(),
  },
  lineupEntries: {
    lineup: r.one.lineups({ from: r.lineupEntries.lineupId, to: r.lineups.id, optional: false }),
  },
  absences: {
    match: r.one.matches({ from: r.absences.matchId, to: r.matches.id, optional: false }),
  },
  crewAssignments: {
    match: r.one.matches({ from: r.crewAssignments.matchId, to: r.matches.id, optional: false }),
  },
  goals: {
    match: r.one.matches({ from: r.goals.matchId, to: r.matches.id, optional: false }),
  },
  cards: {
    match: r.one.matches({ from: r.cards.matchId, to: r.matches.id, optional: false }),
  },
  substitutions: {
    match: r.one.matches({ from: r.substitutions.matchId, to: r.matches.id, optional: false }),
  },
  broadcasts: {
    match: r.one.matches({ from: r.broadcasts.matchId, to: r.matches.id, optional: false }),
  },
}));
