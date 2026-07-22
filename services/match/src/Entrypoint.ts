import { MatchDatabase } from '#Database';
import { ServiceRpcs } from '#rpcs';
import { relations } from '#schema/Relations';
import { seedMatches } from '#seed/Run';
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
      seed: () => seedMatches(db),
      listMatches: ({ editionId, roundId }) =>
        Effect.promise(async () => {
          const rows = await db.query.matches.findMany({
            where: {
              deletedAt: { isNull: true },
              ...(editionId !== undefined ? { editionId } : {}),
              ...(roundId !== undefined ? { roundId } : {}),
            },
            orderBy: { kickoffAt: 'asc' },
          });
          return rows.map((match) => ({
            id: match.id,
            editionId: match.editionId,
            roundId: match.roundId,
            groupId: match.groupId,
            homeParticipationId: match.homeParticipationId,
            awayParticipationId: match.awayParticipationId,
            status: match.status,
            kickoffAt: match.kickoffAt.toISOString(),
            timezone: match.timezone,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
          }));
        }),
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
