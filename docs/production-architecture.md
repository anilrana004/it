# Production Architecture — Audit & Migration Plan

**Status:** Phase 1 complete (audit) · Phase 2–3 in progress (monorepo + API extraction)  
**Target:** Store (Vercel) + Admin (Vercel) + API (Railway) + Neon + Cloudinary

---

## 1. What Was Wrong (Audit Summary)

| Area | Current state | Production risk |
|------|---------------|-----------------|
| **Deployment** | Single Next.js monolith, split by `APP_ROLE` env on two Vercel projects | Frontends still bundle DB drivers; secrets can leak to wrong deploy |
| **Database access** | Store/admin Next.js apps connect to Postgres directly (SSR + Route Handlers) | Violates “frontend never touches DB”; build-time DB coupling |
| **API surface** | 24 route files under `src/app/api/`, inconsistent paths (`/api/admin/*`, `/api/public/*`) | No versioned contract; hard to move to Railway |
| **Auth** | Single env-based admin account, HMAC cookie, defaults `admin123` | No RBAC, no brute-force protection |
| **Payments** | WhatsApp/manual only; no gateway, webhooks, or verification | Booking API exists but UI doesn't call it |
| **CORS / rate limits** | None on public POST endpoints | Spam, abuse |
| **CI/CD** | No GitHub Actions; migrations manual | Broken builds can deploy |
| **Cache revalidation** | Admin publish revalidates admin deploy cache only | Storefront may show stale blog after publish |
| **Content** | Hybrid: DB blog + static `data.ts` treks (~30 products) | Trek catalog not in CMS/DB |
| **Package manager** | Both `pnpm-lock.yaml` and `package-lock.json` | Inconsistent installs on Vercel |

---

## 2. Target Architecture

```
Users
  ├─► Store Frontend (Vercel)     NEXT_PUBLIC_API_URL → API
  └─► Admin Frontend (Vercel)     NEXT_PUBLIC_API_URL → API
                                    │
                                    ▼
                          Backend API (Railway)
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
                 Neon PG      Cloudinary      Payments (future)
```

**Rules:**
- Only `apps/api` has `DATABASE_URL`
- Store/admin never import `postgres`, `drizzle`, or server secrets
- All privileged operations go through `/api/v1/*` on Railway

---

## 3. Repository Layout (Migration)

```
indiantreks/
├── apps/
│   ├── api/              ← Railway (Hono REST API) — NEW
│   ├── store/            ← Vercel storefront (Phase 2: move from root)
│   └── admin/            ← Vercel admin (Phase 2: split from root)
├── packages/
│   ├── db/               ← Drizzle schema + connection
│   ├── shared/           ← Env validation, API error format, types
│   └── operations/       ← Bookings, contacts, newsletter (Phase 2)
├── src/                  ← Current Next.js app (interim monolith at root)
├── drizzle/migrations/
├── docs/
└── .github/workflows/
```

**Interim:** The existing Next.js app remains at repo root so current Vercel deploys keep working. New `apps/api` is the authoritative backend path forward.

---

## 4. Phased Implementation

### Phase 1 — Audit ✅
- Full codebase review (API, auth, DB, content, deploy)
- Document gaps and risks (this file)

### Phase 2 — Backend extraction (in progress)
- [x] Monorepo workspaces
- [x] `apps/api` with Hono, `/health`, `/ready`, CORS
- [x] `/api/v1/bookings`, `/contacts`, `/newsletter`, `/auth`
- [x] Admin routes under `/api/v1/admin/*`
- [x] `packages/db`, `packages/shared`
- [ ] Move all knowledge/blog services into packages
- [ ] Remove `DATABASE_URL` from Vercel store/admin projects

### Phase 3 — Frontend split (in progress)
- [x] Unified API client (`src/lib/api/client.ts`) with Bearer token for cross-origin admin
- [x] Admin operations wired to Railway when `NEXT_PUBLIC_API_URL` is set
- [x] Store forms (contact, newsletter, corporate) wired to Railway API
- [x] Login/logout use external API + sessionStorage token
- [x] `apps/store` and `apps/admin` deploy READMEs
- [x] Blog CMS routes on Railway API (`apps/api/src/routes/v1/admin/knowledge.ts`)
- [x] Storefront revalidation webhook (`POST /api/revalidate` + `STOREFRONT_REVALIDATE_URL` on Railway)
- [ ] Move Next.js app physically to `apps/store` (Phase 3b)
- [ ] Remove `DATABASE_URL` from Vercel admin after setting `NEXT_PUBLIC_API_URL`

### Phase 4 — Hardening
- GitHub Actions: lint, typecheck, build all apps
- Rate limiting on public endpoints
- Production env verification in CI
- Migration runner in deploy pipeline
- [x] Cross-deploy cache revalidation webhook

### Phase 5 — Payments (when required)
- Payment provider integration in API only
- Webhook verification + idempotency
- Never trust frontend payment status

### Phase 6 — Domain & DNS
- `www` → store, `admin` → admin, `api` → Railway

---

## 5. Environment Variables

### `apps/api` (Railway) — secrets live here only

```env
DATABASE_URL=
PORT=8080
NODE_ENV=production
CORS_ORIGINS=https://your-store.vercel.app,https://your-admin.vercel.app
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_SESSION_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_UPLOAD_PRESET=
```

### Store (Vercel) — no DB, no admin secrets

```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_SITE_URL=https://your-store.vercel.app
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

### Admin (Vercel) — no DB

```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_SITE_URL=https://your-store.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

---

## 6. Deployment Steps

### Railway (API)
1. New project from GitHub repo
2. Root directory: `apps/api`
3. Set env vars (see `apps/api/.env.example`)
4. Health check path: `/health`
5. Run migrations: `npm run db:migrate -w indiantreks` from repo root (or CI job)

### Vercel Store
1. Root directory: `.` (interim) → `apps/store` (after Phase 3)
2. `NEXT_PUBLIC_API_URL` → Railway API URL
3. Remove `DATABASE_URL`, `ADMIN_*`, Cloudinary secrets

### Vercel Admin
1. Same as store with admin domain
2. Remove `DATABASE_URL`

---

## 7. Remaining Risks

| Risk | Mitigation |
|------|------------|
| Dual API period (Next + Railway) | Feature flag `NEXT_PUBLIC_API_URL`; migrate endpoints incrementally |
| Stale storefront cache after publish | Admin → storefront revalidation webhook (Phase 4) |
| Trek catalog in static TS | Phase 3+ CMS migration for `data.ts` |
| No payment gateway | Document WhatsApp flow; add gateway in Phase 5 |
| Default admin credentials | Rotate; enforce `verify:production` in CI |

---

## 8. Production Readiness Checklist

See sections 31 in the original architecture spec. Key blockers before calling production-ready:

- [ ] All frontends use Railway API (no direct DB)
- [ ] `DATABASE_URL` removed from Vercel
- [ ] CI passes on every PR
- [ ] Migrations automated in deploy pipeline
- [ ] CORS restricted to known origins
- [ ] Admin secrets rotated; no defaults
- [ ] Rate limiting on auth + public POST

---

*Last updated: Phase 2 foundation — `apps/api` + monorepo workspaces.*
