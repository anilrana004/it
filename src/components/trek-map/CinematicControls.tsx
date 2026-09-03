'use client';

import type { JourneyUiSnapshot } from '@/lib/trek-map/journey-controller';

type Props = {
  snapshot: JourneyUiSnapshot;
  disabledReason?: string;
  onPlay: () => void;
  onPause: () => void;
  onResume: () => void;
  onRestart: () => void;
  onSeek: (progress: number) => void;
  onSpeed: (speed: number) => void;
  onExit: () => void;
};

const SPEEDS = [0.5, 1, 1.5, 2] as const;

export default function CinematicControls({
  snapshot,
  disabledReason,
  onPlay,
  onPause,
  onResume,
  onRestart,
  onSeek,
  onSpeed,
  onExit,
}: Props) {
  if (disabledReason) {
    return (
      <div className="tm-cinematic tm-cinematic--disabled" role="status">
        <p>{disabledReason}</p>
        <button type="button" className="tm-control" onClick={onExit}>
          Exit
        </button>
      </div>
    );
  }

  const primaryAction = snapshot.interrupted
    ? { label: 'Resume journey', onClick: onResume, aria: 'Resume 3D trek journey' }
    : snapshot.playing
      ? { label: 'Pause', onClick: onPause, aria: 'Pause 3D trek journey' }
      : snapshot.progress >= 0.999
        ? { label: 'Replay', onClick: onRestart, aria: 'Restart 3D trek journey' }
        : { label: 'Play', onClick: onPlay, aria: 'Play 3D trek journey' };

  return (
    <div className="tm-cinematic" role="region" aria-label="3D trek journey controls">
      <div className="tm-cinematic-top">
        <button type="button" className="tm-control" onClick={onExit} aria-label="Exit 3D journey">
          Exit journey
        </button>
        <div className="tm-cinematic-meta" aria-live="polite">
          <strong>{snapshot.dayLabel}</strong>
          <span>{snapshot.distanceKm.toFixed(1)} km</span>
        </div>
      </div>

      {snapshot.cue && (
        <div className="tm-cinematic-cue" aria-live="polite">
          <span className="tm-cinematic-cue-kind">{snapshot.cue.kind.replace('-', ' ')}</span>
          <strong>{snapshot.cue.name}</strong>
          {snapshot.cue.elevationM != null && (
            <span>{Math.round(snapshot.cue.elevationM).toLocaleString('en-IN')} m</span>
          )}
        </div>
      )}

      <div className="tm-cinematic-bar">
        <button
          type="button"
          className="tm-cinematic-play"
          onClick={primaryAction.onClick}
          aria-label={primaryAction.aria}
        >
          <i
            className={`fa-solid ${snapshot.playing ? 'fa-pause' : snapshot.interrupted ? 'fa-play' : 'fa-play'}`}
            aria-hidden
          />
          <span>{primaryAction.label}</span>
        </button>

        <label className="tm-cinematic-scrubber">
          <span className="sr-only">Journey progress</span>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(snapshot.progress * 1000)}
            onChange={(e) => onSeek(Number(e.target.value) / 1000)}
            aria-valuetext={`${Math.round(snapshot.progress * 100)} percent · ${snapshot.distanceKm.toFixed(1)} km`}
          />
          <span className="tm-cinematic-timeline" aria-hidden>
            <span>{snapshot.mode === 'complete' ? 'Pickup' : 'Start'}</span>
            <span>Summit</span>
            <span>{snapshot.mode === 'complete' ? 'Drop-off' : 'End'}</span>
          </span>
        </label>
        <button type="button" className="tm-control tm-control--ghost" onClick={onRestart} aria-label="Restart journey">
          Restart
        </button>

        <div className="tm-cinematic-speeds" role="group" aria-label="Playback speed">
          {SPEEDS.map((s) => (
            <button
              key={s}
              type="button"
              className={`tm-control tm-control--ghost${snapshot.speed === s ? ' is-active' : ''}`}
              aria-pressed={snapshot.speed === s}
              onClick={() => onSpeed(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
