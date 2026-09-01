'use client';

import type { ReactNode } from 'react';
import { Bot, MapPin, CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import {
  evaluateAeoReadiness,
  evaluateGeoReadiness,
  type OptimizationItem,
} from '@/lib/admin/content-optimization';
import type { EditorFormState } from '@/lib/admin/blog-api';

type Props = {
  form: EditorFormState;
};

function StatusIcon({ status }: { status: OptimizationItem['status'] }) {
  if (status === 'pass') return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />;
  if (status === 'warn') return <AlertCircle className="h-3.5 w-3.5 text-amber-500 shrink-0" />;
  return <Circle className="h-3.5 w-3.5 text-gray-300 shrink-0" />;
}

function scoreColor(score: number) {
  if (score >= 80) return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (score >= 50) return 'text-amber-800 bg-amber-50 border-amber-200';
  return 'text-red-700 bg-red-50 border-red-200';
}

function ScoreBlock({
  title,
  icon,
  score,
  items,
}: {
  title: string;
  icon: ReactNode;
  score: number;
  items: OptimizationItem[];
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold text-slate-900 inline-flex items-center gap-1.5">
          {icon}
          {title}
        </p>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${scoreColor(score)}`}>
          {score}%
        </span>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="flex items-start gap-2 text-xs">
            <StatusIcon status={item.status} />
            <div>
              <p className="font-semibold text-slate-800">{item.label}</p>
              <p className="text-slate-500 mt-0.5">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AdminAeoGeoReadiness({ form }: Props) {
  const aeo = evaluateAeoReadiness(form);
  const geo = evaluateGeoReadiness(form);
  const combined = Math.round((aeo.score + geo.score) / 2);

  return (
    <div className="rounded-xl border border-teal-200 bg-teal-50/50 p-4 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-teal-950">AEO &amp; GEO readiness</p>
          <p className="text-[11px] text-teal-800/80 mt-0.5">
            Answer engines &amp; generative / geographic search
          </p>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${scoreColor(combined)}`}
        >
          {combined}%
        </span>
      </div>

      <ScoreBlock
        title="AEO — Answer engines"
        icon={<Bot className="h-3.5 w-3.5 text-teal-700" />}
        score={aeo.score}
        items={aeo.items}
      />

      <div className="border-t border-teal-200/80 pt-3">
        <ScoreBlock
          title="GEO — Location & entities"
          icon={<MapPin className="h-3.5 w-3.5 text-teal-700" />}
          score={geo.score}
          items={geo.items}
        />
      </div>
    </div>
  );
}
