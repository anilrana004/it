/** Editorial order for the desktop hero “Popular picks” carousel. */
export const HERO_POPULAR_TREK_IDS = [
  'kedarkantha',
  'har-ki-dun',
  'kuari-pass',
  'chopta-tungnath',
  'dayara-bugyal',
  'nag-tibba',
] as const;

export const treksWhyCopy = {
  kicker: 'Why IndianTreks',
  title: 'Why Trekkers Love Trekking With Us',
  intro:
    'Operating Himalayan journeys since 2015 — safe, well-organised winter snow treks and year-round departures across Uttarakhand and beyond. Clear pricing, local ground teams, and leaders who know the trail. Snow season or summer, the same standards: small groups, registered operations, and support from enquiry to homecoming.',
} as const;

/** Shared “why us” cards — winter “Why Choose IndianTreks” points live here (not duplicated in winter accordions). */
export const treksWhyNorms = [
  {
    title: 'Since 2015',
    body: 'Years of organising Himalayan journeys — from first snow treks to high-altitude expeditions — with a strong on-ground presence in Uttarakhand.',
  },
  {
    title: 'Uttarakhand Tourism Registered',
    body: 'We operate as a registered travel and trekking company, so your booking sits on clear, accountable ground.',
  },
  {
    title: 'Experienced Trek Leaders',
    body: 'Dedicated leadership on every departure, with first-aid kits, oxygen on high sections, and clear daily briefings.',
  },
  {
    title: 'Local Ground Team',
    body: 'Experienced local teams support campsites, logistics and route decisions so the trail stays smooth when weather shifts.',
  },
  {
    title: 'Own Camps & Stay',
    body: 'Selected base-camp and accommodation facilities — neat tents, trail-ready gear, and stays planned for cold nights.',
  },
  {
    title: 'Transparent Pricing',
    body: 'Clear inclusions and no unnecessary surprises — plus transport support on our routes when the package includes it.',
  },
  {
    title: 'Pre-Trek Guidance',
    body: 'Fitness, packing and preparation tips before you leave home — especially useful for winter layers and snow days.',
  },
  {
    title: 'Group & Solo Welcome',
    body: 'Join scheduled departures or plan a private trip. From first enquiry to homecoming, our team stays a call or WhatsApp away.',
  },
] as const;
