import type { Context, Next } from 'hono';
import { getCookie } from 'hono/cookie';
import { apiError } from '@indiantreks/shared';
import { verifyAdminSessionToken, ADMIN_COOKIE } from '../lib/session.js';

export type AdminVariables = {
  adminEmail: string;
};

export async function requireAdmin(c: Context<{ Variables: AdminVariables }>, next: Next) {
  const bearer = c.req.header('Authorization')?.replace(/^Bearer\s+/i, '');
  const cookieToken = getCookie(c, ADMIN_COOKIE);
  const session = await verifyAdminSessionToken(bearer || cookieToken);

  if (!session) {
    return apiError('UNAUTHORIZED', 'Authentication required', 401);
  }

  c.set('adminEmail', session.email);
  await next();
}
