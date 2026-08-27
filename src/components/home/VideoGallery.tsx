'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  FEATURED_VIDEOS,
  carouselOffset,
  type FeaturedVideo,
} from '@/lib/featured-videos';
import './video-gallery.css';

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

function thumbUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

function CardCaption({ video }: { video: FeaturedVideo }) {
  return (
    <div className="it-vid-mem__caption">
      <span className="it-vid-mem__caption-en">{video.captionEn}</span>
      <span className="it-vid-mem__caption-hi">{video.captionHi}</span>
    </div>
  );
}

function VideoCardFill({
  video,
  isActive,
}: {
  video: FeaturedVideo;
  isActive: boolean;
}) {
  const [loading, setLoading] = useState(isActive);

  useEffect(() => {
    if (isActive) setLoading(true);
  }, [video.id, isActive]);

  return (
    <div className="it-vid-mem__fill" style={{ background: video.gradient }}>
      {isActive ? (
        <>
          {loading ? <span className="it-vid-mem__loading" aria-hidden /> : null}
          <div className="it-vid-mem__media-wrap">
            <iframe
              className="it-vid-mem__media"
              src={embedUrl(video.youtubeId)}
              title={video.captionEn}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              tabIndex={-1}
              onLoad={() => setLoading(false)}
            />
          </div>
        </>
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="it-vid-mem__thumb"
            src={thumbUrl(video.youtubeId)}
            alt=""
            loading="lazy"
            draggable={false}
          />
          <span className="it-vid-mem__play" aria-hidden>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </>
      )}

      <span className="it-vid-mem__badge">{video.badge}</span>
      <CardCaption video={video} />
    </div>
  );
}

export default function VideoGallery() {
  const touchStartX = useRef(0);
  const [active, setActive] = useState(0);

  const total = FEATURED_VIDEOS.length;
  const activeVideo = FEATURED_VIDEOS[active] ?? FEATURED_VIDEOS[0];

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % total) + total) % total);
    },
    [total],
  );

  const goNext = useCallback(() => goTo(active + 1), [active, goTo]);
  const goPrev = useCallback(() => goTo(active - 1), [active, goTo]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    },
    [goNext, goPrev],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (dx > 48) goPrev();
    if (dx < -48) goNext();
  };

  return (
    <section className="it-vid-mem" aria-labelledby="featured-videos-title">
      <div className="it-vid-mem__inner">
        <header className="it-vid-mem__head">
          <p className="it-vid-mem__kicker">Videos</p>
          <h2 id="featured-videos-title" className="it-vid-mem__title">
            Trails We&apos;ve Walked
          </h2>
        </header>

        <div className="it-vid-mem__stage-wrap">
          <div
            className="it-vid-mem__stage"
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured travel videos"
            tabIndex={0}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <p className="it-vid-mem__status" aria-live="polite" aria-atomic="true">
              Video {active + 1} of {total}: {activeVideo.captionEn}
            </p>

            {FEATURED_VIDEOS.map((video, index) => {
              const offset = carouselOffset(index, active, total);
              if (Math.abs(offset) > 2) return null;

              const isActive = offset === 0;

              return (
                <button
                  key={video.id}
                  type="button"
                  className={`it-vid-mem__card${isActive ? ' it-vid-mem__card--active' : ''}`}
                  data-offset={offset}
                  style={{ '--it-vid-pos': offset } as React.CSSProperties}
                  aria-label={
                    isActive
                      ? `${video.captionEn}, currently playing`
                      : `Show video: ${video.captionEn}`
                  }
                  aria-current={isActive ? 'true' : undefined}
                  onClick={() => {
                    if (!isActive) goTo(index);
                  }}
                >
                  <VideoCardFill video={video} isActive={isActive} />
                </button>
              );
            })}
          </div>

          <nav className="it-vid-mem__nav" aria-label="Carousel controls">
            <button
              type="button"
              className="it-vid-mem__nav-btn"
              aria-label="Previous video"
              onClick={goPrev}
            >
              <ChevronLeft size={18} strokeWidth={2.4} aria-hidden />
            </button>
            <button
              type="button"
              className="it-vid-mem__nav-btn"
              aria-label="Next video"
              onClick={goNext}
            >
              <ChevronRight size={18} strokeWidth={2.4} aria-hidden />
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
}
