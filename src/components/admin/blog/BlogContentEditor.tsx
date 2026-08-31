'use client';

import { useRef, useState } from 'react';
import { Eye, ImagePlus, Loader2, Upload } from 'lucide-react';
import BlogMarkdown from '@/components/BlogMarkdown';
import BlogContentToolbar from '@/components/blog/BlogContentToolbar';
import { adminFetch } from '@/lib/admin/admin-fetch';
import { blogImageMarkdown } from '@/lib/cloudinary';
import '@/components/prep/prep-guides.css';
import '@/components/blog/blog-prose.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export default function BlogContentEditor({ value, onChange, error }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const insertAtCursor = (snippet: string) => {
    const el = textareaRef.current;
    if (!el) {
      onChange(`${value}${snippet}`);
      return;
    }
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const next = value.slice(0, start) + snippet + value.slice(end);
    onChange(next);
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + snippet.length;
      el.setSelectionRange(pos, pos);
    });
  };

  const uploadAndInsert = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await adminFetch('/api/admin/media/upload', { method: 'POST', body });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error || 'Upload failed');
      if (!data.url) throw new Error('No image URL returned');
      const caption = file.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim() || 'Trek photo';
      insertAtCursor(blogImageMarkdown(data.url, caption));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  return (
    <div>
      <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
        <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadAndInsert(file);
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ImagePlus className="h-3 w-3" />
            )}
            Insert image
          </button>
          <button
            type="button"
            onClick={() => setShowPreview((v) => !v)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#16a34a] hover:underline"
          >
            <Eye className="w-3.5 h-3.5" />
            {showPreview ? 'Edit' : 'Preview'}
          </button>
        </div>
      </div>

      <BlogContentToolbar onInsert={insertAtCursor} />

      <p className="mb-2 text-[11px] leading-relaxed text-gray-500">
        Use format buttons for headings, bullets, steps, tables, and callouts.{' '}
        <code className="rounded bg-gray-100 px-1">## Heading</code> adds a TOC section.{' '}
        <code className="rounded bg-gray-100 px-1">**Bold line**</code> alone creates a lead line.
      </p>

      <details className="mb-2 rounded-xl border border-gray-100 bg-gray-50/80 px-3 py-2 text-[11px] text-gray-600">
        <summary className="cursor-pointer font-semibold text-gray-700">Callout & color guide</summary>
        <ul className="mt-2 grid gap-1 pl-4 list-disc">
          <li><code>&gt; **Note:**</code> — green info box</li>
          <li><code>&gt; **Tip:**</code> — blue pro tip</li>
          <li><code>&gt; **Important:**</code> — forest green highlight</li>
          <li><code>&gt; **Warning:**</code> — amber safety alert</li>
          <li><code>1. Step</code> — numbered badges · <code>* item</code> — bullet dots</li>
          <li><code>| Col |</code> table rows for comparisons (great for SEO tables)</li>
        </ul>
      </details>

      {showPreview ? (
        <div className="min-h-[12rem] rounded-xl border border-gray-200 bg-white p-4">
          {value.trim() ? (
            <BlogMarkdown content={value} />
          ) : (
            <p className="text-sm text-gray-500">Nothing to preview yet.</p>
          )}
        </div>
      ) : (
        <textarea
          ref={textareaRef}
          rows={14}
          required
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`## Why Kedarkantha in winter\n\nOpening paragraph with hook…\n\n**Key takeaway in one bold line**\n\n> **Tip:** Book December batches 6–8 weeks ahead.\n\n### Best time to visit\n\n* Snow views Dec–Feb\n* Clear skies Mar–Apr\n\n1. **Train** — cardio 4 weeks before\n2. **Pack** — layers and microspikes\n3. **Trek** — steady pace above 10,000 ft\n\n| Month | Weather | Difficulty |\n| --- | --- | --- |\n| Dec | Heavy snow | Moderate |`}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none focus:border-[#16a34a] font-mono ${error ? 'border-red-300' : 'border-gray-200'}`}
        />
      )}

      {uploadError ? <p className="text-xs text-red-600 mt-1">{uploadError}</p> : null}
      {error ? <p className="text-xs text-red-600 mt-1">{error}</p> : null}

      {!showPreview && (
        <p className="mt-2 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-gray-400">
          <Upload className="h-3 w-3" aria-hidden />
          Images served via Cloudinary CDN on the storefront
        </p>
      )}
    </div>
  );
}
