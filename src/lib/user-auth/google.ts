import { createHash, randomBytes } from 'node:crypto';

export function isGoogleAuthConfigured(): boolean {
  return Boolean(process.env.GOOGLE_CLIENT_ID?.trim() && process.env.GOOGLE_CLIENT_SECRET?.trim());
}

export function googleRedirectUri(origin: string): string {
  const configured = process.env.GOOGLE_REDIRECT_URI?.trim();
  if (configured) return configured;
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
  origin: string;
  state: string;
  codeChallenge: string;
}): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!.trim(),
    redirect_uri: googleRedirectUri(input.origin),
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

export async function exchangeGoogleCode(input: {
  origin: string;
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
      redirect_uri: googleRedirectUri(input.origin),
    }),
  });

  if (!tokenRes.ok) {
    throw new Error('Google token exchange failed');
  }

  const tokenJson = (await tokenRes.json()) as { access_token?: string; id_token?: string };
  if (!tokenJson.access_token) throw new Error('Missing Google access token');

  const profileRes = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${tokenJson.access_token}` },
  });
  if (!profileRes.ok) throw new Error('Google profile fetch failed');

  const profile = (await profileRes.json()) as {
    sub: string;
    email: string;
    name?: string;
    picture?: string;
    email_verified?: boolean;
  };

  if (!profile.sub || !profile.email) throw new Error('Incomplete Google profile');

  return {
    sub: profile.sub,
    email: profile.email,
    name: profile.name || profile.email.split('@')[0]!,
    picture: profile.picture,
    email_verified: profile.email_verified,
  };
}
