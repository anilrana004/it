import { createHash, randomBytes } from 'node:crypto';

function isLocalhostUri(value: string): boolean {
  return /^(https?:\/\/)?(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/i.test(value);
}

/** Public browser origin (Vercel-safe: honors x-forwarded-*). */
export function resolveRequestOrigin(req: Request): string {
  const url = new URL(req.url);
  const forwardedHost = req.headers.get('x-forwarded-host')?.split(',')[0]?.trim();
  const host = forwardedHost || req.headers.get('host') || url.host;
  const forwardedProto = req.headers.get('x-forwarded-proto')?.split(',')[0]?.trim();
  const proto = (forwardedProto || url.protocol.replace(':', '') || 'https').replace(/:$/, '');
  return `${proto}://${host}`;
}

export function isGoogleAuthConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim());
}

/**
 * Canonical Google redirect URI.
 * Production prefers GOOGLE_REDIRECT_URI (non-localhost) or NEXT_PUBLIC_SITE_URL
 * so authorize + token exchange stay identical behind Vercel proxies.
 */
export function googleRedirectUri(origin: string): string {
  const configured = process.env.GOOGLE_REDIRECT_URI?.trim();
  const isProd = process.env.NODE_ENV === 'production';

  if (configured) {
    if (!(isProd && isLocalhostUri(configured))) {
      return configured.replace(/\/$/, '');
    }
  }

  if (isProd) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '');
    if (siteUrl && !isLocalhostUri(siteUrl)) {
      return `${siteUrl}/api/user/auth/google/callback`;
    }
  }

  return `${origin.replace(/\/$/, '')}/api/user/auth/google/callback`;
}

export function createOAuthState(): string {
  return randomBytes(24).toString('base64url');
}

export function createPkcePair(): { verifier: string; challenge: string } {
  const verifier = randomBytes(32).toString('base64url');
  const challenge = createHash('sha256').update(verifier).digest('base64url');
  return { verifier, challenge };
}

export function buildGoogleAuthorizeUrl(input: {
  redirectUri: string;
  state: string;
  codeChallenge: string;
}): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
    redirect_uri: input.redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state: input.state,
    code_challenge: input.codeChallenge,
    code_challenge_method: 'S256',
    access_type: 'online',
    prompt: 'select_account',
  });
  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function readGoogleError(res: Response, fallback: string): Promise<string> {
  try {
    const body = (await res.json()) as { error?: string; error_description?: string };
    const parts = [body.error, body.error_description].filter(Boolean);
    if (parts.length) return `${fallback}: ${parts.join(' — ')}`;
  } catch {
    // ignore non-JSON error bodies
  }
  return `${fallback} (HTTP ${res.status})`;
}

export async function exchangeGoogleCode(input: {
  redirectUri: string;
  code: string;
  codeVerifier: string;
}): Promise<{
  sub: string;
  email: string;
  name: string;
  picture?: string;
  email_verified?: boolean;
}> {
  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
      client_secret: process.env.GOOGLE_CLIENT_SECRET!.trim(),
      code: input.code,
      code_verifier: input.codeVerifier,
      grant_type: 'authorization_code',
      redirect_uri: input.redirectUri,
    }),
  });

  if (!tokenRes.ok) {
    throw new Error(await readGoogleError(tokenRes, 'Google token exchange failed'));
  }

  const tokenJson = (await tokenRes.json()) as { access_token?: string; id_token?: string };
  if (!tokenJson.access_token) throw new Error('Missing Google access token');

  const profileRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` },
  });
  if (!profileRes.ok) {
    throw new Error(await readGoogleError(profileRes, 'Google profile fetch failed'));
  }

  const profile = (await profileRes.json()) as {
    sub: string;
    email: string;
    name?: string;
    picture?: string;
    email_verified?: boolean;
  };

  if (!profile.sub || !profile.email) throw new Error('Incomplete Google profile');
  if (profile.email_verified === false) {
    throw new Error('Google account email is not verified');
  }

  return {
    sub: profile.sub,
    email: profile.email,
    name: profile.name || profile.email.split('@')[0]!,
    picture: profile.picture,
    email_verified: profile.email_verified,
  };
}
