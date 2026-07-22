import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export const Edition = Schema.Struct({
  id: Schema.String,
  competitionId: Schema.String,
  startsOn: Schema.String,
  endsOn: Schema.String,
});

export class Editions extends HttpApiGroup.make('Editions').add(
  HttpApiEndpoint.get('list', '/editions', {
    query: { competitionId: Schema.optional(Schema.String) },
    success: Schema.Array(Edition),
  }),
) {}
