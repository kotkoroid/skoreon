import { seedMatches } from '#seed/Run';
import { drizzle } from 'drizzle-orm/sqlite-proxy';
import * as Effect from 'effect/Effect';

const accountId = process.env['CLOUDFLARE_ACCOUNT_ID'];
const token = process.env['CLOUDFLARE_API_TOKEN'] ?? process.env['CLOUDFARE_API_TOKEN'];
const databaseId = process.env['MATCH_D1_DATABASE_ID'] ?? process.argv[2];

if (accountId === undefined || token === undefined || databaseId === undefined) {
  throw new Error(
    'Set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, and MATCH_D1_DATABASE_ID (or pass the database id as the first argument).',
  );
}

const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`;

const db = drizzle(async (sql, params, method) => {
  const response = (await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ sql, params }),
  })) as unknown as { json: () => Promise<unknown> };
  const body = (await response.json()) as {
    success: boolean;
    errors: ReadonlyArray<{ message: string }>;
    result: ReadonlyArray<{ results: ReadonlyArray<Record<string, unknown>> }>;
  };
  if (!body.success) {
    throw new Error(`D1 query failed: ${body.errors.map((error) => error.message).join('; ')}`);
  }
  const rows = (body.result[0]?.results ?? []).map((row) => Object.values(row));
  return { rows: method === 'get' ? (rows[0] ?? []) : rows };
});

await Effect.runPromise(seedMatches(db));
console.log('Matches seeded.');
