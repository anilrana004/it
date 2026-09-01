'use client';

import { useEffect, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

type Props = {
  open: boolean;
  imageUrl: string;
  fileName?: string;
  onCancel: () => void;
  onInsert: (description: string) => void;
};

export default function BlogImageInsertDialog({
  open,
  imageUrl,
  fileName,
  onCancel,
  onInsert,
}: Props) {
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (!open) return;
    const base = fileName?.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim() ?? '';
    setDescription(base && !/^indiantreks\s*\d*$/i.test(base) ? base : '');
  }, [open, fileName]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
      <div
        className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="blog-image-dialog-title"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h4 id="blog-image-dialog-title" className="text-sm font-bold text-gray-900">
            Image description
          </h4>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <img
              src={imageUrl}
              alt=""
              className="max-h-40 w-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">
              Caption shown under the image on the article page
            </span>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Trekkers at the Chopta Tungnath trailhead banner, max altitude 12,100 ft"
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#16a34a]"
              autoFocus
            />
          </label>

          <p className="text-[11px] text-gray-500">
            This appears as the photo caption on the live blog. Leave blank only if no caption is
            needed.
          </p>
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 px-4 py-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onInsert(description.trim())}
            className="inline-flex items-center gap-1.5 rounded-full bg-[#16a34a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#15803d]"
          >
            <ImagePlus className="h-3.5 w-3.5" />
            Insert image
          </button>
        </div>
      </div>
    </div>
  );
}
