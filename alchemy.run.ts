import * as Alchemy from 'alchemy';
import * as Cloudflare from 'alchemy/Cloudflare';
import * as Effect from 'effect/Effect';
import ApiGateway from './orchestrators/api-gateway/src/Worker';

export default Alchemy.Stack(
  'Skoreon',
  {
    providers: Cloudflare.providers(),
    state: Cloudflare.state(),
  },
  Effect.gen(function* () {
    const apiGateway = yield* ApiGateway;

    return {
      apiGatewayUrl: apiGateway.url,
    };
  }),
);
