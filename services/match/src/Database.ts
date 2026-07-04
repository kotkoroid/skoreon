import { relations } from '#schema/Relations';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import * as Context from 'effect/Context';

export class MatchDatabase extends Context.Service<
  MatchDatabase,
  DrizzleD1Database<typeof relations>
>()('MatchDatabase') {}
