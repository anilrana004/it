'use client';

import { useCallback, useEffect, useState } from 'react';
import { Users as UsersIcon } from 'lucide-react';
import { fetchAdminUsers } from '@/lib/admin/operations-api';
import type { SiteUser } from '@/lib/operations/types';
import AdminDbUnavailable, { AdminLoading } from '@/components/admin/AdminDbState';
import AdminBadge from '@/components/admin/ui/AdminBadge';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminEmptyState from '@/components/admin/ui/AdminEmptyState';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import { AdminTableHead, AdminTd, AdminTh, AdminTr, AdminTableWrap } from '@/components/admin/ui/AdminTable';

export default function AdminUsers() {
  const [users, setUsers] = useState<SiteUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbUnavailable, setDbUnavailable] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setDbUnavailable(false);
    try {
      setUsers(await fetchAdminUsers());
    } catch {
      setDbUnavailable(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) return <AdminLoading label="Loading users…" />;
  if (dbUnavailable) return <AdminDbUnavailable onRetry={load} />;

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Operations"
        title="Users"
        description={`${users.length} registered accounts`}
      />

      <AdminCard padding={false}>
        {users.length === 0 ? (
          <AdminEmptyState icon={UsersIcon} title="No users yet" />
        ) : (
          <AdminTableWrap>
            <AdminTableHead>
              <AdminTh>Name</AdminTh>
              <AdminTh>Email</AdminTh>
              <AdminTh>Phone</AdminTh>
              <AdminTh>Role</AdminTh>
              <AdminTh>Bookings</AdminTh>
              <AdminTh>Joined</AdminTh>
            </AdminTableHead>
            <tbody>
              {users.map((u) => (
                <AdminTr key={u.id}>
                  <AdminTd className="font-medium text-slate-800">{u.name}</AdminTd>
                  <AdminTd className="text-slate-600">{u.email}</AdminTd>
                  <AdminTd className="text-slate-600">{u.phone || '—'}</AdminTd>
                  <AdminTd>
                    <AdminBadge variant={u.role === 'admin' ? 'purple' : 'neutral'}>{u.role}</AdminBadge>
                  </AdminTd>
                  <AdminTd className="text-slate-600">{u.bookings}</AdminTd>
                  <AdminTd className="text-slate-500">{u.createdAt}</AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTableWrap>
        )}
      </AdminCard>
    </div>
  );
}
