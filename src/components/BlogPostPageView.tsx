import BlogMarkdown, { extractBlogToc } from '@/components/BlogMarkdown';
import PrepTocNav, { PrepTocBackLink } from '@/components/prep/PrepTocNav';
import type { BlogPost } from '@/lib/blog';
import { blogDate } from '@/lib/blog';
import Link from 'next/link';
import '@/components/prep/prep-guides.css';

function stripMdLight(text: string) {
  return text.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

export default function BlogPostPageView({ post }: { post: BlogPost }) {
  const toc = post.markdown ? extractBlogToc(post.content).slice(0, 14) : [];
  const lead = post.description
    ? post.description
    : stripMdLight(
        post.content
          .replace(/\r\n/g, '\n')
          .split('\n')
          .find((l) => l.trim() && !l.startsWith('#'))
          ?.trim() || '',
      );

  return (
    <article className="it-prep">
      <header className="it-prep__hero">
        <div className="it-prep__hero-media" aria-hidden>
          <img src={post.image} alt="" referrerPolicy="no-referrer" />
          <div className="it-prep__hero-shade" />
        </div>
        <div className="it-prep__hero-inner">
          <p className="it-prep__brand">Indian Treks</p>
          <p className="it-prep__eyebrow">
            <i className="fa-solid fa-newspaper" aria-hidden />
            Blog
          </p>
          <h1 className="it-prep__title">{post.title}</h1>
          {lead ? <p className="it-prep__lead">{lead}</p> : null}
          <div className="it-prep__meta">
            <span className="it-prep__meta-chip">
              <i className="fa-regular fa-calendar" aria-hidden />
              {blogDate(post.publishedAt)}
            </span>
            <span className="it-prep__meta-chip">
              <i className="fa-regular fa-clock" aria-hidden />
              {post.read}
            </span>
            <span className="it-prep__meta-chip">
              <i className="fa-solid fa-user" aria-hidden />
              {post.author}
            </span>
          </div>
        </div>
      </header>

      <div className="it-prep__wrap it-prep__wrap--solo">
        <PrepTocNav
          items={toc.length > 0 ? toc : [{ id: 'article-body', title: 'Article' }]}
          footer={<PrepTocBackLink href="/blog" label="← All articles" />}
        />

        <div id="article-body">
          {post.markdown ? (
            <BlogMarkdown content={post.content} />
          ) : (
            <div className="it-prep__content">
              <section className="it-prep__section">
                {post.content.split('\n\n').map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            </div>
          )}

          <footer className="it-prep__footer">
            <div className="it-prep__cta">
              <div>
                <h2>Ready to plan your next Himalayan journey?</h2>
                <p>
                  Explore family-friendly and beginner treks, or talk to our team — we will help you
                  pick a route that matches your group.
                </p>
              </div>
              <div className="it-prep__cta-actions">
                <Link href="/family-treks">
                  <i className="fa-solid fa-people-roof" aria-hidden />
                  Family treks
                </Link>
                <Link href="/treks">
                  <i className="fa-solid fa-compass" aria-hidden />
                  Explore treks
                </Link>
                <Link href="/contact">
                  <i className="fa-solid fa-comments" aria-hidden />
                  Ask an advisor
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
