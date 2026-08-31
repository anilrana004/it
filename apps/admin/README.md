# Admin Frontend (Vercel)

Admin console — separate Vercel project, same repo as store.

## Vercel settings

| Setting | Value |
|---------|--------|
| Root Directory | `.` (repo root) |
| Framework | Next.js |
| Build Command | `npm run build` |
| Install Command | `npm install` |

## Required environment variables

```env
APP_ROLE=admin
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_SITE_URL=https://your-store.vercel.app
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

## Do NOT set on admin (after Phase 3 wiring)

- `DATABASE_URL` — use Railway API for operations (bookings, contacts, etc.)
- Blog CMS still uses local `/api/admin/posts` until blog routes migrate to Railway (Phase 3b)

## Login

```
https://<admin-url>/admin-360f71bc8e5da924/login
```

Cross-origin auth: when `NEXT_PUBLIC_API_URL` is set, login stores a Bearer token in `sessionStorage`.

## Local dev

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080 APP_ROLE=admin npm run dev -p 3001
npm run dev:api
```
