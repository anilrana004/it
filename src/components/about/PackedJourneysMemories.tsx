'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { photos } from '@/lib/media';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

/**
 * Videos / Memories — 3D coverflow with working pointer:
 * - side slides clickable (slideToClickedSlide)
 * - iframe does not steal swipe/clicks
 * - nav + pagination stay above the stage
 */

type Journey = {
  id: string;
  title: string;
  href: string;
  youtubeId: string;
  image: string;
};

const JOURNEYS: Journey[] = [
  {
    id: 'treks',
    title: 'Himalayan Treks',
    href: '/treks',
    youtubeId: 'sNDtl6HIQ7Y',
    image: photos.kedarkantha,
  },
  {
    id: 'snow',
    title: 'Snow Trails',
    href: '/treks',
    youtubeId: 'DJwxrGD7R2w',
    image: photos.snow,
  },
  {
    id: 'yatra',
    title: 'Sacred Yatras',
    href: '/yatra',
    youtubeId: 'r1COghljrtg',
    image: photos.yatra,
  },
  {
    id: 'flowers',
    title: 'Valley of Flowers',
    href: '/treks/valley-of-flowers',
    youtubeId: 'DJjleyyCehY',
    image: photos.vof,
  },
  {
    id: 'nepal',
    title: 'Nepal & Abroad',
    href: '/international-getaways',
    youtubeId: 'Enn8Eci72Vw',
    image: photos.ebc,
  },
  {
    id: 'custom',
    title: 'Custom Trips',
    href: '/customized',
    youtubeId: 'OuqA0EJZaz4',
    image: photos.chopta,
  },
];

function embedUrl(id: string) {
  const q = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    controls: '0',
    loop: '1',
    playlist: id,
    modestbranding: '1',
    rel: '0',
    playsinline: '1',
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}

export default function PackedJourneysMemories() {
  const [active, setActive] = useState(0);
  const current = JOURNEYS[active] ?? JOURNEYS[0];

  return (
    <div className="it-pack-mem" aria-label="Memories from the trail">
      <div className="it-pack-mem__head">
        <p className="it-pack-mem__kicker">Videos</p>
        <h3 className="it-pack-mem__title">Memories from the trail</h3>
      </div>

      <div className="it-pack-mem__shell">
        <Swiper
          className="it-pack-mem__swiper"
          modules={[EffectCoverflow, Navigation, Pagination]}
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          speed={700}
          navigation
          pagination={{ clickable: true }}
          slideToClickedSlide
          simulateTouch
          allowTouchMove
          threshold={8}
          touchAngle={28}
          touchReleaseOnEdges
          touchStartPreventDefault={false}
          resistanceRatio={0.65}
          coverflowEffect={{
            rotate: 28,
            stretch: -10,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            0: {
              coverflowEffect: {
                rotate: 16,
                stretch: -6,
                depth: 80,
                modifier: 1,
                slideShadows: false,
              },
            },
            640: {
              coverflowEffect: {
                rotate: 22,
                stretch: -8,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              },
            },
            1024: {
              coverflowEffect: {
                rotate: 28,
                stretch: -10,
                depth: 120,
                modifier: 1,
                slideShadows: false,
              },
            },
            1400: {
              coverflowEffect: {
                rotate: 32,
                stretch: -12,
                depth: 140,
                modifier: 1,
                slideShadows: false,
              },
            },
          }}
          onSwiper={(swiper: SwiperType) => setActive(swiper.activeIndex)}
          onSlideChange={(swiper: SwiperType) => setActive(swiper.activeIndex)}
        >
          {JOURNEYS.map((item, i) => {
            const isActive = i === active;
            return (
              <SwiperSlide key={item.id} className="it-pack-mem__slide">
                <div
                  className={`it-pack-mem__panel${isActive ? ' is-active' : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={isActive ? `${item.title} (playing)` : `Show ${item.title}`}
                >
                  {isActive ? (
                    <iframe
                      className="it-pack-mem__media it-pack-mem__media--video"
                      src={embedUrl(item.youtubeId)}
                      title={item.title}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                      tabIndex={-1}
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="it-pack-mem__media"
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      draggable={false}
                    />
                  )}
                  {!isActive ? (
                    <span className="it-pack-mem__caption">{item.title}</span>
                  ) : null}
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="it-pack-mem__cta-wrap">
        <Link href={current.href} className="it-pack-mem__cta">
          Open {current.title}
          <i className="fa-solid fa-arrow-right" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
