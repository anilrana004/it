/** Central API base URL — set NEXT_PUBLIC_API_URL when using Railway backend. */

export function getApiBaseUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.trim().replace(/\/$/, '');
  return url ?? '';
}

/** True when frontends should call the external Railway API instead of local Next.js routes. */
export function useExternalApi(): boolean {
  return Boolean(getApiBaseUrl());
}

export function apiUrl(path: string): string {
  const base = getApiBaseUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;

  if (base) {
    return `${base}${normalized.startsWith('/api/v1') ? normalized : `/api/v1${normalized}`}`;
  }

  return normalized.startsWith('/api') ? normalized : `/api${normalized}`;
}
