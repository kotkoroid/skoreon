import { AssociationKind } from '#Enums';
import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export const Association = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  code: Schema.String,
  kind: AssociationKind,
  governingAssociationId: Schema.NullOr(Schema.String),
});

export class Associations extends HttpApiGroup.make('Associations').add(
  HttpApiEndpoint.get('list', '/associations', {
    query: { kind: Schema.optional(AssociationKind) },
    success: Schema.Array(Association),
  }),
) {}
