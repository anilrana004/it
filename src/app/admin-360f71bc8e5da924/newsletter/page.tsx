'use client';

import { useCallback, useEffect, useState } from 'react';
import { Mail, Plus, Trash2 } from 'lucide-react';
import {
  createAdminSubscriber,
  deleteAdminSubscriber,
  fetchAdminSubscribers,
} from '@/lib/admin/operations-api';
import type { NewsletterSubscriber } from '@/lib/operations/types';
import AdminDbUnavailable, { AdminLoading } from '@/components/admin/AdminDbState';
import AdminBadge from '@/components/admin/ui/AdminBadge';
import AdminButton from '@/components/admin/ui/AdminButton';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminEmptyState from '@/components/admin/ui/AdminEmptyState';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import { AdminTableHead, AdminTd, AdminTh, AdminTr, AdminTableWrap } from '@/components/admin/ui/AdminTable';

export default function AdminNewsletter() {
  const [subs, setSubs] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbUnavailable, setDbUnavailable] = useState(false);
  const [email, setEmail] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    setDbUnavailable(false);
    try {
      setSubs(await fetchAdminSubscribers());
    } catch {
      setDbUnavailable(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAdminSubscriber(email);
      setEmail('');
      await load();
    } catch {
      /* duplicate or error */
    }
  };

  const handleRemove = async (id: string) => {
    await deleteAdminSubscriber(id);
    await load();
  };

  if (loading) return <AdminLoading label="Loading subscribers…" />;
  if (dbUnavailable) return <AdminDbUnavailable onRetry={load} />;

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Marketing"
        title="Newsletter"
        description={`${subs.length} subscribers`}
        actions={
          <form onSubmit={handleAdd} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Add subscriber email…"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-10 w-48 rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 lg:w-64"
            />
            <AdminButton type="submit" icon={<Plus className="h-4 w-4" />}>
              Add
            </AdminButton>
          </form>
        }
      />

      <AdminCard padding={false}>
        {subs.length === 0 ? (
          <AdminEmptyState icon={Mail} title="No subscribers yet" description="Subscribers from the site signup form will sync here automatically." />
        ) : (
          <AdminTableWrap>
            <AdminTableHead>
              <AdminTh>Email</AdminTh>
              <AdminTh>Subscribed</AdminTh>
              <AdminTh>Status</AdminTh>
              <AdminTh className="text-right">Actions</AdminTh>
            </AdminTableHead>
            <tbody>
              {subs.map((s) => (
                <AdminTr key={s.id}>
                  <AdminTd className="font-medium text-slate-800">{s.email}</AdminTd>
                  <AdminTd className="text-xs text-slate-500">{new Date(s.subscribedAt).toLocaleDateString()}</AdminTd>
                  <AdminTd>
                    <AdminBadge variant={s.active ? 'success' : 'danger'}>{s.active ? 'Active' : 'Unsubscribed'}</AdminBadge>
                  </AdminTd>
                  <AdminTd className="text-right">
                    <button
                      type="button"
                      onClick={() => handleRemove(s.id)}
                      className="rounded-md p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </AdminTd>
                </AdminTr>
              ))}
            </tbody>
          </AdminTableWrap>
        )}
      </AdminCard>
    </div>
  );
}
