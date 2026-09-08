import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { USER_COOKIE } from '@/lib/user-auth/constants';
import { exchangeGoogleCode } from '@/lib/user-auth/google';
import { recordAuthEvent, upsertGoogleUser } from '@/lib/user-auth/service';
import { createUserSessionToken, userSessionCookieOptions } from '@/lib/user-auth/session';

function clearOauthCookies(response: NextResponse) {
  const clear = { httpOnly: true, path: '/', maxAge: 0 };
  response.cookies.set('google_oauth_state', '', clear);
  response.cookies.set('google_oauth_verifier', '', clear);
  response.cookies.set('google_oauth_return', '', clear);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  const cookieStore = await cookies();
  const expectedState = cookieStore.get('google_oauth_state')?.value;
  const verifier = cookieStore.get('google_oauth_verifier')?.value;
  const returnTo = cookieStore.get('google_oauth_return')?.value || '/user-dashboard';

  if (error) {
    const res = NextResponse.redirect(new URL(`/login?error=google_denied`, origin));
    clearOauthCookies(res);
    return res;
  }

  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    const res = NextResponse.redirect(new URL(`/login?error=google_state`, origin));
    clearOauthCookies(res);
    return res;
  }

  try {
    const profile = await exchangeGoogleCode({ origin, code, codeVerifier: verifier });
    const user = await upsertGoogleUser({
      googleSub: profile.sub,
      email: profile.email,
      name: profile.name,
      avatarUrl: profile.picture,
    });

    const token = await createUserSessionToken(user.id, user.email);
    const res = NextResponse.redirect(new URL(returnTo, origin));
    res.cookies.set(USER_COOKIE, token, userSessionCookieOptions());
    clearOauthCookies(res);

    await recordAuthEvent({
      userId: user.id,
      email: user.email,
      event: 'google_login_success',
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      userAgent: req.headers.get('user-agent'),
    });

    return res;
  } catch (err) {
    console.error('[google-oauth] callback failed', err);
    const res = NextResponse.redirect(new URL(`/login?error=google_failed`, origin));
    clearOauthCookies(res);
    return res;
  }
}
