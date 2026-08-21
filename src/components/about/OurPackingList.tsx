'use client';

import Link from 'next/link';
import { useId } from 'react';
import { photos } from '@/lib/media';
import PackedJourneysMemories from './PackedJourneysMemories';
import './our-packing-list.css';

/**
 * Our Packing List — journey categories (native horizontal scroll on phone)
 * + Memories coverflow. No founder/team duplication.
 */

const PACKED = [
  {
    id: 'treks',
    label: 'Himalayan Treks',
    href: '/treks',
    img: photos.kedarkantha,
    tone: 'green' as const,
  },
  {
    id: 'snow',
    label: 'Snow Trails',
    href: '/treks',
    img: photos.snow,
    tone: 'ink' as const,
  },
  {
    id: 'yatra',
    label: 'Sacred Yatras',
    href: '/yatra',
    img: photos.yatra,
    tone: 'green' as const,
  },
  {
    id: 'flowers',
    label: 'Valley of Flowers',
    href: '/treks/valley-of-flowers',
    img: photos.vof,
    tone: 'ink' as const,
  },
  {
    id: 'nepal',
    label: 'Nepal & Abroad',
    href: '/international-getaways',
    img: photos.ebc,
    tone: 'green' as const,
  },
  {
    id: 'custom',
    label: 'Custom Trips',
    href: '/customized',
    img: photos.chopta,
    tone: 'ink' as const,
  },
  {
    id: 'corporate',
    label: 'Corporate',
    href: '/corporate',
    img: photos.hampta,
    tone: 'green' as const,
  },
  {
    id: 'trending',
    label: 'Trending',
    href: '/trending',
    img: photos.triund,
    tone: 'ink' as const,
  },
] as const;

export default function OurPackingList() {
  const titleId = useId();

  return (
    <section
      id="packing-list"
      className="it-pack scroll-mt-24 sm:scroll-mt-28"
      aria-labelledby={titleId}
    >
      <div className="it-pack__wrap">
        <header className="it-pack__intro">
          <p className="it-pack__eyebrow">Not gear — journeys</p>
          <h2 id={titleId} className="it-pack__title">
            Our Packing List <em>!!</em>
          </h2>
          <p className="it-pack__lead">
            Everything we pack into an Indian Treks departure. Swipe the cards, then tap one to open
            that journey.
          </p>
        </header>
      </div>

      <div className="it-pack__cats" aria-label="Packed journey categories">
        <div className="it-pack__cats-track">
          {PACKED.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`it-pack__cat it-pack__cat--${item.tone}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.img} alt="" loading="lazy" draggable={false} />
              <span className="it-pack__cat-label">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <PackedJourneysMemories />
    </section>
  );
}
