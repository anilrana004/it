'use client';

import { useCallback, useState } from 'react';
import UiversePlayButton from '@/components/ui/UiversePlayButton';
import './youtube-lazy-player.css';

function thumbUrl(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

function embedUrl(id: string) {
  const q = new URLSearchParams({
    autoplay: '1',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  return `https://www.youtube-nocookie.com/embed/${id}?${q.toString()}`;
}

type YouTubeLazyPlayerProps = {
  youtubeId: string;
  title: string;
  className?: string;
  playLabel?: string;
  nowLabel?: string;
  buttonSize?: 'default' | 'compact';
};

export default function YouTubeLazyPlayer({
  youtubeId,
  title,
  className = '',
  playLabel = 'Play',
  nowLabel = 'Now',
  buttonSize = 'default',
}: YouTubeLazyPlayerProps) {
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => setPlaying(true), []);

  return (
    <div className={['it-yt-lazy', className].filter(Boolean).join(' ')}>
      {playing ? (
        <iframe
          className="it-yt-lazy__iframe"
          src={embedUrl(youtubeId)}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="it-yt-lazy__thumb"
            src={thumbUrl(youtubeId)}
            alt=""
            loading="lazy"
            draggable={false}
          />
          <div className="it-yt-lazy__shade" aria-hidden />
          <div className="it-yt-lazy__cta">
            <UiversePlayButton
              onClick={play}
              ariaLabel={`Play video: ${title}`}
              playLabel={playLabel}
              nowLabel={nowLabel}
              size={buttonSize}
            />
          </div>
        </>
      )}
    </div>
  );
}
