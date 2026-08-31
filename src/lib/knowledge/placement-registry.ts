import { PUBLIC_ROUTES } from '@/lib/knowledge/config';
import type { EntityType, PostSection } from '@/lib/knowledge/types';

/** Stored in post_tags as `placement:{id}`. */
export const PLACEMENT_TAG_PREFIX = 'placement:';

export function placementTag(slotId: string): string {
  return `${PLACEMENT_TAG_PREFIX}${slotId}`;
}

export function parsePlacementSlots(tags: string[]): string[] {
  return tags
    .filter((tag) => tag.startsWith(PLACEMENT_TAG_PREFIX))
    .map((tag) => tag.slice(PLACEMENT_TAG_PREFIX.length));
}

export function mergeTagsWithPlacements(userTags: string[], slotIds: string[]): string[] {
  const editorial = userTags
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean)
    .filter((tag) => !tag.startsWith(PLACEMENT_TAG_PREFIX));
  const placements = [...new Set(slotIds.map((id) => placementTag(id)))];
  return [...new Set([...editorial, ...placements])];
}

export type PlacementGroupId =
  | 'hub'
  | 'discovery'
  | 'product'
  | 'landing'
  | 'corporate'
  | 'special';

export type PlacementMode = 'automatic' | 'manual';

export type PlacementSlotDefinition = {
  id: string;
  group: PlacementGroupId;
  label: string;
  description: string;
  path: string;
  sections: PostSection[];
  mode: PlacementMode;
  /** Entity types that unlock automatic product-page placement. */
  entityTypes?: EntityType[];
  maxItems?: number;
};

export const PLACEMENT_GROUPS: Array<{ id: PlacementGroupId; label: string; description: string }> = [
  {
    id: 'hub',
    label: 'Blog & News Hub',
    description: 'Main indexes and article detail routes',
  },
  {
    id: 'discovery',
    label: 'Home & Discovery',
    description: 'Homepage, search, and sidebar surfaces',
  },
  {
    id: 'product',
    label: 'Individual Trek / Trip / Yatra Pages',
    description: 'Auto-generated when you link a product above',
  },
  {
    id: 'landing',
    label: 'Category Landing Pages',
    description: 'Treks, backpacking, yatra, tours, and sale landings',
  },
  {
    id: 'corporate',
    label: 'Corporate & Learning',
    description: 'Team building, schools, campus, and gift cards',
  },
  {
    id: 'special',
    label: 'Special Programs',
    description: 'Family, beginner, women-only, and senior treks',
  },
];

/** Every storefront surface that shows blog or travel news content. */
export const PLACEMENT_SLOTS: PlacementSlotDefinition[] = [
  // Hub
  {
    id: 'blog-index',
    group: 'hub',
    label: 'Blog index',
    description: 'All published blog posts on /blog',
    path: PUBLIC_ROUTES.blogIndex,
    sections: ['blog'],
    mode: 'automatic',
  },
  {
    id: 'travel-news-index',
    group: 'hub',
    label: 'Travel news index',
    description: 'All published travel news on /blog/news',
    path: PUBLIC_ROUTES.travelNewsIndex,
    sections: ['travel_news'],
    mode: 'automatic',
  },
  {
    id: 'blog-article',
    group: 'hub',
    label: 'Blog article page',
    description: 'Dedicated URL for this post when published',
    path: PUBLIC_ROUTES.blogIndex,
    sections: ['blog'],
    mode: 'automatic',
  },
  {
    id: 'news-article',
    group: 'hub',
    label: 'Travel news article page',
    description: 'Dedicated URL for this post when published',
    path: PUBLIC_ROUTES.travelNewsIndex,
    sections: ['travel_news'],
    mode: 'automatic',
  },

  // Discovery
  {
    id: 'home-featured',
    group: 'discovery',
    label: 'Homepage — Our Blogs',
    description: 'Featured cards on the homepage (select manually or auto-fill newest)',
    path: '/',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 4,
  },
  {
    id: 'blog-sidebar',
    group: 'discovery',
    label: 'Blog sidebar — recent posts',
    description: 'Recent posts widget on blog and news pages',
    path: PUBLIC_ROUTES.blogIndex,
    sections: ['blog'],
    mode: 'automatic',
  },
  {
    id: 'blog-search',
    group: 'discovery',
    label: 'Blog header search',
    description: 'Searchable posts in the blog navigation',
    path: PUBLIC_ROUTES.blogIndex,
    sections: ['blog'],
    mode: 'automatic',
  },
  {
    id: 'blog-post-entity-links',
    group: 'hub',
    label: 'Blog article — related trek/region links',
    description: '“Related on Indian Treks” block on the article page',
    path: PUBLIC_ROUTES.blogIndex,
    sections: ['blog'],
    mode: 'automatic',
  },
  {
    id: 'blog-post-related',
    group: 'hub',
    label: 'Blog article — related posts',
    description: 'Suggested posts on blog detail pages',
    path: PUBLIC_ROUTES.blogIndex,
    sections: ['blog'],
    mode: 'automatic',
  },
  {
    id: 'blog-news-sidebar',
    group: 'hub',
    label: 'Travel news sidebar — recent blogs',
    description: 'Recent blog posts widget on /blog/news pages',
    path: PUBLIC_ROUTES.travelNewsIndex,
    sections: ['blog'],
    mode: 'automatic',
  },
  {
    id: 'blog-news-more',
    group: 'hub',
    label: 'Travel news article — more stories',
    description: '“More travel news” list on news detail pages',
    path: PUBLIC_ROUTES.travelNewsIndex,
    sections: ['travel_news'],
    mode: 'automatic',
  },

  // Product pages — dynamic per-entity surfaces generated in placement-preview.ts
  {
    id: 'landing-treks',
    group: 'landing',
    label: 'All Treks page',
    description: 'Blog section on /treks',
    path: '/treks',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-backpacking',
    group: 'landing',
    label: 'Backpacking page',
    description: 'Blog section on /backpacking',
    path: '/backpacking',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-yatra',
    group: 'landing',
    label: 'Sacred Yatra page',
    description: 'Blog section on /yatra',
    path: '/yatra',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-biking',
    group: 'landing',
    label: 'Biking trips page',
    description: 'Blog section on /biking',
    path: '/biking',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-domestic',
    group: 'landing',
    label: 'Domestic tours page',
    description: 'Blog section on /domestic-tours',
    path: '/domestic-tours',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-international',
    group: 'landing',
    label: 'International getaways page',
    description: 'Blog section on /international-getaways',
    path: '/international-getaways',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-best-sellers',
    group: 'landing',
    label: 'Best sellers page',
    description: 'Blog section on /best-sellers',
    path: '/best-sellers',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-upcoming-trips',
    group: 'landing',
    label: 'Upcoming trips page',
    description: 'Blog section on /upcoming-trips',
    path: '/upcoming-trips',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-new-launches',
    group: 'landing',
    label: 'New launches page',
    description: 'Blog section on /new-launches',
    path: '/new-launches',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-weekend-trips',
    group: 'landing',
    label: 'Weekend trips page',
    description: 'Blog section on /weekend-trips',
    path: '/weekend-trips',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-bucket-list-sale',
    group: 'landing',
    label: 'Bucket list sale page',
    description: 'Blog section on /bucket-list-sale',
    path: '/bucket-list-sale',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-careers',
    group: 'landing',
    label: 'Careers page',
    description: 'Blog section on /careers',
    path: '/careers',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-gear-rental',
    group: 'landing',
    label: 'Gear rental page',
    description: 'Blog section on /gear-rental',
    path: '/gear-rental',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },

  // Corporate
  {
    id: 'landing-corporate',
    group: 'corporate',
    label: 'Corporate team building',
    description: 'Articles on /corporate',
    path: '/corporate',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-school-programs',
    group: 'corporate',
    label: 'School programs',
    description: 'Articles on /school-programs',
    path: '/school-programs',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-campus-ambassador',
    group: 'corporate',
    label: 'Campus ambassador',
    description: 'Articles on /campus-ambassador',
    path: '/campus-ambassador',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-travel-gift-cards',
    group: 'corporate',
    label: 'Travel gift cards',
    description: 'Articles on /travel-gift-cards',
    path: '/travel-gift-cards',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },

  // Special programs
  {
    id: 'landing-family-treks',
    group: 'special',
    label: 'Family treks',
    description: 'Blog section on /family-treks',
    path: '/family-treks',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-beginner-treks',
    group: 'special',
    label: 'Beginner-friendly treks',
    description: 'Blog section on /beginner-friendly-treks',
    path: '/beginner-friendly-treks',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-women-only-treks',
    group: 'special',
    label: 'Women-only treks',
    description: 'Blog section on /women-only-treks',
    path: '/women-only-treks',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-senior-citizen',
    group: 'special',
    label: 'Senior citizen treks',
    description: 'Blog section on /senior-citizen-treks',
    path: '/senior-citizen-treks',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
  {
    id: 'landing-special-programs-hub',
    group: 'special',
    label: 'Special programs hub',
    description: 'Blog/guides on /special-programs',
    path: '/special-programs',
    sections: ['blog'],
    mode: 'manual',
    maxItems: 3,
  },
];

export function getPlacementSlot(id: string): PlacementSlotDefinition | undefined {
  return PLACEMENT_SLOTS.find((slot) => slot.id === id);
}

export const PLACEMENT_SLOT_MAP = Object.fromEntries(
  PLACEMENT_SLOTS.map((slot) => [slot.id, slot]),
) as Record<string, PlacementSlotDefinition>;
