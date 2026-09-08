import { NextResponse } from 'next/server';
import { googleRedirectUri, isGoogleAuthConfigured } from '@/lib/user-auth/google';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const origin = `${url.protocol}//${url.host}`;
  return NextResponse.json({
    google: isGoogleAuthConfigured(),
    emailPassword: true,
    /** Exact value Google must allow (Authorized redirect URIs). */
    redirectUri: googleRedirectUri(origin),
  });
}
