'use client';

import RichNavDropdown from '@/components/nav/RichNavDropdown';
import { TRENDING_RICH } from '@/lib/nav-rich-menu';

/** @deprecated Prefer RichNavDropdown — kept for any lingering imports. */
export default function TrendingNavDropdown({
  onClose,
  align = 'left',
}: {
  onClose: () => void;
  align?: 'left' | 'right';
}) {
  return <RichNavDropdown items={TRENDING_RICH} onClose={onClose} align={align} />;
}
