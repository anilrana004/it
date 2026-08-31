import type { TrekExtendedContent } from '@/lib/content/treks/types';
import { kedarkanthaExtended } from '@/lib/content/treks/kedarkantha';

/**
 * Trek extended content registry.
 *
 * Flow (same idea as help-centre / policy pages):
 *   content/treks/<trek-id>/<section>-content.ts  →  trek folder index.ts  →  this registry  →  page
 *
 * To add a trek: create `content/treks/<trek-id>/`, split sections into `*-content.ts` files,
 * assemble in `<trek-id>/index.ts`, then register below.
 */
const TREK_EXTENDED_CONTENT: Record<string, TrekExtendedContent> = {
  kedarkantha: kedarkanthaExtended,
};

/** Resolve full trek detail content (overview, sections, packing, policies, etc.). */
export function getTrekContent(trekId: string): TrekExtendedContent | undefined {
  return TREK_EXTENDED_CONTENT[trekId];
}

export { kedarkanthaExtended } from '@/lib/content/treks/kedarkantha';
