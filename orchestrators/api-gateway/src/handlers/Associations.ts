import type { CatalogClient } from '#Catalog';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const AssociationsHandlers = (catalog: CatalogClient) =>
  HttpApiBuilder.group(Contract, 'Associations', (handlers) =>
    handlers.handle('list', ({ query }) =>
      catalog.listAssociations({ kind: query.kind }).pipe(Effect.orDie),
    ),
  );
