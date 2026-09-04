'use client';

import { useCallback, useRef, useState } from 'react';
import type { TrekMapElevationSample } from '@/types/trek-map';

type Props = {
  samples: TrekMapElevationSample[];
  totalDistanceKm: number | null;
  focusKm: number | null;
  onFocusChange?: (km: number | null) => void;
};

export default function ElevationProfile({
  samples,
  totalDistanceKm,
  focusKm,
  onFocusChange,
}: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverKm, setHoverKm] = useState<number | null>(null);

  const validSamples = samples.filter((s) => s.elevationM > 0);
  const maxDist = totalDistanceKm;
  const hasProfile = validSamples.length >= 2 && Boolean(maxDist);

  const handlePointer = useCallback(
    (clientX: number) => {
      if (!maxDist) return;
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const km = ratio * maxDist;
      setHoverKm(km);
      onFocusChange?.(km);
    },
    [maxDist, onFocusChange],
  );

  if (!hasProfile || !maxDist) {
    return (
      <div className="tm-elevation tm-elevation--empty" aria-live="polite">
        Elevation profile will appear when verified route data is available.
      </div>
    );
  }

  const minElev = Math.min(...validSamples.map((s) => s.elevationM));
  const maxElev = Math.max(...validSamples.map((s) => s.elevationM));
  const elevRange = maxElev - minElev || 100;

  const w = 800;
  const h = 120;
  const pad = { l: 8, r: 8, t: 12, b: 8 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;

  const points = validSamples.map((s, i) => {
    const x = pad.l + (s.distanceKm / maxDist) * innerW;
    const y = pad.t + innerH - ((s.elevationM - minElev) / elevRange) * innerH;
    return { x, y, ...s, index: i };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');

  const activeKm = hoverKm ?? focusKm;
  const activePoint =
    activeKm != null
      ? points.reduce((best, p) =>
          Math.abs(p.distanceKm - activeKm) < Math.abs(best.distanceKm - activeKm) ? p : best,
        points[0])
      : null;

  return (
    <div className="tm-elevation" aria-label="Elevation profile">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${h}`}
        className="tm-elevation-svg"
        role="img"
        aria-label="Elevation along route"
        onPointerMove={(e) => handlePointer(e.clientX)}
        onPointerLeave={() => setHoverKm(null)}
        onPointerDown={(e) => handlePointer(e.clientX)}
      >
        <defs>
          <linearGradient id="tm-elev-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d={`${pathD} L ${points.at(-1)!.x} ${h - pad.b} L ${pad.l} ${h - pad.b} Z`} fill="url(#tm-elev-fill)" />
        <path d={pathD} fill="none" stroke="#4ade80" strokeWidth="2" />
        {activePoint && (
          <circle cx={activePoint.x} cy={activePoint.y} r="5" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
        )}
      </svg>
      {activePoint && (
        <div className="tm-elevation-readout" aria-live="polite">
          {activePoint.distanceKm.toFixed(1)} km · {Math.round(activePoint.elevationM).toLocaleString('en-IN')} m
        </div>
      )}
    </div>
  );
}
