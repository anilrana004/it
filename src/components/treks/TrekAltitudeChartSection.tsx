'use client';

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import type { RouteProfile } from '@/lib/treks/route-profile-types';
import {
  buildElevationProfile,
  formatAltitudeMeters,
  formatDistanceKm,
  nearestSampleIndex,
} from '@/lib/treks/elevation-profile-utils';
import { formatAltitude } from '@/lib/treks/route-profile-utils';
import type { MapSelection } from '@/types/trek-map';
import './trek-altitude-chart.css';

type Props = {
  profile: RouteProfile;
  selection: MapSelection;
  onSelectionChange: (selection: MapSelection) => void;
  trekTitle: string;
  onProfileFocusChange?: (distanceKm: number | null) => void;
};

function highlightDay(selection: MapSelection, profile: RouteProfile): number | null {
  if (typeof selection === 'number') return selection;
  if (selection === 'summit') {
    return profile.points.find((p) => p.activity === 'summit')?.day ?? null;
  }
  return null;
}

const VIEW = { w: 920, h: 360, pad: { top: 36, right: 24, bottom: 58, left: 62 } };

type PlotPoint = {
  x: number;
  y: number;
  distanceKm: number;
  altitudeFt: number;
  day: number;
  label: string;
  isWaypoint: boolean;
  index: number;
};

function buildPlot(profile: RouteProfile) {
  const elevation = buildElevationProfile(profile);
  if (!elevation) return null;

  const innerW = VIEW.w - VIEW.pad.left - VIEW.pad.right;
  const innerH = VIEW.h - VIEW.pad.top - VIEW.pad.bottom;
  const maxDist = elevation.totalDistanceKm || 1;
  const altPad = (elevation.maxAltitudeFt - elevation.minAltitudeFt) * 0.08 || 400;
  const minAlt = elevation.minAltitudeFt - altPad;
  const maxAlt = elevation.maxAltitudeFt + altPad;
  const altSpan = maxAlt - minAlt || 1;

  const toX = (km: number) => VIEW.pad.left + (km / maxDist) * innerW;
  const toY = (ft: number) => VIEW.pad.top + innerH - ((ft - minAlt) / altSpan) * innerH;

  const samples: PlotPoint[] = elevation.samples.map((s, index) => ({
    x: toX(s.distanceKm),
    y: toY(s.altitudeFt),
    distanceKm: s.distanceKm,
    altitudeFt: s.altitudeFt,
    day: s.day,
    label: s.label,
    isWaypoint: s.isWaypoint,
    index,
  }));

  const waypoints = samples.filter((s) => s.isWaypoint);
  const summit = samples[elevation.summitIndex];

  const linePath = samples
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');

  const areaPath = samples.length
    ? `${linePath} L ${samples[samples.length - 1].x.toFixed(2)} ${VIEW.h - VIEW.pad.bottom} L ${samples[0].x.toFixed(2)} ${VIEW.h - VIEW.pad.bottom} Z`
    : '';

  const yTicks: number[] = [];
  const step = Math.max(500, Math.ceil(altSpan / 4 / 500) * 500);
  for (let v = Math.floor(minAlt / step) * step; v <= maxAlt; v += step) {
    yTicks.push(v);
  }

  const xTicks: number[] = [];
  const xStep = maxDist <= 8 ? 1 : maxDist <= 20 ? 2 : maxDist <= 40 ? 5 : 10;
  for (let km = 0; km <= maxDist + 0.01; km += xStep) {
    xTicks.push(Number(km.toFixed(1)));
  }
  if (xTicks[xTicks.length - 1] < maxDist) xTicks.push(Number(maxDist.toFixed(1)));

  const distanceAxisMode = elevation.distanceAxisMode;
  if (distanceAxisMode === 'stage') {
    xTicks.length = 0;
    for (let i = 0; i < waypoints.length; i += 1) {
      xTicks.push(i);
    }
  }

  const dayBands = elevation.dayBands.map((band) => ({
    ...band,
    x1: toX(band.startKm),
    x2: toX(band.endKm),
  }));

  return {
    elevation,
    samples,
    waypoints,
    summit,
    linePath,
    areaPath,
    yTicks,
    xTicks,
    dayBands,
    toX,
    toY,
    minAlt,
    maxAlt,
    maxDist,
    innerH,
    distanceAxisMode,
  };
}

function distanceFromPointer(svg: SVGSVGElement, clientX: number, plot: NonNullable<ReturnType<typeof buildPlot>>) {
  const rect = svg.getBoundingClientRect();
  const scaleX = VIEW.w / rect.width;
  const svgX = (clientX - rect.left) * scaleX;
  const innerW = VIEW.w - VIEW.pad.left - VIEW.pad.right;
  const ratio = Math.max(0, Math.min(1, (svgX - VIEW.pad.left) / innerW));
  return ratio * plot.maxDist;
}

export default function TrekAltitudeChartSection({
  profile,
  selection,
  onSelectionChange,
  trekTitle,
  onProfileFocusChange,
}: Props) {
  const highlightDayNum = highlightDay(selection, profile);
  const gradientId = useId().replace(/:/g, '');
  const svgRef = useRef<SVGSVGElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [tooltipSide, setTooltipSide] = useState<'left' | 'right'>('right');

  const plot = useMemo(() => buildPlot(profile), [profile]);

  const activeWaypoint = useMemo(
    () =>
      highlightDayNum != null
        ? (plot?.waypoints.find((w) => w.day === highlightDayNum) ?? plot?.waypoints[0])
        : plot?.waypoints[0],
    [plot, highlightDayNum],
  );

  const hoverPoint = hoverIndex != null && plot ? plot.samples[hoverIndex] : null;
  const focusPoint = hoverPoint ?? activeWaypoint ?? plot?.summit ?? null;

  const updateHover = useCallback(
    (clientX: number) => {
      if (!plot || !svgRef.current) return;
      const km = distanceFromPointer(svgRef.current, clientX, plot);
      const idx = nearestSampleIndex(plot.elevation.samples, km);
      setHoverIndex(idx);

      const point = plot.samples[idx];
      if (wrapRef.current) {
        const ratio = point.x / VIEW.w;
        setTooltipSide(ratio > 0.62 ? 'left' : 'right');
      }
      onProfileFocusChange?.(km);
    },
    [onProfileFocusChange, plot],
  );

  const onPointerMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    updateHover(e.clientX);
  };

  const onPointerDown = (e: ReactPointerEvent<SVGSVGElement>) => {
    if (!plot || !svgRef.current) return;
    const km = distanceFromPointer(svgRef.current, e.clientX, plot);
    const idx = nearestSampleIndex(plot.elevation.samples, km);
    setHoverIndex(idx);
    onSelectionChange(plot.samples[idx].day);
  };

  const onPointerLeave = () => {
    setHoverIndex(null);
    onProfileFocusChange?.(null);
  };

  if (!plot) {
    return (
      <div className="kg-chart-card">
        <div className="kg-chart-head">
          <span className="kg-chart-kicker">
            <i className="fa-solid fa-chart-area" aria-hidden /> Altitude Chart
          </span>
          <h2>Elevation profile</h2>
          <p>Verified altitude data is not yet available for {trekTitle}.</p>
        </div>
        <div className="kg-elev-empty">
          <i className="fa-solid fa-mountain-sun" aria-hidden />
          <strong>Elevation data unavailable</strong>
          <p>Itinerary altitude points could not be mapped into a distance profile for this trek.</p>
        </div>
      </div>
    );
  }

  const { elevation, samples, waypoints, summit, linePath, areaPath, yTicks, xTicks, dayBands } = plot;

  return (
    <div className="kg-chart-card kg-elev-card">
      <div className="kg-chart-head">
        <span className="kg-chart-kicker">
          <i className="fa-solid fa-chart-area" aria-hidden /> Altitude Chart
        </span>
        <h2>Elevation profile</h2>
        <p>
          Distance-based altitude chart for {trekTitle}
          {elevation.hasDistanceData
            ? ' using verified trek segment distances'
            : ' — day order shown when segment distances are unavailable'}
          . Hover or drag across the profile to explore each stage.
        </p>
      </div>

      <div className="kg-chart-stats kg-elev-stats">
        <div className="kg-chart-stat">
          <strong>
            {elevation.hasDistanceData
              ? formatDistanceKm(elevation.totalDistanceKm)
              : '—'}
          </strong>
          <span>Trail distance</span>
        </div>
        <div className="kg-chart-stat">
          <strong>{formatAltitudeMeters(elevation.maxAltitudeFt)}</strong>
          <span>Highest point</span>
        </div>
        <div className="kg-chart-stat">
          <strong>+{Math.round(elevation.totalAscentFt).toLocaleString('en-IN')} ft</strong>
          <span>Total ascent</span>
        </div>
        <div className="kg-chart-stat">
          <strong>−{Math.round(elevation.totalDescentFt).toLocaleString('en-IN')} ft</strong>
          <span>Total descent</span>
        </div>
        <div className="kg-chart-stat">
          <strong>{profile.points.length} days</strong>
          <span>Duration</span>
        </div>
      </div>

      <div className="kg-elev-daybar" role="tablist" aria-label="Select day on elevation chart">
        {profile.points.map((point) => (
          <button
            key={point.day}
            type="button"
            role="tab"
            aria-selected={highlightDayNum === point.day}
            className={`kg-elev-daypill${highlightDayNum === point.day ? ' is-active' : ''}`}
            onClick={() => onSelectionChange(point.day)}
          >
            <span className="kg-elev-daypill-num">D{point.day}</span>
            <span className="kg-elev-daypill-label">{point.label}</span>
          </button>
        ))}
      </div>

      <div className="kg-chart-canvas-wrap kg-elev-canvas-wrap" ref={wrapRef}>
        <svg
          ref={svgRef}
          className="kg-chart-svg kg-elev-svg"
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-label={`Elevation profile for ${trekTitle}`}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onPointerLeave={onPointerLeave}
        >
          <defs>
            <linearGradient id={`elev-fill-${gradientId}`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#16a34a" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#16a34a" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#16a34a" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id={`elev-line-${gradientId}`} x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
            <filter id={`elev-shadow-${gradientId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#15803d" floodOpacity="0.25" />
            </filter>
          </defs>

          {yTicks.map((tick) => {
            const y = plot.toY(tick);
            return (
              <g key={tick}>
                <line
                  x1={VIEW.pad.left}
                  x2={VIEW.w - VIEW.pad.right}
                  y1={y}
                  y2={y}
                  className="kg-elev-grid"
                />
                <text x={VIEW.pad.left - 8} y={y + 4} className="kg-elev-y-label">
                  {formatAltitudeMeters(tick)}
                </text>
              </g>
            );
          })}

          {dayBands.map((band) => (
            <g key={band.day} className={`kg-elev-day-band${band.day === highlightDayNum ? ' is-active' : ''}`}>
              <rect
                x={band.x1}
                y={VIEW.pad.top}
                width={Math.max(band.x2 - band.x1, 1)}
                height={VIEW.h - VIEW.pad.top - VIEW.pad.bottom}
              />
              {band.x2 - band.x1 > 48 && (
                <text
                  x={(band.x1 + band.x2) / 2}
                  y={VIEW.pad.top + 14}
                  className="kg-elev-day-band-label"
                >
                  Day {band.day}
                </text>
              )}
            </g>
          ))}

          <line
            x1={VIEW.pad.left}
            x2={VIEW.w - VIEW.pad.right}
            y1={VIEW.h - VIEW.pad.bottom}
            y2={VIEW.h - VIEW.pad.bottom}
            className="kg-elev-axis"
          />
          <line
            x1={VIEW.pad.left}
            x2={VIEW.pad.left}
            y1={VIEW.pad.top}
            y2={VIEW.h - VIEW.pad.bottom}
            className="kg-elev-axis"
          />

          {xTicks.map((km) => {
            const x = plot.toX(km);
            return (
              <g key={km}>
                <line
                  x1={x}
                  x2={x}
                  y1={VIEW.h - VIEW.pad.bottom}
                  y2={VIEW.h - VIEW.pad.bottom + 5}
                  className="kg-elev-tick"
                />
                <text x={x} y={VIEW.h - 22} className="kg-elev-x-label">
                  {plot.distanceAxisMode === 'stage'
                    ? `D${Math.round(km) + 1}`
                    : km % 1 === 0
                      ? km
                      : km.toFixed(1)}
                </text>
              </g>
            );
          })}

          <text x={(VIEW.pad.left + VIEW.w - VIEW.pad.right) / 2} y={VIEW.h - 4} className="kg-elev-axis-title">
            {plot.distanceAxisMode === 'stage' ? 'Trek stage' : 'Distance (km)'}
          </text>
          <text
            x={16}
            y={(VIEW.pad.top + VIEW.h - VIEW.pad.bottom) / 2}
            transform={`rotate(-90 16 ${(VIEW.pad.top + VIEW.h - VIEW.pad.bottom) / 2})`}
            className="kg-elev-axis-title"
          >
            Altitude
          </text>

          {areaPath && <path d={areaPath} fill={`url(#elev-fill-${gradientId})`} className="kg-elev-area" />}
          {linePath && (
            <path
              d={linePath}
              className="kg-elev-line"
              stroke={`url(#elev-line-${gradientId})`}
              filter={`url(#elev-shadow-${gradientId})`}
            />
          )}

          {focusPoint && (
            <line
              x1={focusPoint.x}
              x2={focusPoint.x}
              y1={VIEW.pad.top}
              y2={VIEW.h - VIEW.pad.bottom}
              className="kg-elev-crosshair"
            />
          )}

          {waypoints.map((wp, wpIndex) => {
            const isActive = wp.day === highlightDayNum;
            const isSummit = wp.index === summit.index;
            const isStart = wpIndex === 0;
            const isEnd = wpIndex === waypoints.length - 1;
            return (
              <g key={`wp-${wp.day}-${wp.distanceKm}`} className="kg-elev-waypoint-group">
                {!isSummit && (
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r={isActive ? 7 : 5}
                    className={`kg-elev-waypoint${isActive ? ' is-active' : ''}`}
                    onClick={() => onSelectionChange(wp.day)}
                  />
                )}
                {isSummit && (
                  <>
                    <circle cx={wp.x} cy={wp.y} r={12} className="kg-elev-summit-ring" />
                    <circle
                      cx={wp.x}
                      cy={wp.y}
                      r={7}
                      className={`kg-elev-summit${isActive ? ' is-active' : ''}`}
                      onClick={() => onSelectionChange(wp.day)}
                    />
                    <text x={wp.x} y={wp.y - 18} className="kg-elev-summit-label">
                      <tspan className="kg-elev-summit-icon" aria-hidden>
                        ▲
                      </tspan>
                      {' '}
                      Highest · {formatAltitudeMeters(wp.altitudeFt)}
                    </text>
                  </>
                )}
                {isStart && (
                  <text x={wp.x} y={wp.y + 22} className="kg-elev-end-label">
                    Start
                  </text>
                )}
                {isEnd && !isStart && (
                  <text x={wp.x} y={wp.y + 22} className="kg-elev-end-label">
                    End
                  </text>
                )}
              </g>
            );
          })}

          {focusPoint && (
            <circle cx={focusPoint.x} cy={focusPoint.y} r={6} className="kg-elev-focus-dot" />
          )}

          <rect
            x={VIEW.pad.left}
            y={VIEW.pad.top}
            width={VIEW.w - VIEW.pad.left - VIEW.pad.right}
            height={VIEW.h - VIEW.pad.top - VIEW.pad.bottom}
            fill="transparent"
            className="kg-elev-hit"
          />
        </svg>

        {focusPoint && (
          <div
            className={`kg-elev-tooltip kg-elev-tooltip--${tooltipSide}`}
            style={{
              left: `${(focusPoint.x / VIEW.w) * 100}%`,
              top: `${(focusPoint.y / VIEW.h) * 100}%`,
            }}
            role="status"
            aria-live="polite"
          >
            <span className="kg-elev-tooltip-day">Day {focusPoint.day}</span>
            <strong className="kg-elev-tooltip-title">{focusPoint.label}</strong>
            <dl className="kg-elev-tooltip-meta">
              <div>
                <dt>{elevation.hasDistanceData ? 'Distance' : 'Stage'}</dt>
                <dd>
                  {elevation.hasDistanceData
                    ? formatDistanceKm(focusPoint.distanceKm)
                    : `Day ${focusPoint.day}`}
                </dd>
              </div>
              <div>
                <dt>Altitude</dt>
                <dd>{formatAltitudeMeters(focusPoint.altitudeFt)}</dd>
              </div>
            </dl>
          </div>
        )}
      </div>

      <div className="kg-chart-table-wrap">
        <table className="kg-chart-table kg-elev-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Location</th>
              <th>Altitude</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Δ from prev.</th>
            </tr>
          </thead>
          <tbody>
            {profile.points.map((point, index) => {
              const prev = index > 0 ? profile.points[index - 1] : null;
              const alt = point.altitudeFt;
              const prevAlt = prev?.altitudeFt;
              const delta = alt != null && prevAlt != null ? alt - prevAlt : null;
              const deltaLabel =
                delta == null
                  ? '—'
                  : delta === 0
                    ? '—'
                    : `${delta > 0 ? '+' : ''}${delta.toLocaleString('en-IN')} ft`;

              return (
                <tr
                  key={point.day}
                  className={point.day === highlightDayNum ? 'is-active' : undefined}
                  onClick={() => onSelectionChange(point.day)}
                >
                  <td>Day {point.day}</td>
                  <td>{point.label}</td>
                  <td>{point.altitudeLabel ?? formatAltitude(point.altitudeFt)}</td>
                  <td>
                    {point.distanceLabel ??
                      (point.distanceKm != null ? `${point.distanceKm} km` : '—')}
                  </td>
                  <td>{point.duration ?? '—'}</td>
                  <td
                    className={
                      delta != null && delta > 0
                        ? 'is-up'
                        : delta != null && delta < 0
                          ? 'is-down'
                          : undefined
                    }
                  >
                    {deltaLabel}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
