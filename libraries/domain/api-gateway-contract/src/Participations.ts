import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export const Participation = Schema.Struct({
  id: Schema.String,
  editionId: Schema.String,
  teamId: Schema.String,
});

export class Participations extends HttpApiGroup.make('Participations').add(
  HttpApiEndpoint.get('list', '/participations', {
    query: { editionId: Schema.optional(Schema.String), teamId: Schema.optional(Schema.String) },
    success: Schema.Array(Participation),
  }),
) {}
