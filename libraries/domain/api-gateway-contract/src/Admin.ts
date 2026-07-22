import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export const SeedResult = Schema.Struct({
  seeded: Schema.Boolean,
});

export class Admin extends HttpApiGroup.make('Admin').add(
  HttpApiEndpoint.post('seed', '/admin/seed', {
    success: SeedResult,
  }),
) {}
