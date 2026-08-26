/** Canonical customer helpline — keep in sync with Footer / Header */
export const CONTACT = {
  brand: 'Indian Treks',
  phoneDisplay: '+91-9797 972 175',
  phoneTel: '+919797972175',
  phoneWa: '919797972175',
  email: 'contact@indiantreks.com',
  fraudEmail: 'fraudalerts@indiantreks.com',
  officialSite: 'www.indiantreks.com',
  hours: 'Mon–Sat, 10:00 AM – 7:00 PM IST',
  hoursShort: 'Mon – Sat',
  hoursDetail: '10:00 AM – 7:00 PM IST',
  addressLine1: 'B-42, 2nd Floor, Tower-B, The Corenthum',
  addressLine2: 'Block A, Sector 62, Noida, Uttar Pradesh 201301',
  /** Full address string for maps / embeds */
  addressFull:
    'B-42, 2nd Floor, Tower-B, The Corenthum, Block A, Sector 62, Noida, Uttar Pradesh 201301',
  replySla: 'We reply within 24 hours',
} as const;

export function mapsUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.addressFull)}`;
}

export function mapsDirectionsUrl() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CONTACT.addressFull)}`;
}

/** iframe embed — no API key required */
export function mapsEmbedUrl() {
  return `https://maps.google.com/maps?q=${encodeURIComponent(CONTACT.addressFull)}&z=16&output=embed`;
}

export function whatsappUrl(prefill?: string) {
  const text = encodeURIComponent(
    prefill || `Hi ${CONTACT.brand}! I need help with a trek.`,
  );
  return `https://wa.me/${CONTACT.phoneWa}?text=${text}`;
}

export function mailtoUrl(subject?: string, body?: string) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const q = params.toString();
  return `mailto:${CONTACT.email}${q ? `?${q}` : ''}`;
}

export function telUrl() {
  return `tel:${CONTACT.phoneTel}`;
}
