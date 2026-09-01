'use client';

import { extractContentImages, updateImageDescription } from '@/lib/blog/markdown-images';

type Props = {
  content: string;
  onChange: (content: string) => void;
};

export default function BlogContentImageDescriptions({ content, onChange }: Props) {
  const images = extractContentImages(content);

  if (images.length === 0) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 space-y-3">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
          Image descriptions ({images.length})
        </p>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Edit captions shown under each photo on the article page.
        </p>
      </div>

      <ul className="space-y-3">
        {images.map((image, index) => (
          <li
            key={image.id}
            className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 rounded-lg border border-slate-200 bg-white p-2.5"
          >
            <div className="overflow-hidden rounded-lg border border-slate-100 bg-slate-100">
              <img
                src={image.url}
                alt=""
                className="h-16 w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <label className="block text-xs min-w-0">
              <span className="mb-1 block font-semibold text-slate-700">Image {index + 1}</span>
              <input
                type="text"
                value={image.description}
                onChange={(e) => {
                  onChange(updateImageDescription(content, image.lineIndex, e.target.value));
                }}
                placeholder="Write a caption for this photo…"
                className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-[#16a34a]"
              />
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
