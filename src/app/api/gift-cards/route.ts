import { NextRequest, NextResponse } from 'next/server';
import { addGiftCard, getGiftCards } from '@/lib/admin/store';

export async function GET() {
  return NextResponse.json(getGiftCards());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, recipientName, recipientEmail, message } = body;
    if (!amount || !recipientName || !recipientEmail) {
      return NextResponse.json({ error: 'Amount, recipient name, and email are required' }, { status: 400 });
    }
    const code = 'TR' + Math.random().toString(36).substring(2, 10).toUpperCase();
    const card = addGiftCard({
      code, amount, balance: amount,
      recipientName, recipientEmail, message: message || '',
      status: 'active',
      expiresAt: new Date(Date.now() + 365*24*60*60*1000).toISOString(),
    });
    return NextResponse.json(card, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
