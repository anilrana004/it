'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Booking } from '@/lib/operations/types';

function BookingList({ filter }: { filter: 'upcoming' | 'past' }) {
  const [items, setItems] = useState<Booking[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/user/bookings', { credentials: 'include', cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return;
        const body = (await res.json()) as { upcoming: Booking[]; past: Booking[] };
        setItems(filter === 'upcoming' ? body.upcoming : body.past);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, [filter]);

  if (!ready) return <p className="text-sm text-slate-500">Loading…</p>;

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center">
        <p className="text-sm font-medium text-slate-700">
          {filter === 'upcoming' ? 'No upcoming treks' : 'No past treks yet'}
        </p>
        <Link href="/treks" className="mt-3 inline-block text-sm font-semibold text-[#16a34a]">
          Browse treks
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((b) => (
        <li key={b.id} className="rounded-2xl border border-[#d8e8dc] bg-white p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900">{b.trekTitle}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {b.date || 'Date TBA'} · {b.package} · {b.persons} guest{b.persons === 1 ? '' : 's'}
              </p>
              <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{b.status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900">₹{b.amount.toLocaleString('en-IN')}</p>
              <Link href={`/treks/${b.trekId}`} className="mt-2 inline-block text-sm font-semibold text-[#16a34a]">
                View trek
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function UpcomingTreksPage() {
  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-slate-900">Upcoming treks</h2>
      <BookingList filter="upcoming" />
    </div>
  );
}
