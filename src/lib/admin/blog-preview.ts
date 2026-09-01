import { blogExcerpt, blogPath, type BlogPost } from '@/lib/blog';
import { cldBlogImage } from '@/lib/cloudinary';
import type { EditorFormState } from '@/lib/admin/blog-api';

type PreviewContext = {
  authorName?: string;
  categoryName?: string;
  reviewerName?: string;
};

function formatReadTime(content: string): string {
  const min = Math.max(1, Math.round(content.trim().split(/\s+/).filter(Boolean).length / 200));
  return `${min} min read`;
}

function entityTreks(form: EditorFormState): string[] {
  const ids: string[] = [];
  const push = (type: string | undefined, id: string | undefined) => {
    if (!id) return;
    if (type === 'trek' || type === 'trip' || type === 'yatra') ids.push(id);
  };
  push(form.primaryEntity?.entityType, form.primaryEntity?.entityId);
  for (const entity of form.relatedEntities) {
    push(entity.entityType, entity.entityId);
  }
  return [...new Set(ids)];
}

function entityRegions(form: EditorFormState): string[] {
  const ids: string[] = [];
  const push = (type: string | undefined, id: string | undefined) => {
    if (!id) return;
    if (type === 'region' || type === 'destination') ids.push(id);
  };
  push(form.primaryEntity?.entityType, form.primaryEntity?.entityId);
  for (const entity of form.relatedEntities) {
    push(entity.entityType, entity.entityId);
  }
  if (form.primaryEntity?.region) ids.push(form.primaryEntity.region);
  return [...new Set(ids)];
}

export function formToPreviewBlogPost(form: EditorFormState, ctx: PreviewContext = {}): BlogPost {
  const tags = form.tags
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  const hasAuthority =
    (form.quickAnswerDisplay && (form.quickAnswer.trim() || form.keyFacts.length > 0)) ||
    form.faqs.length > 0 ||
    form.sources.length > 0 ||
    form.lastFactCheckedAt ||
    form.expertReviewed;

  return {
    slug: form.slug.trim() || 'preview',
    title: form.title.trim() || 'Untitled draft',
    publishedAt: new Date().toISOString().slice(0, 10),
    read: formatReadTime(form.content),
    author: ctx.authorName?.trim() || 'Indian Treks Team',
    image: form.featuredImageUrl ? cldBlogImage(form.featuredImageUrl, 'featured') : '',
    content: form.content,
    description: form.excerpt.trim() || form.seoDescription.trim() || blogExcerpt(form.content, 160),
    seoTitle: form.seoTitle.trim() || undefined,
    canonicalUrl: form.canonicalUrl.trim() || undefined,
    updatedAt: form.lastFactCheckedAt ? `${form.lastFactCheckedAt}T00:00:00` : undefined,
    markdown: true,
    treks: entityTreks(form),
    regions: entityRegions(form),
    types: tags.filter((t) => ['trek', 'yatra', 'trip'].includes(t)),
    categories: ctx.categoryName ? [ctx.categoryName] : [],
    keywords: tags,
    authority: hasAuthority
      ? {
          quickAnswer: form.quickAnswer.trim() || undefined,
          quickAnswerDisplay: form.quickAnswerDisplay,
          keyFacts: form.keyFacts.filter((f) => f.label.trim() && f.value.trim()),
          faqs: form.faqs
            .filter((f) => f.question.trim() && f.answer.trim())
            .map((f) => ({ question: f.question, answer: f.answer })),
          sources: form.sources
            .filter((s) => s.sourceTitle.trim())
            .map((s) => ({
              title: s.sourceTitle,
              url: s.sourceUrl.trim() || undefined,
              type: s.sourceType,
              verifiedAt: s.verifiedAt || undefined,
            })),
          reviewerName: ctx.reviewerName,
          lastVerified: form.lastFactCheckedAt || undefined,
          expertReviewed: form.expertReviewed,
        }
      : undefined,
  };
}

export function previewBreadcrumbs(post: BlogPost) {
  return [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.title, path: blogPath(post.slug) },
  ];
}
