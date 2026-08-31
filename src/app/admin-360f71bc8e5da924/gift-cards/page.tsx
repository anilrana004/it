'use client';

import { useCallback, useEffect, useState } from 'react';
import { Copy, Gift, Plus } from 'lucide-react';
import {
  createAdminGiftCard,
  fetchAdminGiftCards,
} from '@/lib/admin/operations-api';
import type { GiftCard } from '@/lib/operations/types';
import AdminDbUnavailable, { AdminLoading } from '@/components/admin/AdminDbState';
import AdminBadge, { statusToBadge } from '@/components/admin/ui/AdminBadge';
import AdminButton from '@/components/admin/ui/AdminButton';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import { AdminTableHead, AdminTd, AdminTh, AdminTr, AdminTableWrap } from '@/components/admin/ui/AdminTable';

const inputClass =
  'h-10 w-full rounded-lg border border-slate-200 px-3.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20';

export default function AdminGiftCards() {
  const [cards, setCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbUnavailable, setDbUnavailable] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ amount: 1000, recipientName: '', recipientEmail: '', message: '' });

  const load = useCallback(async () => {
    setLoading(true);
    setDbUnavailable(false);
    try {
      setCards(await fetchAdminGiftCards());
    } catch {
      setDbUnavailable(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await createAdminGiftCard(form);
      setShowForm(false);
      setForm({ amount: 1000, recipientName: '', recipientEmail: '', message: '' });
      await load();
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <AdminLoading label="Loading gift cards…" />;
  if (dbUnavailable) return <AdminDbUnavailable onRetry={load} />;

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Marketing"
        title="Gift cards"
        description={`${cards.length} cards issued`}
        actions={
          <AdminButton icon={<Plus className="h-4 w-4" />} onClick={() => setShowForm(!showForm)}>
            Issue card
          </AdminButton>
        }
      />

      {showForm ? (
        <AdminCard className="mb-6">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Issue new gift card</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Amount (₹)</label>
                <input type="number" required min={500} value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: parseInt(e.target.value, 10) }))} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Recipient name</label>
                <input type="text" required value={form.recipientName} onChange={(e) => setForm((f) => ({ ...f, recipientName: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Recipient email</label>
                <input type="email" required value={form.recipientEmail} onChange={(e) => setForm((f) => ({ ...f, recipientEmail: e.target.value }))} className={inputClass} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Message (optional)</label>
                <input type="text" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} className={inputClass} />
              </div>
            </div>
            <div className="flex gap-2">
              <AdminButton type="submit" disabled={saving}>{saving ? 'Issuing…' : 'Issue card'}</AdminButton>
              <AdminButton type="button" variant="secondary" onClick={() => setShowForm(false)}>
                Cancel
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      ) : null}

      <AdminCard padding={false}>
        <AdminTableWrap>
          <AdminTableHead>
            <AdminTh>Code</AdminTh>
            <AdminTh>Recipient</AdminTh>
            <AdminTh>Amount</AdminTh>
            <AdminTh>Balance</AdminTh>
            <AdminTh>Status</AdminTh>
            <AdminTh>Expires</AdminTh>
          </AdminTableHead>
          <tbody>
            {cards.map((c) => (
              <AdminTr key={c.id}>
                <AdminTd>
                  <span className="inline-flex items-center gap-2 font-mono font-semibold text-emerald-700">
                    {c.code}
                    <button type="button" onClick={() => navigator.clipboard.writeText(c.code)} className="text-slate-400 hover:text-emerald-600">
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </span>
                </AdminTd>
                <AdminTd className="text-slate-600">
                  {c.recipientName}
                  <br />
                  <span className="text-xs text-slate-400">{c.recipientEmail}</span>
                </AdminTd>
                <AdminTd className="font-semibold tabular-nums">₹{c.amount.toLocaleString()}</AdminTd>
                <AdminTd className="tabular-nums text-slate-600">₹{c.balance.toLocaleString()}</AdminTd>
                <AdminTd>
                  <AdminBadge variant={statusToBadge(c.status)}>{c.status}</AdminBadge>
                </AdminTd>
                <AdminTd className="text-xs text-slate-500">{new Date(c.expiresAt).toLocaleDateString()}</AdminTd>
              </AdminTr>
            ))}
            {cards.length === 0 ? (
              <AdminTr>
                <AdminTd colSpan={6} className="py-12 text-center text-slate-400">
                  <Gift className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  No gift cards issued yet
                </AdminTd>
              </AdminTr>
            ) : null}
          </tbody>
        </AdminTableWrap>
      </AdminCard>
    </div>
  );
}
