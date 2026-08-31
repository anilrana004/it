import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { createGiftCard, generateGiftCardCode, listGiftCards } from '@/lib/operations/service';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  const giftCards = await listGiftCards();
  return NextResponse.json({ giftCards });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  try {
    const body = await req.json();
    const amount = Number(body.amount);
    const recipientName = typeof body.recipientName === 'string' ? body.recipientName.trim() : '';
    const recipientEmail = typeof body.recipientEmail === 'string' ? body.recipientEmail.trim() : '';
    const message = typeof body.message === 'string' ? body.message : '';

    if (!amount || amount < 500 || !recipientName || !recipientEmail) {
      return NextResponse.json(
        { error: 'Amount (min 500), recipient name, and email are required' },
        { status: 400 },
      );
    }

    const expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    const giftCard = await createGiftCard({
      code: generateGiftCardCode(),
      amount,
      balance: amount,
      recipientName,
      recipientEmail,
      message,
      expiresAt,
    });

    return NextResponse.json({ giftCard }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
