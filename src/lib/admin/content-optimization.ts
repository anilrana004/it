import type { EditorFormState } from '@/lib/admin/blog-api';

export type OptimizationItem = {
  id: string;
  label: string;
  status: 'pass' | 'warn' | 'fail';
  detail: string;
};

export type OptimizationScore = {
  score: number;
  items: OptimizationItem[];
};

const INDIAN_GEO_TERMS = [
  'india',
  'indian',
  'himalaya',
  'himalayan',
  'uttarakhand',
  'himachal',
  'ladakh',
  'sikkim',
  'nepal',
  'garhwal',
  'kumaon',
];

function statusFrom(ok: boolean, soft = false): 'pass' | 'warn' | 'fail' {
  if (ok) return 'pass';
  return soft ? 'warn' : 'fail';
}

function scoreFromItems(items: OptimizationItem[]): number {
  if (items.length === 0) return 100;
  const points = items.reduce((sum, item) => {
    if (item.status === 'pass') return sum + 1;
    if (item.status === 'warn') return sum + 0.5;
    return sum;
  }, 0);
  return Math.round((points / items.length) * 100);
}

export function evaluateSeoReadiness(form: EditorFormState): OptimizationScore {
  const items: OptimizationItem[] = [];
  const title = (form.seoTitle.trim() || form.title.trim());
  const desc = form.seoDescription.trim() || form.excerpt.trim();
  const h2Count = (form.content.match(/^##\s+/gm) ?? []).length;

  items.push({
    id: 'seo-title',
    label: 'Search title',
    status: statusFrom(title.length >= 30 && title.length <= 60, title.length > 0 && title.length < 70),
    detail:
      title.length === 0
        ? 'Add an SEO title or article title.'
        : title.length < 30
          ? `${title.length} chars — aim for 30–60 for Google snippets.`
          : title.length > 60
            ? `${title.length} chars — may truncate in search results.`
            : `${title.length} chars — good length.`,
  });

  items.push({
    id: 'meta-desc',
    label: 'Meta description',
    status: statusFrom(desc.length >= 120 && desc.length <= 160, desc.length > 0),
    detail:
      desc.length === 0
        ? 'Add SEO description or excerpt.'
        : desc.length < 120
          ? `${desc.length} chars — aim for 120–160.`
          : desc.length > 160
            ? `${desc.length} chars — may truncate.`
            : `${desc.length} chars — good length.`,
  });

  items.push({
    id: 'slug',
    label: 'URL slug',
    status: statusFrom(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug.trim()), form.slug.trim().length > 0),
    detail: form.slug.trim()
      ? 'Clean kebab-case slug helps crawlers and sharing.'
      : 'Slug is required before publish.',
  });

  items.push({
    id: 'hero-image',
    label: 'Featured image',
    status: statusFrom(Boolean(form.featuredImageUrl.trim())),
    detail: form.featuredImageUrl.trim()
      ? 'Hero image set for social cards and article header.'
      : 'Add a featured image for richer SERP and social previews.',
  });

  items.push({
    id: 'headings',
    label: 'Section headings (H2)',
    status: statusFrom(h2Count >= 2, h2Count === 1),
    detail:
      h2Count >= 2
        ? `${h2Count} sections — supports TOC and featured snippets.`
        : h2Count === 1
          ? '1 section — add more ## headings for structure.'
          : 'Use ## headings so readers and search engines can scan sections.',
  });

  items.push({
    id: 'excerpt',
    label: 'Excerpt / lead',
    status: statusFrom(form.excerpt.trim().length >= 80, form.excerpt.trim().length > 0),
    detail: form.excerpt.trim()
      ? 'Lead paragraph powers hero and fallback meta text.'
      : 'Write an excerpt for the article hero lead.',
  });

  return { score: scoreFromItems(items), items };
}

export function evaluateAeoReadiness(form: EditorFormState): OptimizationScore {
  const items: OptimizationItem[] = [];
  const qaLen = form.quickAnswer.trim().length;
  const faqCount = form.faqs.filter((f) => f.question.trim() && f.answer.trim()).length;
  const factCount = form.keyFacts.filter((f) => f.label.trim() && f.value.trim()).length;
  const sourceCount = form.sources.filter((s) => s.sourceTitle.trim()).length;

  items.push({
    id: 'quick-answer',
    label: 'Quick answer block',
    status: statusFrom(qaLen >= 80 && qaLen <= 400, qaLen > 0),
    detail:
      qaLen === 0
        ? 'Add a 2–4 sentence direct answer for AI overviews.'
        : qaLen < 80
          ? 'Expand quick answer to ~80+ chars for answer engines.'
          : 'Direct answer ready for AEO snippets.',
  });

  items.push({
    id: 'qa-display',
    label: 'Show quick answer on storefront',
    status: statusFrom(form.quickAnswerDisplay && qaLen > 0, form.quickAnswerDisplay),
    detail: form.quickAnswerDisplay
      ? 'Visible authority block on the live article.'
      : 'Enable display so answer engines can surface structured facts.',
  });

  items.push({
    id: 'faqs',
    label: 'FAQ pairs',
    status: statusFrom(faqCount >= 2, faqCount === 1),
    detail:
      faqCount >= 2
        ? `${faqCount} FAQs — eligible for FAQ rich results.`
        : faqCount === 1
          ? 'Add at least one more FAQ for stronger AEO.'
          : 'Add 2+ FAQs with concise answers.',
  });

  items.push({
    id: 'key-facts',
    label: 'Key facts table',
    status: statusFrom(factCount >= 2, factCount === 1),
    detail:
      factCount >= 2
        ? `${factCount} facts — scannable for chat-style answers.`
        : 'Add label/value facts (difficulty, season, altitude, etc.).',
  });

  items.push({
    id: 'sources',
    label: 'Verified sources',
    status: statusFrom(sourceCount >= 1),
    detail:
      sourceCount > 0
        ? `${sourceCount} source(s) — boosts trust for AI citations.`
        : 'Link official or first-hand sources where possible.',
  });

  items.push({
    id: 'expert',
    label: 'Expert reviewed',
    status: statusFrom(form.expertReviewed, true),
    detail: form.expertReviewed
      ? 'Expert badge shown on storefront hero.'
      : 'Optional — mark when reviewed by a trek expert.',
  });

  return { score: scoreFromItems(items), items };
}

export function evaluateGeoReadiness(form: EditorFormState): OptimizationScore {
  const items: OptimizationItem[] = [];
  const haystack = `${form.title} ${form.excerpt} ${form.content} ${form.tags}`.toLowerCase();
  const geoHits = INDIAN_GEO_TERMS.filter((term) => haystack.includes(term));
  const hasPrimary = Boolean(form.primaryEntity);
  const relatedCount = form.relatedEntities.length;
  const regionFromEntity =
    form.primaryEntity?.region ||
    (form.primaryEntity?.entityType === 'region' ? form.primaryEntity.entityId : null);

  items.push({
    id: 'primary-entity',
    label: 'Primary trek / destination',
    status: statusFrom(hasPrimary),
    detail: hasPrimary
      ? `Linked to ${form.primaryEntity!.title || form.primaryEntity!.entityId}.`
      : 'Set a primary entity for geographic and topical relevance.',
  });

  items.push({
    id: 'related-entities',
    label: 'Related entities',
    status: statusFrom(relatedCount >= 1, true),
    detail:
      relatedCount > 0
        ? `${relatedCount} related link(s) for internal GEO graph.`
        : 'Add related treks or regions mentioned in the article.',
  });

  items.push({
    id: 'region-signal',
    label: 'Region signal',
    status: statusFrom(Boolean(regionFromEntity) || geoHits.length >= 2, geoHits.length === 1),
    detail: regionFromEntity
      ? `Region context: ${regionFromEntity}.`
      : geoHits.length >= 2
        ? `Location terms found: ${geoHits.slice(0, 4).join(', ')}.`
        : 'Mention state/region (Uttarakhand, Himachal, etc.) for local intent.',
  });

  items.push({
    id: 'location-tags',
    label: 'Location tags',
    status: statusFrom(
      form.tags
        .split(',')
        .map((t) => t.trim().toLowerCase())
        .some((t) => INDIAN_GEO_TERMS.includes(t) || t.includes('trek')),
      form.tags.trim().length > 0,
    ),
    detail: 'Tags like uttarakhand, beginner, kedarkantha help generative search.',
  });

  items.push({
    id: 'canonical',
    label: 'Canonical URL',
    status: statusFrom(Boolean(form.canonicalUrl.trim()), true),
    detail: form.canonicalUrl.trim()
      ? 'Canonical set — avoids duplicate indexing.'
      : 'Optional unless syndicating or republishing content.',
  });

  return { score: scoreFromItems(items), items };
}
