'use client';

import './uiverse-play-button.css';

type UiversePlayButtonProps = {
  onClick?: () => void;
  ariaLabel?: string;
  playLabel?: string;
  nowLabel?: string;
  size?: 'default' | 'compact';
  className?: string;
  disabled?: boolean;
};

export default function UiversePlayButton({
  onClick,
  ariaLabel = 'Play video',
  playLabel = 'Play',
  nowLabel = 'Now',
  size = 'default',
  className = '',
  disabled = false,
}: UiversePlayButtonProps) {
  return (
    <button
      type="button"
      className={[
        'it-uiverse-play',
        size === 'compact' ? 'it-uiverse-play--compact' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      <svg viewBox="0 0 24 24" aria-hidden className="it-uiverse-play__icon">
        <path d="M8 5v14l11-7z" fill="currentColor" />
      </svg>
      <span className="it-uiverse-play__word it-uiverse-play__word--play">{playLabel}</span>
      <span className="it-uiverse-play__word it-uiverse-play__word--now">{nowLabel}</span>
    </button>
  );
}
