import { TeamKind } from '#Enums';
import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export const Competition = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  code: Schema.String,
  teamKind: TeamKind,
  associationId: Schema.String,
});

export class Competitions extends HttpApiGroup.make('Competitions').add(
  HttpApiEndpoint.get('list', '/competitions', {
    query: { teamKind: Schema.optional(TeamKind) },
    success: Schema.Array(Competition),
  }),
) {}
