import { NextResponse } from 'next/server';
import {
  buildGoogleAuthorizeUrl,
  createOAuthState,
  createPkcePair,
  isGoogleAuthConfigured,
} from '@/lib/user-auth/google';

export async function GET(req: Request) {
  if (!isGoogleAuthConfigured()) {
    return NextResponse.json(
      { error: 'Google sign-in is not configured. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.' },
      { status: 503 },
    );
  }

  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;
  const returnTo = url.searchParams.get('returnTo') || '/user-dashboard';
  const state = createOAuthState();
  const { verifier, challenge } = createPkcePair();

  const response = NextResponse.redirect(
    buildGoogleAuthorizeUrl({ origin, state, codeChallenge: challenge }),
  );

  response.cookies.set('google_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  response.cookies.set('google_oauth_verifier', verifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  response.cookies.set('google_oauth_return', returnTo.startsWith('/') ? returnTo : '/user-dashboard', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });

  return response;
}
