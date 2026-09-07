import { NextResponse } from 'next/server';
import {
  isCustomerAuthStoreReady,
  recordAuthEvent,
  resetPasswordWithToken,
} from '@/lib/user-auth/service';
import { validatePassword } from '@/lib/user-auth/validation';

export async function POST(req: Request) {
  if (!isCustomerAuthStoreReady()) {
    return NextResponse.json({ error: 'Authentication store unavailable.' }, { status: 503 });
  }

  try {
    const body = await req.json();
    const token = typeof body.token === 'string' ? body.token : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!token) {
      return NextResponse.json({ error: 'Reset token is required.' }, { status: 400 });
    }

    const passwordErr = validatePassword(password);
    if (passwordErr) {
      return NextResponse.json({ error: passwordErr, fieldErrors: { password: passwordErr } }, { status: 400 });
    }

    const result = await resetPasswordWithToken(token, password);
    if ('error' in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    await recordAuthEvent({
      event: 'password_reset_completed',
      ip: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || null,
      userAgent: req.headers.get('user-agent'),
    });

    return NextResponse.json({ success: true, message: 'Password updated. You can sign in now.' });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
