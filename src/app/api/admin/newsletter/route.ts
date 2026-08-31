import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { addSubscriber, listSubscribers } from '@/lib/operations/service';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  const subscribers = await listSubscribers();
  return NextResponse.json({ subscribers });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  try {
    const body = await req.json();
    const email = typeof body.email === 'string' ? body.email.trim() : '';

    if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

    const subscriber = await addSubscriber(email);
    if (!subscriber) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
    }

    return NextResponse.json({ subscriber }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
