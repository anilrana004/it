import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import fs from 'node:fs';
import path from 'node:path';
import postgres from 'postgres';

async function main() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    console.error('DATABASE_URL is required. Copy .env.example to .env.local and set your Postgres URL.');
    process.exit(1);
  }

  const migrationsDir = path.join(process.cwd(), 'drizzle/migrations');
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  const db = postgres(url, { max: 1 });

  try {
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      await db.unsafe(sql);
      console.log(`Migration applied: drizzle/migrations/${file}`);
    }
  } finally {
    await db.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
