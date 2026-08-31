import { NextResponse } from 'next/server';
import { dbUnavailableResponse, requireAdmin, unauthorizedResponse } from '@/lib/admin/auth';
import { isDbConfigured } from '@/lib/db';
import { listBookings, listContacts, listGiftCards, listSiteUsers, listSubscribers } from '@/lib/operations/service';

export async function GET() {
  const admin = await requireAdmin();
  if (!admin) return unauthorizedResponse();
  if (!isDbConfigured()) return dbUnavailableResponse();

  const [allBookings, allContacts, allSubscribers, allGiftCards, allUsers] = await Promise.all([
    listBookings(),
    listContacts(),
    listSubscribers(),
    listGiftCards(),
    listSiteUsers(),
  ]);

  return NextResponse.json({
    bookings: allBookings.length,
    contacts: allContacts.length,
    subscribers: allSubscribers.length,
    giftCards: allGiftCards.length,
    users: allUsers.length,
    recentBookings: allBookings.slice(0, 5),
  });
}
