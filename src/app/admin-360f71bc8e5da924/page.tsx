'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { treks } from '@/lib/data';
import {
  ArrowRight,
  CalendarCheck,
  FileText,
  Gift,
  Mail,
  MapPin,
  MessageSquare,
  Plus,
  Users,
} from 'lucide-react';
import { fetchAdminDashboardStats } from '@/lib/admin/operations-api';
import type { Booking } from '@/lib/operations/types';
import { ADMIN_PREFIX } from '@/lib/admin/constants';
import AdminDbUnavailable, { AdminLoading } from '@/components/admin/AdminDbState';
import AdminBadge, { statusToBadge } from '@/components/admin/ui/AdminBadge';
import AdminButton from '@/components/admin/ui/AdminButton';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminEmptyState from '@/components/admin/ui/AdminEmptyState';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminStatCard from '@/components/admin/ui/AdminStatCard';
import { AdminTableHead, AdminTd, AdminTh, AdminTr, AdminTableWrap } from '@/components/admin/ui/AdminTable';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    bookings: 0,
    contacts: 0,
    subscribers: 0,
    giftCards: 0,
    users: 0,
    recentBookings: [] as Booking[],
  });
  const [loading, setLoading] = useState(true);
  const [dbUnavailable, setDbUnavailable] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setDbUnavailable(false);
    try {
      setStats(await fetchAdminDashboardStats());
    } catch {
      setDbUnavailable(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const statCards = [
    { label: 'Treks & Yatras', value: treks.length, icon: MapPin, accent: 'blue' as const, href: `${ADMIN_PREFIX}/treks` },
    { label: 'Bookings', value: stats.bookings, icon: CalendarCheck, accent: 'green' as const, href: `${ADMIN_PREFIX}/bookings` },
    { label: 'Users', value: stats.users, icon: Users, accent: 'violet' as const, href: `${ADMIN_PREFIX}/users` },
    { label: 'Messages', value: stats.contacts, icon: MessageSquare, accent: 'amber' as const, href: `${ADMIN_PREFIX}/contacts` },
    { label: 'Gift Cards', value: stats.giftCards, icon: Gift, accent: 'rose' as const, href: `${ADMIN_PREFIX}/gift-cards` },
    { label: 'Subscribers', value: stats.subscribers, icon: Mail, accent: 'cyan' as const, href: `${ADMIN_PREFIX}/newsletter` },
  ];

  const pendingBookings = stats.recentBookings.filter((b) => b.status === 'pending').length;

  if (loading) return <AdminLoading label="Loading dashboard…" />;
  if (dbUnavailable) return <AdminDbUnavailable onRetry={load} />;

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Overview"
        title="Dashboard"
        description="Monitor bookings, content, and customer activity at a glance."
        actions={
          <AdminButton href={`${ADMIN_PREFIX}/blog`} icon={<Plus className="h-4 w-4" />}>
            New post
          </AdminButton>
        }
      />

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {statCards.map((s) => (
          <AdminStatCard key={s.label} {...s} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <AdminCard className="xl:col-span-2" padding={false}>
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 lg:px-6">
            <div>
              <h2 className="text-base font-semibold text-slate-900">Recent bookings</h2>
              <p className="text-xs text-slate-500">
                {pendingBookings > 0 ? `${pendingBookings} pending approval` : 'Latest customer reservations'}
              </p>
            </div>
            <Link
              href={`${ADMIN_PREFIX}/bookings`}
              className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          {stats.recentBookings.length === 0 ? (
            <AdminEmptyState
              icon={CalendarCheck}
              title="No bookings yet"
              description="New trek bookings from the storefront will appear here."
            />
          ) : (
            <AdminTableWrap>
              <AdminTableHead>
                <AdminTh>Customer</AdminTh>
                <AdminTh>Trek</AdminTh>
                <AdminTh>Amount</AdminTh>
                <AdminTh>Status</AdminTh>
              </AdminTableHead>
              <tbody>
                {stats.recentBookings.map((b) => (
                  <AdminTr key={b.id}>
                    <AdminTd>
                      <p className="font-medium text-slate-800">{b.name}</p>
                      <p className="text-xs text-slate-400">{b.phone}</p>
                    </AdminTd>
                    <AdminTd className="text-slate-600">{b.trekTitle}</AdminTd>
                    <AdminTd className="font-semibold tabular-nums text-slate-800">
                      ₹{b.amount.toLocaleString()}
                    </AdminTd>
                    <AdminTd>
                      <AdminBadge variant={statusToBadge(b.status)} dot>
                        {b.status}
                      </AdminBadge>
                    </AdminTd>
                  </AdminTr>
                ))}
              </tbody>
            </AdminTableWrap>
          )}
        </AdminCard>

        <AdminCard>
          <h2 className="mb-1 text-base font-semibold text-slate-900">Quick actions</h2>
          <p className="mb-4 text-xs text-slate-500">Jump to common tasks</p>
          <div className="space-y-2">
            {[
              { label: 'Create blog post', href: `${ADMIN_PREFIX}/blog`, icon: FileText },
              { label: 'Review bookings', href: `${ADMIN_PREFIX}/bookings`, icon: CalendarCheck },
              { label: 'Browse treks', href: `${ADMIN_PREFIX}/treks`, icon: MapPin },
              { label: 'Issue gift card', href: `${ADMIN_PREFIX}/gift-cards`, icon: Gift },
            ].map((action) => (
              <Link
                key={action.href + action.label}
                href={action.href}
                className="flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50/50 px-3 py-3 text-sm font-medium text-slate-700 transition-all hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-800"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200/80">
                  <action.icon className="h-4 w-4" strokeWidth={1.75} />
                </div>
                {action.label}
                <ArrowRight className="ml-auto h-4 w-4 text-slate-300" />
              </Link>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
