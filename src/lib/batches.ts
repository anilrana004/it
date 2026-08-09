import type { Trek } from '@/lib/data';

export type BatchStatus = 'available' | 'filling-fast' | 'almost-full' | 'sold-out';

export interface TrekBatch {
  id: string;
  startDate: string;
  endDate: string;
  label: string;
  monthLabel: string;
  weekday: string;
  seatsLeft: number;
  capacity: number;
  status: BatchStatus;
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Stable 0..n-1 hash from trek id (keeps seats/status consistent per trek). */
function hashId(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toISO(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function addDays(d: Date, days: number) {
  const next = new Date(d);
  next.setDate(next.getDate() + days);
  return next;
}

function formatRange(start: Date, end: Date) {
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${pad(start.getDate())} - ${pad(end.getDate())} ${MONTHS_SHORT[start.getMonth()]} ${start.getFullYear()}`;
  }
  return `${pad(start.getDate())} ${MONTHS_SHORT[start.getMonth()]} - ${pad(end.getDate())} ${MONTHS_SHORT[end.getMonth()]} ${end.getFullYear()}`;
}

function statusFromSeats(seatsLeft: number, capacity: number): BatchStatus {
  if (seatsLeft <= 0) return 'sold-out';
  const ratio = seatsLeft / capacity;
  if (ratio <= 0.2) return 'almost-full';
  if (ratio <= 0.45) return 'filling-fast';
  return 'available';
}

/**
 * Builds 5 upcoming monthly departure batches for any trek / yatra / international trip.
 * Start days rotate by trek so listings feel distinct but stay deterministic.
 */
export function getMonthlyBatches(trek: Trek, count = 5): TrekBatch[] {
  const tripDays = Math.max(trek.days || 1, 1);
  const seed = hashId(trek.id);
  const startDayOptions = [5, 8, 12, 15, 18, 22];
  const capacity = 20 + (seed % 5) * 2; // 20-28

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const batches: TrekBatch[] = [];
  let monthOffset = 0;

  while (batches.length < count && monthOffset < 18) {
    const startDay = startDayOptions[(seed + batches.length) % startDayOptions.length];
    const start = new Date(today.getFullYear(), today.getMonth() + monthOffset, startDay);
    monthOffset += 1;

    // Skip dates that already passed in the current month
    if (start < today) continue;

    const end = addDays(start, tripDays - 1);
    const seatsLeft = Math.max(0, capacity - ((seed + batches.length * 7) % (capacity + 1)));
    const status = statusFromSeats(seatsLeft, capacity);

    batches.push({
      id: `${trek.id}-${toISO(start)}`,
      startDate: toISO(start),
      endDate: toISO(end),
      label: formatRange(start, end),
      monthLabel: `${MONTHS[start.getMonth()]} ${start.getFullYear()}`,
      weekday: WEEKDAYS[start.getDay()],
      seatsLeft,
      capacity,
      status,
    });
  }

  return batches;
}

export const batchStatusMeta: Record<BatchStatus, { label: string; className: string }> = {
  available: { label: 'Available', className: 'bg-emerald-50 text-emerald-700' },
  'filling-fast': { label: 'Filling Fast', className: 'bg-amber-50 text-amber-700' },
  'almost-full': { label: 'Almost Full', className: 'bg-orange-50 text-orange-700' },
  'sold-out': { label: 'Sold Out', className: 'bg-gray-100 text-gray-500' },
};
