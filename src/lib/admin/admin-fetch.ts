import { ADMIN_PREFIX } from '@/lib/admin/constants';

/** Authenticated admin fetch — always sends session cookie; redirects to login on 401. */
export async function adminFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const res = await fetch(input, {
    ...init,
    credentials: 'include',
    cache: init?.cache ?? 'no-store',
  });

  if (res.status === 401 && typeof window !== 'undefined') {
    const from = encodeURIComponent(window.location.pathname);
    window.location.href = `${ADMIN_PREFIX}/login?from=${from}`;
  }

  return res;
}
