'use client';

import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  ChevronDown,
  Circle,
  ExternalLink,
  LayoutGrid,
  MapPin,
  MinusCircle,
} from 'lucide-react';
import {
  buildPlacementSurfaces,
  countActivePlacements,
  countEntityPlacements,
  groupPlacementSurfaces,
  type PlacementSurface,
} from '@/lib/admin/placement-preview';
import type { RegistryEntity } from '@/lib/admin/blog-api';
import type { PostSection } from '@/lib/knowledge/types';

type Props = {
  section: PostSection;
  slug?: string;
  status?: 'draft' | 'published' | 'archived';
  primaryEntity: RegistryEntity | null;
  relatedEntities: RegistryEntity[];
  placementSlots: string[];
  onPlacementSlotsChange: (slots: string[]) => void;
};

const STATUS_STYLES: Record<PlacementSurface['status'], string> = {
  active: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  available: 'border-slate-200 bg-white text-slate-600',
  blocked: 'border-slate-100 bg-slate-50 text-slate-400',
};

export default function PlacementPanel({
  section,
  slug,
  status = 'draft',
  primaryEntity,
  relatedEntities,
  placementSlots,
  onPlacementSlotsChange,
}: Props) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    product: true,
    hub: true,
    discovery: false,
    landing: false,
    corporate: false,
    special: false,
  });

  const surfaces = useMemo(
    () =>
      buildPlacementSurfaces({
        section,
        slug,
        primaryEntity,
        relatedEntities,
        placementSlots,
        status,
      }),
    [section, slug, primaryEntity, relatedEntities, placementSlots, status],
  );

  const groups = useMemo(() => groupPlacementSurfaces(surfaces), [surfaces]);
  const activeCount = countActivePlacements(surfaces);
  const entityCount = countEntityPlacements(surfaces);
  const manualSlots = surfaces.filter((s) => s.mode === 'manual' && s.status !== 'blocked');

  const toggleSlot = (slotId: string) => {
    if (placementSlots.includes(slotId)) {
      onPlacementSlotsChange(placementSlots.filter((id) => id !== slotId));
    } else {
      onPlacementSlotsChange([...placementSlots, slotId]);
    }
  };

  const toggleGroup = (groupId: string) => {
    setExpanded((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-emerald-50/40 px-4 py-4 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-slate-900">Storefront placement</h4>
              <p className="mt-0.5 text-xs text-slate-500">
                {activeCount} live · {entityCount} product pages · pin landing pages below
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              {activeCount} live
            </span>
            <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
              {manualSlots.filter((s) => s.selected).length} pinned
            </span>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {groups.map((group) => (
          <section key={group.id}>
            <button
              type="button"
              onClick={() => toggleGroup(group.id)}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-slate-50/80 sm:px-5"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{group.label}</p>
                <p className="text-xs text-slate-500">{group.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
                  {group.activeCount}/{group.surfaces.length}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 transition-transform ${expanded[group.id] ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {expanded[group.id] ? (
              <div className="space-y-2 px-4 pb-4 sm:px-5">
                {group.surfaces.map((surface) => (
                  <SurfaceRow
                    key={surface.id}
                    surface={surface}
                    onToggle={() => toggleSlot(surface.id)}
                  />
                ))}
              </div>
            ) : null}
          </section>
        ))}
      </div>

      <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-xs text-slate-500 sm:px-5">
        <MapPin className="mr-1 inline h-3.5 w-3.5" />
        Link a trek/trip/yatra above — product pages update automatically. Pin landing pages manually.
      </div>
    </div>
  );
}

function SurfaceRow({
  surface,
  onToggle,
}: {
  surface: PlacementSurface;
  onToggle: () => void;
}) {
  const isManual = surface.mode === 'manual' && surface.status !== 'blocked';

  return (
    <div
      className={`rounded-xl border p-3 transition-colors ${STATUS_STYLES[surface.status]} ${
        surface.highlight ? 'ring-2 ring-emerald-300/60' : ''
      } ${isManual ? 'cursor-pointer hover:shadow-sm' : ''}`}
      onClick={isManual ? onToggle : undefined}
      onKeyDown={
        isManual
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onToggle();
              }
            }
          : undefined
      }
      role={isManual ? 'button' : undefined}
      tabIndex={isManual ? 0 : undefined}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          {surface.status === 'active' ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          ) : surface.status === 'available' ? (
            isManual ? (
              <Circle className={`h-4 w-4 ${surface.selected ? 'text-emerald-600' : 'text-slate-300'}`} />
            ) : (
              <Circle className="h-4 w-4 text-slate-300" />
            )
          ) : (
            <MinusCircle className="h-4 w-4 text-slate-300" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-medium text-slate-900">{surface.label}</p>
            {isManual ? (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                  surface.selected
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-200 text-slate-600'
                }`}
              >
                {surface.selected ? 'Pinned' : 'Tap to pin'}
              </span>
            ) : null}
          </div>
          <p className="mt-0.5 text-xs opacity-80">{surface.description || surface.reason}</p>
          {surface.description && surface.reason ? (
            <p className="mt-0.5 text-[11px] opacity-70">{surface.reason}</p>
          ) : null}
          <a
            href={surface.path}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 hover:underline"
          >
            {surface.path}
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
