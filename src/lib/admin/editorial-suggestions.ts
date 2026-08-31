import { blogExcerpt } from '@/lib/blog';
import { treks, trekDetailPath } from '@/lib/data';
import type { EntityType } from '@/lib/knowledge/types';

export type EditorialSuggestion = {
  id: string;
  kind: 'seo' | 'entity' | 'tag' | 'link' | 'aeo' | 'freshness';
  label: string;
  value: string;
  reason: string;
};

export type EditorialSuggestionInput = {
  title: string;
  excerpt: string;
  content: string;
  contentType: string;
  section: string;
  tags: string[];
  primaryEntityType?: EntityType | null;
  primaryEntityId?: string | null;
  seoTitle?: string;
  seoDescription?: string;
  hasQuickAnswer?: boolean;
  lastFactCheckedAt?: string | null;
  contentFreshness?: string;
};

function contentHaystack(input: EditorialSuggestionInput): string {
  return `${input.title} ${input.excerpt} ${input.content}`.toLowerCase();
}

function suggestedTags(input: EditorialSuggestionInput): string[] {
  const tags = new Set(input.tags.map((t) => t.toLowerCase()));
  const haystack = contentHaystack(input);

  if (input.primaryEntityId) tags.add(input.primaryEntityId);
  if (input.primaryEntityType === 'trek' || input.primaryEntityType === 'yatra') {
    tags.add('trek');
  }
  if (haystack.includes('beginner') || haystack.includes('first time')) tags.add('beginner');
  if (haystack.includes('family')) tags.add('family');
  if (haystack.includes('uttarakhand')) tags.add('uttarakhand');
  if (haystack.includes('himachal')) tags.add('himachal');

  return [...tags].filter(Boolean).slice(0, 8);
}

function treksMentionedInContent(input: EditorialSuggestionInput): string[] {
  const haystack = contentHaystack(input);
  return treks
    .filter(
      (trek) =>
        haystack.includes(trek.id) ||
        haystack.includes(trek.title.toLowerCase()) ||
        input.content.includes(`/treks/${trek.id}`),
    )
    .map((trek) => trek.id)
    .slice(0, 5);
}

export function generateEditorialSuggestions(
  input: EditorialSuggestionInput,
): EditorialSuggestion[] {
  const suggestions: EditorialSuggestion[] = [];

  if (!input.seoTitle?.trim() && input.title.trim()) {
    suggestions.push({
      id: 'seo-title',
      kind: 'seo',
      label: 'Suggested SEO title',
      value: input.title.trim(),
      reason: 'Uses the article title — edit before applying.',
    });
  }

  if (!input.seoDescription?.trim()) {
    const desc = input.excerpt.trim() || blogExcerpt(input.content, 155);
    if (desc) {
      suggestions.push({
        id: 'seo-description',
        kind: 'seo',
        label: 'Suggested meta description',
        value: desc,
        reason: 'Derived from excerpt or opening content.',
      });
    }
  }

  const tagSuggestions = suggestedTags(input).filter((tag) => !input.tags.includes(tag));
  if (tagSuggestions.length > 0) {
    suggestions.push({
      id: 'tags',
      kind: 'tag',
      label: 'Suggested tags',
      value: tagSuggestions.join(', '),
      reason: 'Based on primary entity and content keywords.',
    });
  }

  const mentionedTreks = treksMentionedInContent(input).filter(
    (id) => id !== input.primaryEntityId,
  );
  for (const trekId of mentionedTreks) {
    const trek = treks.find((t) => t.id === trekId);
    if (!trek) continue;
    suggestions.push({
      id: `entity-${trekId}`,
      kind: 'entity',
      label: 'Related entity',
      value: `${trek.title} (${trekId})`,
      reason: 'Mentioned in content — consider linking as a related entity.',
    });
  }

  if (input.primaryEntityType === 'trek' && input.primaryEntityId) {
    const trek = treks.find((t) => t.id === input.primaryEntityId);
    if (trek) {
      suggestions.push({
        id: 'link-trek',
        kind: 'link',
        label: 'Internal link',
        value: trekDetailPath(trek),
        reason: 'Link to the primary trek page from the article body.',
      });
    }
  }

  if (
    input.contentType === 'guide' &&
    input.section === 'blog' &&
    !input.hasQuickAnswer &&
    input.content.trim().length > 400
  ) {
    suggestions.push({
      id: 'quick-answer',
      kind: 'aeo',
      label: 'Draft quick answer',
      value: blogExcerpt(input.content, 220),
      reason: 'Guide articles benefit from a visible quick answer block.',
    });
  }

  if (input.contentFreshness && input.contentFreshness !== 'evergreen' && !input.lastFactCheckedAt) {
    suggestions.push({
      id: 'fact-check',
      kind: 'freshness',
      label: 'Set last fact-checked date',
      value: new Date().toISOString().slice(0, 10),
      reason: 'Time-sensitive content should record when facts were verified.',
    });
  }

  return suggestions;
}
