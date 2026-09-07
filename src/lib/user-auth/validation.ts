import { GENDER_OPTIONS, NATIONALITY_OPTIONS, PHONE_COUNTRY_OPTIONS } from '@/lib/user-auth/register-options';
import type { RegisterUserInput } from '@/lib/user-auth/types';

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]{6,15}$/;
const DOB_RE = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

const GENDER_VALUES = new Set(GENDER_OPTIONS.map((o) => o.value));
const NATIONALITY_VALUES = new Set(NATIONALITY_OPTIONS.map((o) => o));
const COUNTRY_CODES = new Set(PHONE_COUNTRY_OPTIONS.map((o) => o.code));

export function validateEmail(email: string): string | null {
  const value = email.trim();
  if (!value) return 'Email is required.';
  if (!EMAIL_RE.test(value)) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must include at least one letter and one number.';
  }
  return null;
}

export function validateName(name: string): string | null {
  const value = name.trim();
  if (!value) return 'Name is required.';
  if (value.length < 2) return 'Name must be at least 2 characters.';
  return null;
}

function validatePersonName(value: string, label: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return `${label} is required.`;
  if (trimmed.length < 1) return `${label} is required.`;
  if (!/^[A-Za-z][A-Za-z .'-]{0,48}$/.test(trimmed)) {
    return `${label} should use letters only.`;
  }
  return null;
}

/** Normalize DOB input to dd/mm/yyyy (accepts 04032004 or 04/03/2004). */
export function normalizeDateOfBirth(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length === 8) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
  }
  const trimmed = value.trim();
  if (DOB_RE.test(trimmed)) return trimmed;
  return trimmed;
}

/** Format DOB while typing: inserts / after day and month. */
export function formatDobInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

function validateDateOfBirth(value: string): string | null {
  const trimmed = normalizeDateOfBirth(value);
  if (!trimmed) return 'Date of birth is required.';
  if (!DOB_RE.test(trimmed)) return 'Use date format dd/mm/yyyy.';

  const [dd, mm, yyyy] = trimmed.split('/').map(Number);
  const date = new Date(yyyy!, mm! - 1, dd!);
  if (
    date.getFullYear() !== yyyy ||
    date.getMonth() !== mm! - 1 ||
    date.getDate() !== dd
  ) {
    return 'Enter a valid date of birth.';
  }

  const now = new Date();
  let age = now.getFullYear() - yyyy!;
  const hadBirthday =
    now.getMonth() > date.getMonth() ||
    (now.getMonth() === date.getMonth() && now.getDate() >= date.getDate());
  if (!hadBirthday) age -= 1;
  if (age < 10) return 'You must be at least 10 years old to register.';
  if (age > 100) return 'Enter a valid date of birth.';
  return null;
}

export function validateLoginBody(body: unknown): {
  data?: { email: string; password: string };
  fieldErrors?: FieldErrors;
} {
  const record = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const email = typeof record.email === 'string' ? record.email : '';
  const password = typeof record.password === 'string' ? record.password : '';
  const fieldErrors: FieldErrors = {};
  const emailErr = validateEmail(email);
  const passwordErr = !password ? 'Password is required.' : null;
  if (emailErr) fieldErrors.email = emailErr;
  if (passwordErr) fieldErrors.password = passwordErr;
  if (Object.keys(fieldErrors).length) return { fieldErrors };
  return { data: { email: email.trim().toLowerCase(), password } };
}

export function validateRegisterBody(body: unknown): {
  data?: RegisterUserInput;
  fieldErrors?: FieldErrors;
} {
  const record = (body && typeof body === 'object' ? body : {}) as Record<string, unknown>;
  const firstName = typeof record.firstName === 'string' ? record.firstName : '';
  const lastName = typeof record.lastName === 'string' ? record.lastName : '';
  const email = typeof record.email === 'string' ? record.email : '';
  const phone = typeof record.phone === 'string' ? record.phone : '';
  const phoneCountryCode =
    typeof record.phoneCountryCode === 'string' ? record.phoneCountryCode : '+91';
  const dateOfBirth = typeof record.dateOfBirth === 'string' ? record.dateOfBirth : '';
  const gender = typeof record.gender === 'string' ? record.gender : '';
  const nationality = typeof record.nationality === 'string' ? record.nationality : '';
  const password = typeof record.password === 'string' ? record.password : '';
  const confirmPassword = typeof record.confirmPassword === 'string' ? record.confirmPassword : '';

  const fieldErrors: FieldErrors = {};
  const firstErr = validatePersonName(firstName, 'First name');
  const lastErr = validatePersonName(lastName, 'Last name');
  const emailErr = validateEmail(email);
  const passwordErr = validatePassword(password);
  const normalizedDob = normalizeDateOfBirth(dateOfBirth);
  const dobErr = validateDateOfBirth(normalizedDob);

  const phoneDigits = phone.replace(/[\s-]/g, '');
  if (!phoneDigits) fieldErrors.phone = 'Phone number is required.';
  else if (!PHONE_RE.test(phoneDigits)) fieldErrors.phone = 'Enter a valid phone number.';

  if (!COUNTRY_CODES.has(phoneCountryCode as (typeof PHONE_COUNTRY_OPTIONS)[number]['code'])) {
    fieldErrors.phoneCountryCode = 'Select a valid country code.';
  }
  if (!gender || !GENDER_VALUES.has(gender as (typeof GENDER_OPTIONS)[number]['value'])) {
    fieldErrors.gender = 'Select your gender.';
  }
  if (!nationality || !NATIONALITY_VALUES.has(nationality as (typeof NATIONALITY_OPTIONS)[number])) {
    fieldErrors.nationality = 'Select your nationality.';
  }
  if (!confirmPassword) {
    fieldErrors.confirmPassword = 'Confirm your password.';
  } else if (password !== confirmPassword) {
    fieldErrors.confirmPassword = 'Passwords do not match.';
  }

  if (firstErr) fieldErrors.firstName = firstErr;
  if (lastErr) fieldErrors.lastName = lastErr;
  if (emailErr) fieldErrors.email = emailErr;
  if (passwordErr) fieldErrors.password = passwordErr;
  if (dobErr) fieldErrors.dateOfBirth = dobErr;

  if (Object.keys(fieldErrors).length) return { fieldErrors };

  return {
    data: {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      phone: phoneDigits,
      phoneCountryCode,
      dateOfBirth: normalizedDob,
      gender,
      nationality,
      password,
    },
  };
}
