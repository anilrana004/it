/** Shared security helpers for URLs and user-provided strings. */

const BLOCKED_URL_SCHEMES = /^(javascript|data|vbscript):/i;

export function isSafeHttpUrl(value: string | undefined | null): boolean {
  if (!value?.trim()) return true;
  const trimmed = value.trim();
  if (BLOCKED_URL_SCHEMES.test(trimmed)) return false;

  try {
    const url = new URL(trimmed);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return trimmed.startsWith('/');
  }
}

export function assertSafeHttpUrl(value: string | undefined | null, field: string): string | undefined {
  if (!value?.trim()) return undefined;
  if (!isSafeHttpUrl(value)) {
    throw new Error(`${field} must be a valid http(s) URL or site-relative path`);
  }
  return value.trim();
}

export function clampPaginationLimit(limit: number, max = 100): number {
  if (!Number.isFinite(limit) || limit < 1) return 20;
  return Math.min(max, Math.floor(limit));
}

export function clampPaginationOffset(offset: number): number {
  if (!Number.isFinite(offset) || offset < 0) return 0;
  return Math.floor(offset);
}
