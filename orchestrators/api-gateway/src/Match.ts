import MatchService from '@skoreon/match-service/src/Entrypoint';
import * as Cloudflare from 'alchemy/Cloudflare';
import * as Effect from 'effect/Effect';

export const bindMatch = Cloudflare.RpcWorker.bind(MatchService);

export type MatchClient = Effect.Success<typeof bindMatch>;
