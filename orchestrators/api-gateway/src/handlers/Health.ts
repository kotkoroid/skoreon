import { Contract } from '@skoreon/api-gateway-contract/Contract';
import * as Effect from 'effect/Effect';
import * as HttpApiBuilder from 'effect/unstable/httpapi/HttpApiBuilder';

export const HealthHandlers = HttpApiBuilder.group(Contract, 'Health', (handlers) =>
  handlers.handle('check', () => Effect.succeed({ status: 'ok' as const })),
);
