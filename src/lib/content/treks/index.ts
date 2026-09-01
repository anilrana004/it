import type { TrekExtendedContent } from '@/lib/content/treks/types';
import { getTrekById } from '@/lib/data';
import { buildDefaultTrekExtended } from '@/lib/content/treks/default-extended-content';
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
  const custom = TREK_EXTENDED_CONTENT[trekId];
  if (custom) return custom;

  const trek = getTrekById(trekId);
  if (!trek) return undefined;

  return buildDefaultTrekExtended(trek);
}

export { kedarkanthaExtended } from '@/lib/content/treks/kedarkantha';
