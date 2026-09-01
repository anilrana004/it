import { apiUrl, isExternalApiEnabled } from '@/lib/env/api-url';

const ADMIN_TOKEN_KEY = 'indiantreks_admin_token';

/** Map legacy Next.js `/api/*` paths to Railway `/api/v1/*` paths. */
export function resolveApiPath(path: string, method?: string): string {
  if (!isExternalApiEnabled()) return path;

  if (path === '/api/auth' || path.startsWith('/api/auth?')) {
    return method === 'DELETE' ? apiUrl('/auth/logout') : apiUrl('/auth/login');
  }

  if (path.startsWith('/api/admin/')) {
    return apiUrl(path.replace('/api/admin', '/admin'));
  }

  if (path.startsWith('/api/')) {
    return apiUrl(path.replace(/^\/api/, ''));
  }

  return apiUrl(path);
}

export function getStoredAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setStoredAdminToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  if (token) sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  else sessionStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function clearStoredAdminToken(): void {
  setStoredAdminToken(null);
}

type JsonRecord = Record<string, unknown>;

function errorMessage(body: JsonRecord, status: number): string {
  const nested = body.error;
  if (nested && typeof nested === 'object' && 'message' in nested) {
    return String((nested as JsonRecord).message);
  }
  if (typeof body.error === 'string') return body.error;
  return `Request failed (${status})`;
}

/** Unwrap `{ success, data }` from Railway API or pass through legacy Next.js JSON. */
export function unwrapApiJson<T>(body: unknown): T {
  if (body && typeof body === 'object' && 'success' in body) {
    const envelope = body as { success: boolean; data?: T; error?: unknown };
    if (envelope.success && 'data' in envelope) return envelope.data as T;
  }
  return body as T;
}

function invalidApiResponseMessage(res: Response): string {
  if (isExternalApiEnabled()) {
    return `Admin API returned an unexpected response (${res.status}). Check that NEXT_PUBLIC_API_URL points to your Railway API and that you are signed in.`;
  }
  if (res.status === 401) {
    return 'Your session expired. Please sign in again.';
  }
  return `Server returned an unexpected response (${res.status}). Try signing in again or restarting the dev server.`;
}

/** Parse admin/public API JSON safely — avoids raw "<!DOCTYPE" parse errors on HTML error pages. */
export async function parseApiJson<T>(res: Response): Promise<T> {
  const text = await res.text();
  const trimmed = text.trim();

  if (!trimmed) {
    if (!res.ok) throw new Error(invalidApiResponseMessage(res));
    return {} as T;
  }

  if (trimmed.startsWith('<')) {
    throw new Error(invalidApiResponseMessage(res));
  }

  let body: JsonRecord;
  try {
    body = JSON.parse(trimmed) as JsonRecord;
  } catch {
    throw new Error(invalidApiResponseMessage(res));
  }

  if (!res.ok) {
    const err = new Error(errorMessage(body, res.status)) as Error & {
      fieldErrors?: Record<string, string>;
    };
    if (body.fieldErrors && typeof body.fieldErrors === 'object') {
      err.fieldErrors = body.fieldErrors as Record<string, string>;
    }
    throw err;
  }

  return unwrapApiJson<T>(body);
}

/** Authenticated admin request — cookie (same-origin) or Bearer token (cross-origin API). */
export async function adminApiFetch(input: string, init?: RequestInit): Promise<Response> {
  const url = resolveApiPath(input, init?.method);
  const headers = new Headers(init?.headers);
  const token = getStoredAdminToken();

  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return fetch(url, {
    ...init,
    headers,
    credentials: 'include',
    cache: init?.cache ?? 'no-store',
  });
}

/** Public storefront POST/GET to backend API or local Next.js routes. */
export async function publicApiFetch(input: string, init?: RequestInit): Promise<Response> {
  const url = resolveApiPath(input, init?.method);
  return fetch(url, {
    ...init,
    credentials: isExternalApiEnabled() ? 'omit' : 'same-origin',
  });
}

export async function publicApiErrorMessage(res: Response): Promise<string> {
  try {
    const body = (await res.json()) as Record<string, unknown>;
    const nested = body.error;
    if (nested && typeof nested === 'object' && nested !== null && 'message' in nested) {
      return String((nested as Record<string, unknown>).message);
    }
    if (typeof body.error === 'string') return body.error;
  } catch {
    // ignore
  }
  return 'Something went wrong. Please try again.';
}
