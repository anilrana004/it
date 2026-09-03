import mapboxgl, { type Map as MapboxMap } from 'mapbox-gl';
import type { JourneyMode, MapSelection, TrekMapModel } from '@/types/trek-map';
import {
  buildJourneyPath,
  cameraAltitudeForProgress,
  dayAtProgress,
  easeInOutCubic,
  lookAheadCoord,
  nearestCue,
  sampleAtProgress,
  travelDurationMsForPath,
  type JourneyLocationCue,
  type JourneyPath,
} from './journey-path';
import { setRouteTrimProgress, setTrackerPosition, clearTracker, syncTrekLayers } from './layers';
import { ensureTerrain } from './terrain';

export type JourneyUiSnapshot = {
  progress: number;
  playing: boolean;
  interrupted: boolean;
  speed: number;
  distanceKm: number;
  day: number | null;
  dayLabel: string;
  cue: JourneyLocationCue | null;
  phase: 'intro' | 'travel' | 'summit' | 'outro' | 'idle';
  mode: JourneyMode;
};

export type JourneyControllerOptions = {
  map: MapboxMap;
  model: TrekMapModel;
  mode?: JourneyMode;
  isMobile: boolean;
  travelDurationMs?: number;
  introDurationMs?: number;
  onUpdate?: (snap: JourneyUiSnapshot) => void;
  onDayChange?: (selection: MapSelection) => void;
  onComplete?: () => void;
};

/**
 * Imperative cinematic journey — FreeCamera + route progress.
 * Starts at Pickup (complete mode) or trailhead (trek-only).
 */
export class TrekJourneyController {
  private map: MapboxMap;
  private model: TrekMapModel;
  private mode: JourneyMode;
  private path: JourneyPath;
  private isMobile: boolean;
  private travelDurationMs: number;
  private introDurationMs: number;
  private onUpdate?: (snap: JourneyUiSnapshot) => void;
  private onDayChange?: (selection: MapSelection) => void;
  private onComplete?: () => void;

  private raf = 0;
  private playing = false;
  private interrupted = false;
  private speed = 1;
  private progress = 0;
  private phase: JourneyUiSnapshot['phase'] = 'idle';
  private introElapsed = 0;
  private lastTs: number | null = null;
  private lastEmittedDay: number | null = null;
  private userGesturePause = false;
  private detachInteraction: (() => void) | null = null;
  private destroyed = false;

  constructor(options: JourneyControllerOptions) {
    this.map = options.map;
    this.model = options.model;
    this.mode = options.mode ?? 'complete';
    this.path = buildJourneyPath(options.model, this.mode);
    this.isMobile = options.isMobile;
    this.travelDurationMs = options.travelDurationMs ?? travelDurationMsForPath(this.path);
    this.introDurationMs = options.introDurationMs ?? 4200;
    this.onUpdate = options.onUpdate;
    this.onDayChange = options.onDayChange;
    this.onComplete = options.onComplete;

    if (this.path.canPlay) {
      syncTrekLayers(this.map, this.model, 'overview', this.mode);
      setRouteTrimProgress(this.map, 0.001);
    }
  }

  getPath(): JourneyPath {
    return this.path;
  }

  canPlay(): boolean {
    return this.path.canPlay;
  }

  disabledReason(): string | undefined {
    return this.path.reasonDisabled;
  }

  getSnapshot(): JourneyUiSnapshot {
    return this.snapshot();
  }

  play(): void {
    if (!this.path.canPlay || this.destroyed) return;
    this.interrupted = false;
    this.userGesturePause = false;
    ensureTerrain(this.map, true);

    if (this.progress >= 0.999) {
      this.progress = 0;
      this.introElapsed = 0;
      this.phase = 'intro';
    } else if (this.phase === 'idle') {
      this.phase = this.progress <= 0.001 ? 'intro' : 'travel';
      if (this.phase === 'intro') this.introElapsed = 0;
    }

    this.playing = true;
    this.lastTs = null;
    this.bindInteractionPause();
    this.emit();
    this.raf = requestAnimationFrame(this.tick);
  }

  pause(): void {
    this.playing = false;
    this.lastTs = null;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.emit();
  }

  interrupt(): void {
    if (!this.playing && !this.interrupted) return;
    this.interrupted = true;
    this.userGesturePause = true;
    this.pause();
  }

  resume(): void {
    if (this.progress >= 0.999) {
      this.restart();
      return;
    }
    this.play();
  }

  restart(): void {
    this.progress = 0;
    this.introElapsed = 0;
    this.phase = 'intro';
    this.interrupted = false;
    syncTrekLayers(this.map, this.model, 'overview', this.mode);
    this.applyFrame(0, true);
    this.play();
  }

  seek(progress: number): void {
    const t = Math.max(0, Math.min(1, progress));
    this.progress = t;
    this.introElapsed = this.introDurationMs;
    this.phase = t >= 0.999 ? 'outro' : t <= 0.001 ? 'intro' : 'travel';
    this.applyFrame(t, true);
    this.emit();
  }

  continueFrom(progress: number): void {
    this.seek(progress);
    this.play();
  }

  setSpeed(speed: number): void {
    this.speed = Math.max(0.5, Math.min(2, speed));
    this.emit();
  }

  destroy(): void {
    this.destroyed = true;
    this.pause();
    this.detachInteraction?.();
    this.detachInteraction = null;
    clearTracker(this.map);
    try {
      setRouteTrimProgress(this.map, 1);
    } catch {
      // ignore
    }
  }

  private bindInteractionPause(): void {
    this.detachInteraction?.();
    const pause = () => {
      if (!this.playing || this.userGesturePause) return;
      this.interrupt();
    };
    this.map.on('mousedown', pause);
    this.map.on('touchstart', pause);
    this.map.on('wheel', pause);
    this.detachInteraction = () => {
      this.map.off('mousedown', pause);
      this.map.off('touchstart', pause);
      this.map.off('wheel', pause);
    };
  }

  private tick = (ts: number): void => {
    if (!this.playing || this.destroyed) return;
    if (this.lastTs == null) this.lastTs = ts;
    const dt = Math.min(64, ts - this.lastTs);
    this.lastTs = ts;

    if (this.phase === 'intro') {
      this.introElapsed += dt * this.speed;
      const introT = Math.min(1, this.introElapsed / this.introDurationMs);
      this.renderIntro(easeInOutCubic(introT));
      if (introT >= 1) {
        this.phase = 'travel';
        this.progress = 0;
      }
      this.emit();
      this.raf = requestAnimationFrame(this.tick);
      return;
    }

    const deltaProgress = (dt * this.speed) / this.travelDurationMs;
    this.progress = Math.min(1, this.progress + deltaProgress);

    const summitCue = this.path.cues.find((c) => c.kind === 'summit' || c.roleHint === 'summit');
    if (summitCue && this.progress >= summitCue.progress) this.phase = 'summit';
    if (this.progress >= 0.999) this.phase = 'outro';

    this.applyFrame(this.progress, false);
    this.emit();

    if (this.progress >= 0.999) {
      this.playing = false;
      this.onComplete?.();
      this.emit();
      return;
    }

    this.raf = requestAnimationFrame(this.tick);
  };

  private renderIntro(t: number): void {
    const start = sampleAtProgress(this.path, 0).coord;
    const mid = sampleAtProgress(this.path, 0.08).coord;
    const lng = start[0] + (mid[0] - start[0]) * t;
    const lat = start[1] + (mid[1] - start[1]) * t;
    const alt = (this.isMobile ? 5200 : 7800) * (1 - t * 0.55) + (this.isMobile ? 1600 : 2200) * t;
    this.setCamera([lng, lat], lookAheadCoord(this.path, Math.max(0.02, t * 0.08)), alt);
    setRouteTrimProgress(this.map, 0.001 + t * 0.01);
    setTrackerPosition(this.map, start[0], start[1]);
  }

  private applyFrame(progress: number, forceDay: boolean): void {
    const sample = sampleAtProgress(this.path, progress);
    const target = lookAheadCoord(this.path, progress, this.isMobile ? 0.35 : 0.55);
    let altitude = cameraAltitudeForProgress(this.path, progress, this.isMobile);

    if (progress > 0.9) {
      altitude *= 1.15 + (progress - 0.9) * 2.2;
    }

    const bearingRad = ((sample.bearing + 180) * Math.PI) / 180;
    const offsetKm = this.isMobile ? 0.28 : 0.42;
    const camLng =
      sample.coord[0] +
      (Math.sin(bearingRad) * offsetKm) / (111.32 * Math.cos((sample.coord[1] * Math.PI) / 180));
    const camLat = sample.coord[1] + (Math.cos(bearingRad) * offsetKm) / 110.57;

    this.setCamera([camLng, camLat], target, altitude);
    setRouteTrimProgress(this.map, Math.max(0.01, progress));
    setTrackerPosition(this.map, sample.coord[0], sample.coord[1]);

    const band = dayAtProgress(this.path, progress);
    if (band && (forceDay || band.day !== this.lastEmittedDay)) {
      this.lastEmittedDay = band.day;
      this.onDayChange?.(band.day);
    }
  }

  private setCamera(position: [number, number], lookAt: [number, number], altitudeM: number): void {
    try {
      const camera = this.map.getFreeCameraOptions();
      const safeAlt = Math.max(180, altitudeM);
      camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
        { lng: position[0], lat: position[1] },
        safeAlt,
      );
      camera.lookAtPoint({ lng: lookAt[0], lat: lookAt[1] });
      this.map.setFreeCameraOptions(camera);
    } catch {
      // FreeCamera unavailable — skip frame.
    }
  }

  private snapshot(): JourneyUiSnapshot {
    const band = dayAtProgress(this.path, this.progress);
    const cue = nearestCue(this.path, this.progress);
    const sample = this.path.canPlay
      ? sampleAtProgress(this.path, this.progress)
      : { distanceKm: 0, coord: [0, 0] as [number, number], bearing: 0 };

    let dayLabel = band
      ? `Day ${band.day} · ${band.label}`
      : this.path.canPlay
        ? 'Journey'
        : 'Unavailable';
    if (cue?.roleHint === 'pickup' || (this.progress < 0.02 && this.mode === 'complete')) {
      dayLabel = 'Pickup';
    } else if (cue?.roleHint === 'trailhead') {
      dayLabel = 'Trek start';
    } else if (cue?.roleHint === 'dropoff') {
      dayLabel = 'Drop-off';
    }

    return {
      progress: this.progress,
      playing: this.playing,
      interrupted: this.interrupted,
      speed: this.speed,
      distanceKm: sample.distanceKm,
      day: band?.day ?? null,
      dayLabel,
      cue,
      phase: this.phase,
      mode: this.mode,
    };
  }

  private emit(): void {
    this.onUpdate?.(this.snapshot());
  }
}
