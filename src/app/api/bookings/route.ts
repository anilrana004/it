import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse } from '@/lib/api/responses';
import { isDbConfigured } from '@/lib/db';
import { createBooking } from '@/lib/operations/service';

export async function POST(req: NextRequest) {
  if (!isDbConfigured()) return dbUnavailableResponse();

  try {
    const body = await req.json();
    const { trekId, trekTitle, name, email, phone, package: pkg, persons, date, payment, amount, notes } =
      body;

    if (!name || !email || !phone || !trekId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const booking = await createBooking({
      trekId,
      trekTitle: trekTitle ?? trekId,
      name,
      email,
      phone,
      package: pkg || 'Standard',
      persons: persons || 1,
      date: date || '',
      payment: payment || 'deposit',
      amount: amount || 0,
      notes: notes || '',
    });

    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
