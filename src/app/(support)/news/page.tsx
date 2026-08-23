import type { Metadata } from 'next';
import Link from 'next/link';
import { photos } from '@/lib/media';

const newsItems = [
  {
    title: 'Indian Treks expands winter departures across Uttarakhand',
    date: 'Jan 2026',
    summary:
      'New Kedarkantha, Kuari Pass, and Chopta–Tungnath fixed departures added for the winter season with enhanced snow-route support.',
    tag: 'Company',
  },
  {
    title: 'Char Dham & Kedarnath yatra assistance for 2026',
    date: 'Dec 2025',
    summary:
      'Dedicated pilgrimage desk now supports Do Dham, Char Dham, and customised yatra planning with transport and stay coordination.',
    tag: 'Yatra',
  },
  {
    title: 'Trail Highlights from the Community — video series live',
    date: 'Nov 2025',
    summary:
      'Real trek and yatra moments from Indian Treks travellers now featured on our About page and social channels.',
    tag: 'Community',
  },
  {
    title: 'Corporate & B2B Himalayan programmes',
    date: 'Oct 2025',
    summary:
      'Team offsites, outbound training, and private group treks — contact our B2B desk for custom itineraries and departures.',
    tag: 'Corporate',
  },
];

export const metadata: Metadata = {
  title: 'News & Media | Indian Treks',
  description:
    'Latest updates from Indian Treks — new departures, yatra services, community stories, and corporate travel programmes.',
};

export default function NewsPage() {
  return (
    <div className="it-support-page">
      <div className="it-support-page__wrap">
        <header className="it-support-page__hero">
          <p className="it-support-page__eyebrow">News &amp; Media</p>
          <h1 className="it-support-page__title">Updates from Indian Treks</h1>
          <p className="it-support-page__lead">
            Company news, seasonal departures, yatra updates, and stories from the mountain
            community.
          </p>
        </header>

        <div className="rounded-2xl overflow-hidden border border-[#ececec] mb-4 shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photos.kedarkantha}
            alt=""
            className="w-full h-44 object-cover"
            loading="lazy"
          />
        </div>

        {newsItems.map((item) => (
          <article key={item.title} className="it-support-page__card">
            <p className="text-[0.68rem] font-extrabold uppercase tracking-wider text-[#16a34a] mb-1">
              {item.tag} · {item.date}
            </p>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
          </article>
        ))}

        <div className="it-support-page__cta">
          <Link href="/blog">
            <i className="fa-solid fa-newspaper" aria-hidden />
            Read our blog
          </Link>
        </div>
      </div>
    </div>
  );
}
