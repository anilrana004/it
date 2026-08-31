import type { RegistryEntity } from '@/lib/admin/blog-api';
import { entityTypeLabel } from '@/lib/knowledge/entity-labels';
import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import {
  PLACEMENT_GROUPS,
  PLACEMENT_SLOTS,
  type PlacementGroupId,
  type PlacementSlotDefinition,
} from '@/lib/knowledge/placement-registry';
import type { EntityType, PostSection } from '@/lib/knowledge/types';

export { entityTypeLabel };

export type PlacementSurfaceStatus = 'active' | 'available' | 'blocked';

export type PlacementSurface = {
  id: string;
  group: PlacementGroupId;
  label: string;
  description: string;
  path: string;
  mode: 'automatic' | 'manual';
  status: PlacementSurfaceStatus;
  reason?: string;
  selected: boolean;
  highlight?: boolean;
};

type BuildOptions = {
  section: PostSection;
  slug?: string;
  primaryEntity: RegistryEntity | null;
  relatedEntities: RegistryEntity[];
  placementSlots: string[];
  status?: 'draft' | 'published' | 'archived';
};

export function buildPlacementSurfaces(options: BuildOptions): PlacementSurface[] {
  const entities = [
    ...(options.primaryEntity ? [{ entity: options.primaryEntity, isPrimary: true }] : []),
    ...options.relatedEntities.map((entity) => ({ entity, isPrimary: false })),
  ];

  const staticSurfaces = PLACEMENT_SLOTS.map((slot) => evaluateStaticSlot(slot, options, entities));
  const entitySurfaces = buildDynamicEntitySurfaces(options, entities);

  const seen = new Set<string>();
  return [...entitySurfaces, ...staticSurfaces].filter((surface) => {
    const key = `${surface.id}:${surface.path}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/** Per-trek / trip / yatra / region surfaces — one row per linked entity. */
function buildDynamicEntitySurfaces(
  options: BuildOptions,
  entities: Array<{ entity: RegistryEntity; isPrimary: boolean }>,
): PlacementSurface[] {
  if (options.section !== 'blog') return [];

  const isPublished = options.status === 'published';
  const surfaces: PlacementSurface[] = [];

  for (const { entity, isPrimary } of entities) {
    const role = isPrimary ? 'Primary' : 'Related';
    const highlight = isPrimary;

    if (entity.entityType === 'trek' || entity.entityType === 'trip' || entity.entityType === 'yatra') {
      const productRoutes: Array<{ suffix: string; label: string; path: string }> = [
        { suffix: 'trek', label: 'Trek page — From the Blog', path: PUBLIC_ROUTES.trek(entity.entityId) },
        { suffix: 'trip', label: 'Trip page — From the Blog', path: PUBLIC_ROUTES.trip(entity.entityId) },
        { suffix: 'yatra', label: 'Yatra page — From the Blog', path: PUBLIC_ROUTES.yatra(entity.entityId) },
      ];

      for (const route of productRoutes) {
        surfaces.push({
          id: `entity-${entity.entityId}-${route.suffix}`,
          group: 'product',
          label: `${entity.title}`,
          description: `${role} · ${route.label}`,
          path: route.path,
          mode: 'automatic',
          status: isPublished ? 'active' : 'available',
          reason: isPublished
            ? 'Live on product page sidebar'
            : 'Will show on product page after publish',
          selected: false,
          highlight,
        });
      }

      surfaces.push({
        id: `entity-filter-${entity.entityType}-${entity.entityId}`,
        group: 'product',
        label: `${entity.title}`,
        description: `${role} · Blog index filter`,
        path: `${PUBLIC_ROUTES.blogIndex}?entity=${entity.entityType}:${entity.entityId}`,
        mode: 'automatic',
        status: isPublished ? 'active' : 'available',
        reason: isPublished
          ? 'Listed on /blog entity filter'
          : 'Will appear on filtered blog list after publish',
        selected: false,
        highlight,
      });
    }

    if (entity.entityType === 'region' || entity.entityType === 'destination') {
      surfaces.push({
        id: `entity-region-${entity.entityId}`,
        group: 'product',
        label: `${role}: ${entity.title}`,
        description: 'Regional blog filter page',
        path: `${PUBLIC_ROUTES.blogIndex}?entity=region:${entity.entityId}`,
        mode: 'automatic',
        status: isPublished ? 'active' : 'available',
        reason: isPublished
          ? 'Shows on regional blog filter'
          : 'Link this region — appears on /blog?entity=region:… after publish',
        selected: false,
        highlight,
      });
    }

    if (entity.entityType === 'safety_topic') {
      surfaces.push({
        id: `entity-safety-${entity.entityId}`,
        group: 'product',
        label: `${role}: ${entity.title}`,
        description: 'Safety / prep guide hub',
        path: entity.canonicalUrl || PUBLIC_ROUTES.safetyTopic(entity.entityId),
        mode: 'automatic',
        status: isPublished ? 'active' : 'available',
        reason: isPublished ? 'Linked safety topic guide' : 'Will link from safety topic page after publish',
        selected: false,
        highlight,
      });
    }
  }

  return surfaces;
}

function evaluateStaticSlot(
  slot: PlacementSlotDefinition,
  options: BuildOptions,
  entities: Array<{ entity: RegistryEntity; isPrimary: boolean }>,
): PlacementSurface {
  const sectionOk = slot.sections.includes(options.section);
  const manuallySelected = options.placementSlots.includes(slot.id);
  const isPublished = options.status === 'published';

  let path = slot.path;
  let status: PlacementSurfaceStatus = 'blocked';
  let reason = '';
  let selected = manuallySelected;

  if (!sectionOk) {
    reason =
      options.section === 'travel_news'
        ? 'Travel news only — switch section to Blog for this surface'
        : 'Blog posts only — switch section to Travel News';
  } else if (slot.id === 'blog-article' && options.section === 'blog') {
    path = options.slug ? PUBLIC_ROUTES.blogPost(options.slug) : PUBLIC_ROUTES.blogIndex;
    status = isPublished && options.slug ? 'active' : 'available';
    reason = isPublished ? 'Live article at /blog/[slug]' : 'Available after publish with a slug';
  } else if (slot.id === 'news-article' && options.section === 'travel_news') {
    path = options.slug ? PUBLIC_ROUTES.travelNewsPost(options.slug) : PUBLIC_ROUTES.travelNewsIndex;
    status = isPublished && options.slug ? 'active' : 'available';
    reason = isPublished ? 'Live article at /blog/news/[slug]' : 'Available after publish with a slug';
  } else if (slot.id === 'blog-post-entity-links') {
    status = entities.length > 0 ? (isPublished ? 'active' : 'available') : 'available';
    reason =
      entities.length > 0
        ? isPublished
          ? 'Related trek/region links shown on article page'
          : 'Will show entity links on article after publish'
        : 'Link a trek or region — adds Related links on the article page';
  } else if (slot.mode === 'manual') {
    selected = manuallySelected;
    status = manuallySelected ? 'active' : 'available';
    reason = manuallySelected ? 'Pinned to this landing page' : `Tap to pin on ${slot.label}`;
  } else if (
    slot.id === 'blog-index' ||
    slot.id === 'travel-news-index' ||
    slot.id === 'blog-sidebar' ||
    slot.id === 'blog-search' ||
    slot.id === 'blog-post-related' ||
    slot.id === 'blog-news-sidebar' ||
    slot.id === 'blog-news-more'
  ) {
    status = isPublished ? 'active' : 'available';
    reason = isPublished ? 'Included when published' : 'Eligible after publish';
  } else {
    status = isPublished ? 'active' : 'available';
    reason = isPublished ? 'Live when published' : 'Available on publish';
  }

  if (!sectionOk) {
    status = 'blocked';
    selected = false;
  }

  return {
    id: slot.id,
    group: slot.group,
    label: slot.label,
    description: slot.description,
    path,
    mode: slot.mode,
    status,
    reason,
    selected,
  };
}

export function groupPlacementSurfaces(surfaces: PlacementSurface[]) {
  const order: PlacementGroupId[] = ['product', 'hub', 'discovery', 'landing', 'corporate', 'special'];
  return order
    .map((id) => PLACEMENT_GROUPS.find((g) => g.id === id)!)
    .filter(Boolean)
    .map((group) => ({
      ...group,
      surfaces: surfaces.filter((surface) => surface.group === group.id),
      activeCount: surfaces.filter((s) => s.group === group.id && s.status === 'active').length,
    }))
    .filter((group) => group.surfaces.length > 0);
}

export function publicPostPath(section: PostSection, slug: string): string {
  return section === 'travel_news'
    ? PUBLIC_ROUTES.travelNewsPost(slug)
    : PUBLIC_ROUTES.blogPost(slug);
}

export function countActivePlacements(surfaces: PlacementSurface[]) {
  return surfaces.filter((s) => s.status === 'active').length;
}

export function countEntityPlacements(surfaces: PlacementSurface[]) {
  return surfaces.filter((s) => s.group === 'product' && s.status !== 'blocked').length;
}
