# Store Frontend (Vercel)

Customer-facing Next.js app. Deploy from **repository root** until Phase 3b file move completes.

## Vercel settings

| Setting | Value |
|---------|--------|
| Root Directory | `.` (repo root) |
| Framework | Next.js |
| Build Command | `npm run build` |
| Install Command | `npm install` |

## Required environment variables

```env
APP_ROLE=storefront
NEXT_PUBLIC_API_URL=https://your-api.railway.app
NEXT_PUBLIC_SITE_URL=https://your-store.vercel.app
NEXT_PUBLIC_MAPBOX_TOKEN=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

## Do NOT set on store

- `DATABASE_URL` — backend only (Railway)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_SESSION_SECRET`
- `CLOUDINARY_API_SECRET`

## Local dev

```bash
# From repo root — storefront only
APP_ROLE=storefront npm run dev

# With Railway API
NEXT_PUBLIC_API_URL=http://localhost:8080 APP_ROLE=storefront npm run dev
npm run dev:api   # separate terminal
```
