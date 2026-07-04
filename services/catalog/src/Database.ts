import { relations } from '#schema/Relations';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import * as Context from 'effect/Context';

export class CatalogDatabase extends Context.Service<
  CatalogDatabase,
  DrizzleD1Database<typeof relations>
>()('CatalogDatabase') {}
