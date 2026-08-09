import { redirect } from 'next/navigation';

/** Bare `/booking` → My Bookings list. Trip booking flow lives at `/booking/[id]`. */
export default function BookingIndexRedirect() {
  redirect('/bookings');
}
