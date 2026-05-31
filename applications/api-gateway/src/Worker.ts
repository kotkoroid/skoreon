import Api from '@skoreon/api-gateway/src/api/Api';
import * as Cloudflare from 'alchemy/Cloudflare';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import * as HttpRouter from 'effect/unstable/http/HttpRouter';
import * as HttpServer from 'effect/unstable/http/HttpServer';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';
import * as HttpApiSwagger from 'effect/unstable/httpapi/HttpApiSwagger';

export default class ApiGateway extends Cloudflare.Worker<ApiGateway>()(
  'ApiGateway',
  {
    main: import.meta.filename,
    observability: { enabled: true },
  },
  Effect.succeed({
    fetch: HttpApiBuilder.layer(Api, { openapiPath: '/openapi' }).pipe(
      Layer.provide(HttpApiSwagger.layer(Api, { path: '/swagger' })),
      Layer.provide(HttpServer.layerServices),
      HttpRouter.toHttpEffect,
    ),
  }),
) {}
