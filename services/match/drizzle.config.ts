import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  schema: './src/schema',
  out: './migrations',
  migrations: {
    table: 'drizzle_migrations',
  },
});
