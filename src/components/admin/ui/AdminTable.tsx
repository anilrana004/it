import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
};

export function AdminTableWrap({ children, className = '' }: Props) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full min-w-[640px] text-sm">{children}</table>
    </div>
  );
}

export function AdminTableHead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
        {children}
      </tr>
    </thead>
  );
}

export function AdminTh({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <th className={`px-4 py-3.5 first:pl-5 last:pr-5 ${className}`}>{children}</th>;
}

export function AdminTd({
  children,
  className = '',
  colSpan,
}: {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}) {
  return (
    <td colSpan={colSpan} className={`px-4 py-3.5 first:pl-5 last:pr-5 ${className}`}>
      {children}
    </td>
  );
}

export function AdminTr({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <tr
      onClick={onClick}
      className={`border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50/60 ${className}`}
    >
      {children}
    </tr>
  );
}
