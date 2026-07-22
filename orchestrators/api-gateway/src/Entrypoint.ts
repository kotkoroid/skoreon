import { bindCatalog } from '#Catalog';
import { bindMatch } from '#Match';
import { AdminHandlers } from '#handlers/Admin';
import { AssociationsHandlers } from '#handlers/Associations';
import { CompetitionsHandlers } from '#handlers/Competitions';
import { EditionsHandlers } from '#handlers/Editions';
import { HealthHandlers } from '#handlers/Health';
import { MatchesHandlers } from '#handlers/Matches';
import { ParticipationsHandlers } from '#handlers/Participations';
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
    // INIT: register the service bindings to the worker RPCs; get typed clients.
    const catalog = yield* bindCatalog;
    const match = yield* bindMatch;

    return {
      fetch: HttpApiBuilder.layer(Contract, { openapiPath: '/openapi' }).pipe(
        Layer.provide(AdminHandlers(catalog, match)),
        Layer.provide(AssociationsHandlers(catalog)),
        Layer.provide(CompetitionsHandlers(catalog)),
        Layer.provide(EditionsHandlers(catalog)),
        Layer.provide(HealthHandlers),
        Layer.provide(MatchesHandlers(match)),
        Layer.provide(ParticipationsHandlers(catalog)),
        Layer.provide(PlayersHandlers(catalog)),
        Layer.provide(TeamsHandlers(catalog)),
        Layer.provide(HttpApiSwagger.layer(Contract, { path: '/swagger' })),
        Layer.provide(HttpServer.layerServices),
        HttpRouter.toHttpEffect,
      ),
    };
  }),
) {}
