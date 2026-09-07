'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Mountain } from 'lucide-react';
import type { Booking } from '@/lib/operations/types';

export default function UserDashboardPage() {
  const [upcoming, setUpcoming] = useState<Booking[]>([]);
  const [counts, setCounts] = useState({ all: 0, upcoming: 0, past: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/user/bookings', { credentials: 'include', cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return;
        const body = (await res.json()) as {
          upcoming: Booking[];
          counts: { all: number; upcoming: number; past: number };
        };
        setUpcoming(body.upcoming.slice(0, 3));
        setCounts(body.counts);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'All bookings', value: counts.all },
          { label: 'Upcoming', value: counts.upcoming },
          { label: 'Past', value: counts.past },
        ].map((card) => (
          <div key={card.label} className="rounded-2xl border border-[#d8e8dc] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{ready ? card.value : '—'}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-[#d8e8dc] bg-white p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-slate-900">Upcoming treks</h2>
          <Link
            href="/user-dashboard/upcoming-treks"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#16a34a] hover:text-[#15803d]"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {!ready ? (
          <p className="text-sm text-slate-500">Loading bookings…</p>
        ) : upcoming.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
            <CalendarDays className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-700">No upcoming treks yet</p>
            <p className="mt-1 text-sm text-slate-500">Browse treks and book your next adventure.</p>
            <Link
              href="/treks"
              className="mt-4 inline-flex rounded-full bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#15803d]"
            >
              Explore treks
            </Link>
          </div>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((b) => (
              <li key={b.id} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <Mountain className="mt-0.5 h-5 w-5 shrink-0 text-[#16a34a]" />
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900">{b.trekTitle}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {b.date || 'Date TBA'} · {b.persons} {b.persons === 1 ? 'person' : 'persons'} · {b.status}
                  </p>
                </div>
                <Link href={`/treks/${b.trekId}`} className="text-sm font-semibold text-[#16a34a]">
                  Open
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
