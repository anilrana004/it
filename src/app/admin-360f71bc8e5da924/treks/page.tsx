'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { treks } from '@/lib/data';
import AdminBadge from '@/components/admin/ui/AdminBadge';
import AdminButton from '@/components/admin/ui/AdminButton';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import { AdminTableHead, AdminTd, AdminTh, AdminTr, AdminTableWrap } from '@/components/admin/ui/AdminTable';

export default function AdminTreks() {
  const [items] = useState(treks);

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Content"
        title="Treks & Yatras"
        description={`${items.length} experiences in catalog`}
        actions={
          <AdminButton icon={<Plus className="h-4 w-4" />} variant="primary">
            Add trek
          </AdminButton>
        }
      />

      <AdminCard padding={false}>
        <AdminTableWrap>
          <AdminTableHead>
            <AdminTh>Title</AdminTh>
            <AdminTh>Type</AdminTh>
            <AdminTh>Region</AdminTh>
            <AdminTh>Duration</AdminTh>
            <AdminTh>Difficulty</AdminTh>
            <AdminTh>From</AdminTh>
            <AdminTh className="text-right">Actions</AdminTh>
          </AdminTableHead>
          <tbody>
            {items.map((t) => (
              <AdminTr key={t.id}>
                <AdminTd className="font-medium text-slate-800">{t.title}</AdminTd>
                <AdminTd>
                  <AdminBadge variant={t.type === 'yatra' ? 'warning' : 'info'}>{t.type}</AdminBadge>
                </AdminTd>
                <AdminTd className="capitalize text-slate-600">{t.region}</AdminTd>
                <AdminTd className="text-slate-600">{t.duration}</AdminTd>
                <AdminTd className="text-slate-600">{t.difficulty}</AdminTd>
                <AdminTd className="font-semibold tabular-nums">
                  ₹{Math.min(...t.pricing.map((p) => p.price)).toLocaleString()}
                </AdminTd>
                <AdminTd>
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/treks/${t.id}`}
                      className="rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-emerald-600"
                      title="View live"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button type="button" className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-emerald-600" title="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button type="button" className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-rose-600" title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </AdminTd>
              </AdminTr>
            ))}
          </tbody>
        </AdminTableWrap>
      </AdminCard>
    </div>
  );
}
