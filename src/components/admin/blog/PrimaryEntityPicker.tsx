'use client';

import { useMemo, useState } from 'react';
import { ExternalLink, Link2, Mountain, MapPin, Sparkles } from 'lucide-react';
import EntitySelector from '@/components/admin/blog/EntitySelector';
import { entityTypeLabel } from '@/lib/knowledge/entity-labels';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import type { RegistryEntity } from '@/lib/admin/blog-api';
import type { EntityType } from '@/lib/knowledge/types';

type Tab = 'all' | 'trek' | 'trip' | 'yatra' | 'region';

const TABS: Array<{ id: Tab; label: string; entityType?: EntityType }> = [
  { id: 'all', label: 'All' },
  { id: 'trek', label: 'Treks', entityType: 'trek' },
  { id: 'trip', label: 'Trips', entityType: 'trip' },
  { id: 'yatra', label: 'Yatra', entityType: 'yatra' },
  { id: 'region', label: 'Regions', entityType: 'region' },
];

type Props = {
  primaryEntity: RegistryEntity | null;
  relatedEntities: RegistryEntity[];
  onPrimaryChange: (entity: RegistryEntity | null) => void;
  onAddRelated: (entity: RegistryEntity | null) => void;
  onRemoveRelated: (entity: RegistryEntity) => void;
  primaryError?: string;
};

export default function PrimaryEntityPicker({
  primaryEntity,
  relatedEntities,
  onPrimaryChange,
  onAddRelated,
  onRemoveRelated,
  primaryError,
}: Props) {
  const [tab, setTab] = useState<Tab>('trek');
  const activeTab = TABS.find((t) => t.id === tab)!;

  const previewLinks = useMemo(() => {
    if (!primaryEntity) return [];
    if (
      primaryEntity.entityType === 'trek' ||
      primaryEntity.entityType === 'trip' ||
      primaryEntity.entityType === 'yatra'
    ) {
      return [
        { label: 'Trek page sidebar', path: PUBLIC_ROUTES.trek(primaryEntity.entityId) },
        { label: 'Trip page sidebar', path: PUBLIC_ROUTES.trip(primaryEntity.entityId) },
        { label: 'Yatra page sidebar', path: PUBLIC_ROUTES.yatra(primaryEntity.entityId) },
        {
          label: 'Blog filter page',
          path: `${PUBLIC_ROUTES.blogIndex}?entity=${primaryEntity.entityType}:${primaryEntity.entityId}`,
        },
        { label: 'Main blog index', path: PUBLIC_ROUTES.blogIndex },
      ];
    }
    if (primaryEntity.entityType === 'region' || primaryEntity.entityType === 'destination') {
      return [
        {
          label: 'Regional blog filter',
          path: `${PUBLIC_ROUTES.blogIndex}?entity=region:${primaryEntity.entityId}`,
        },
        { label: 'Main blog index', path: PUBLIC_ROUTES.blogIndex },
      ];
    }
    return [
      {
        label: entityTypeLabel(primaryEntity.entityType),
        path: primaryEntity.canonicalUrl || PUBLIC_ROUTES.blogIndex,
      },
    ];
  }, [primaryEntity]);

  return (
    <div className="space-y-4 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 to-white p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
          <Link2 className="h-5 w-5" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Link to Trek / Trip / Yatra</h4>
          <p className="mt-0.5 text-xs text-slate-600">
            Choose the product this article is about. It will automatically appear on that trek, trip, or
            yatra page <strong>and</strong> in the main blog section when published.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
              tab === item.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <EntitySelector
        label="Primary product (required for trek/yatra/trip articles)"
        value={primaryEntity}
        onChange={onPrimaryChange}
        entityType={activeTab.id === 'all' ? undefined : activeTab.entityType}
        placeholder={
          activeTab.id === 'trek'
            ? 'Search treks — e.g. Kedarkantha, Valley of Flowers…'
            : activeTab.id === 'yatra'
              ? 'Search yatras — e.g. Kedarnath, Char Dham…'
              : activeTab.id === 'trip'
                ? 'Search trips…'
                : activeTab.id === 'region'
                  ? 'Search regions — e.g. Uttarakhand, Himachal…'
                  : 'Search treks, trips, yatras, regions…'
        }
      />
      {primaryError ? <p className="text-xs text-red-600">{primaryError}</p> : null}

      {primaryEntity ? (
        <div className="rounded-xl border border-emerald-200 bg-white p-3">
          <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" />
            Will appear on these pages when published
          </p>
          <ul className="space-y-1.5">
            {previewLinks.map((link) => (
              <li key={link.path}>
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm text-slate-700 hover:bg-emerald-50"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    {(link.label.includes('Trek') || link.label.includes('Trip') || link.label.includes('Yatra')) && (
                      <Mountain className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    )}
                    {link.label.includes('Regional') && (
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                    )}
                    <span className="truncate">{link.label}</span>
                  </span>
                  <ExternalLink className="h-3 w-3 shrink-0 text-slate-400" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-slate-200 bg-white/70 px-3 py-2.5 text-xs text-slate-500">
          No product linked yet. Search above to connect this article to a specific trek, trip, or yatra.
        </p>
      )}

      <EntitySelector
        label="Additional related products (optional)"
        value={null}
        onChange={onAddRelated}
        entityType={activeTab.id === 'all' ? undefined : activeTab.entityType}
        placeholder="Add another trek, trip, or region…"
      />

      {relatedEntities.length > 0 ? (
        <div className="space-y-2">
          {relatedEntities.map((entity) => (
            <div
              key={`${entity.entityType}:${entity.entityId}`}
              className="flex items-center justify-between rounded-lg border border-slate-100 bg-white px-3 py-2 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-800">{entity.title || entity.entityId}</p>
                <p className="text-xs text-slate-500">
                  {entityTypeLabel(entity.entityType)} · also surfaces on this product&apos;s pages
                </p>
              </div>
              <button
                type="button"
                onClick={() => onRemoveRelated(entity)}
                className="shrink-0 text-xs font-semibold text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
