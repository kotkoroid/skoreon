import * as Schema from 'effect/Schema';

export const FifaCountry = Schema.Literals(['AUT', 'CZE', 'GER', 'POL', 'SVK']);
export type FifaCountry = typeof FifaCountry.Type;

export const Sex = Schema.Literals(['FEMALE', 'MALE']);
export type Sex = typeof Sex.Type;

export const PlayerPosition = Schema.Literals(['GOALKEEPER', 'DEFENDER', 'MIDFIELDER', 'FORWARD']);
export type PlayerPosition = typeof PlayerPosition.Type;

export const TeamKind = Schema.Literals(['CLUB', 'NATIONAL']);
export type TeamKind = typeof TeamKind.Type;
