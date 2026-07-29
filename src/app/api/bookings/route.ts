import { NextRequest, NextResponse } from 'next/server';
import { addBooking, getBookings } from '@/lib/admin/store';

export async function GET() {
  return NextResponse.json(getBookings());
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { trekId, trekTitle, name, email, phone, package: pkg, persons, date, payment, amount, notes } = body;
    if (!name || !email || !phone || !trekId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const booking = addBooking({
      trekId, trekTitle, name, email, phone,
      package: pkg || 'Standard', persons: persons || 1, date: date || '',
      payment: payment || 'deposit', amount: amount || 0, status: 'pending', notes: notes || '',
    });
    return NextResponse.json(booking, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
