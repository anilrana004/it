import type { Metadata } from 'next';
import AdminLayoutShell from '@/components/admin/AdminLayoutShell';
import './admin-globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Indian Treks Admin',
    template: '%s | Indian Treks Admin',
  },
  description: 'Internal admin console for Indian Treks.',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-app min-h-dvh bg-[#f8fafc] text-slate-900 antialiased">
      <AdminLayoutShell>{children}</AdminLayoutShell>
    </div>
  );
}
