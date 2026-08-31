import type { TrekPolicyRows } from '@/lib/content/treks/types';

export const KEDARKANTHA_BOOKING_POLICY_ROWS: TrekPolicyRows = [
  ['Pickup Time', '7:30 to 8:00 AM from Dehradun Railway Station'],
  ['Drop Time', '7:30 to 8:00 PM at Dehradun Railway Station'],
  ['Pickup & Drop', 'Dehradun Railway Station — Tempo Traveller or similar'],
  ['Food', 'All meals provided by Indian Treks as per itinerary'],
  ['Booking Confirmation', 'Seat confirmed after advance payment is received'],
  ['Balance Payment', 'Remaining amount before departure as instructed by the team'],
  ['ID Requirement', 'Valid government photo ID mandatory for forest permits'],
  ['Operational Changes', 'Itinerary may adjust for weather, road, or safety reasons'],
];

export const KEDARKANTHA_CANCELLATION_POLICY_ROWS: TrekPolicyRows = [
  ['30+ days before departure', '5% deduction; 100% cash voucher (1 year) or transfer to a friend'],
  ['20 to 10 days before', '30% deduction; 100% voucher for same or any trek (1 year)'],
  ['10 to 1 days before', '50% deduction; 100% voucher same trek or 50% any trek (1 year)'],
  ['Less than 5 days before', 'Full trek cost non-refundable; 20% voucher for same trek (1 year)'],
  [
    'Cancellation by Indian Treks',
    'Full trek fee voucher (1 year) if trip cancelled due to weather, landslides, curfew, or force majeure',
  ],
  ['Trek shifting', 'Alternative safer trek offered; cost difference as voucher — no cash refunds'],
  ['Bag offloading', '₹300/day online (₹1,200 at base camp); max 10 kg per bag'],
];
