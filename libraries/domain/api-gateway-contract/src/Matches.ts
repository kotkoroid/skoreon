import { MatchStatus } from '#Enums';
import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

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

export class Matches extends HttpApiGroup.make('Matches').add(
  HttpApiEndpoint.get('list', '/matches', {
    query: {
      editionId: Schema.optional(Schema.String),
      roundId: Schema.optional(Schema.String),
    },
    success: Schema.Array(Match),
  }),
) {}
