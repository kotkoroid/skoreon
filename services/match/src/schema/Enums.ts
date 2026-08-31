import * as Schema from 'effect/Schema';

export const MatchStatus = Schema.Literals([
  'SCHEDULED',
  'LIVE',
  'FINISHED',
  'POSTPONED',
  'CANCELLED',
  'ABANDONED',
]);
export type MatchStatus = typeof MatchStatus.Type;

export const ShootoutKickOutcome = Schema.Literals(['SCORED', 'MISSED', 'SAVED']);
export type ShootoutKickOutcome = typeof ShootoutKickOutcome.Type;

export const LineupRole = Schema.Literals(['STARTER', 'SUBSTITUTE']);
export type LineupRole = typeof LineupRole.Type;

export const AbsenceReason = Schema.Literals([
  'INJURY',
  'SUSPENSION',
  'ILLNESS',
  'INTERNATIONAL_DUTY',
  'PERSONAL',
  'OTHER',
]);
export type AbsenceReason = typeof AbsenceReason.Type;

export const OfficialRole = Schema.Literals([
  'REFEREE',
  'ASSISTANT_REFEREE',
  'FOURTH_OFFICIAL',
  'VIDEO_ASSISTANT_REFEREE',
  'DELEGATE',
]);
export type OfficialRole = typeof OfficialRole.Type;

export const CallUpStatus = Schema.Literals(['CALLED', 'WITHDRAWN', 'REPLACEMENT']);
export type CallUpStatus = typeof CallUpStatus.Type;

export const GoalKind = Schema.Literals(['REGULAR', 'PENALTY', 'OWN_GOAL']);
export type GoalKind = typeof GoalKind.Type;

export const CardKind = Schema.Literals(['YELLOW', 'SECOND_YELLOW', 'RED']);
export type CardKind = typeof CardKind.Type;

export const BroadcastMedium = Schema.Literals(['TV', 'STREAM', 'RADIO']);
export type BroadcastMedium = typeof BroadcastMedium.Type;
