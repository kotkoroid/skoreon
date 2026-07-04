import { FifaCountry, TeamKind } from '#Enums';
import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export class Teams extends HttpApiGroup.make('Teams').add(
  HttpApiEndpoint.get('list', '/teams', {
    query: { kind: Schema.optional(TeamKind), country: Schema.optional(FifaCountry) },
    success: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        kind: TeamKind,
        country: FifaCountry,
        establishedOn: Schema.String,
      }),
    ),
  }),
  HttpApiEndpoint.get('get', '/teams/:id', {
    params: { id: Schema.String },
    success: Schema.NullOr(
      Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        kind: TeamKind,
        country: FifaCountry,
        establishedOn: Schema.String,
      }),
    ),
  }),
) {}
