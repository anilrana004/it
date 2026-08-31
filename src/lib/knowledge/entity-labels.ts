import type { EntityType } from '@/lib/knowledge/types';

/** Human-readable entity type labels — shared by storefront blog and admin CMS. */
export function entityTypeLabel(type: EntityType): string {
  const labels: Record<EntityType, string> = {
    trek: 'Trek',
    trip: 'Trip',
    yatra: 'Yatra',
    destination: 'Destination',
    region: 'Region',
    safety_topic: 'Safety Topic',
  };
  return labels[type];
}
