'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { BLOG_TOPICS, type BlogTopicId } from '@/lib/blog-taxonomy';

export default function BlogTopicNav() {
  const searchParams = useSearchParams();
  const activeTopic = (searchParams.get('topic') as BlogTopicId | null) ?? 'all';
  const activeEntity = searchParams.get('entity');

  return (
    <nav className="blog-topic-nav" aria-label="Browse blog topics">
      <div className="blog-topic-nav__scroll">
        {BLOG_TOPICS.map((topic) => {
          const isActive =
            !activeEntity &&
            (topic.id === activeTopic || (topic.id === 'all' && !searchParams.get('topic')));
          return (
            <Link
              key={topic.id}
              href={topic.href}
              className={`blog-topic-nav__pill${isActive ? ' is-active' : ''}`}
              title={topic.description}
            >
              {topic.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
