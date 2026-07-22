import * as Schema from 'effect/Schema';
import * as HttpApiEndpoint from 'effect/unstable/httpapi/HttpApiEndpoint';
import * as HttpApiGroup from 'effect/unstable/httpapi/HttpApiGroup';

export const HealthStatus = Schema.Struct({
  status: Schema.Literal('ok'),
});

export class Health extends HttpApiGroup.make('Health').add(
  HttpApiEndpoint.get('check', '/health', {
    success: HealthStatus,
  }),
) {}
