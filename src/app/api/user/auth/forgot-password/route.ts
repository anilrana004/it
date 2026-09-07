import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';
import {
  createPasswordResetToken,
  isCustomerAuthStoreReady,
  recordAuthEvent,
} from '@/lib/user-auth/service';
import { validateEmail } from '@/lib/user-auth/validation';

export async function POST(req: Request) {
  if (!isCustomerAuthStoreReady()) {
    return NextResponse.json({ error: 'Authentication store unavailable.' }, { status: 503 });
  }

  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email : '';
    const emailErr = validateEmail(email);
    if (emailErr) {
      return NextResponse.json({ error: emailErr, fieldErrors: { email: emailErr } }, { status: 400 });
    }

    const created = await createPasswordResetToken(email);
    const payload: { success: true; message: string; resetUrl?: string } = {
      success: true,
      message: 'If an account exists for that email, a reset link has been created.',
    };

    if (created) {
      const origin = process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL;
      const resetUrl = `${origin.replace(/\/$/, '')}/reset-password?token=${created.rawToken}`;
      // Dev/local: expose reset URL so flow is testable without an email provider.
      if (process.env.NODE_ENV !== 'production') {
        payload.resetUrl = resetUrl;
        console.info('[user-auth] Password reset URL:', resetUrl);
      }

      await recordAuthEvent({
        userId: created.userId,
        email: email.trim().toLowerCase(),
        event: 'password_reset_requested',
        ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
        userAgent: req.headers.get('user-agent'),
        meta: process.env.NODE_ENV === 'production' ? '' : 'dev_reset_url_logged',
      });
    }

    return NextResponse.json(payload);
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
