import * as Alchemy from 'alchemy';
import * as Cloudflare from 'alchemy/Cloudflare';
import * as Effect from 'effect/Effect';
import ApiGateway from './orchestrators/api-gateway/src/Entrypoint';
import CatalogService from './services/catalog/src/Entrypoint';
import MatchService from './services/match/src/Entrypoint';

export default Alchemy.Stack(
  'Skoreon',
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const catalogService = yield* CatalogService;
    const matchService = yield* MatchService;
    const apiGateway = yield* ApiGateway;

    return {
      catalogService: catalogService.url,
      matchService: matchService.url,
      apiGatewayUrl: apiGateway.url,
    };
  }),
);
