import { associations } from '#schema/Associations';
import { competitions } from '#schema/Competitions';
import { editions } from '#schema/Editions';
import { participations } from '#schema/Participations';
import { persons } from '#schema/Persons';
import { phases } from '#schema/Phases';
import { players } from '#schema/Players';
import { rounds } from '#schema/Rounds';
import { teams } from '#schema/Teams';
import { associationSeed } from '#seed/Associations';
import { competitionSeed } from '#seed/Competitions';
import { editionSeed } from '#seed/Editions';
import { participationSeed } from '#seed/Participations';
import { personSeed, playerSeed } from '#seed/Players';
import { phaseSeed } from '#seed/Phases';
import { roundSeed } from '#seed/Rounds';
import { teamSeed } from '#seed/Teams';
import type { AnyRelations, InferInsertModel } from 'drizzle-orm';
import type { SQLiteAsyncDatabase, SQLiteTable } from 'drizzle-orm/sqlite-core';
import * as Effect from 'effect/Effect';

// D1 caps bound parameters at 100 per query; keep every insert well under it.
const CHUNK_SIZE = 6;

const chunk = <T>(items: ReadonlyArray<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );

export const seedCatalog = <TRunResult, TRelations extends AnyRelations>(
  db: SQLiteAsyncDatabase<'async', TRunResult, TRelations>,
) => {
  const insert = <T extends SQLiteTable>(table: T, rows: Array<InferInsertModel<T>>) =>
    Effect.gen(function* () {
      for (const batch of chunk(rows, CHUNK_SIZE)) {
        yield* Effect.promise(() => db.insert(table).values(batch).onConflictDoNothing());
      }
    });

  return Effect.gen(function* () {
    yield* insert(associations, associationSeed);
    yield* insert(competitions, competitionSeed);
    yield* insert(editions, editionSeed);
    yield* insert(phases, phaseSeed);
    yield* insert(rounds, roundSeed);
    yield* insert(teams, teamSeed);
    yield* insert(persons, personSeed);
    yield* insert(players, playerSeed);
    yield* insert(participations, participationSeed);
  });
};
