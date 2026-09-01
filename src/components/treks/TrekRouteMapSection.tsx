'use client';

import { useMemo } from 'react';
import type { RouteProfile } from '@/lib/treks/route-profile-types';
import { getTrekGeography } from '@/lib/treks/geography/get-trek-geography';
import {
  activityIcon,
  activityLabel,
  formatAltitude,
  formatDistance,
} from '@/lib/treks/route-profile-utils';
import TrekRouteMapbox from '@/components/treks/TrekRouteMapbox';

type Props = {
  trekId: string;
  profile: RouteProfile;
  activeDay: number;
  onDayChange: (day: number) => void;
  kindLabel: string;
  trekTitle: string;
};

export default function TrekRouteMapSection({
  trekId,
  profile,
  activeDay,
  onDayChange,
  kindLabel,
  trekTitle,
}: Props) {
  const geography = useMemo(() => getTrekGeography(trekId, profile), [trekId, profile]);

  const activePoint = useMemo(
    () => profile.points.find((p) => p.day === activeDay) ?? profile.points[0],
    [profile.points, activeDay],
  );

  return (
    <div className="kg-route-card">
      <div className="kg-route-head">
        <span className="kg-route-kicker">
          <i className="fa-solid fa-map-location-dot" aria-hidden /> Route Map
        </span>
                <h2>Itinerary route map</h2>
                <p>
                  {geography?.caption ??
                    profile.mapCaption ??
                    `Day-by-day route for ${trekTitle} — select a day to highlight that leg of the itinerary.`}
                </p>
      </div>

      <div className="kg-route-stats">
        <div className="kg-route-stat">
          <strong>{profile.points.length}</strong>
          <span>Day stops</span>
        </div>
        <div className="kg-route-stat">
          <strong>{formatAltitude(profile.maxAltitudeFt)}</strong>
          <span>Max altitude</span>
        </div>
        <div className="kg-route-stat">
          <strong>
            {profile.totalDistanceKm != null
              ? `${profile.totalDistanceKm.toLocaleString('en-IN')} km`
              : '—'}
          </strong>
          <span>Trail distance</span>
        </div>
        <div className="kg-route-stat">
          <strong>{formatAltitude(profile.totalGainFt)}</strong>
          <span>Elevation gain</span>
        </div>
      </div>

      <div className="kg-route-daybar" role="tablist" aria-label="Select day on map">
        {profile.points.map((point) => (
          <button
            key={point.day}
            type="button"
            role="tab"
            aria-selected={activeDay === point.day}
            className={`kg-route-daypill${activeDay === point.day ? ' is-active' : ''}`}
            onClick={() => onDayChange(point.day)}
          >
            <span className="kg-route-daypill-num">D{point.day}</span>
            <span className="kg-route-daypill-label">{point.label}</span>
          </button>
        ))}
      </div>

      <div className="kg-route-body">
        {geography ? (
          <TrekRouteMapbox
            geography={geography}
            profile={profile}
            activeDay={activeDay}
            onDayChange={onDayChange}
            trekTitle={trekTitle}
            kindLabel={kindLabel}
          />
        ) : (
          <div className="kg-map-unavailable">
            <i className="fa-solid fa-map" aria-hidden />
            <strong>Geographic route data unavailable</strong>
            <p>
              Verified coordinates for this {kindLabel.toLowerCase()} are not yet mapped. Itinerary
              and altitude chart remain available below.
            </p>
          </div>
        )}

        {activePoint && (
          <aside className="kg-route-detail" aria-live="polite">
            <div className="kg-route-detail-head">
              <span className="kg-route-detail-day">Day {activePoint.day}</span>
              <h3>{activePoint.label}</h3>
              <p className="kg-route-detail-title">{activePoint.title}</p>
            </div>

            <div className="kg-route-detail-grid">
              <div className="kg-route-detail-item">
                <i className={activityIcon(activePoint.activity)} aria-hidden />
                <div>
                  <strong>Activity</strong>
                  <span>{activityLabel(activePoint.activity)}</span>
                </div>
              </div>
              <div className="kg-route-detail-item">
                <i className="fa-solid fa-mountain" aria-hidden />
                <div>
                  <strong>Altitude</strong>
                  <span>{activePoint.altitudeLabel ?? formatAltitude(activePoint.altitudeFt)}</span>
                </div>
              </div>
              <div className="kg-route-detail-item">
                <i className="fa-solid fa-route" aria-hidden />
                <div>
                  <strong>Distance</strong>
                  <span>{formatDistance(activePoint.distanceKm, activePoint.distanceLabel)}</span>
                </div>
              </div>
              <div className="kg-route-detail-item">
                <i className="fa-solid fa-clock" aria-hidden />
                <div>
                  <strong>Duration</strong>
                  <span>{activePoint.duration ?? '—'}</span>
                </div>
              </div>
              <div className="kg-route-detail-item">
                <i className="fa-solid fa-utensils" aria-hidden />
                <div>
                  <strong>Meals</strong>
                  <span>{activePoint.meals ?? '—'}</span>
                </div>
              </div>
              <div className="kg-route-detail-item">
                <i className="fa-solid fa-map-pin" aria-hidden />
                <div>
                  <strong>{kindLabel} segment</strong>
                  <span>
                    {activePoint.day} of {profile.points.length}
                  </span>
                </div>
              </div>
            </div>

            {activePoint.description && (
              <div className="kg-route-detail-copy">
                {activePoint.description.split(/\n{2,}/).slice(0, 2).map((part) => (
                  <p key={part.slice(0, 48)}>{part}</p>
                ))}
              </div>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
