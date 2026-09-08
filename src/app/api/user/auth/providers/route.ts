import { NextResponse } from 'next/server';
import {
  googleRedirectUri,
  isGoogleAuthConfigured,
  resolveRequestOrigin,
} from '@/lib/user-auth/google';

export async function GET(req: Request) {
  const origin = resolveRequestOrigin(req);
  return NextResponse.json({
    google: isGoogleAuthConfigured(),
    emailPassword: true,
    /** Exact value Google must allow (Authorized redirect URIs). */
    redirectUri: googleRedirectUri(origin),
  });
}
