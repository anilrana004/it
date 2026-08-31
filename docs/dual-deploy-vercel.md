# Dual Vercel deployment — Storefront + Admin

Deploy the **same repository** twice as separate Vercel projects. Both connect to the **same PostgreSQL** (`DATABASE_URL`) for blog/knowledge data.

## Architecture

```
┌─────────────────────┐     ┌─────────────────────┐
│  Vercel Project A   │     │  Vercel Project B   │
│  APP_ROLE=storefront│     │  APP_ROLE=admin     │
│  www.indiantreks.in │     │  admin.* (private)  │
└──────────┬──────────┘     └──────────┬──────────┘
           │                           │
           └───────────┬───────────────┘
                       ▼
              PostgreSQL (DATABASE_URL)
```

| Deployment | Serves | Blocks |
|------------|--------|--------|
| **Storefront** | Public pages, public APIs | Admin UI + admin APIs |
| **Admin** | Admin UI + `/api/admin/*`, `/api/auth` | Public storefront pages |

Local dev: omit `APP_ROLE` (both surfaces on one server).

## Vercel env

**Storefront project:** `APP_ROLE=storefront`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`

**Admin project:** `APP_ROLE=admin`, same `DATABASE_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_SITE_URL` (for preview links)

## Shared PostgreSQL tables

Both deployments use the same database:

| Table | Storefront writes | Admin reads/manages |
|-------|-------------------|---------------------|
| `posts`, `entity_registry`, … | via SSR | Blog CMS |
| `bookings` | `POST /api/bookings` | `/api/admin/bookings` |
| `contacts` | `POST /api/contacts` | `/api/admin/contacts` |
| `newsletter_subscribers` | `POST /api/newsletter` | `/api/admin/newsletter` |
| `gift_cards` | — | `/api/admin/gift-cards` (issue only) |

After pulling: `npm run db:migrate` (applies `0004_operations.sql`).

Local dev: omit `APP_ROLE` — both surfaces on one server.
