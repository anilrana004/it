# New Phase 7 — AI Assist + Analytics + Performance + Security + Final Hardening (Complete)

**Date:** August 31, 2026  
**Status:** ✅ Complete  
**Build:** `npm run build` passes

---

## Objective

Close the 7-phase plan with production hardening: signed admin sessions, assistive editorial AI (never auto-publish), public API limits, XSS/URL validation, security headers, performance indexes, analytics scaffold, and deploy verification scripts.

---

## What Changed

### 1. Admin authentication (signed sessions)

| File | Change |
|------|--------|
| `src/lib/admin/session.ts` | HMAC-signed session tokens (email + expiry + signature) |
| `src/lib/admin/auth.ts` | Validates signed tokens via `verifyAdminSessionToken` |
| `src/app/api/auth/route.ts` | `POST` login issues signed cookie; `DELETE` logout clears it |
| `src/components/AdminSidebar.tsx` | Sign Out button calls `DELETE /api/auth` |

**Cookie:** `admin_token` — httpOnly, sameSite=lax, 24h TTL.

**Env:** Set `ADMIN_SESSION_SECRET` (32+ chars) in production. Dev falls back to `ADMIN_PASSWORD`.

> Re-login required once after deploy — legacy `admin_token=authenticated` cookies are rejected.

### 2. Editorial assistant (assistive only)

| File | Purpose |
|------|---------|
| `src/lib/admin/editorial-suggestions.ts` | Rule-based SEO, tag, entity, link, AEO, freshness suggestions |
| `src/app/api/admin/posts/suggestions/route.ts` | Admin POST endpoint |
| `src/components/admin/blog/AdminEditorialSuggestions.tsx` | “Get suggestions” panel with Apply |
| `AdminBlogEditor.tsx` | Integrated panel + apply handler |

Suggestions cover: SEO title/description, tags, related entities, internal trek links, quick answer draft, fact-check date. **Nothing is auto-saved or auto-published.**

### 3. Security hardening

| Area | Implementation |
|------|----------------|
| Security headers | `next.config.ts` — X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy |
| URL validation | `src/lib/security/urls.ts` — blocks `javascript:` / `data:` schemes |
| Post validation | `validate.ts` — canonical, featured image, and source URLs |
| Markdown XSS | `BlogMarkdown.tsx` — only `/`, `http(s):`, `mailto:` links rendered |
| Public API | `/api/public/posts` — clamped limits (max 50), Cache-Control headers |

### 4. Performance

**Migration `0003_performance_indexes.sql`:**
- `post_sources_post_id_idx`
- `posts_slug_status_idx` (partial, published only)

```bash
npm run db:migrate
```

### 5. Analytics scaffold

`src/lib/analytics/config.ts` — GA4/GSC env placeholders. No tracking scripts injected until IDs are wired.

**Env (optional):**
```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
NEXT_PUBLIC_GSC_SITE_URL=
```

### 6. Verification scripts

| Script | Command | Purpose |
|--------|---------|---------|
| Foundation + authority tables | `npm run db:verify` | DB tables, seed counts, entity placement |
| Production readiness | `npm run verify:production` | Session secret, password strength, site URL, DATABASE_URL |

---

## Pre-deploy checklist

```bash
# 1. Migrate (includes Phase 7 indexes)
npm run db:migrate

# 2. Seed if fresh DB
npm run db:seed

# 3. Verify database
npm run db:verify

# 4. Verify production env (set NODE_ENV=production or run on Vercel)
npm run verify:production

# 5. Build
npm run build
```

**Required production env:**
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` (strong, non-default)
- `ADMIN_SESSION_SECRET` (32+ random chars)
- `DATABASE_URL`
- `NEXT_PUBLIC_SITE_URL=https://www.indiantreks.in`

---

## Architecture (unchanged)

```
ADMIN → PostgreSQL → adapter.ts → STOREFRONT
         ↑
    static fallback (blog.ts, travel-news.ts) when DATABASE_URL unset
```

---

## 7-phase plan — complete

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Foundation (registry, validation, revalidation) | ✅ |
| 2 | Publishing core (CRUD, pagination, seed) | ✅ |
| 3 | Admin editorial workflow (DB-backed editor) | ✅ |
| 4 | Storefront + content distribution | ✅ |
| 5 | SEO + AEO + GEO + structured data | ✅ |
| 6 | Content authority + sources + freshness | ✅ |
| 7 | AI assist + analytics + security + hardening | ✅ |

---

## Not in scope (future)

- LLM-backed editorial assistant (current engine is deterministic rules)
- GA4/GSC script injection (scaffold only)
- Rate limiting middleware (rely on platform/Vercel limits for now)
- Multi-admin RBAC
