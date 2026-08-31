export type PostStatus = 'draft' | 'published' | 'archived';



export type ContentType =

  | 'guide'

  | 'news_update'

  | 'comparison'

  | 'seasonal'

  | 'safety'

  | 'faq_article';



export type PostSection = 'blog' | 'travel_news';



export type EntityType =

  | 'trek'

  | 'trip'

  | 'yatra'

  | 'destination'

  | 'region'

  | 'safety_topic';



export type EntityLinkRole = 'primary' | 'related' | 'mentions';

export type ContentHealthStatus = 'healthy' | 'needs_review' | 'outdated' | 'archived';

export type SourceType =
  | 'official_government'
  | 'tourism_board'
  | 'forest_department'
  | 'academic'
  | 'weather'
  | 'first_hand_internal'
  | 'other';

export interface KeyFact {
  label: string;
  value: string;
}

export interface PostQuickAnswer {
  quickAnswer: string | null;
  keyFacts: KeyFact[];
  display: boolean;
}

export interface PostSourceLink {
  id: string;
  sourceTitle: string;
  sourceUrl: string | null;
  sourceType: SourceType;
  claim: string | null;
  verifiedAt: string | null;
  accessedAt: string | null;
}

export interface PostSourceInput {
  sourceTitle: string;
  sourceUrl?: string;
  sourceType: SourceType;
  claim?: string;
  verifiedAt?: string;
  accessedAt?: string;
}

export interface PostFaq {
  id: string;
  question: string;
  answer: string;
  sortOrder: number;
}

export interface PostFaqInput {
  question: string;
  answer: string;
  sortOrder?: number;
}

export interface TopicGapHint {
  topic: string;
  label: string;
  covered: boolean;
  matchingPostSlug?: string;
}

export interface CannibalizationHint {
  postId: string;
  slug: string;
  title: string;
  similarityScore: number;
  suggestion: 'review' | 'merge' | 'differentiate';
}



export interface KnowledgeAuthor {

  id: string;

  slug: string;

  name: string;

  bio?: string | null;

  avatarUrl?: string | null;

  role?: string | null;

}



export interface KnowledgeCategory {

  id: string;

  slug: string;

  name: string;

  description?: string | null;

}



export interface EntityLink {

  entityType: EntityType;

  entityId: string;

  role: EntityLinkRole;

  sortOrder: number;

}



export interface KnowledgePostSummary {

  id: string;

  slug: string;

  title: string;

  excerpt: string | null;

  section: PostSection;

  contentType: ContentType;

  featuredImageUrl: string | null;

  readingTimeMin: number | null;

  publishedAt: string | null;

  author?: KnowledgeAuthor | null;

  categories: KnowledgeCategory[];

  tags: string[];

  primaryEntityType: EntityType | null;

  primaryEntityId: string | null;

}



export interface KnowledgePost extends KnowledgePostSummary {

  content: string;

  contentFormat: string;

  status: PostStatus;

  seoTitle: string | null;

  seoDescription: string | null;

  canonicalUrl: string | null;

  robots: string | null;

  updatedAt: string | null;

  healthStatus: ContentHealthStatus;

  lastFactCheckedAt: string | null;

  expertReviewed: boolean;

  contentFreshness: string;

  reviewer?: KnowledgeAuthor | null;

  quickAnswer: PostQuickAnswer | null;

  sources: PostSourceLink[];

  faqs: PostFaq[];

  entityLinks: EntityLink[];

  relatedPostIds: string[];

}



export interface CreatePostInput {

  slug: string;

  title: string;

  excerpt?: string;

  content: string;

  contentFormat?: string;

  status?: PostStatus;

  contentType: ContentType;

  section?: PostSection;

  authorId?: string;

  featuredImageUrl?: string;

  primaryEntityType?: EntityType;

  primaryEntityId?: string;

  seoTitle?: string;

  seoDescription?: string;

  canonicalUrl?: string;

  tags?: string[];

  categoryIds?: string[];

  entityLinks?: Omit<EntityLink, 'sortOrder'>[];

  relatedPostIds?: string[];

  publishedAt?: string;

  reviewerId?: string;

  healthStatus?: ContentHealthStatus;

  lastFactCheckedAt?: string;

  expertReviewed?: boolean;

  contentFreshness?: string;

  quickAnswer?: PostQuickAnswer | null;

  sources?: PostSourceInput[];

  faqs?: PostFaqInput[];
}



export interface UpdatePostInput extends Partial<CreatePostInput> {

  id: string;

}



export interface PublishedPostsFilter {

  section?: PostSection;

  contentType?: ContentType;

  categorySlug?: string;

  tag?: string;

  limit?: number;

  offset?: number;

}



export interface PostsByEntityFilter {

  entityType: EntityType;

  entityId: string;

  section?: PostSection;

  limit?: number;

  offset?: number;

}



export interface PaginatedPostsResult {

  posts: KnowledgePost[];

  total: number;

  limit: number;

  offset: number;

}



export interface RelatedPostsFilter {

  postId?: string;

  entityType?: EntityType;

  entityId?: string;

  section?: PostSection;

  limit?: number;

  excludeSlug?: string;

}


