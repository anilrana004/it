import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { LandingArticle } from '@/lib/landing-social-content';
import './landing-reviews-blog.css';

type Props = {
  kicker: string;
  title: string;
  items: LandingArticle[];
  className?: string;
};

export default function LandingBlogSection({ kicker, title, items, className }: Props) {
  const feature = items[0];
  const rest = items.slice(1);

  return (
    <section className={className ?? 'it-lx__section'}>
      <div className="it-lx__container">
        <div className="it-lx__blog-head">
          <div>
            <p className="it-lx__kicker">{kicker}</p>
            <h2>{title}</h2>
          </div>
          <Link href="/blog" className="it-lx__blog-all">
            View all
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        <div className="it-lx__blog-mobile">
          {items.map((article) => (
            <Link key={article.href} href={article.href} className="it-lx__blog-mcard">
              <span className="it-lx__blog-mcard-media">
                <Image src={article.image} alt="" fill sizes="120px" />
              </span>
              <span className="it-lx__blog-mcard-body">
                <span className="it-lx__blog-meta">{article.read}</span>
                <strong>{article.title}</strong>
              </span>
            </Link>
          ))}
        </div>

        <div className="it-lx__blog-desk">
          {feature ? (
            <Link href={feature.href} className="it-lx__blog-feature">
              <span className="it-lx__blog-feature-media">
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  sizes="(max-width: 1100px) 100vw, 50vw"
                />
              </span>
              <span className="it-lx__blog-feature-body">
                <span className="it-lx__blog-meta">{feature.read}</span>
                <strong>{feature.title}</strong>
                <span className="it-lx__blog-excerpt">{feature.excerpt}</span>
              </span>
            </Link>
          ) : null}
          {rest.map((article) => (
            <Link key={article.href} href={article.href} className="it-lx__blog-card">
              <span className="it-lx__blog-card-media">
                <Image src={article.image} alt="" fill sizes="25vw" />
              </span>
              <span className="it-lx__blog-card-body">
                <span className="it-lx__blog-meta">{article.read}</span>
                <strong>{article.title}</strong>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
