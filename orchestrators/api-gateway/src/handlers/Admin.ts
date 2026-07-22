import type { CatalogClient } from '#Catalog';
import type { MatchClient } from '#Match';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const AdminHandlers = (catalog: CatalogClient, match: MatchClient) =>
  HttpApiBuilder.group(Contract, 'Admin', (handlers) =>
    handlers.handle('seed', () =>
      Effect.gen(function* () {
        yield* catalog.seed().pipe(Effect.orDie);
        yield* match.seed().pipe(Effect.orDie);
        return { seeded: true };
      }),
    ),
  );
