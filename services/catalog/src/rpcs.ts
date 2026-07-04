import { FifaCountry, PlayerPosition, Sex, TeamKind } from '#schema/Enums';
import * as Schema from 'effect/Schema';
import { Rpc, RpcGroup } from 'effect/unstable/rpc';

const greet = Rpc.make('greet', {
  payload: { name: Schema.String },
  success: Schema.String,
});

const Person = Schema.Struct({
  id: Schema.String,
  givenName: Schema.String,
  familyName: Schema.String,
  sex: Sex,
  nationality: FifaCountry,
  dateOfBirth: Schema.String,
});

const Club = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
});

export const Player = Schema.Struct({
  id: Schema.String,
  primaryPosition: PlayerPosition,
  person: Person,
  currentClub: Schema.NullOr(Club),
});

export const PlayerPage = Schema.Struct({
  items: Schema.Array(Player),
  total: Schema.Number,
  page: Schema.Number,
  pageSize: Schema.Number,
});

const listPlayers = Rpc.make('listPlayers', {
  payload: { page: Schema.optional(Schema.Number), pageSize: Schema.optional(Schema.Number) },
  success: PlayerPage,
});

export const Team = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  kind: TeamKind,
  country: FifaCountry,
  establishedOn: Schema.String,
});

const listTeams = Rpc.make('listTeams', {
  payload: { kind: Schema.optional(TeamKind), country: Schema.optional(FifaCountry) },
  success: Schema.Array(Team),
});

const getTeam = Rpc.make('getTeam', {
  payload: { id: Schema.String },
  success: Schema.NullOr(Team),
});

export class ServiceRpcs extends RpcGroup.make(greet, listPlayers, listTeams, getTeam) {}
