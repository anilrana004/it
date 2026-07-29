'use client';
import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 rounded-2xl overflow-hidden">
        {images.slice(0, 4).map((img, i) => (
          <button key={i} onClick={() => { setIdx(i); setOpen(true); }}
            className={`relative overflow-hidden group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
            <img src={img} alt={`${title} - ${i + 1}`} className="w-full h-full object-cover min-h-[120px] lg:min-h-[200px]" />
            {i === 3 && images.length > 4 && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{images.length - 4}</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white/60 hover:text-white z-10"><X className="w-8 h-8" /></button>
          <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)} className="absolute left-4 text-white/60 hover:text-white"><ChevronLeft className="w-8 h-8" /></button>
          <button onClick={() => setIdx(i => (i + 1) % images.length)} className="absolute right-4 text-white/60 hover:text-white"><ChevronRight className="w-8 h-8" /></button>
          <img src={images[idx]} alt={`${title} - ${idx + 1}`} className="max-w-full max-h-[85vh] object-contain" />
          <div className="absolute bottom-4 text-white/60 text-sm">{idx + 1} / {images.length}</div>
        </div>
      )}
    </>
  );
}
