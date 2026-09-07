/** Options for customer registration profile fields. */

export const GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
] as const;

export const PHONE_COUNTRY_OPTIONS = [
  { code: '+91', label: '🇮🇳 +91', flag: '🇮🇳' },
  { code: '+1', label: '🇺🇸 +1', flag: '🇺🇸' },
  { code: '+44', label: '🇬🇧 +44', flag: '🇬🇧' },
  { code: '+61', label: '🇦🇺 +61', flag: '🇦🇺' },
  { code: '+971', label: '🇦🇪 +971', flag: '🇦🇪' },
  { code: '+65', label: '🇸🇬 +65', flag: '🇸🇬' },
  { code: '+977', label: '🇳🇵 +977', flag: '🇳🇵' },
  { code: '+94', label: '🇱🇰 +94', flag: '🇱🇰' },
] as const;

export const NATIONALITY_OPTIONS = [
  'Indian',
  'American',
  'Australian',
  'British',
  'Canadian',
  'Emirati',
  'French',
  'German',
  'Nepalese',
  'Singaporean',
  'Sri Lankan',
  'Other',
] as const;
