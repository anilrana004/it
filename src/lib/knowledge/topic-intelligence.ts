import type { CannibalizationHint, EntityType, KnowledgePost, TopicGapHint } from '@/lib/knowledge/types';

const TREK_TOPIC_GAPS = [
  { topic: 'cost', label: 'Cost & pricing' },
  { topic: 'difficulty', label: 'Difficulty level' },
  { topic: 'best-time', label: 'Best time to visit' },
  { topic: 'weather', label: 'Weather & seasons' },
  { topic: 'packing', label: 'Packing list' },
  { topic: 'itinerary', label: 'Day-wise itinerary' },
  { topic: 'safety', label: 'Safety tips' },
  { topic: 'how-to-reach', label: 'How to reach' },
  { topic: 'beginner', label: 'Beginner guide' },
] as const;

function tokenSet(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, ' ')
      .split(/\s+/)
      .filter((word) => word.length > 2),
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  for (const token of a) {
    if (b.has(token)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union === 0 ? 0 : intersection / union;
}

export function findCannibalizationHints(
  target: KnowledgePost,
  allPosts: KnowledgePost[],
  threshold = 0.55,
): CannibalizationHint[] {
  const targetTokens = tokenSet(`${target.slug} ${target.title}`);

  return allPosts
    .filter((post) => post.id !== target.id && post.status !== 'archived')
    .map((post) => {
      const score = jaccardSimilarity(targetTokens, tokenSet(`${post.slug} ${post.title}`));
      const samePrimary =
        target.primaryEntityType &&
        target.primaryEntityId &&
        post.primaryEntityType === target.primaryEntityType &&
        post.primaryEntityId === target.primaryEntityId;

      const adjustedScore = samePrimary ? score + 0.15 : score;
      return { post, score: Math.min(1, adjustedScore) };
    })
    .filter(({ score }) => score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ post, score }) => ({
      postId: post.id,
      slug: post.slug,
      title: post.title,
      similarityScore: Math.round(score * 100) / 100,
      suggestion: score >= 0.75 ? ('merge' as const) : ('review' as const),
    }));
}

function postCoversTopic(post: KnowledgePost, topic: string): boolean {
  const haystack = `${post.slug} ${post.title} ${post.tags.join(' ')} ${post.content.slice(0, 400)}`.toLowerCase();
  const normalized = topic.replace(/-/g, ' ');
  return haystack.includes(normalized) || haystack.includes(topic);
}

export function findTopicGaps(
  entityType: EntityType | null | undefined,
  entityId: string | null | undefined,
  entityPosts: KnowledgePost[],
): TopicGapHint[] {
  if (!entityType || !entityId) return [];
  if (entityType !== 'trek' && entityType !== 'trip' && entityType !== 'yatra') return [];

  return TREK_TOPIC_GAPS.map(({ topic, label }) => {
    const match = entityPosts.find((post) => postCoversTopic(post, topic));
    return {
      topic,
      label,
      covered: Boolean(match),
      matchingPostSlug: match?.slug,
    };
  });
}

export function postsForEntity(posts: KnowledgePost[], entityType: EntityType, entityId: string) {
  return posts.filter(
    (post) =>
      (post.primaryEntityType === entityType && post.primaryEntityId === entityId) ||
      post.entityLinks.some(
        (link) =>
          (link.entityType === entityType || link.entityType === 'trek') &&
          link.entityId === entityId,
      ),
  );
}
