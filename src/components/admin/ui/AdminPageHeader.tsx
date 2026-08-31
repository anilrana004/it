import type { ReactNode } from 'react';

type Props = {
  title: string;
  description?: string;
  actions?: ReactNode;
  breadcrumb?: string;
};

export default function AdminPageHeader({ title, description, actions, breadcrumb }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {breadcrumb ? (
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">{breadcrumb}</p>
        ) : null}
        <h1 className="font-[family-name:var(--font-heading)] text-2xl font-semibold tracking-tight text-slate-900 lg:text-3xl">
          {title}
        </h1>
        {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}
