/** Canonical customer helpline — keep in sync with Footer / Header */
export const CONTACT = {
  brand: 'Indian Treks',
  phoneDisplay: '+91-9797 972 175',
  phoneTel: '+919797972175',
  phoneWa: '919797972175',
  email: 'contact@indiantreks.com',
  hours: 'Mon–Sat, 10:00 AM – 7:00 PM IST',
} as const;

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
