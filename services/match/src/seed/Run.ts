import { matches } from '#schema/Matches';
import { matchSeed } from '#seed/Matches';
import type { AnyRelations } from 'drizzle-orm';
import type { SQLiteAsyncDatabase } from 'drizzle-orm/sqlite-core';
import * as Effect from 'effect/Effect';

// D1 caps bound parameters at 100 per query; a match row binds ~12 values, so
// keep batches small enough to stay under it.
const CHUNK_SIZE = 6;

const chunk = <T>(items: ReadonlyArray<T>, size: number): Array<Array<T>> =>
  Array.from({ length: Math.ceil(items.length / size) }, (_, index) =>
    items.slice(index * size, index * size + size),
  );

export const seedMatches = <TRunResult, TRelations extends AnyRelations>(
  db: SQLiteAsyncDatabase<'async', TRunResult, TRelations>,
) =>
  Effect.gen(function* () {
    for (const batch of chunk(matchSeed, CHUNK_SIZE)) {
      yield* Effect.promise(() => db.insert(matches).values(batch).onConflictDoNothing());
    }
  });
