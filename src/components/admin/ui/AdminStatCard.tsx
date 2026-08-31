import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

type Props = {
  label: string;
  value: string | number;
  icon: LucideIcon;
  href?: string;
  trend?: string;
  accent?: 'green' | 'blue' | 'violet' | 'amber' | 'rose' | 'cyan';
};

const accentStyles = {
  green: 'bg-emerald-50 text-emerald-600 ring-emerald-100',
  blue: 'bg-blue-50 text-blue-600 ring-blue-100',
  violet: 'bg-violet-50 text-violet-600 ring-violet-100',
  amber: 'bg-amber-50 text-amber-600 ring-amber-100',
  rose: 'bg-rose-50 text-rose-600 ring-rose-100',
  cyan: 'bg-cyan-50 text-cyan-600 ring-cyan-100',
};

export default function AdminStatCard({ label, value, icon: Icon, href, trend, accent = 'green' }: Props) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ring-1 ring-inset ${accentStyles[accent]}`}>
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        {trend ? <span className="text-xs font-medium text-emerald-600">{trend}</span> : null}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900 lg:text-3xl">{value}</p>
        <p className="mt-0.5 text-sm text-slate-500">{label}</p>
      </div>
    </>
  );

  const className =
    'group block rounded-xl border border-slate-200/80 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all hover:border-slate-300 hover:shadow-md';

  return href ? (
    <Link href={href} className={className}>
      {content}
    </Link>
  ) : (
    <div className={className}>{content}</div>
  );
}
