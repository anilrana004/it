import {
  FAMILY_TREKKING_CONTENT,
  FAMILY_TREKKING_SEO,
  FAMILY_TREKKING_SLUG,
} from '@/lib/blog-content/family-trekking-in-india';

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO date — display strings are derived from this so ordering stays reliable. */
  publishedAt: string;
  read: string;
  author: string;
  image: string;
  content: string;
  /** Meta description for SEO when present. */
  description?: string;
  /** Optional <title> override. */
  seoTitle?: string;
  /** Canonical URL override from CMS. */
  canonicalUrl?: string;
  /** ISO updated timestamp when available. */
  updatedAt?: string;
  /** Robots directive, e.g. index,follow */
  robots?: string;
  /** When true, content is rendered as lightweight markdown. */
  markdown?: boolean;
  /** Trek / yatra / trip ids this post is specifically about. */
  treks?: string[];
  regions?: string[];
  types?: string[];
  /** Category names for structured data. */
  categories?: string[];
  /** Matched against a trip's title, state, season and grade. */
  keywords?: string[];
  /** AEO / authority content when populated from DB. */
  authority?: BlogAuthority;
}

/**
 * Anything with these fields can be matched against posts — `Trek` satisfies it
 * structurally, so this module stays independent of the trek data model.
 */
export interface RelatedSubject {
  id: string;
  title: string;
  region: string;
  state: string;
  type: string;
  bestSeason: string;
  difficulty: string;
}

export type RelatedPost = BlogPost & { related: boolean };

export type BlogKeyFact = { label: string; value: string };

export type BlogAuthority = {
  quickAnswer?: string;
  quickAnswerDisplay?: boolean;
  keyFacts?: BlogKeyFact[];
  faqs?: { question: string; answer: string }[];
  sources?: { title: string; url?: string; type?: string; verifiedAt?: string }[];
  authorBio?: string;
  authorRole?: string;
  reviewerName?: string;
  lastVerified?: string;
  expertReviewed?: boolean;
};

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const blogPosts: BlogPost[] = [
  {
    slug: FAMILY_TREKKING_SLUG,
    title: 'What Happens When Families Trek Together? The Deeper Benefits of Family Trekking',
    seoTitle: FAMILY_TREKKING_SEO.title,
    description: FAMILY_TREKKING_SEO.description,
    publishedAt: '2026-08-24',
    read: '18 min read',
    author: 'Indian Treks Team',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
    markdown: true,
    types: ['trek'],
    regions: ['uttarakhand'],
    treks: ['nag-tibba', 'chopta-tungnath', 'dayara-bugyal', 'kedarkantha', 'valley-of-flowers'],
    keywords: [
      'family',
      'children',
      'kids',
      'parents',
      'uttarakhand',
      'beginner',
      'nag tibba',
      'chopta',
      'dayara',
      'kedarkantha',
    ],
    content: FAMILY_TREKKING_CONTENT,
  },
  {
    slug: 'first-himalayan-trek',
    title: '5 Essential Tips for Your First Himalayan Trek',
    publishedAt: '2026-07-30',
    read: '6 min read',
    author: 'Indian Treks Team',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop',
    types: ['trek'],
    keywords: ['easy', 'moderate', 'triund', 'kedarkantha', 'valley of flowers'],
    content:
      "Embarking on your first Himalayan trek is an exhilarating experience. The towering peaks, pristine forests, and crisp mountain air create an unforgettable adventure. However, proper preparation is key to ensuring a safe and enjoyable journey.\n\n1. **Train Before You Go** - Start cardio exercises at least 4-6 weeks before your trek. Focus on building stamina through running, cycling, and stair climbing.\n\n2. **Pack Smart** - Layering is crucial in the mountains. Carry thermal wear, a fleece jacket, a waterproof outer layer, and good quality trekking shoes that are broken in.\n\n3. **Stay Hydrated** - High altitude can cause dehydration. Drink at least 3-4 liters of water daily and avoid alcohol during the trek.\n\n4. **Listen to Your Body** - Altitude sickness can affect anyone regardless of fitness. If you experience severe headache, nausea, or dizziness, inform your trek leader immediately.\n\n5. **Choose the Right Trek** - Start with an easy to moderate trek if you're a beginner. Treks like Triund, Kedarkantha, or Valley of Flowers are excellent choices.",
  },
  {
    slug: 'best-places-india-july',
    title: 'Best Himalayan Treks to Do in July',
    publishedAt: '2026-06-16',
    read: '6 min read',
    author: 'Indian Treks Team',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=600&fit=crop',
    regions: ['uttarakhand', 'himachal', 'nepal'],
    types: ['trek'],
    keywords: ['july', 'monsoon', 'valley of flowers', 'chopta', 'tungnath', 'spiti'],
    content:
      'July in the Indian Himalayas brings the monsoon season, transforming the landscape into a lush green paradise. Here are the best treks to do in July across Uttarakhand, Himachal Pradesh, and Nepal:\n\n**Uttarakhand** - Valley of Flowers (peak bloom Aug), Chopta Tungnath, Rishikesh river rafting, Mussoorie monsoon walks\n\n**Himachal Pradesh** - Manali, Kasol, Dharamshala, Spiti Valley (rain shadow region with clear skies)\n\n**Nepal** - Kathmandu Valley, Pokhara, Chitwan Safari (low altitude, great for monsoon)\n\nJuly is an excellent time for trekking in certain Himalayan regions. The monsoon brings out the best in nature, with blooming flowers, gushing waterfalls, and clear mountain views. The Valley of Flowers is at its peak in late July and August.',
  },
  {
    slug: 'group-travel-himalayas',
    title: 'Why Group Travel is the Best Way to Explore the Himalayas',
    publishedAt: '2026-06-25',
    read: '5 min read',
    author: 'Indian Treks Team',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=600&fit=crop',
    types: ['trek', 'yatra'],
    keywords: ['group'],
    content:
      'Group travel in the Himalayas offers a unique blend of adventure, safety, and camaraderie that solo travel simply cannot match.\n\n**Safety in Numbers** - The Himalayas can be unpredictable. Traveling in a group ensures you have support during challenging situations, from altitude sickness to unexpected weather changes.\n\n**Cost-Effective** - Group trips are significantly more affordable than solo travel. Shared transport, accommodation, and guide costs make premium experiences accessible.\n\n**Built-in Community** - One of the greatest gifts of group travel is the people you meet. Strangers become friends, and shared challenges create bonds that last a lifetime.\n\n**Expert Guidance** - Professional trip leaders handle all logistics, navigation, and safety protocols, allowing you to fully immerse yourself in the experience.',
  },
  {
    slug: 'valley-of-flowers-guide',
    title: 'Complete Guide to Valley of Flowers Trek 2026',
    publishedAt: '2026-05-16',
    read: '9 min read',
    author: 'Indian Treks Team',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop',
    treks: ['valley-of-flowers'],
    regions: ['uttarakhand'],
    types: ['trek'],
    keywords: ['valley of flowers', 'hemkund', 'govindghat', 'chamoli'],
    content:
      "The Valley of Flowers, a UNESCO World Heritage Site, is one of India's most beautiful treks. Located in Uttarakhand's Chamoli district, this trek takes you through a vibrant valley filled with endemic alpine flowers.\n\n**Best Time to Visit** - July to September. August is peak bloom season when the valley is at its most colorful.\n\n**Difficulty Level** - Moderate. Requires basic fitness and some prior trekking experience.\n\n**Trek Duration** - 5N/6D. The trek covers approximately 38 km starting from Govindghat.\n\n**Key Highlights** - Over 500 species of alpine flowers including the rare Brahma Kamal, stunning views of snow-capped peaks, and a visit to the sacred Hemkund Sahib.\n\n**What to Pack** - Warm clothes (layers), waterproof jacket, trekking shoes, sunscreen, sunglasses, water bottle, energy bars, and personal medications.",
  },
];

export function blogPath(slug: string) {
  return `/blog/${slug}`;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

/** "2026-07-30" → "30 Jul" (formatted from the string to stay timezone-safe). */
export function blogDate(publishedAt: string) {
  const [, month, day] = publishedAt.split('-');
  return `${Number(day)} ${MONTHS_SHORT[Number(month) - 1]}`;
}

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/** "2026-08-27" → "August 27, 2026" */
export function blogDateLong(publishedAt: string) {
  const [year, month, day] = publishedAt.split('-');
  return `${MONTHS_LONG[Number(month) - 1]} ${Number(day)}, ${year}`;
}

export function blogExcerpt(content: string, maxLen = 160) {
  const plain = content
    .replace(/\*\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^#+\s+/gm, '')
    .replace(/\n+/g, ' ')
    .trim();
  if (plain.length <= maxLen) return plain;
  return `${plain.slice(0, maxLen).replace(/\s+\S*$/, '')}…`;
}

export function getLatestPosts(count = 3): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, count);
}

function wordBoundary(haystack: string, needle: string) {
  if (!needle) return false;
  return new RegExp(`(?:^|[^a-z0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?:$|[^a-z0-9])`).test(
    haystack,
  );
}

/** Rank a post against the trip being viewed. Direct trek-id hits win. */
function relatedScore(post: BlogPost, subject: RelatedSubject): number {
  if (post.treks?.includes(subject.id)) return 100;

  let score = 0;
  const haystack = `${post.title} ${post.content}`.toLowerCase();
  const title = subject.title.toLowerCase();

  if (wordBoundary(haystack, title)) score += 40;
  if (post.keywords?.some((k) => wordBoundary(title, k.toLowerCase()))) score += 24;
  if (post.regions?.includes(subject.region)) score += 12;
  if (post.types?.includes(subject.type)) score += 8;
  if (post.keywords?.some((k) => wordBoundary(subject.state.toLowerCase(), k.toLowerCase()))) score += 6;
  if (post.keywords?.some((k) => wordBoundary(subject.bestSeason.toLowerCase(), k.toLowerCase()))) score += 4;
  if (post.keywords?.some((k) => wordBoundary(subject.difficulty.toLowerCase(), k.toLowerCase()))) score += 3;

  return score;
}

/**
 * Posts for the sidebar of a trek / yatra / trip. Related items come first
 * (and are flagged so the card can highlight them); remaining slots fill
 * with the newest posts so a new article appears here as soon as it is added
 * to `blogPosts`.
 *
 * A post is "related" only when it names this trip (id, title, or a tagged
 * keyword) — sharing a region or type is not enough, or every Uttarakhand
 * yatra would light up a Valley of Flowers guide.
 */
const RELATED_FLOOR = 24;

export function getRelatedPosts(subject: RelatedSubject, count = 3): RelatedPost[] {
  const ranked = blogPosts
    .map((post) => ({ post, score: relatedScore(post, subject) }))
    .sort((a, b) => b.score - a.score || b.post.publishedAt.localeCompare(a.post.publishedAt));

  const related = ranked
    .filter((r) => r.score >= RELATED_FLOOR)
    .map((r) => ({ ...r.post, related: true }));
  if (related.length >= count) return related.slice(0, count);

  const used = new Set(related.map((p) => p.slug));
  const fillers = getLatestPosts(count + related.length)
    .filter((p) => !used.has(p.slug))
    .map((p) => ({ ...p, related: false }));

  return [...related, ...fillers].slice(0, count);
}

/** Requests a small square crop of the cover image for compact thumbnails. */
export function blogThumb(image: string) {
  return image.replace(/([?&])w=\d+/, '$1w=200').replace(/([?&])h=\d+/, '$1h=200');
}
