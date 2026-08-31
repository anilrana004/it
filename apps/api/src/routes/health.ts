import { Hono } from 'hono';
import { isDbConfigured } from '@indiantreks/db';
import { apiSuccess } from '@indiantreks/shared';

export const healthRoutes = new Hono();

healthRoutes.get('/health', (c) => apiSuccess({ status: 'ok' }));

healthRoutes.get('/ready', (c) => {
  if (!isDbConfigured()) {
    return c.json({ success: false, error: { code: 'DB_UNAVAILABLE', message: 'Database not configured' } }, 503);
  }
  return apiSuccess({ status: 'ready', database: 'configured' });
});
