import Link from 'next/link';
import { blogDateLong, blogPath, type BlogPost } from '@/lib/blog';
import { CONTACT, SOCIAL_LINKS } from '@/lib/contact';
import BlogNewsletterForm from '@/components/blog/BlogNewsletterForm';
import BlogArticleMeta from '@/components/blog/BlogArticleMeta';
import './blog-sidebar.css';

const SIDEBAR_SOCIAL = SOCIAL_LINKS.filter((link) =>
  ['facebook', 'instagram', 'youtube', 'linkedin'].includes(link.id),
);

const SOCIAL_ICONS: Record<string, string> = {
  facebook: 'fa-brands fa-facebook-f',
  instagram: 'fa-brands fa-instagram',
  youtube: 'fa-brands fa-youtube',
  linkedin: 'fa-brands fa-linkedin-in',
};

const MOUNTAIN_TALES_IMAGE =
  'https://assets.justwravel.in/blog-media/2022/09/justwravel-folk-tales-cover.webp';

export default function BlogSidebar({
  recentPosts,
  activeSlug,
  post,
  sharePath,
}: {
  recentPosts: BlogPost[];
  activeSlug?: string;
  post?: BlogPost;
  sharePath?: string;
}) {
  const recent = recentPosts.filter((p) => p.slug !== activeSlug).slice(0, 5);

  return (
    <aside className={`blog-sidebar${post ? ' blog-sidebar--article' : ''}`} aria-label="Blog sidebar">
      {post ? (
        <div className="blog-sidebar__article-tools">
          <BlogArticleMeta post={post} />
        </div>
      ) : null}

      <div className="sidebox">
        <h3>FOLLOW US</h3>
        <div className="socials">
          {SIDEBAR_SOCIAL.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="social"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
            >
              <i className={SOCIAL_ICONS[link.id] ?? 'fa-solid fa-link'} aria-hidden />
            </a>
          ))}
        </div>
      </div>

      <div className="sidebox folktales-box">
        <h3>LISTEN TO MOUNTAIN TALES</h3>
        <a
          className="folk-link"
          href={CONTACT.social.youtube}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Listen to Mountain Tales"
        >
          <img src={MOUNTAIN_TALES_IMAGE} alt="Mountain Tales by Indian Treks" loading="lazy" />
        </a>
      </div>

      <div className="sidebox newsletter-box">
        <h3>SUBSCRIBE FOR NEWSLETTER</h3>
        <BlogNewsletterForm />
      </div>

      <div className="sidebox recent-box">
        <h3>RECENT POSTS</h3>
        {recent.map((post) => (
          <Link key={post.slug} href={blogPath(post.slug)} className="recent-post">
            <strong>{post.title}</strong>
            <span>{blogDateLong(post.publishedAt)}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
