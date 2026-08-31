import { blogDate, blogPath, blogPosts } from '@/lib/blog';

export type HomeFeaturedBlogPost = {
  id: string;
  title: string;
  img: string;
  date: string;
  read: string;
  href: string;
};

export const HOME_BLOG_SECTION = {
  kicker: 'BLOGS',
  title: 'Our Blogs',
  viewAllLabel: 'View All',
  viewAllHref: '/blog',
} as const;

/** Homepage blog teasers — synced with canonical posts in `blog.ts`. */
export const HOME_FEATURED_BLOG_POSTS: HomeFeaturedBlogPost[] = [...blogPosts]
  .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  .slice(0, 4)
  .map((post) => ({
    id: post.slug,
    title: post.title,
    img: post.image,
    date: blogDate(post.publishedAt),
    read: post.read,
    href: blogPath(post.slug),
  }));
