import type { ButtonHTMLAttributes, ReactNode } from 'react';
import Link from 'next/link';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

const styles: Record<Variant, string> = {
  primary:
    'bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 focus-visible:ring-emerald-500/30 disabled:bg-emerald-400',
  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:ring-slate-300',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  danger: 'bg-rose-600 text-white shadow-sm hover:bg-rose-700 focus-visible:ring-rose-500/30',
};

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
};

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type LinkProps = BaseProps & { href: string };

export default function AdminButton({
  variant = 'primary',
  children,
  className = '',
  icon,
  href,
  ...props
}: ButtonProps | LinkProps) {
  const base =
    'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60';

  const classes = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {icon}
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as ButtonProps)}>
      {icon}
      {children}
    </button>
  );
}
