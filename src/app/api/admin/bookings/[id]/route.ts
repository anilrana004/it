import { NextRequest, NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { updateBookingStatus } from '@/lib/operations/service';
import type { BookingStatus } from '@/lib/operations/types';

type Params = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, { params }: Params) {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  const { id } = await params;

  try {
    const body = await req.json();
    const status = body.status as BookingStatus;

    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    const booking = await updateBookingStatus(id, status);
    if (!booking) return NextResponse.json({ error: 'Booking not found' }, { status: 404 });

    return NextResponse.json({ booking });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
