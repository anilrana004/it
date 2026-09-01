'use client';

import { RefreshCw } from 'lucide-react';
import AdminButton from '@/components/admin/ui/AdminButton';
import { isExternalApiEnabled } from '@/lib/env/api-url';

type Props = {
  onRetry?: () => void;
};

export default function AdminDbUnavailable({ onRetry }: Props) {
  const external = isExternalApiEnabled();

  return (
    <div className="mx-auto mt-12 max-w-xl rounded-xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-slate-900">
        {external ? 'Backend unavailable' : 'Database not configured'}
      </h2>
      <p className="mb-4 text-sm text-slate-600">
        {external ? (
          <>
            Check <code className="rounded bg-white px-1.5 py-0.5 text-xs">NEXT_PUBLIC_API_URL</code> points to
            your Railway API, and that the API has <code className="rounded bg-white px-1.5 py-0.5 text-xs">DATABASE_URL</code>{' '}
            configured.
          </>
        ) : (
          <>
            Set <code className="rounded bg-white px-1.5 py-0.5 text-xs">DATABASE_URL</code>, then run{' '}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">npm run db:migrate</code>.
          </>
        )}
      </p>
      {onRetry ? (
        <AdminButton variant="secondary" onClick={onRetry}>
          Retry
        </AdminButton>
      ) : null}
    </div>
  );
}

export function AdminLoading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
      <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
      {label}
    </div>
  );
}
