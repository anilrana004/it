/** Client-side bookings list for My Bookings UI (localStorage). */

const KEY = 'trekroot_my_bookings';
const SEEDED = 'trekroot_my_bookings_seeded';

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled';

export type MyBooking = {
  id: string;
  trekId: string;
  packageName: string;
  persons: number;
  travelDate: string;
  bookedAt: string;
  amountPaid: number;
  totalAmount: number;
  status: BookingStatus;
  paymentType: 'deposit' | 'full' | 'partial';
};

function read(): MyBooking[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: MyBooking[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('trekroot:bookings'));
}

/** Seed a couple of realistic demo bookings once, so the page isn't empty on first visit. */
export function ensureDemoBookings() {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(SEEDED)) return;
  const demo: MyBooking[] = [
    {
      id: 'TR-BK-78421',
      trekId: 'valley-of-flowers',
      packageName: 'Standard',
      persons: 2,
      travelDate: '2026-09-12',
      bookedAt: '2026-07-18',
      amountPaid: 4499 * 2,
      totalAmount: 8999 * 2,
      status: 'upcoming',
      paymentType: 'deposit',
    },
    {
      id: 'TR-BK-76103',
      trekId: 'kedarkantha',
      packageName: 'Standard',
      persons: 1,
      travelDate: '2026-02-10',
      bookedAt: '2026-01-05',
      amountPaid: 6999,
      totalAmount: 6999,
      status: 'completed',
      paymentType: 'full',
    },
  ];
  write(demo);
  localStorage.setItem(SEEDED, '1');
}

export function getMyBookings(): MyBooking[] {
  ensureDemoBookings();
  return read().sort((a, b) => b.bookedAt.localeCompare(a.bookedAt));
}

export function cancelMyBooking(id: string) {
  const items = read().map(b => (b.id === id ? { ...b, status: 'cancelled' as const } : b));
  write(items);
}
