import { NextResponse } from 'next/server';
import { clearUserSession, getCurrentUser } from '@/lib/user-auth/auth';
import { recordAuthEvent } from '@/lib/user-auth/service';

export async function POST(req: Request) {
  const user = await getCurrentUser();
  const response = NextResponse.json({ success: true });
  clearUserSession(response);

  if (user) {
    await recordAuthEvent({
      userId: user.id,
      email: user.email,
      event: 'logout',
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      userAgent: req.headers.get('user-agent'),
    });
  }

  return response;
}

export async function DELETE(req: Request) {
  return POST(req);
}
