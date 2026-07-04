import { MatchDatabase } from '#Database';
import { ServiceRpcs } from '#rpcs';
import { relations } from '#schema/Relations';
import * as Cloudflare from 'alchemy/Cloudflare';
import { drizzle } from 'drizzle-orm/d1';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { RpcSerialization, RpcServer } from 'effect/unstable/rpc';

export default class MatchService extends Cloudflare.RpcWorker<MatchService>()(
  'MatchService',
  { main: import.meta.url, schema: ServiceRpcs },
  Effect.gen(function* () {
    const database = yield* Cloudflare.D1Database('MatchD1Database', {
      migrationsDir: './services/match/migrations',
      migrationsTable: 'drizzle_migrations',
    });
    const connection = yield* Cloudflare.D1Connection.bind(database);
    const db = drizzle(yield* connection.raw, { relations });

    const handlers = ServiceRpcs.toLayer({
      greet: ({ name }) => Effect.succeed(`Hello ${name}`),
    });
    // NDJSON, not JSON: `Cloudflare.RpcWorker.bind`'s client uses
    // `RpcSerialization.layerNdjson`, so the server must match it.
    return RpcServer.toHttpEffect(ServiceRpcs).pipe(
      Effect.provide(
        Layer.mergeAll(handlers, RpcSerialization.layerNdjson, Layer.succeed(MatchDatabase, db)),
      ),
    );
  }).pipe(Effect.provide(Cloudflare.D1ConnectionLive)),
) {}
