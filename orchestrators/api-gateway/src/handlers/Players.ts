import type { CatalogClient } from '#Catalog';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const PlayersHandlers = (catalog: CatalogClient) =>
  HttpApiBuilder.group(Contract, 'Players', (handlers) =>
    handlers.handle('list', ({ query }) =>
      catalog.listPlayers({ page: query.page, pageSize: query.pageSize }).pipe(Effect.orDie),
    ),
  );
