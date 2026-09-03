'use client';

type Props = {
  location: {
    id: string;
    name: string;
    kind: string;
    elevationM?: number;
    description?: string;
    days: number[];
  };
  dayLabel: string;
  onClose: () => void;
  onExploreDay?: () => void;
};

const KIND_LABELS: Record<string, string> = {
  start: 'Start',
  end: 'End',
  trailhead: 'Trailhead',
  parking: 'Parking',
  village: 'Village',
  camp: 'Camp',
  'base-camp': 'Base camp',
  summit: 'Summit',
  pass: 'Pass',
  viewpoint: 'Viewpoint',
  water: 'Water',
  temple: 'Temple',
  lake: 'Lake',
  forest: 'Forest',
  landmark: 'Landmark',
  checkpoint: 'Checkpoint',
  rest: 'Rest stop',
  food: 'Food',
  emergency: 'Emergency',
  drive: 'Drive',
};

export default function LocationCard({ location, onClose, dayLabel, onExploreDay }: Props) {
  const elev =
    location.elevationM != null
      ? `${Math.round(location.elevationM).toLocaleString('en-IN')} m`
      : null;

  return (
    <div className="tm-location-card" role="dialog" aria-label={`${location.name} details`}>
      <button
        type="button"
        className="tm-location-card-close"
        onClick={onClose}
        aria-label="Close location details"
      >
        <i className="fa-solid fa-xmark" aria-hidden />
      </button>
      <div className="tm-location-card-head">
        <span className="tm-location-card-type">{KIND_LABELS[location.kind] ?? location.kind}</span>
        <h3>{location.name}</h3>
        <p className="tm-location-card-meta">
          {dayLabel}
          {elev ? ` · ${elev}` : ''}
        </p>
      </div>
      {location.description && <p className="tm-location-card-desc">{location.description}</p>}
      {onExploreDay && (
        <button type="button" className="tm-location-card-action" onClick={onExploreDay}>
          Explore day
        </button>
      )}
    </div>
  );
}
