import type { ContentType, EntityType } from '@/lib/knowledge/types';

export type BlogTopicId =
  | 'all'
  | 'treks'
  | 'trips'
  | 'yatra'
  | 'backpacking'
  | 'international'
  | 'guides'
  | 'news';

export type BlogTopic = {
  id: BlogTopicId;
  label: string;
  description: string;
  entityType?: EntityType;
  contentType?: ContentType;
  tag?: string;
  href: string;
};

export const BLOG_TOPICS: BlogTopic[] = [
  {
    id: 'all',
    label: 'All',
    description: 'Every trek guide, story, and tip',
    href: '/blog',
  },
  {
    id: 'treks',
    label: 'Treks',
    description: 'Himalayan trek guides linked to individual routes',
    entityType: 'trek',
    href: '/blog?topic=treks',
  },
  {
    id: 'trips',
    label: 'Trips',
    description: 'Trip reports and destination guides',
    entityType: 'trip',
    href: '/blog?topic=trips',
  },
  {
    id: 'yatra',
    label: 'Yatra',
    description: 'Sacred yatra tips and pilgrimage stories',
    entityType: 'yatra',
    href: '/blog?topic=yatra',
  },
  {
    id: 'backpacking',
    label: 'Backpacking',
    description: 'Budget circuits and backpacking inspiration',
    tag: 'backpacking',
    href: '/blog?topic=backpacking',
  },
  {
    id: 'international',
    label: 'International',
    description: 'Nepal and beyond — global adventure stories',
    tag: 'international',
    href: '/blog?topic=international',
  },
  {
    id: 'guides',
    label: 'Prep & Guides',
    description: 'Training, packing, altitude, and how-to articles',
    contentType: 'guide',
    href: '/blog?topic=guides',
  },
  {
    id: 'news',
    label: 'Travel News',
    description: 'Updates, facts, and industry news',
    href: '/blog/news',
  },
];

export function getBlogTopic(id?: string | null): BlogTopic {
  return BLOG_TOPICS.find((topic) => topic.id === id) ?? BLOG_TOPICS[0];
}

export function blogTopicHref(topic: BlogTopic, page = 1): string {
  if (topic.id === 'all') return page > 1 ? `/blog?page=${page}` : '/blog';
  if (topic.id === 'news') return '/blog/news';
  return page > 1 ? `${topic.href}&page=${page}` : topic.href;
}
