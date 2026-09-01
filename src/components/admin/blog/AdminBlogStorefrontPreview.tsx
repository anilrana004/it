'use client';

import { useRef } from 'react';
import BlogPostPageView from '@/components/BlogPostPageView';
import { BlogScrollRootProvider } from '@/components/blog/blog-scroll-context';
import { formToPreviewBlogPost, previewBreadcrumbs } from '@/lib/admin/blog-preview';
import type { EditorFormState } from '@/lib/admin/blog-api';
import '@/components/admin/blog/admin-blog-preview.css';

type Props = {
  form: EditorFormState;
  authorName?: string;
  categoryName?: string;
  reviewerName?: string;
};

export default function AdminBlogStorefrontPreview({
  form,
  authorName,
  categoryName,
  reviewerName,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const post = formToPreviewBlogPost(form, { authorName, categoryName, reviewerName });
  const breadcrumbs = previewBreadcrumbs(post);

  return (
    <div className="admin-blog-preview">
      <div className="admin-blog-preview__chrome">
        <span className="admin-blog-preview__label">Storefront preview</span>
        <span className="admin-blog-preview__hint">Updates as you edit title, excerpt, image &amp; content</span>
      </div>
      <div ref={frameRef} className="admin-blog-preview__frame">
        <BlogScrollRootProvider rootRef={frameRef}>
          <BlogPostPageView
            post={post}
            recentPosts={[]}
            relatedPosts={[]}
            breadcrumbs={breadcrumbs}
          />
        </BlogScrollRootProvider>
      </div>
    </div>
  );
}
