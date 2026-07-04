import { bindCatalog } from '#Catalog';
import { PlayersHandlers } from '#handlers/Players';
import { TeamsHandlers } from '#handlers/Teams';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
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
    main: import.meta.url,
    observability: { enabled: true },
    dev: { port: 1340, strictPort: true },
  },
  Effect.gen(function* () {
    // INIT: register the service binding to the catalog worker; get a typed RPC client.
    const catalog = yield* bindCatalog;

    return {
      fetch: HttpApiBuilder.layer(Contract, { openapiPath: '/openapi' }).pipe(
        Layer.provide(PlayersHandlers(catalog)),
        Layer.provide(TeamsHandlers(catalog)),
        Layer.provide(HttpApiSwagger.layer(Contract, { path: '/swagger' })),
        Layer.provide(HttpServer.layerServices),
        HttpRouter.toHttpEffect,
      ),
    };
  }),
) {}
