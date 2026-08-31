import type { ContentHealthStatus, KnowledgePost } from '@/lib/knowledge/types';

/** Days without fact-check before content is flagged outdated. */
export const STALE_FACT_CHECK_DAYS = 180;

export const CONTENT_HEALTH_LABELS: Record<ContentHealthStatus, string> = {
  healthy: 'Healthy',
  needs_review: 'Needs review',
  outdated: 'Outdated',
  archived: 'Archived',
};

export function computeEffectiveHealth(post: Pick<
  KnowledgePost,
  'status' | 'healthStatus' | 'lastFactCheckedAt' | 'contentFreshness'
>): ContentHealthStatus {
  if (post.status === 'archived') return 'archived';

  if (post.healthStatus === 'needs_review') return 'needs_review';
  if (post.healthStatus === 'outdated') return 'outdated';

  if (post.contentFreshness !== 'evergreen' && post.lastFactCheckedAt) {
    const checked = new Date(post.lastFactCheckedAt);
    const staleAfter = new Date(checked);
    staleAfter.setDate(staleAfter.getDate() + STALE_FACT_CHECK_DAYS);
    if (new Date() > staleAfter) return 'outdated';
  }

  if (post.contentFreshness !== 'evergreen' && !post.lastFactCheckedAt) {
    return 'needs_review';
  }

  return post.healthStatus ?? 'healthy';
}

export function healthBadgeClass(status: ContentHealthStatus): string {
  switch (status) {
    case 'healthy':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'needs_review':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'outdated':
      return 'bg-orange-50 text-orange-800 border-orange-200';
    case 'archived':
      return 'bg-gray-100 text-gray-600 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-600 border-gray-200';
  }
}
