'use client';

import { useMemo, useState } from 'react';
import { Eye, LayoutTemplate, PencilLine, X } from 'lucide-react';
import AdminBlogStorefrontPreview from '@/components/admin/blog/AdminBlogStorefrontPreview';
import AdminSeoScorecard from '@/components/admin/blog/AdminSeoScorecard';
import AdminAeoGeoReadiness from '@/components/admin/blog/AdminAeoGeoReadiness';
import PrimaryEntityPicker from '@/components/admin/blog/PrimaryEntityPicker';
import PlacementPanel from '@/components/admin/blog/PlacementPanel';
import BlogContentEditor from '@/components/admin/blog/BlogContentEditor';
import CloudinaryImageField from '@/components/admin/blog/CloudinaryImageField';
import AdminAuthorityFields from '@/components/admin/blog/AdminAuthorityFields';
import AdminContentInsights from '@/components/admin/blog/AdminContentInsights';
import AdminEditorialSuggestions from '@/components/admin/blog/AdminEditorialSuggestions';
import {
  slugifyTitle,
  type EditorFormState,
  type KnowledgeAuthorOption,
  type RegistryEntity,
} from '@/lib/admin/blog-api';
import type { EditorialSuggestion } from '@/lib/admin/editorial-suggestions';
import { publicPostPath } from '@/lib/admin/placement-preview';
import { CONTENT_TYPES, POST_SECTIONS } from '@/lib/knowledge/config';
import { findCannibalizationHints, findTopicGaps, postsForEntity } from '@/lib/knowledge/topic-intelligence';
import type { KnowledgeCategory, KnowledgePost } from '@/lib/knowledge/types';

type Props = {
  mode: 'create' | 'edit';
  form: EditorFormState;
  onChange: (form: EditorFormState) => void;
  categories: KnowledgeCategory[];
  authors: KnowledgeAuthorOption[];
  saving: boolean;
  fieldErrors?: Record<string, string>;
  existingPost?: KnowledgePost | null;
  allPosts?: KnowledgePost[];
  onSaveDraft: () => void;
  onPublish: () => void;
  onArchive?: () => void;
  onCancel: () => void;
};

export default function AdminBlogEditor({
  mode,
  form,
  onChange,
  categories,
  authors,
  saving,
  fieldErrors = {},
  existingPost,
  allPosts = [],
  onSaveDraft,
  onPublish,
  onArchive,
  onCancel,
}: Props) {
  const [slugManual, setSlugManual] = useState(mode === 'edit');
  const [editorView, setEditorView] = useState<'write' | 'preview'>('write');

  const set = <K extends keyof EditorFormState>(key: K, value: EditorFormState[K]) => {
    onChange({ ...form, [key]: value });
  };

  const handleTitleChange = (title: string) => {
    const next = { ...form, title };
    if (!slugManual) next.slug = slugifyTitle(title);
    onChange(next);
  };

  const addRelatedEntity = (entity: RegistryEntity | null) => {
    if (!entity) return;
    const exists = form.relatedEntities.some(
      (item) => item.entityType === entity.entityType && item.entityId === entity.entityId,
    );
    if (exists) return;
    onChange({ ...form, relatedEntities: [...form.relatedEntities, entity] });
  };

  const removeRelatedEntity = (entity: RegistryEntity) => {
    onChange({
      ...form,
      relatedEntities: form.relatedEntities.filter(
        (item) => !(item.entityType === entity.entityType && item.entityId === entity.entityId),
      ),
    });
  };

  const applySuggestion = (suggestion: EditorialSuggestion) => {
    switch (suggestion.id) {
      case 'seo-title':
        set('seoTitle', suggestion.value);
        break;
      case 'seo-description':
        set('seoDescription', suggestion.value);
        break;
      case 'tags': {
        const existing = form.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        const added = suggestion.value
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean);
        const merged = [...new Set([...existing, ...added])];
        set('tags', merged.join(', '));
        break;
      }
      case 'quick-answer':
        set('quickAnswer', suggestion.value);
        break;
      case 'fact-check':
        set('lastFactCheckedAt', suggestion.value);
        break;
      default:
        if (suggestion.id.startsWith('entity-')) {
          const entityId = suggestion.id.slice('entity-'.length);
          addRelatedEntity({
            entityType: 'trek',
            entityId,
            title: suggestion.value.replace(/\s*\([^)]+\)$/, ''),
            canonicalUrl: '',
            region: null,
          });
        }
        break;
    }
  };

  const previewPath = useMemo(() => {
    if (!form.slug.trim()) return null;
    return publicPostPath(form.section, form.slug.trim());
  }, [form.section, form.slug]);

  const draftPost = useMemo((): KnowledgePost | null => {
    if (!form.title.trim()) return existingPost ?? null;
    return {
      ...(existingPost ?? {
        id: 'draft',
        slug: form.slug,
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        contentFormat: 'markdown',
        status: 'draft',
        contentType: form.contentType,
        section: form.section,
        featuredImageUrl: form.featuredImageUrl || null,
        readingTimeMin: null,
        primaryEntityType: form.primaryEntity?.entityType ?? null,
        primaryEntityId: form.primaryEntity?.entityId ?? null,
        publishedAt: null,
        seoTitle: null,
        seoDescription: null,
        canonicalUrl: null,
        robots: null,
        updatedAt: null,
        tags: [],
        categories: [],
        entityLinks: [],
        relatedPostIds: [],
        healthStatus: form.healthStatus,
        lastFactCheckedAt: form.lastFactCheckedAt || null,
        expertReviewed: form.expertReviewed,
        contentFreshness: form.contentFreshness,
        quickAnswer: null,
        sources: [],
        faqs: [],
      }),
      title: form.title,
      slug: form.slug,
      primaryEntityType: form.primaryEntity?.entityType ?? null,
      primaryEntityId: form.primaryEntity?.entityId ?? null,
    };
  }, [existingPost, form]);

  const cannibalization = useMemo(() => {
    if (!draftPost || allPosts.length === 0) return [];
    return findCannibalizationHints(draftPost, allPosts);
  }, [draftPost, allPosts]);

  const topicGaps = useMemo(() => {
    if (!form.primaryEntity) return [];
    const entityPosts = postsForEntity(
      allPosts,
      form.primaryEntity.entityType,
      form.primaryEntity.entityId,
    );
    return findTopicGaps(
      form.primaryEntity.entityType,
      form.primaryEntity.entityId,
      entityPosts,
    );
  }, [allPosts, form.primaryEntity]);

  const error = (field: string) => fieldErrors[field];

  const authorName = authors.find((a) => a.id === form.authorId)?.name;
  const reviewerName = authors.find((a) => a.id === form.reviewerId)?.name;
  const categoryName = categories.find((c) => c.id === form.categoryId)?.name;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 mb-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900">
            {mode === 'create' ? 'Create Blog Post' : 'Edit Blog Post'}
          </h3>
          {existingPost && (
            <p className="text-xs text-gray-500 mt-1">
              Status: <span className="font-semibold capitalize">{existingPost.status}</span>
              {existingPost.updatedAt && (
                <> · Updated {new Date(existingPost.updatedAt).toLocaleString()}</>
              )}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-full border border-gray-200 bg-gray-50 p-0.5">
            <button
              type="button"
              onClick={() => setEditorView('write')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                editorView === 'write'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <PencilLine className="h-3.5 w-3.5" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setEditorView('preview')}
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                editorView === 'preview'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <LayoutTemplate className="h-3.5 w-3.5" />
              Storefront preview
            </button>
          </div>
          <button type="button" onClick={onCancel} className="p-2 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {editorView === 'preview' ? (
        <AdminBlogStorefrontPreview
          form={form}
          authorName={authorName}
          categoryName={categoryName}
          reviewerName={reviewerName}
        />
      ) : null}

      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-6${editorView === 'preview' ? ' hidden' : ''}`}>
        <div className="xl:col-span-2 space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#16a34a] ${error('title') ? 'border-red-300' : 'border-gray-200'}`}
              />
              {error('title') && <p className="text-xs text-red-600 mt-1">{error('title')}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                required
                value={form.slug}
                onChange={(e) => {
                  setSlugManual(true);
                  set('slug', e.target.value);
                }}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#16a34a] ${error('slug') ? 'border-red-300' : 'border-gray-200'}`}
              />
              {error('slug') && <p className="text-xs text-red-600 mt-1">{error('slug')}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt</label>
            <textarea
              rows={2}
              value={form.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a] resize-none"
            />
          </div>

          <BlogContentEditor
            value={form.content}
            onChange={(content) => set('content', content)}
            error={error('content')}
            previewMeta={{
              title: form.title,
              excerpt: form.excerpt,
              featuredImageUrl: form.featuredImageUrl,
              categoryName,
              authorName,
              reviewerName,
              expertReviewed: form.expertReviewed,
              slug: form.slug,
              section: form.section,
              tags: form.tags,
              primaryEntity: form.primaryEntity,
              relatedEntities: form.relatedEntities,
              quickAnswer: form.quickAnswer,
              quickAnswerDisplay: form.quickAnswerDisplay,
              keyFacts: form.keyFacts,
              faqs: form.faqs,
              sources: form.sources,
              lastFactCheckedAt: form.lastFactCheckedAt,
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title</label>
              <input
                type="text"
                value={form.seoTitle}
                onChange={(e) => set('seoTitle', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#16a34a] ${error('seoTitle') ? 'border-red-300' : 'border-gray-200'}`}
              />
              {error('seoTitle') && <p className="text-xs text-red-600 mt-1">{error('seoTitle')}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL (optional)</label>
              <input
                type="url"
                value={form.canonicalUrl}
                onChange={(e) => set('canonicalUrl', e.target.value)}
                placeholder="https://indiantreks.com/blog/…"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]"
              />
            </div>
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description</label>
              <textarea
                rows={2}
                value={form.seoDescription}
                onChange={(e) => set('seoDescription', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#16a34a] resize-none ${error('seoDescription') ? 'border-red-300' : 'border-gray-200'}`}
              />
              {error('seoDescription') && (
                <p className="text-xs text-red-600 mt-1">{error('seoDescription')}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Section</label>
              <select
                value={form.section}
                onChange={(e) => set('section', e.target.value as EditorFormState['section'])}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]"
              >
                {POST_SECTIONS.map((section) => (
                  <option key={section} value={section}>
                    {section === 'blog' ? 'Blog' : 'Travel News'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
              <select
                value={form.contentType}
                onChange={(e) => set('contentType', e.target.value as EditorFormState['contentType'])}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]"
              >
                {CONTENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
              <select
                value={form.authorId}
                onChange={(e) => set('authorId', e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#16a34a] ${error('authorId') ? 'border-red-300' : 'border-gray-200'}`}
              >
                <option value="">Select author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              {error('authorId') && <p className="text-xs text-red-600 mt-1">{error('authorId')}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.categoryId}
                onChange={(e) => set('categoryId', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]"
              >
                <option value="">None</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <CloudinaryImageField
              label="Featured Image"
              value={form.featuredImageUrl}
              onChange={(url) => set('featuredImageUrl', url)}
              previewRole="featured"
              hint="Used on blog cards and social previews — not shown as a banner on the article page."
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => set('tags', e.target.value)}
                placeholder="trek, uttarakhand, beginner"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]"
              />
            </div>
          </div>

          <PrimaryEntityPicker
            primaryEntity={form.primaryEntity}
            relatedEntities={form.relatedEntities}
            onPrimaryChange={(entity) => set('primaryEntity', entity)}
            onAddRelated={addRelatedEntity}
            onRemoveRelated={removeRelatedEntity}
            primaryError={error('primaryEntity')}
          />

          <AdminContentInsights cannibalization={cannibalization} topicGaps={topicGaps} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AdminSeoScorecard form={form} />
        <AdminAeoGeoReadiness form={form} />
      </div>

      <PlacementPanel
        section={form.section}
        slug={form.slug.trim() || undefined}
        status={existingPost?.status ?? 'draft'}
        primaryEntity={form.primaryEntity}
        relatedEntities={form.relatedEntities}
        placementSlots={form.placementSlots}
        onPlacementSlotsChange={(slots) => set('placementSlots', slots)}
      />

      <AdminAuthorityFields form={form} onChange={onChange} reviewerOptions={authors} />

      <AdminEditorialSuggestions form={form} onApply={applySuggestion} />

      <div className="flex flex-wrap gap-3 pt-2 border-t border-gray-100">
        <button
          type="button"
          disabled={saving}
          onClick={onSaveDraft}
          className="border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gray-50 disabled:opacity-50"
        >
          Save Draft
        </button>
        <button
          type="button"
          disabled={saving}
          onClick={onPublish}
          className="bg-[#16a34a] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#15803d] disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Publish'}
        </button>
        {mode === 'edit' && existingPost?.status === 'published' && previewPath && (
          <a
            href={previewPath}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gray-50"
          >
            <Eye className="w-4 h-4" /> View Live
          </a>
        )}
        {mode === 'edit' && onArchive && existingPost?.status !== 'archived' && (
          <button
            type="button"
            disabled={saving}
            onClick={onArchive}
            className="text-sm font-semibold text-orange-600 hover:underline disabled:opacity-50"
          >
            Archive
          </button>
        )}
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold text-gray-500 hover:underline ml-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
