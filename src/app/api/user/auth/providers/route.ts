import { NextResponse } from 'next/server';
import { databaseUrlSource, isDbConfigured } from '@/lib/db';
import {
  googleRedirectUri,
  isGoogleAuthConfigured,
  resolveRequestOrigin,
} from '@/lib/user-auth/google';
import { isCustomerAuthStoreReady } from '@/lib/user-auth/service';

export async function GET(req: Request) {
  const origin = resolveRequestOrigin(req);
  return NextResponse.json({
    google: isGoogleAuthConfigured(),
    emailPassword: true,
    storeReady: isCustomerAuthStoreReady(),
    dbConfigured: isDbConfigured(),
    dbEnvKey: databaseUrlSource(),
    /** Exact value Google must allow (Authorized redirect URIs). */
    redirectUri: googleRedirectUri(origin),
  });
}
