import { revalidatePath, revalidateTag } from 'next/cache';
import { CACHE_TAGS, PUBLIC_ROUTES } from '@/lib/knowledge/config';
import type { EntityLink, EntityType, KnowledgePost } from '@/lib/knowledge/types';

/**
 * Revalidate storefront paths affected by a published/updated post.
 * Call from admin API routes after successful publish (Phase 4+).
 */
export function revalidatePostSurfaces(post: KnowledgePost): void {
  revalidatePublishedPostSurfaces({
    slug: post.slug,
    section: post.section,
    primaryEntityType: post.primaryEntityType,
    primaryEntityId: post.primaryEntityId,
    entityLinks: post.entityLinks,
  });
}

export function revalidatePublishedPostSurfaces(payload: {
  slug: string;
  section: string;
  primaryEntityType?: EntityType | null;
  primaryEntityId?: string | null;
  entityLinks?: EntityLink[];
}): void {
  revalidateTag(CACHE_TAGS.posts, 'max');
  revalidateTag(CACHE_TAGS.post(payload.slug), 'max');
  revalidatePath(PUBLIC_ROUTES.blogIndex);
  revalidatePath(PUBLIC_ROUTES.blogPost(payload.slug));

  if (payload.section === 'travel_news') {
    revalidatePath(PUBLIC_ROUTES.travelNewsIndex);
    revalidatePath(PUBLIC_ROUTES.travelNewsPost(payload.slug));
  }

  if (payload.primaryEntityType && payload.primaryEntityId) {
    revalidateEntitySurface(payload.primaryEntityType, payload.primaryEntityId);
  }

  for (const link of payload.entityLinks ?? []) {
    revalidateEntitySurface(link.entityType, link.entityId);
  }
}

function revalidateEntitySurface(entityType: EntityLink['entityType'], entityId: string): void {
  revalidateTag(CACHE_TAGS.entity(entityType, entityId), 'max');

  switch (entityType) {
    case 'trek':
      revalidatePath(PUBLIC_ROUTES.trek(entityId));
      break;
    case 'trip':
      revalidatePath(PUBLIC_ROUTES.trip(entityId));
      break;
    case 'yatra':
      revalidatePath(PUBLIC_ROUTES.yatra(entityId));
      break;
    case 'destination':
      revalidatePath(PUBLIC_ROUTES.destination(entityId));
      break;
    default:
      break;
  }
}
