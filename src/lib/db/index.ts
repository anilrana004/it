import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

export type Db = PostgresJsDatabase<typeof schema>;

let client: ReturnType<typeof postgres> | null = null;
let db: Db | null = null;

function databaseUrl(): string | null {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return null;

  // Ignore local Postgres URLs on Vercel — they cannot connect and break builds.
  if (process.env.VERCEL && /(?:localhost|127\.0\.0\.1)/i.test(url)) {
    return null;
  }

  return url;
}

export function isDbConfigured(): boolean {
  return Boolean(databaseUrl());
}

/** Lazy singleton — safe when DATABASE_URL is unset (build / static fallback). */
export function getDb(): Db | null {
  const url = databaseUrl();
  if (!url) return null;

  if (!db) {
    client = postgres(url, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
    });
    db = drizzle(client, { schema });
  }

  return db;
}

export async function closeDb(): Promise<void> {
  if (client) {
    await client.end();
    client = null;
    db = null;
  }
}

export { schema };
