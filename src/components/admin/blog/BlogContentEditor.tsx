'use client';

import { useCallback, useRef, useState } from 'react';
import { ImagePlus, Loader2 } from 'lucide-react';
import AdminBlogContentLivePreview, {
  type BlogContentPreviewMeta,
} from '@/components/admin/blog/AdminBlogContentLivePreview';
import BlogContentImageDescriptions from '@/components/admin/blog/BlogContentImageDescriptions';
import BlogContentSectionOutline from '@/components/admin/blog/BlogContentSectionOutline';
import BlogImageInsertDialog from '@/components/admin/blog/BlogImageInsertDialog';
import BlogContentToolbar from '@/components/blog/BlogContentToolbar';
import { adminFetch } from '@/lib/admin/admin-fetch';
import { parseApiJson } from '@/lib/api/client';
import { buildImageMarkdown } from '@/lib/blog/markdown-images';
import { insertAtSelection } from '@/lib/blog/markdown-editor';
import '@/components/admin/blog/admin-blog-preview.css';

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  previewMeta?: BlogContentPreviewMeta;
};

type PendingImage = {
  url: string;
  fileName?: string;
};

export default function BlogContentEditor({ value, onChange, error, previewMeta }: Props) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [pendingImage, setPendingImage] = useState<PendingImage | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const insertSnippet = useCallback(
    (snippet: string, cursorOffsetFromEnd = 0) => {
      const el = textareaRef.current;
      if (!el) {
        onChange(`${value}${snippet}`);
        return;
      }
      const { next, cursor } = insertAtSelection(
        value,
        snippet,
        el.selectionStart,
        el.selectionEnd,
      );
      onChange(next);
      requestAnimationFrame(() => {
        el.focus();
        const pos = Math.max(0, cursor - cursorOffsetFromEnd);
        el.setSelectionRange(pos, pos);
      });
    },
    [onChange, value],
  );

  const uploadFile = async (file: File) => {
    setUploading(true);
    setUploadError(null);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await adminFetch('/api/admin/media/upload', { method: 'POST', body });
      const data = await parseApiJson<{ url?: string }>(res);
      if (!data.url) throw new Error('No image URL returned');
      setPendingImage({ url: data.url, fileName: file.name });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const jumpToOffset = (offset: number) => {
    const el = textareaRef.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(offset, offset);
    const lineHeight = 20;
    const line = value.slice(0, offset).split('\n').length;
    el.scrollTop = Math.max(0, (line - 2) * lineHeight);
  };

  const getSelectedText = () => {
    const el = textareaRef.current;
    if (!el) return '';
    return value.slice(el.selectionStart, el.selectionEnd);
  };

  return (
    <div className="space-y-3">
      <BlogImageInsertDialog
        open={Boolean(pendingImage)}
        imageUrl={pendingImage?.url ?? ''}
        fileName={pendingImage?.fileName}
        onCancel={() => setPendingImage(null)}
        onInsert={(description) => {
          if (!pendingImage) return;
          insertSnippet(buildImageMarkdown(pendingImage.url, description));
          setPendingImage(null);
        }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void uploadFile(file);
            }}
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16a34a] px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-[#15803d] disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImagePlus className="h-3.5 w-3.5" />
            )}
            Insert image here
          </button>
        </div>
      </div>

      <BlogContentToolbar
        onInsert={(snippet, cursorOffset) => {
          if (snippet.includes('INSERT_URL_HERE') || snippet.includes('res.cloudinary.com/your-cloud')) {
            fileRef.current?.click();
            return;
          }
          insertSnippet(snippet, cursorOffset);
        }}
        getSelectedText={getSelectedText}
      />

      <BlogContentImageDescriptions content={value} onChange={onChange} />

      <p className="text-[11px] leading-relaxed text-gray-500">
        Use <code className="rounded bg-gray-100 px-1">## Section title</code> for Jump to section — the
        sidebar updates as you type. Photo descriptions appear as captions on the live page.
      </p>

      <div className="admin-blog-editor-layout">
        <BlogContentSectionOutline content={value} onJumpToLine={jumpToOffset} />

        <div
          className={`admin-blog-editor-layout__editor relative rounded-xl border transition-colors ${
            dragActive ? 'border-emerald-400 bg-emerald-50/50' : 'border-gray-200'
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            const file = e.dataTransfer.files?.[0];
            if (file?.type.startsWith('image/')) void uploadFile(file);
          }}
        >
          {dragActive ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl bg-emerald-50/90">
              <p className="text-sm font-semibold text-emerald-800">Drop image to insert at cursor</p>
            </div>
          ) : null}
          <textarea
            ref={textareaRef}
            rows={18}
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`## Why Chopta in winter\n\nOpening paragraph with hook…\n\n![Snow trail on the ridge](https://res.cloudinary.com/… "Winter ridge views on the Chopta trail")\n\n### Best time to visit\n\n* Snow views Dec–Feb\n* Clear skies Mar–Apr`}
            className={`w-full min-h-[22rem] resize-y rounded-xl border-0 bg-white px-4 py-3 text-sm font-mono outline-none focus:ring-2 focus:ring-[#16a34a]/30 ${error ? 'ring-2 ring-red-200' : ''}`}
          />
        </div>

        <AdminBlogContentLivePreview
          content={value}
          meta={previewMeta ?? {}}
          label="Live article preview"
          className="min-h-[22rem]"
        />
      </div>

      {uploadError ? <p className="text-xs text-red-600">{uploadError}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
