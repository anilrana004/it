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

/** Homepage-curated blog teasers — separate from canonical `blogPosts` in `blog.ts`. */
export const HOME_FEATURED_BLOG_POSTS: HomeFeaturedBlogPost[] = [
  {
    id: 'girls-trip-with-indiantreks',
    title: 'Why Indian Treks Is the Perfect Choice for Your All-Girls Trip | Safe & Fun Group Travel',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    date: '30 Jul',
    read: '6 min read',
    href: '/blog/girls-trip-with-indiantreks',
  },
  {
    id: 'book-now-pay-later',
    title: 'Book Now Pay Later with Indian Treks | Travel Now, Pay in EMIs',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    date: '25 Jun',
    read: '5 min read',
    href: '/blog/book-now-pay-later',
  },
  {
    id: 'school-trips',
    title: 'Why School Trips Are More Than Just Fun Days Out: How Indian Treks Creates Life-Changing Educational Adventures',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    date: '18 Sep',
    read: '9 min read',
    href: '/blog/school-trips',
  },
  {
    id: 'best-places-to-visit-in-india-in-july',
    title: '25 Best Places to Visit in India in July',
    img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
    date: '16 Jun',
    read: '17 min read',
    href: '/blog/best-places-to-visit-in-india-in-july',
  },
];
