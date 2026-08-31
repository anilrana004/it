import { resolveEntityReference } from '@/lib/knowledge/entity-registry';
import type { EntityLink, EntityLinkRole, EntityType } from '@/lib/knowledge/types';

export type EntityLinkInput = Omit<EntityLink, 'sortOrder'>;

export function derivePrimaryEntity(
  links: EntityLinkInput[] = [],
  explicit?: { entityType?: EntityType; entityId?: string },
): { primaryEntityType: EntityType | null; primaryEntityId: string | null } {
  const primaryLink = links.find((link) => link.role === 'primary');
  if (primaryLink) {
    const resolved = resolveEntityReference(primaryLink.entityType, primaryLink.entityId);
    return {
      primaryEntityType: resolved.entityType,
      primaryEntityId: resolved.entityId,
    };
  }

  if (explicit?.entityType && explicit?.entityId) {
    const resolved = resolveEntityReference(explicit.entityType, explicit.entityId);
    return {
      primaryEntityType: resolved.entityType,
      primaryEntityId: resolved.entityId,
    };
  }

  return { primaryEntityType: null, primaryEntityId: null };
}

/** Ensure at most one primary link; merge explicit primary into links when missing. */
export function normalizeEntityLinks(
  links: EntityLinkInput[] = [],
  explicit?: { entityType?: EntityType; entityId?: string },
): EntityLinkInput[] {
  const normalized = links.map((link) => ({
    entityType: link.entityType,
    entityId: link.entityId,
    role: link.role,
  }));

  const hasPrimary = normalized.some((link) => link.role === 'primary');
  if (!hasPrimary && explicit?.entityType && explicit?.entityId) {
    normalized.unshift({
      entityType: explicit.entityType,
      entityId: explicit.entityId,
      role: 'primary' as EntityLinkRole,
    });
  }

  let primarySeen = false;
  return normalized.filter((link) => {
    if (link.role !== 'primary') return true;
    if (primarySeen) return false;
    primarySeen = true;
    return true;
  });
}

/** Entity type/id pairs to match when querying posts for an entity page. */
export function entityMatchVariants(
  entityType: EntityType,
  entityId: string,
): Array<{ entityType: EntityType; entityId: string }> {
  const resolved = resolveEntityReference(entityType, entityId);
  const variants = new Map<string, { entityType: EntityType; entityId: string }>();

  const add = (type: EntityType, id: string) => variants.set(`${type}:${id}`, { entityType: type, entityId: id });

  add(entityType, entityId);
  add(resolved.entityType, resolved.entityId);

  if (resolved.entityType === 'trek') {
    add('trip', resolved.entityId);
    add('yatra', resolved.entityId);
  }

  return [...variants.values()];
}
