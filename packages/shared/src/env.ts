/** Parse comma-separated CORS origins from environment. */

export function parseCorsOrigins(value: string | undefined): string[] {
  if (!value?.trim()) return [];
  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}
