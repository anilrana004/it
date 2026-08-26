'use client';

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import type { RichNavItem } from '@/lib/nav-rich-menu';

export default function RichNavDropdown({
  items,
  onClose,
  align = 'left',
}: {
  items: RichNavItem[];
  onClose: () => void;
  align?: 'left' | 'right';
}) {
  return (
    <div
      className={`absolute top-full z-50 mt-1 w-[min(calc(100vw-2rem),16.5rem)] rounded-xl border border-gray-100 bg-white p-1 shadow-xl shadow-black/10 ${align === 'right' ? 'right-0' : 'left-0'}`}
      role="menu"
    >
      {items.map((item) => {
        const Icon = item.Icon;
        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onClose}
            role="menuitem"
            className="group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-50"
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${item.iconTile}`}
            >
              <Icon className={`h-3.5 w-3.5 ${item.iconColor}`} aria-hidden />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-1">
                <span className="text-[12px] font-semibold leading-tight text-gray-900 group-hover:text-[#166534]">
                  {item.title}
                </span>
                {item.live ? (
                  <span className="rounded bg-red-500 px-1 py-px text-[7px] font-bold uppercase leading-none tracking-wide text-white">
                    Live!
                  </span>
                ) : null}
              </span>
              <span className="mt-px block text-[10px] leading-snug text-gray-500">
                {item.subtitle}
              </span>
            </span>
            <ChevronDown
              className="h-3 w-3 shrink-0 -rotate-90 text-gray-400 transition-colors group-hover:text-gray-600"
              aria-hidden
            />
          </Link>
        );
      })}
    </div>
  );
}
