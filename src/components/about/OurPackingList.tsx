'use client';

import Link from 'next/link';
import { useId } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { photos } from '@/lib/media';
import PackedJourneysMemories from './PackedJourneysMemories';
import './our-packing-list.css';

import 'swiper/css';
import 'swiper/css/free-mode';

/**
 * Our Packing List — NOT another team/founder block.
 * About already covers brand + TeamSection. This section only packs journeys:
 * JustWravel-style category strip + Memories coverflow.
 * https://www.justwravel.com/about
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
            Everything we pack into an Indian Treks departure: Himalayan trails, snow seasons,
            pilgrimages, custom trips, and more. Tap any card to open that journey.
          </p>
        </header>
      </div>

      <div className="it-pack__cats" aria-label="Packed journey categories">
        <Swiper
          className="it-pack__cats-swiper"
          modules={[Autoplay, FreeMode]}
          freeMode
          grabCursor
          loop
          slidesPerView="auto"
          spaceBetween={14}
          speed={900}
          autoplay={{ delay: 2800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{
            0: { spaceBetween: 10 },
            768: { spaceBetween: 14 },
            1200: { spaceBetween: 18 },
          }}
        >
          {PACKED.map((item) => (
            <SwiperSlide key={item.id} className="it-pack__cat-slide">
              <Link href={item.href} className={`it-pack__cat it-pack__cat--${item.tone}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.img} alt="" loading="lazy" />
                <span className="it-pack__cat-label">{item.label}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <PackedJourneysMemories />
    </section>
  );
}
