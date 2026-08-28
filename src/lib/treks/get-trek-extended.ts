import type { TrekExtendedContent } from '@/lib/treks/trek-extended-types';
import { kedarkanthaExtended } from '@/lib/treks/kedarkantha-extended';

const EXTENDED: Record<string, TrekExtendedContent> = {
  kedarkantha: kedarkanthaExtended,
};

export function getTrekExtended(trekId: string): TrekExtendedContent | undefined {
  return EXTENDED[trekId];
}
