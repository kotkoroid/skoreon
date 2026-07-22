import { MatchStatus } from '#schema/Enums';
import * as Schema from 'effect/Schema';
import { Rpc, RpcGroup } from 'effect/unstable/rpc';

const greet = Rpc.make('greet', {
  payload: { name: Schema.String },
  success: Schema.String,
});

const seed = Rpc.make('seed', { success: Schema.Void });

export const Match = Schema.Struct({
  id: Schema.String,
  editionId: Schema.String,
  roundId: Schema.String,
  groupId: Schema.NullOr(Schema.String),
  homeParticipationId: Schema.String,
  awayParticipationId: Schema.String,
  status: MatchStatus,
  kickoffAt: Schema.String,
  timezone: Schema.String,
  homeScore: Schema.NullOr(Schema.Number),
  awayScore: Schema.NullOr(Schema.Number),
});

const listMatches = Rpc.make('listMatches', {
  payload: {
    editionId: Schema.optional(Schema.String),
    roundId: Schema.optional(Schema.String),
  },
  success: Schema.Array(Match),
});

export class ServiceRpcs extends RpcGroup.make(greet, seed, listMatches) {}
