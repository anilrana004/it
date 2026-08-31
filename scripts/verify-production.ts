/**
 * Production readiness checks — env, security, and deployment config.
 * Run before deploy: npm run verify:production
 */

type CheckResult = {
  name: string;
  ok: boolean;
  detail: string;
  level: 'error' | 'warn';
};

function isProduction(): boolean {
  return process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production';
}

function main() {
  const results: CheckResult[] = [];
  const prod = isProduction();

  const sessionSecret = process.env.ADMIN_SESSION_SECRET?.trim();
  results.push({
    name: 'admin_session_secret',
    ok: prod ? Boolean(sessionSecret && sessionSecret.length >= 32) : true,
    level: prod ? 'error' : 'warn',
    detail: prod
      ? sessionSecret && sessionSecret.length >= 32
        ? 'ADMIN_SESSION_SECRET is set (32+ chars)'
        : 'Set ADMIN_SESSION_SECRET (32+ random chars) in production'
      : sessionSecret
        ? 'ADMIN_SESSION_SECRET set for dev'
        : 'Optional in dev — falls back to ADMIN_PASSWORD',
  });

  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
  results.push({
    name: 'admin_password_strength',
    ok: !prod || (adminPassword !== 'admin123' && adminPassword.length >= 12),
    level: prod ? 'error' : 'warn',
    detail: prod
      ? adminPassword !== 'admin123' && adminPassword.length >= 12
        ? 'ADMIN_PASSWORD is non-default'
        : 'Use a strong, non-default ADMIN_PASSWORD in production'
      : 'Change default password before deploy',
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  results.push({
    name: 'public_site_url',
    ok: Boolean(siteUrl?.startsWith('https://')),
    level: 'warn',
    detail: siteUrl?.startsWith('https://')
      ? `NEXT_PUBLIC_SITE_URL=${siteUrl}`
      : 'Set NEXT_PUBLIC_SITE_URL to your production https URL for SEO',
  });

  const dbUrl = process.env.DATABASE_URL?.trim();
  results.push({
    name: 'database_url',
    ok: Boolean(dbUrl),
    level: prod ? 'error' : 'warn',
    detail: dbUrl
      ? 'DATABASE_URL configured — knowledge graph active'
      : prod
        ? 'DATABASE_URL required in production for blog/admin persistence'
        : 'DATABASE_URL unset — static blog fallback only',
  });

  results.push({
    name: 'analytics_scaffold',
    ok: true,
    level: 'warn',
    detail: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID
      ? 'GA4 ID set — wire script when ready'
      : 'NEXT_PUBLIC_GA4_MEASUREMENT_ID unset — analytics scaffold only',
  });

  const failed = results.filter((r) => !r.ok && r.level === 'error');
  const warnings = results.filter((r) => !r.ok && r.level === 'warn');

  console.log('\nProduction verification\n');
  for (const result of results) {
    const tag = result.ok ? 'OK  ' : result.level === 'error' ? 'FAIL' : 'WARN';
    console.log(`${tag} ${result.name}: ${result.detail}`);
  }

  if (warnings.length > 0) {
    console.log(`\n${warnings.length} warning(s).`);
  }

  if (failed.length > 0) {
    console.log(`\n${failed.length} blocking check(s) failed.`);
    process.exit(1);
  }

  console.log('\nProduction checks passed (or dev-only warnings only).');
}

main();
