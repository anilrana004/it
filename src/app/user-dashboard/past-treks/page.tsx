'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Booking } from '@/lib/operations/types';

export default function PastTreksPage() {
  const [items, setItems] = useState<Booking[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch('/api/user/bookings', { credentials: 'include', cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return;
        const body = (await res.json()) as { past: Booking[] };
        setItems(body.past);
        setReady(true);
      })
      .catch(() => setReady(true));
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold text-slate-900">Past treks</h2>
      {!ready ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-10 text-center">
          <p className="text-sm font-medium text-slate-700">No past treks yet</p>
          <Link href="/treks" className="mt-3 inline-block text-sm font-semibold text-[#16a34a]">
            Browse treks
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {items.map((b) => (
            <li key={b.id} className="rounded-2xl border border-[#d8e8dc] bg-white p-5">
              <h3 className="font-bold text-slate-900">{b.trekTitle}</h3>
              <p className="mt-1 text-sm text-slate-600">
                {b.date || 'Date TBA'} · {b.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
