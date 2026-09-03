'use client';

import type { TrekMapLocation } from '@/types/trek-map';
import LocationCard from './LocationCard';

type Props = {
  location: TrekMapLocation;
  dayLabel: string;
  onClose: () => void;
  onExploreDay?: () => void;
};

export default function LocationSheet({ location, dayLabel, onClose, onExploreDay }: Props) {
  return (
    <div className="tm-location-sheet" role="presentation">
      <button type="button" className="tm-location-sheet-backdrop" onClick={onClose} aria-label="Close" />
      <LocationCard location={location} dayLabel={dayLabel} onClose={onClose} onExploreDay={onExploreDay} />
    </div>
  );
}
