import type { MatchClient } from '#Match';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const MatchesHandlers = (match: MatchClient) =>
  HttpApiBuilder.group(Contract, 'Matches', (handlers) =>
    handlers.handle('list', ({ query }) =>
      match.listMatches({ editionId: query.editionId, roundId: query.roundId }).pipe(Effect.orDie),
    ),
  );
