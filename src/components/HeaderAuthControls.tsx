'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from 'lucide-react';
import type { PublicUser } from '@/lib/user-auth/types';

export default function HeaderAuthControls({
  variant = 'desktop',
  onNavigate,
}: {
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}) {
  const [user, setUser] = useState<PublicUser | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/user/auth/me', { credentials: 'include', cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return;
        const body = (await res.json()) as { user: PublicUser };
        if (!cancelled) setUser(body.user);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  if (variant === 'mobile') {
    return (
      <Link
        href={user ? '/user-dashboard' : '/login'}
        onClick={onNavigate}
        className="flex w-full items-center justify-center gap-2 bg-[#16a34a] px-6 py-3 text-sm font-semibold text-white"
      >
        <User className="h-4 w-4" />
        {user ? 'My dashboard' : 'Login / Sign Up'}
      </Link>
    );
  }

  return (
    <Link
      href={user ? '/user-dashboard' : '/login'}
      className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-[#16a34a] bg-white px-2.5 text-[11px] font-bold text-[#16a34a] shadow-sm transition-colors hover:bg-[#f0fdf4] xl:px-3 xl:text-[12px]"
    >
      <User className="h-3.5 w-3.5 shrink-0" aria-hidden />
      {user ? user.name.split(' ')[0] : 'Login'}
    </Link>
  );
}
