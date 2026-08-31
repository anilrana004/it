import postgres from 'postgres';

const adminUrl = 'postgresql://postgres:postgres@localhost:5432/postgres';
const dbName = 'indiantreks';

async function main() {
  const sql = postgres(adminUrl, { max: 1 });
  const existing = await sql`
    SELECT 1 FROM pg_database WHERE datname = ${dbName}
  `;
  if (existing.length === 0) {
    await sql.unsafe(`CREATE DATABASE ${dbName}`);
    console.log(`Created database: ${dbName}`);
  } else {
    console.log(`Database already exists: ${dbName}`);
  }
  await sql.end();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
