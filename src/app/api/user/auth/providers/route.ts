import { NextResponse } from 'next/server';
import { isGoogleAuthConfigured } from '@/lib/user-auth/google';

export async function GET() {
  return NextResponse.json({
    google: isGoogleAuthConfigured(),
    emailPassword: true,
  });
}
