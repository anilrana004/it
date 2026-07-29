import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/admin/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    const result = addSubscriber(email);
    if (!result) {
      return NextResponse.json({ error: 'Already subscribed' }, { status: 409 });
    }
    return NextResponse.json(result, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
