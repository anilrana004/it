'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Archive,
  Edit3,
  ExternalLink,
  Plus,
  RefreshCw,
  Trash2,
} from 'lucide-react';
import AdminBlogEditor from '@/components/admin/blog/AdminBlogEditor';
import AdminButton from '@/components/admin/ui/AdminButton';
import AdminCard from '@/components/admin/ui/AdminCard';
import AdminPageHeader from '@/components/admin/ui/AdminPageHeader';
import AdminSearchInput from '@/components/admin/ui/AdminSearchInput';
import {
  archiveAdminPost,
  createAdminPost,
  deleteAdminPost,
  editorFormToPayload,
  emptyEditorForm,
  fetchAdminPost,
  fetchAdminPosts,
  fetchAuthors,
  fetchCategories,
  postToEditorForm,
  publishAdminPost,
  searchEntities,
  updateAdminPost,
  type EditorFormState,
  type KnowledgeAuthorOption,
} from '@/lib/admin/blog-api';
import { publicPostPath } from '@/lib/admin/placement-preview';
import {
  computeEffectiveHealth,
  CONTENT_HEALTH_LABELS,
  healthBadgeClass,
} from '@/lib/knowledge/content-health';
import type { ContentHealthStatus, KnowledgeCategory, KnowledgePost, PostStatus } from '@/lib/knowledge/types';

const STATUS_FILTERS: Array<'all' | PostStatus> = ['all', 'draft', 'published', 'archived'];
const HEALTH_FILTERS: Array<'all' | ContentHealthStatus> = [
  'all',
  'healthy',
  'needs_review',
  'outdated',
  'archived',
];

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<KnowledgePost[]>([]);
  const [categories, setCategories] = useState<KnowledgeCategory[]>([]);
  const [authors, setAuthors] = useState<KnowledgeAuthorOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbUnavailable, setDbUnavailable] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | PostStatus>('all');
  const [sectionFilter, setSectionFilter] = useState<'all' | 'blog' | 'travel_news'>('all');
  const [healthFilter, setHealthFilter] = useState<'all' | ContentHealthStatus>('all');

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EditorFormState>(emptyEditorForm());

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setDbUnavailable(false);
    try {
      const [postRows, categoryRows, authorRows] = await Promise.all([
        fetchAdminPosts(),
        fetchCategories(),
        fetchAuthors(),
      ]);
      setPosts(postRows);
      setCategories(categoryRows);
      setAuthors(authorRows);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load blog data';
      if (message.includes('503') || message.toLowerCase().includes('database')) {
        setDbUnavailable(true);
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filtered = useMemo(() => {
    return posts.filter((post) => {
      if (statusFilter !== 'all' && post.status !== statusFilter) return false;
      if (sectionFilter !== 'all' && post.section !== sectionFilter) return false;
      if (healthFilter !== 'all' && computeEffectiveHealth(post) !== healthFilter) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        post.slug.toLowerCase().includes(q) ||
        (post.author?.name ?? '').toLowerCase().includes(q)
      );
    });
  }, [posts, search, statusFilter, sectionFilter, healthFilter]);

  const editingPost = editingId ? posts.find((p) => p.id === editingId) ?? null : null;

  const enrich = async (entity: EditorFormState['primaryEntity']) => {
    if (!entity) return null;
    const results = await searchEntities(entity.entityId, entity.entityType);
    return (
      results.find((r) => r.entityId === entity.entityId && r.entityType === entity.entityType) ??
      entity
    );
  };

  async function enrichEditorForm(base: EditorFormState): Promise<EditorFormState> {
    const primaryEntity = base.primaryEntity ? await enrich(base.primaryEntity) : null;
    const relatedEntities = (
      await Promise.all(base.relatedEntities.map((entity) => enrich(entity)))
    ).filter(Boolean) as EditorFormState['relatedEntities'];

    return { ...base, primaryEntity, relatedEntities };
  }

  const openCreate = () => {
    setEditingId(null);
    setForm({
      ...emptyEditorForm(),
      authorId: authors[0]?.id ?? '',
      categoryId: categories[0]?.id ?? '',
    });
    setFieldErrors({});
    setEditorOpen(true);
  };

  const openEdit = async (id: string) => {
    try {
      setSaving(true);
      const post = await fetchAdminPost(id);
      const base = postToEditorForm(post);
      const enriched = await enrichEditorForm(base);
      setEditingId(id);
      setForm(enriched);
      setFieldErrors({});
      setEditorOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load post');
    } finally {
      setSaving(false);
    }
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingId(null);
    setFieldErrors({});
  };

  async function persist(status: PostStatus, publishAfterSave = false) {
    setSaving(true);
    setFieldErrors({});
    setError(null);

    try {
      const payload = editorFormToPayload(form, status);
      let saved: KnowledgePost;

      if (editingId) {
        saved = await updateAdminPost({
          ...payload,
          id: editingId,
          status: publishAfterSave ? (editingPost?.status ?? 'draft') : status,
        });
        if (publishAfterSave) {
          saved = await publishAdminPost(editingId);
        }
      } else {
        saved = await createAdminPost({ ...payload, status: 'draft' });
        setEditingId(saved.id);
        if (publishAfterSave || status === 'published') {
          saved = await publishAdminPost(saved.id);
        }
      }

      await loadData();
      setForm(await enrichEditorForm(postToEditorForm(saved)));
    } catch (err) {
      const e = err as Error & { fieldErrors?: Record<string, string> };
      setError(e.message);
      if (e.fieldErrors) setFieldErrors(e.fieldErrors);
    } finally {
      setSaving(false);
    }
  }

  async function handleArchive(id: string) {
    if (!confirm('Archive this post? It will be hidden from the public site.')) return;
    setSaving(true);
    try {
      await archiveAdminPost(id);
      await loadData();
      closeEditor();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Archive failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post permanently?')) return;
    setSaving(true);
    try {
      await deleteAdminPost(id);
      await loadData();
      if (editingId === id) closeEditor();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setSaving(false);
    }
  }

  async function handleQuickPublish(id: string) {
    setSaving(true);
    setFieldErrors({});
    try {
      await publishAdminPost(id);
      await loadData();
    } catch (err) {
      const e = err as Error & { fieldErrors?: Record<string, string> };
      setError(e.message);
      if (e.fieldErrors) setFieldErrors(e.fieldErrors);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-slate-500">
        <RefreshCw className="mr-2 h-5 w-5 animate-spin" /> Loading content…
      </div>
    );
  }

  if (dbUnavailable) {
    return (
      <div className="mx-auto mt-12 max-w-xl rounded-xl border border-amber-200 bg-amber-50 p-8 text-center shadow-sm">
        <h2 className="mb-2 text-lg font-semibold text-slate-900">Database not configured</h2>
        <p className="mb-4 text-sm text-slate-600">
          Set <code className="rounded bg-white px-1.5 py-0.5 text-xs">DATABASE_URL</code> in{' '}
          <code>.env.local</code>, then run{' '}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">npm run db:migrate</code> and{' '}
          <code className="rounded bg-white px-1.5 py-0.5 text-xs">npm run db:seed</code>.
        </p>
        <button type="button" onClick={loadData} className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
          Retry connection
        </button>
      </div>
    );
  }

  const filterSelectClass =
    'h-10 min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 sm:flex-none sm:min-w-[8.5rem]';

  const renderPostActions = (post: KnowledgePost) => (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => openEdit(post.id)}
        className="p-1.5 text-gray-400 hover:text-[#16a34a]"
        title="Edit"
      >
        <Edit3 className="h-4 w-4" />
      </button>
      {post.status === 'published' && (
        <a
          href={publicPostPath(post.section, post.slug)}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 text-gray-400 hover:text-blue-600"
          title="View live"
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
      {post.status === 'draft' && (
        <button
          type="button"
          onClick={() => handleQuickPublish(post.id)}
          className="rounded-lg bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-100"
        >
          Publish
        </button>
      )}
      {post.status !== 'archived' && (
        <button
          type="button"
          onClick={() => handleArchive(post.id)}
          className="p-1.5 text-gray-400 hover:text-orange-500"
          title="Archive"
        >
          <Archive className="h-4 w-4" />
        </button>
      )}
      <button
        type="button"
        onClick={() => handleDelete(post.id)}
        className="p-1.5 text-gray-400 hover:text-red-500"
        title="Delete"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );

  const formatPostDate = (post: KnowledgePost) =>
    post.updatedAt
      ? new Date(post.updatedAt).toLocaleDateString()
      : post.publishedAt
        ? new Date(post.publishedAt).toLocaleDateString()
        : '—';

  const statusBadgeClass = (status: PostStatus) =>
    status === 'published'
      ? 'bg-green-100 text-green-700'
      : status === 'archived'
        ? 'bg-gray-100 text-gray-600'
        : 'bg-yellow-100 text-yellow-700';

  const filterControls = (
    <>
      <AdminSearchInput
        placeholder="Search title or slug…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        wrapperClassName="w-full sm:w-44 lg:w-56"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
        className={filterSelectClass}
      >
        {STATUS_FILTERS.map((status) => (
          <option key={status} value={status}>
            {status === 'all' ? 'All statuses' : status}
          </option>
        ))}
      </select>
      <select
        value={sectionFilter}
        onChange={(e) => setSectionFilter(e.target.value as typeof sectionFilter)}
        className={filterSelectClass}
      >
        <option value="all">All sections</option>
        <option value="blog">Blog</option>
        <option value="travel_news">Travel News</option>
      </select>
      <select
        value={healthFilter}
        onChange={(e) => setHealthFilter(e.target.value as typeof healthFilter)}
        className={filterSelectClass}
      >
        {HEALTH_FILTERS.map((health) => (
          <option key={health} value={health}>
            {health === 'all' ? 'All health' : CONTENT_HEALTH_LABELS[health]}
          </option>
        ))}
      </select>
      <button
        type="button"
        onClick={loadData}
        className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
        title="Refresh"
      >
        <RefreshCw className="h-4 w-4" />
      </button>
      <AdminButton onClick={openCreate} icon={<Plus className="h-4 w-4" />} className="w-full sm:w-auto">
        New post
      </AdminButton>
    </>
  );

  return (
    <div>
      <AdminPageHeader
        breadcrumb="Content"
        title="Blog & News"
        description={`${posts.length} total · ${filtered.length} shown`}
        actions={<div className="hidden flex-wrap items-center gap-2 lg:flex">{filterControls}</div>}
      />

      <div className="mb-6 space-y-3 lg:hidden">
        <div className="grid grid-cols-2 gap-2">{filterControls}</div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error.toLowerCase() === 'unauthorized'
            ? 'Your session expired. Please sign in again — you will be redirected automatically.'
            : error}
        </div>
      )}

      {editorOpen && (
        <AdminBlogEditor
          mode={editingId ? 'edit' : 'create'}
          form={form}
          onChange={setForm}
          categories={categories}
          authors={authors}
          saving={saving}
          fieldErrors={fieldErrors}
          existingPost={editingPost}
          allPosts={posts}
          onSaveDraft={() => persist('draft')}
          onPublish={() => persist('published', true)}
          onArchive={editingId ? () => handleArchive(editingId) : undefined}
          onCancel={closeEditor}
        />
      )}

      <AdminCard padding={false} className={editorOpen ? 'mt-6' : ''}>
        {/* Mobile card list */}
        <div className="divide-y divide-slate-100 md:hidden">
          {filtered.map((post) => {
            const health = computeEffectiveHealth(post);
            return (
              <article key={post.id} className="space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-medium text-slate-900">{post.title}</h3>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{post.slug}</p>
                  </div>
                  {renderPostActions(post)}
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${statusBadgeClass(post.status)}`}>
                    {post.status}
                  </span>
                  <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${healthBadgeClass(health)}`}>
                    {CONTENT_HEALTH_LABELS[health]}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                    {post.section === 'travel_news' ? 'News' : 'Blog'}
                  </span>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-500">
                  <div>
                    <dt className="font-medium text-slate-400">Author</dt>
                    <dd>{post.author?.name ?? '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-400">Updated</dt>
                    <dd>{formatPostDate(post)}</dd>
                  </div>
                  {post.primaryEntityType && post.primaryEntityId ? (
                    <div className="col-span-2">
                      <dt className="font-medium text-slate-400">Entity</dt>
                      <dd className="truncate">
                        {post.primaryEntityType}/{post.primaryEntityId}
                      </dd>
                    </div>
                  ) : null}
                </dl>
              </article>
            );
          })}
          {filtered.length === 0 && (
            <p className="p-8 text-center text-sm text-slate-400">No blog posts match your filters</p>
          )}
        </div>

        {/* Desktop table */}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Section</th>
                <th className="p-4 font-semibold text-gray-600">Author</th>
                <th className="p-4 font-semibold text-gray-600">Entity</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Health</th>
                <th className="p-4 font-semibold text-gray-600">Updated</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post) => {
                const health = computeEffectiveHealth(post);
                return (
                <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="max-w-xs truncate font-medium text-gray-800">{post.title}</div>
                    <div className="truncate text-xs text-gray-400">{post.slug}</div>
                  </td>
                  <td className="p-4 capitalize text-gray-600">
                    {post.section === 'travel_news' ? 'News' : 'Blog'}
                  </td>
                  <td className="p-4 text-gray-600">{post.author?.name ?? '—'}</td>
                  <td className="p-4 text-xs text-gray-600">
                    {post.primaryEntityType && post.primaryEntityId
                      ? `${post.primaryEntityType}/${post.primaryEntityId}`
                      : '—'}
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full px-2 py-1 text-xs font-semibold capitalize ${statusBadgeClass(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${healthBadgeClass(health)}`}>
                      {CONTENT_HEALTH_LABELS[health]}
                    </span>
                  </td>
                  <td className="whitespace-nowrap p-4 text-xs text-gray-500">
                    {formatPostDate(post)}
                  </td>
                  <td className="p-4">{renderPostActions(post)}</td>
                </tr>
              );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-gray-400">
                    No blog posts match your filters
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </AdminCard>
    </div>
  );
}
