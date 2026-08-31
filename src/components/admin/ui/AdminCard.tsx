import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  padding?: boolean;
};

export default function AdminCard({ children, className = '', padding = true }: Props) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200/80 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${padding ? 'p-5 lg:p-6' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
