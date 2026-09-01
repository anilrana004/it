'use client';

import { CheckCircle2, AlertCircle, Circle } from 'lucide-react';
import { absoluteUrl } from '@/lib/site';
import { publicPostPath } from '@/lib/admin/placement-preview';
import {
  evaluateSeoReadiness,
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

export default function AdminSeoScorecard({ form }: Props) {
  const { score, items } = evaluateSeoReadiness(form);
  const serpTitle = (form.seoTitle.trim() || form.title.trim() || 'Article title').slice(0, 70);
  const serpDesc = (
    form.seoDescription.trim() ||
    form.excerpt.trim() ||
    'Add a meta description or excerpt to preview how this appears in Google.'
  ).slice(0, 160);
  const path = form.slug.trim() ? publicPostPath(form.section, form.slug.trim()) : '/blog/your-slug';
  const serpUrl = absoluteUrl(path);

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-slate-900">SEO readiness</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Search snippet preview & checklist</p>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full border ${scoreColor(score)}`}
        >
          {score}%
        </span>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-3">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Google preview
        </p>
        <p className="text-[#1a0dab] text-base leading-snug font-medium truncate">{serpTitle}</p>
        <p className="text-[#006621] text-xs mt-0.5 truncate">{serpUrl}</p>
        <p className="text-[#4d5156] text-xs mt-1 line-clamp-2 leading-relaxed">{serpDesc}</p>
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
