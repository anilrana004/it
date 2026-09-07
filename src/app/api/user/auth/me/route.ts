import { NextResponse } from 'next/server';
import { getCurrentUser, unauthorizedUserResponse } from '@/lib/user-auth/auth';
import { isGoogleAuthConfigured } from '@/lib/user-auth/google';

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorizedUserResponse();
  return NextResponse.json({
    user,
    providers: { google: isGoogleAuthConfigured() },
  });
}
