import 'dotenv/config';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { parseCorsOrigins } from '@indiantreks/shared';
import { healthRoutes } from './routes/health.js';
import { v1 } from './routes/v1.js';

const app = new Hono();

app.use('*', logger());

const allowedOrigins = parseCorsOrigins(process.env.CORS_ORIGINS);
app.use(
  '*',
  cors({
    origin: (origin) => {
      if (!origin) return allowedOrigins[0] ?? '*';
      if (allowedOrigins.length === 0) return origin;
      return allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
    },
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

app.route('/', healthRoutes);
app.route('/api/v1', v1);

app.notFound((c) =>
  c.json({ success: false, error: { code: 'NOT_FOUND', message: 'Route not found' } }, 404),
);

app.onError((err, c) => {
  console.error('[api] unhandled error', err.message);
  return c.json(
    { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
    500,
  );
});

const port = Number(process.env.PORT ?? 8080);

serve({ fetch: app.fetch, port }, () => {
  console.log(`[api] listening on http://0.0.0.0:${port}`);
});

export default app;
