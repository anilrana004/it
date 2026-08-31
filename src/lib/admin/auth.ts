import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { unauthorizedResponse, dbUnavailableResponse } from '@/lib/api/responses';
import { ADMIN_PREFIX } from '@/lib/admin/constants';
import { verifyAdminSessionToken } from '@/lib/admin/session';

export { ADMIN_PREFIX, unauthorizedResponse, dbUnavailableResponse };

async function verifyToken(token: string | undefined): Promise<boolean> {
  return Boolean(await verifyAdminSessionToken(token));
}

export async function isAdminAuthenticatedFromRequest(request: NextRequest): Promise<boolean> {
  return verifyToken(request.cookies.get('admin_token')?.value);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyToken(cookieStore.get('admin_token')?.value);
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const session = await verifyAdminSessionToken(cookieStore.get('admin_token')?.value);
  if (!session) return null;
  return {
    email: session.email,
    role: 'admin' as const,
  };
}

