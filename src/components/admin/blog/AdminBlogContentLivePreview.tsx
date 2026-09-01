'use client';

import { useMemo, useRef } from 'react';
import BlogPostPageView from '@/components/BlogPostPageView';
import { BlogScrollRootProvider } from '@/components/blog/blog-scroll-context';
import { formToPreviewBlogPost, previewBreadcrumbs } from '@/lib/admin/blog-preview';
import type { EditorFormState } from '@/lib/admin/blog-api';
import '@/components/prep/prep-guides.css';
import '@/components/blog/blog-page.css';
import '@/components/blog/blog-prose.css';
import '@/components/blog/blog-article.css';
import '@/components/admin/blog/admin-blog-preview.css';

export type BlogContentPreviewMeta = {
  title?: string;
  excerpt?: string;
  featuredImageUrl?: string;
  categoryName?: string;
  authorName?: string;
  reviewerName?: string;
  expertReviewed?: boolean;
  section?: EditorFormState['section'];
  slug?: string;
  tags?: string;
  primaryEntity?: EditorFormState['primaryEntity'];
  relatedEntities?: EditorFormState['relatedEntities'];
  quickAnswer?: string;
  quickAnswerDisplay?: boolean;
  keyFacts?: EditorFormState['keyFacts'];
  faqs?: EditorFormState['faqs'];
  sources?: EditorFormState['sources'];
  lastFactCheckedAt?: string;
};

type Props = {
  content: string;
  meta: BlogContentPreviewMeta;
  label?: string;
  className?: string;
};

export default function AdminBlogContentLivePreview({
  content,
  meta,
  label = 'Live preview',
  className = '',
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);

  const form = useMemo(
    (): EditorFormState => ({
      slug: meta.slug ?? 'preview',
      title: meta.title ?? '',
      excerpt: meta.excerpt ?? '',
      content,
      section: meta.section ?? 'blog',
      contentType: 'guide',
      authorId: '',
      reviewerId: '',
      featuredImageUrl: meta.featuredImageUrl ?? '',
      seoTitle: '',
      seoDescription: '',
      canonicalUrl: '',
      tags: meta.tags ?? '',
      placementSlots: [],
      categoryId: '',
      primaryEntity: meta.primaryEntity ?? null,
      relatedEntities: meta.relatedEntities ?? [],
      healthStatus: 'healthy',
      contentFreshness: 'evergreen',
      lastFactCheckedAt: meta.lastFactCheckedAt ?? '',
      expertReviewed: meta.expertReviewed ?? false,
      quickAnswer: meta.quickAnswer ?? '',
      quickAnswerDisplay: meta.quickAnswerDisplay ?? true,
      keyFacts: meta.keyFacts ?? [],
      sources: meta.sources ?? [],
      faqs: meta.faqs ?? [],
    }),
    [content, meta],
  );

  const post = formToPreviewBlogPost(form, {
    authorName: meta.authorName,
    categoryName: meta.categoryName,
    reviewerName: meta.reviewerName,
  });
  const breadcrumbs = previewBreadcrumbs(post);

  return (
    <div className={`admin-blog-live-preview ${className}`.trim()}>
      <div className="admin-blog-live-preview__label">{label}</div>
      <div ref={frameRef} className="admin-blog-live-preview__frame">
        <BlogScrollRootProvider rootRef={frameRef}>
          <BlogPostPageView
            post={post}
            recentPosts={[]}
            relatedPosts={[]}
            breadcrumbs={breadcrumbs}
            compact
          />
        </BlogScrollRootProvider>
      </div>
    </div>
  );
}
