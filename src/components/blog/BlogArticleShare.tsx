'use client';

import { absoluteUrl } from '@/lib/site';

type Props = {
  title: string;
  path: string;
};

export default function BlogArticleShare({ title, path }: Props) {
  const url = absoluteUrl(path);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const links = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: 'fa-brands fa-whatsapp',
      className: 'is-wa',
    },
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'fa-brands fa-facebook-f',
      className: 'is-fb',
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: 'fa-brands fa-x-twitter',
      className: 'is-x',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: 'fa-brands fa-linkedin-in',
      className: 'is-li',
    },
  ];

  return (
    <div className="it-blog__share" aria-label="Share this article">
      <p className="it-blog__share-label">Share</p>
      <ul className="it-blog__share-list">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={`it-blog__share-btn ${link.className}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${link.label}`}
            >
              <i className={link.icon} aria-hidden />
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="it-blog__share-btn is-copy"
            aria-label="Copy link"
            onClick={() => {
              void navigator.clipboard?.writeText(url);
            }}
          >
            <i className="fa-solid fa-link" aria-hidden />
          </button>
        </li>
      </ul>
    </div>
  );
}
