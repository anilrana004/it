import { ADMIN_PREFIX } from '@/lib/admin/constants';
import { adminApiFetch } from '@/lib/api/client';

/** Authenticated admin fetch — redirects to login on 401. */
export async function adminFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const path = typeof input === 'string' ? input : input.toString();
  const res = await adminApiFetch(path, init);

  if (res.status === 401 && typeof window !== 'undefined') {
    const from = encodeURIComponent(window.location.pathname);
    window.location.href = `${ADMIN_PREFIX}/login?from=${from}`;
  }

  return res;
}
