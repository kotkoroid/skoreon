import type { CatalogClient } from '#Catalog';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const CompetitionsHandlers = (catalog: CatalogClient) =>
  HttpApiBuilder.group(Contract, 'Competitions', (handlers) =>
    handlers.handle('list', ({ query }) =>
      catalog.listCompetitions({ teamKind: query.teamKind }).pipe(Effect.orDie),
    ),
  );
