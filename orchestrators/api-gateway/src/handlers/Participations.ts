import type { CatalogClient } from '#Catalog';
import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const ParticipationsHandlers = (catalog: CatalogClient) =>
  HttpApiBuilder.group(Contract, 'Participations', (handlers) =>
    handlers.handle('list', ({ query }) =>
      catalog
        .listParticipations({ editionId: query.editionId, teamId: query.teamId })
        .pipe(Effect.orDie),
    ),
  );
