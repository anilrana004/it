import type { InputHTMLAttributes } from 'react';
import { Search } from 'lucide-react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  wrapperClassName?: string;
};

export default function AdminSearchInput({ className = '', wrapperClassName = '', ...props }: Props) {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        className={`h-10 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 ${className}`}
        {...props}
      />
    </div>
  );
}
