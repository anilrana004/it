/**
 * Backup customer auth directory (Postgres export metadata + local file copy).
 * Usage: npx tsx scripts/backup-customer-auth.ts
 */
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
dotenv.config();

import fs from 'node:fs';
import path from 'node:path';
import { exportCustomerAuthBackup } from '../src/lib/user-auth/service';

async function main() {
  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outDir = path.join(process.cwd(), 'data', 'backups');
  fs.mkdirSync(outDir, { recursive: true });

  const backup = await exportCustomerAuthBackup();
  const outFile = path.join(outDir, `customer-auth-${stamp}.json`);
  fs.writeFileSync(outFile, JSON.stringify(backup, null, 2), 'utf8');

  const localStore = path.join(process.cwd(), 'data', 'customer-auth.json');
  if (fs.existsSync(localStore)) {
    fs.copyFileSync(localStore, path.join(outDir, `customer-auth-local-${stamp}.json`));
  }

  console.log(`Backup written: ${outFile}`);
  console.log(`Source: ${backup.source}, users: ${backup.userCount}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
