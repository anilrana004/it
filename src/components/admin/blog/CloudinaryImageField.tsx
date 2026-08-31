'use client';

import { useRef, useState } from 'react';
import { ImagePlus, Loader2, Upload } from 'lucide-react';
import { adminFetch } from '@/lib/admin/admin-fetch';
import { unwrapApiJson } from '@/lib/api/client';
import { cldBlogImage } from '@/lib/cloudinary';

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  previewRole?: 'featured' | 'card' | 'thumb';
  hint?: string;
};

export default function CloudinaryImageField({
  label,
  value,
  onChange,
  previewRole = 'card',
  hint,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const previewSrc = value ? cldBlogImage(value, previewRole) : '';

  const uploadFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const body = new FormData();
      body.append('file', file);
      const res = await adminFetch('/api/admin/media/upload', { method: 'POST', body });
      const data = unwrapApiJson<{ url?: string; error?: string }>(await res.json());
      if (!res.ok) {
        const message =
          typeof data.error === 'object' && data.error && 'message' in data.error
            ? String((data.error as { message: string }).message)
            : typeof data.error === 'string'
              ? data.error
              : 'Upload failed';
        throw new Error(message);
      }
      if (!data.url) throw new Error('No image URL returned');
      onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 space-y-2">
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://res.cloudinary.com/… or paste URL"
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a]"
          />
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={inputRef}
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
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
            >
              {uploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Upload className="h-3.5 w-3.5" />
              )}
              Upload to Cloudinary
            </button>
            <span className="text-[11px] text-gray-500">JPEG, PNG, WebP · max 8 MB</span>
          </div>
          {hint ? <p className="text-[11px] text-gray-500">{hint}</p> : null}
          {error ? <p className="text-xs text-red-600">{error}</p> : null}
        </div>
        <div className="relative h-24 w-full sm:w-36 shrink-0 overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          {previewSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewSrc} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-400">
              <ImagePlus className="h-5 w-5" />
              <span className="text-[10px] font-semibold">Preview</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
