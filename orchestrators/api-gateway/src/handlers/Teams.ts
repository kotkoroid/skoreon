import type { CatalogClient } from '#Catalog';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const TeamsHandlers = (catalog: CatalogClient) =>
  HttpApiBuilder.group(Contract, 'Teams', (handlers) =>
    handlers
      .handle('list', ({ query }) =>
        catalog.listTeams({ kind: query.kind, country: query.country }).pipe(Effect.orDie),
      )
      .handle('get', ({ params }) => catalog.getTeam({ id: params.id }).pipe(Effect.orDie)),
  );
