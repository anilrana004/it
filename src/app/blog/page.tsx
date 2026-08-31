import type { Metadata } from 'next';
import { Suspense } from 'react';
import BlogPageView from '@/components/blog/BlogPageView';
import {
  fetchPublishedBlogPosts,
  fetchPublishedBlogPostsByEntity,
  fetchPublishedBlogPostsByTopic,
} from '@/lib/knowledge/adapter';
import { getBlogTopic, type BlogTopicId } from '@/lib/blog-taxonomy';
import { getTrekById } from '@/lib/data';
import type { EntityType } from '@/lib/knowledge/types';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { regionLabel } from '@/lib/seo/regions';
import { entityTypeLabel } from '@/lib/knowledge/entity-labels';

export const revalidate = 300;

const PAGE_SIZE = 12;

function parseEntityParam(raw?: string): { entityType: EntityType; entityId: string } | null {
  if (!raw) return null;
  const [entityType, entityId] = raw.split(':');
  if (!entityType || !entityId) return null;
  const allowed: EntityType[] = ['trek', 'trip', 'yatra', 'destination', 'region', 'safety_topic'];
  if (!allowed.includes(entityType as EntityType)) return null;
  return { entityType: entityType as EntityType, entityId };
}

function parseTopicParam(raw?: string): BlogTopicId {
  const allowed: BlogTopicId[] = [
    'all',
    'treks',
    'trips',
    'yatra',
    'backpacking',
    'international',
    'guides',
    'news',
  ];
  if (raw && allowed.includes(raw as BlogTopicId)) return raw as BlogTopicId;
  return 'all';
}

function entityFilterLabel(entityType: EntityType, entityId: string): string {
  if (entityType === 'trek' || entityType === 'trip' || entityType === 'yatra') {
    return getTrekById(entityId)?.title ?? entityId;
  }
  if (entityType === 'region' || entityType === 'destination') {
    return regionLabel(entityId);
  }
  return entityId.replace(/-/g, ' ');
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; entity?: string; topic?: string }>;
}): Promise<Metadata> {
  const { entity, topic: topicParam } = await searchParams;
  const parsed = parseEntityParam(entity);

  if (parsed) {
    const label = entityFilterLabel(parsed.entityType, parsed.entityId);
    return buildPageMetadata({
      title: `${label} — ${entityTypeLabel(parsed.entityType)} Blog Articles`,
      description: `Himalayan trek guides and travel stories related to ${label} from Indian Treks.`,
      path: `/blog?entity=${parsed.entityType}:${parsed.entityId}`,
    });
  }

  const topic = getBlogTopic(parseTopicParam(topicParam));
  if (topic.id !== 'all') {
    return buildPageMetadata({
      title: `${topic.label} Blog — Indian Treks`,
      description: topic.description,
      path: topic.href,
    });
  }

  return buildPageMetadata({
    title: 'Blog',
    description:
      'Himalayan trek guides, travel stories, yatra tips, and destination inspiration from Indian Treks.',
    path: '/blog',
  });
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; entity?: string; topic?: string }>;
}) {
  const { page: pageParam, entity, topic: topicParam } = await searchParams;
  const page = Math.max(1, Number(pageParam ?? '1') || 1);
  const offset = (page - 1) * PAGE_SIZE;
  const entityFilter = parseEntityParam(entity);
  const activeTopic = parseTopicParam(topicParam);

  const result = entityFilter
    ? await fetchPublishedBlogPostsByEntity({
        ...entityFilter,
        section: 'blog',
        limit: PAGE_SIZE,
        offset,
      })
    : activeTopic !== 'all'
      ? await fetchPublishedBlogPostsByTopic(activeTopic, { limit: PAGE_SIZE, offset })
      : await fetchPublishedBlogPosts({ limit: PAGE_SIZE, offset });

  const entityHeading = entityFilter
    ? `${entityFilterLabel(entityFilter.entityType, entityFilter.entityId)} articles`
    : undefined;

  return (
    <Suspense fallback={null}>
      <BlogPageView
        posts={result.items}
        total={result.total}
        page={page}
        pageSize={PAGE_SIZE}
        entityFilter={entityFilter ?? undefined}
        entityHeading={entityHeading}
        activeTopic={activeTopic}
      />
    </Suspense>
  );
}
