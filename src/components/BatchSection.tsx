'use client';

import { Calendar, Users, Check, ArrowRight } from 'lucide-react';
import type { TrekBatch } from '@/lib/batches';
import { batchStatusMeta } from '@/lib/batches';

type Props = {
  batches: TrekBatch[];
  selectedId: string | null;
  onSelect: (batch: TrekBatch) => void;
  onBook: (batch: TrekBatch) => void;
  accent?: string;
  tripLabel?: string;
};

export default function BatchSection({
  batches,
  selectedId,
  onSelect,
  onBook,
  accent = '#16a34a',
  tripLabel = 'trip',
}: Props) {
  return (
    <section id="batches">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: accent }} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: accent }}>Batches</p>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mt-0.5">Upcoming monthly departures</h2>
        </div>
      </div>

      <p className="text-gray-500 text-sm mb-6 leading-relaxed max-w-2xl">
        Five confirmed group batches every month cycle for this {tripLabel}. Pick a departure that fits your calendar - seats update live as groups fill up.
      </p>

      <div className="flex gap-3 overflow-x-auto overscroll-x-contain snap-x snap-mandatory scrollbar-none pb-2 max-w-full lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        {batches.map((batch, index) => {
          const selected = selectedId === batch.id;
          const soldOut = batch.status === 'sold-out';
          const meta = batchStatusMeta[batch.status];
          const fillPct = Math.round(((batch.capacity - batch.seatsLeft) / batch.capacity) * 100);

          return (
            <button
              key={batch.id}
              type="button"
              disabled={soldOut}
              onClick={() => onSelect(batch)}
              className={`snap-start shrink-0 w-[min(220px,85%)] lg:w-auto lg:max-w-none text-left rounded-2xl border-2 p-4 transition-all ${
                soldOut
                  ? 'border-gray-100 bg-gray-50 opacity-70 cursor-not-allowed'
                  : selected
                    ? 'border-[#16a34a] bg-[#16a34a]/5 shadow-md'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Batch {index + 1}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.className}`}>{meta.label}</span>
              </div>

              <p className="text-xs font-semibold text-gray-500 mb-1">{batch.monthLabel}</p>
              <p className="font-bold text-sm text-gray-900 leading-snug mb-1">{batch.label}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-gray-400 mb-4">
                <Calendar className="w-3 h-3" /> Starts {batch.weekday}
              </p>

              <div className="mb-2">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="flex items-center gap-1 text-gray-500">
                    <Users className="w-3 h-3" />
                    {soldOut ? 'No seats left' : `${batch.seatsLeft} seats left`}
                  </span>
                  <span className="text-gray-400">{fillPct}% filled</span>
                </div>
                <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${fillPct}%`,
                      backgroundColor: soldOut ? '#9ca3af' : accent,
                    }}
                  />
                </div>
              </div>

              <div className={`mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl ${
                soldOut
                  ? 'bg-gray-100 text-gray-400'
                  : selected
                    ? 'bg-[#16a34a] text-white'
                    : 'bg-gray-50 text-gray-600'
              }`}>
                {soldOut ? (
                  'Unavailable'
                ) : selected ? (
                  <><Check className="w-3.5 h-3.5" /> Selected</>
                ) : (
                  'Select batch'
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedId && (() => {
        const selected = batches.find((b) => b.id === selectedId);
        if (!selected || selected.status === 'sold-out') return null;
        return (
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-[#16a34a]/25 bg-[#16a34a]/5 px-4 py-3.5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#16a34a]">Selected departure</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">{selected.label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{selected.seatsLeft} seats remaining of {selected.capacity}</p>
            </div>
            <button
              type="button"
              onClick={() => onBook(selected)}
              className="inline-flex items-center justify-center gap-2 bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all shrink-0 w-full sm:w-auto"
            >
              Book this batch <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        );
      })()}
    </section>
  );
}
