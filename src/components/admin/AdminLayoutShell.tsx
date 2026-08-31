'use client';

import { usePathname } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { ADMIN_PREFIX } from '@/lib/admin/constants';

export default function AdminLayoutShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const isLogin = path === `${ADMIN_PREFIX}/login`;

  if (isLogin) {
    return <>{children}</>;
  }

  return <AdminShell>{children}</AdminShell>;
}
