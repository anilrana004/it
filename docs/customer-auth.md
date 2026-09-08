# Customer auth (storefront member area)

**Status:** Implemented on the Next.js storefront (interim monolith). Admin auth is unchanged.

## What members get after login

| Area | Path | Access |
|------|------|--------|
| Overview | `/user-dashboard` | Signed-in only |
| Upcoming treks | `/user-dashboard/upcoming-treks` | Signed-in only |
| Past treks | `/user-dashboard/past-treks` | Signed-in only |
| Profile | `/user-dashboard/profile` | Signed-in only |
| Compatibility alias | `/user-dashboard/user-upcoming-treks` | Redirects to upcoming |

Public browsing (treks, blogs, contact, etc.) stays open without login.

## Auth flows

1. **Register** `/signup` → first/last name, email, phone (+ country code), DOB, gender, nationality, password → `POST /api/user/auth/register` → httpOnly `user_token` cookie
2. **Login** `/login` → `POST /api/user/auth/login`
3. **Forgot password** `/forgot-password` → creates reset token (dev returns `resetUrl`)
4. **Reset password** `/reset-password?token=…`
5. **Google** `/api/user/auth/google` (requires `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET`, PKCE)
6. **Logout** `POST /api/user/auth/logout`

## Storage

- **Primary:** Postgres `site_users` (+ `password_reset_tokens`, `auth_audit_events`) via migration `0005_customer_auth.sql`
- **Local fallback (non-production):** `data/customer-auth.json` when `DATABASE_URL` is unset
- **Backup:** `npm run auth:backup` → `data/backups/`

## Env

```env
USER_SESSION_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=   # optional; never localhost on Vercel
NEXT_PUBLIC_SITE_URL=  # production canonical origin for OAuth callback
DATABASE_URL=
```

### Production (Vercel) Google checklist

1. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `USER_SESSION_SECRET`, `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL` on the storefront project.
2. Do **not** set `GOOGLE_REDIRECT_URI` to localhost on Vercel.
3. In Google Cloud Console → OAuth Web client, add:
   - Authorized JavaScript origins: `https://www.indiantreks.in` (and apex if used)
   - Authorized redirect URIs: `https://www.indiantreks.in/api/user/auth/google/callback`
4. Run `npm run db:migrate` against the production database once.

## Tests

```bash
npm run auth:smoke
npm run db:migrate   # applies 0005_customer_auth.sql when DATABASE_URL is set
```

## Notes

- Customer cookie is `user_token` (separate from admin `admin_token`).
- Proxy gates `/user-dashboard/*` only; admin routes are untouched.
- This is **Indian Treks** branded auth UX inspired by common trek-operator member flows — not a clone of third-party Keycloak themes or assets.
