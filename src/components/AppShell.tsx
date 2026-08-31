'use client';

import { usePathname } from 'next/navigation';
import { ADMIN_PREFIX } from '@/lib/admin/constants';
import StorefrontChrome from '@/components/storefront/StorefrontChrome';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const isAdmin = pathname === ADMIN_PREFIX || pathname.startsWith(`${ADMIN_PREFIX}/`);

  if (isAdmin) {
    return <>{children}</>;
  }

  return <StorefrontChrome>{children}</StorefrontChrome>;
}
