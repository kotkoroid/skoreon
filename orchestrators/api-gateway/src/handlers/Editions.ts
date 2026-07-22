import type { CatalogClient } from '#Catalog';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const EditionsHandlers = (catalog: CatalogClient) =>
  HttpApiBuilder.group(Contract, 'Editions', (handlers) =>
    handlers.handle('list', ({ query }) =>
      catalog.listEditions({ competitionId: query.competitionId }).pipe(Effect.orDie),
    ),
  );
