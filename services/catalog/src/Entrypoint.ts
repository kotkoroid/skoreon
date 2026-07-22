import { CatalogDatabase } from '#Database';
import { ServiceRpcs } from '#rpcs';
import { players } from '#schema/Players';
import { relations } from '#schema/Relations';
import { seedCatalog } from '#seed/Run';
import * as Cloudflare from 'alchemy/Cloudflare';
import { isNull, sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import * as Effect from 'effect/Effect';
import * as Layer from 'effect/Layer';
import { RpcSerialization, RpcServer } from 'effect/unstable/rpc';

export default class CatalogService extends Cloudflare.RpcWorker<CatalogService>()(
  'CatalogServiceRpcWorker',
  { main: import.meta.url, schema: ServiceRpcs },
  Effect.gen(function* () {
    const database = yield* Cloudflare.D1Database('CatalogD1Database', {
      migrationsDir: './services/catalog/migrations',
      migrationsTable: 'drizzle_migrations',
    });
    const connection = yield* Cloudflare.D1Connection.bind(database);
    const db = drizzle(yield* connection.raw, { relations });

    const handlers = ServiceRpcs.toLayer({
      greet: ({ name }) => Effect.succeed(`Hello ${name}`),
      listPlayers: ({ page = 1, pageSize = 20 }) =>
        Effect.promise(async () => {
          const [rows, countRows] = await Promise.all([
            db.query.players.findMany({
              columns: { id: true, primaryPosition: true },
              with: {
                person: {
                  columns: {
                    id: true,
                    givenName: true,
                    familyName: true,
                    sex: true,
                    nationality: true,
                    dateOfBirth: true,
                  },
                },
                registrations: {
                  where: { deletedAt: { isNull: true } },
                  with: {
                    participation: {
                      with: {
                        team: { columns: { id: true, name: true, kind: true } },
                        edition: { columns: { startsOn: true, endsOn: true } },
                      },
                    },
                  },
                },
              },
              where: { deletedAt: { isNull: true } },
              orderBy: { createdAt: 'asc' },
              limit: pageSize,
              offset: (page - 1) * pageSize,
            }),
            db
              .select({ total: sql<number>`count(*)` })
              .from(players)
              .where(isNull(players.deletedAt)),
          ]);
          const total = countRows[0]?.total ?? 0;

          const today = new Date().toISOString().slice(0, 10);
          const items = rows.map(({ registrations, ...player }) => {
            const currentClub =
              registrations.find(
                ({ participation }) =>
                  participation.team.kind === 'CLUB' &&
                  participation.edition.startsOn <= today &&
                  today <= participation.edition.endsOn,
              )?.participation.team ?? null;
            return { ...player, currentClub };
          });

          return { items, total, page, pageSize };
        }),
      listTeams: ({ kind, country }) =>
        Effect.promise(() =>
          db.query.teams.findMany({
            where: {
              deletedAt: { isNull: true },
              ...(kind !== undefined ? { kind } : {}),
              ...(country !== undefined ? { country } : {}),
            },
          }),
        ),
      getTeam: ({ id }) =>
        Effect.promise(async () => {
          const team = await db.query.teams.findFirst({
            where: { id, deletedAt: { isNull: true } },
          });
          return team ?? null;
        }),
      listAssociations: ({ kind }) =>
        Effect.promise(() =>
          db.query.associations.findMany({
            where: {
              deletedAt: { isNull: true },
              ...(kind !== undefined ? { kind } : {}),
            },
          }),
        ),
      listCompetitions: ({ teamKind }) =>
        Effect.promise(() =>
          db.query.competitions.findMany({
            where: {
              deletedAt: { isNull: true },
              ...(teamKind !== undefined ? { teamKind } : {}),
            },
          }),
        ),
      listEditions: ({ competitionId }) =>
        Effect.promise(() =>
          db.query.editions.findMany({
            where: {
              deletedAt: { isNull: true },
              ...(competitionId !== undefined ? { competitionId } : {}),
            },
          }),
        ),
      listParticipations: ({ editionId, teamId }) =>
        Effect.promise(() =>
          db.query.participations.findMany({
            where: {
              deletedAt: { isNull: true },
              ...(editionId !== undefined ? { editionId } : {}),
              ...(teamId !== undefined ? { teamId } : {}),
            },
          }),
        ),
      seed: () => seedCatalog(db),
    });
    // NDJSON, not JSON: `Cloudflare.RpcWorker.bind`'s client uses
    // `RpcSerialization.layerNdjson`, so the server must match it.
    return RpcServer.toHttpEffect(ServiceRpcs).pipe(
      Effect.provide(
        Layer.mergeAll(handlers, RpcSerialization.layerNdjson, Layer.succeed(CatalogDatabase, db)),
      ),
    );
  }).pipe(Effect.provide(Cloudflare.D1ConnectionLive)),
) {}
