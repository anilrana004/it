'use client';

import type { JourneyMode } from '@/types/trek-map';

type Props = {
  styleMode: 'standard' | 'satellite';
  is3D: boolean;
  showElevation: boolean;
  isFullscreen: boolean;
  cinematicAvailable: boolean;
  journeyMode: JourneyMode;
  supportsCompleteJourney: boolean;
  onStyleModeChange: (mode: 'standard' | 'satellite') => void;
  onToggle3D: () => void;
  onToggleElevation: () => void;
  onToggleFullscreen: () => void;
  onFitTrek: () => void;
  onReset: () => void;
  onExplore3D: () => void;
  onJourneyModeChange: (mode: JourneyMode) => void;
};

export default function TrekMapControls({
  styleMode,
  is3D,
  showElevation,
  isFullscreen,
  cinematicAvailable,
  journeyMode,
  supportsCompleteJourney,
  onStyleModeChange,
  onToggle3D,
  onToggleElevation,
  onToggleFullscreen,
  onFitTrek,
  onReset,
  onExplore3D,
  onJourneyModeChange,
}: Props) {
  return (
    <div className="tm-controls" role="toolbar" aria-label="Map controls">
      <button
        type="button"
        className="tm-explore-cta"
        onClick={onExplore3D}
        disabled={!cinematicAvailable}
        aria-label="Explore journey in 3D"
        title={
          cinematicAvailable
            ? 'Explore complete journey in 3D'
            : '3D journey needs verified route geometry'
        }
      >
        <i className="fa-solid fa-play" aria-hidden />
        Explore journey in 3D
      </button>

      <button
        type="button"
        className={`tm-control tm-control--fullscreen${isFullscreen ? ' is-active' : ''}`}
        aria-pressed={isFullscreen}
        onClick={onToggleFullscreen}
        aria-label={isFullscreen ? 'Exit big screen' : 'Open big screen'}
        title={isFullscreen ? 'Exit big screen' : 'Expand map to big screen'}
      >
        <i
          className={`fa-solid ${isFullscreen ? 'fa-compress' : 'fa-expand'}`}
          aria-hidden
        />
        {isFullscreen ? 'Exit' : 'Big screen'}
      </button>

      <div className="tm-controls-group" role="group" aria-label="Journey mode">
        <button
          type="button"
          className={`tm-control${journeyMode === 'complete' ? ' is-active' : ''}`}
          aria-pressed={journeyMode === 'complete'}
          disabled={!supportsCompleteJourney}
          onClick={() => onJourneyModeChange('complete')}
          title={
            supportsCompleteJourney
              ? 'Pickup → trek → drop-off'
              : 'Complete journey needs verified transfer/return geometry'
          }
        >
          Complete journey
        </button>
        <button
          type="button"
          className={`tm-control${journeyMode === 'trek-only' ? ' is-active' : ''}`}
          aria-pressed={journeyMode === 'trek-only'}
          onClick={() => onJourneyModeChange('trek-only')}
          title="Trailhead → summit (hiking only)"
        >
          Trek only
        </button>
      </div>

      <div className="tm-controls-group" role="group" aria-label="Map style">
        <button
          type="button"
          className={`tm-control${styleMode === 'standard' ? ' is-active' : ''}`}
          aria-pressed={styleMode === 'standard'}
          onClick={() => onStyleModeChange('standard')}
        >
          Map
        </button>
        <button
          type="button"
          className={`tm-control${styleMode === 'satellite' ? ' is-active' : ''}`}
          aria-pressed={styleMode === 'satellite'}
          onClick={() => onStyleModeChange('satellite')}
        >
          Satellite
        </button>
      </div>

      <button
        type="button"
        className={`tm-control${is3D ? ' is-active' : ''}`}
        aria-pressed={is3D}
        onClick={onToggle3D}
        aria-label="Toggle 3D terrain"
      >
        3D
      </button>

      <button type="button" className="tm-control" onClick={onFitTrek} aria-label="Fit trek route in view">
        Fit trek
      </button>

      <button type="button" className="tm-control" onClick={onReset} aria-label="Reset map view">
        Reset
      </button>

      <button
        type="button"
        className={`tm-control tm-control--secondary${showElevation ? ' is-active' : ''}`}
        aria-pressed={showElevation}
        onClick={onToggleElevation}
        aria-label="Toggle elevation profile"
      >
        Elevation
      </button>
    </div>
  );
}
