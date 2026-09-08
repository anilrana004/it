import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/index.js';

export type Db = PostgresJsDatabase<typeof schema>;

let client: ReturnType<typeof postgres> | null = null;
let db: Db | null = null;

function databaseUrl(): string | null {
  const candidates = [
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
    process.env.POSTGRES_PRISMA_URL,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.NEON_DATABASE_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim().replace(/^['"]|['"]$/g, '');
    if (!value) continue;
    if (process.env.VERCEL && /(?:localhost|127\.0\.0\.1)/i.test(value)) continue;
    try {
      const parsed = new URL(value);
      parsed.searchParams.delete('channel_binding');
      if (!parsed.searchParams.has('sslmode')) parsed.searchParams.set('sslmode', 'require');
      return parsed.toString();
    } catch {
      return value;
    }
  }

  return null;
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
      max: 1,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl: 'require',
      prepare: false,
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
