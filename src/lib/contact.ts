/** Canonical Indian Treks contact — single source for Footer, Header, Contact page, and CTAs */

export type ContactPhone = {
  label: string;
  display: string;
  tel: string;
  wa: string;
};

export type ContactOffice = {
  id: string;
  label: string;
  line1: string;
  line2: string;
  mapQuery: string;
};

export type ContactWhatsAppChannel = {
  url: string;
  label: string;
  wa?: string;
};

export const CONTACT = {
  brand: 'Indian Treks',

  offices: [
    {
      id: 'dehradun',
      label: 'Dehradun Office',
      line1: 'Kargi Chowk, Narayan Vihar',
      line2: 'Dehradun, Uttarakhand',
      mapQuery: 'Kargi Chowk Narayan Vihar Dehradun Uttarakhand',
    },
    {
      id: 'uttarkashi',
      label: 'Uttarkashi Office',
      line1: 'Sankari Mori',
      line2: 'Uttarkashi, Uttarakhand',
      mapQuery: 'Sankari Mori Uttarkashi Uttarakhand',
    },
  ] as const satisfies readonly ContactOffice[],

  phones: {
    booking: [
      {
        label: 'Booking',
        display: '+91 73009 00108',
        tel: '+917300900108',
        wa: '917300900108',
      },
      {
        label: 'Booking',
        display: '+91 73109 54451',
        tel: '+917310954451',
        wa: '917300900108',
      },
    ] as const satisfies readonly ContactPhone[],
    support: {
      label: 'Support',
      display: '+91 73009 00108',
      tel: '+917300900108',
      wa: '917300900108',
    } satisfies ContactPhone,
  },

  /** Primary booking line — used by legacy callouts and default CTAs */
  phoneDisplay: '+91 73009 00108',
  phoneTel: '+917300900108',
  phoneWa: '917300900108',

  emails: {
    primary: 'info@indiantreks.in',
    vivek: 'vivekindiantreks@gmail.com',
    explore: 'exploreindiantreks@gmail.com',
  },
  /** Primary public inbox */
  email: 'info@indiantreks.in',
  fraudEmail: 'info@indiantreks.in',

  whatsapp: {
    vivek: {
      url: 'https://wa.me/917300900108',
      label: 'Message Vivek Rana (Indian Treks)',
      wa: '917300900108',
    },
    business: {
      url: 'https://wa.me/917300900108',
      label: 'Indian Treks on WhatsApp',
      wa: '917300900108',
    },
    support: {
      url: 'https://wa.me/917300900108',
      label: 'Indian Treks Support',
      wa: '917300900108',
    },
  } as const satisfies Record<string, ContactWhatsAppChannel>,

  social: {
    youtube: 'https://youtube.com/@indiantreks4009',
    facebook: 'https://www.facebook.com/share/1Ee7Tgy37s/',
    instagram: 'https://www.instagram.com/indiantreks',
    linkedin: 'https://www.linkedin.com/in/indian-treks-b94606239',
    quora: 'https://www.quora.com/profile/Indiantreks',
  },

  officialSite: 'www.indiantreks.in',
  hours: 'Mon–Sat, 10:00 AM – 7:00 PM IST',
  hoursShort: 'Mon – Sat',
  hoursDetail: '10:00 AM – 7:00 PM IST',
  replySla: 'We reply within 24 hours',

  /** Primary office — backward compatible address fields */
  addressLine1: 'Kargi Chowk, Narayan Vihar',
  addressLine2: 'Dehradun, Uttarakhand',
  addressFull: 'Kargi Chowk, Narayan Vihar, Dehradun, Uttarakhand',

  /** Public Google Business profile — used on reviews page for verification links */
  googleReviews: {
    rating: 4.8,
    ratingDisplay: '4.8',
    countDisplay: '3,200+',
    travellersDisplay: '50K+',
    mapsQuery: 'Indian Treks Kargi Chowk Dehradun Uttarakhand',
  },
} as const;

export const SOCIAL_LINKS = [
  { id: 'instagram', label: 'Instagram', href: CONTACT.social.instagram },
  { id: 'facebook', label: 'Facebook', href: CONTACT.social.facebook },
  { id: 'youtube', label: 'YouTube', href: CONTACT.social.youtube },
  { id: 'linkedin', label: 'LinkedIn', href: CONTACT.social.linkedin },
  { id: 'quora', label: 'Quora', href: CONTACT.social.quora },
] as const;

const primaryOffice = CONTACT.offices[0];

export function mapsUrl(office: ContactOffice = primaryOffice) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapQuery)}`;
}

export function mapsDirectionsUrl(office: ContactOffice = primaryOffice) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.mapQuery)}`;
}

/** iframe embed — no API key required */
export function mapsEmbedUrl(office: ContactOffice = primaryOffice) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(office.mapQuery)}&z=15&output=embed`;
}

/** Opens Indian Treks on Google Maps — travellers can read and verify public reviews */
export function googleReviewsVerifyUrl() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT.googleReviews.mapsQuery)}`;
}

/** Same listing — Google shows the “Write a review” action on the business profile */
export function googleWriteReviewUrl() {
  return googleReviewsVerifyUrl();
}

/** Default booking WhatsApp with optional prefill text */
export function whatsappUrl(prefill?: string) {
  const text = encodeURIComponent(
    prefill || `Hi ${CONTACT.brand}! I need help with a trek.`,
  );
  return `https://wa.me/${CONTACT.phoneWa}?text=${text}`;
}

/** Fixed WhatsApp deep links (Vivek, business inbox, support) */
export function whatsappChannelUrl(
  channel: keyof typeof CONTACT.whatsapp,
  prefill?: string,
) {
  const entry = CONTACT.whatsapp[channel];
  if (!prefill || !('wa' in entry) || !entry.wa) return entry.url;
  return `https://wa.me/${entry.wa}?text=${encodeURIComponent(prefill)}`;
}

export function mailtoUrl(subject?: string, body?: string, email?: string) {
  const target = email ?? CONTACT.email;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const q = params.toString();
  return `mailto:${target}${q ? `?${q}` : ''}`;
}

export function telUrl(phone?: string) {
  return `tel:${phone ?? CONTACT.phoneTel}`;
}

export function allPhones(): ContactPhone[] {
  return [...CONTACT.phones.booking, CONTACT.phones.support];
}

export function allEmails(): { label: string; address: string }[] {
  return [
    { label: 'General enquiries', address: CONTACT.emails.primary },
    { label: 'Vivek Rana', address: CONTACT.emails.vivek },
    { label: 'Explore & bookings', address: CONTACT.emails.explore },
  ];
}
