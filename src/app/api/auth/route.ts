import { NextResponse } from 'next/server';
import { adminSessionCookieOptions, createAdminSessionToken } from '@/lib/admin/session';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@indiantreks.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';
    const password = typeof body.password === 'string' ? body.password : '';

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = await createAdminSessionToken(email);
      const response = NextResponse.json({
        success: true,
        user: { email, name: 'Admin', role: 'admin' },
      });
      response.cookies.set('admin_token', token, adminSessionCookieOptions());
      return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_token', '', { ...adminSessionCookieOptions(), maxAge: 0 });
  return response;
}
