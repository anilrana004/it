import type { TrekExtendedContent } from '@/lib/treks/trek-extended-types';
import { getTrekContent } from '@/lib/content/treks';

/** @deprecated Import from `@/lib/content/treks` — kept for existing import paths. */
export { kedarkanthaExtended } from '@/lib/content/treks/kedarkantha';

export function getTrekExtended(trekId: string): TrekExtendedContent | undefined {
  return getTrekContent(trekId);
}
