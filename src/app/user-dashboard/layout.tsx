import DashboardShell from '@/components/user-dashboard/DashboardShell';

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
