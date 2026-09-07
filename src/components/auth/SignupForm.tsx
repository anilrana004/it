'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronDown, Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthShell from '@/components/auth/AuthShell';
import { USER_TOKEN_STORAGE_KEY } from '@/lib/user-auth/constants';
import {
  GENDER_OPTIONS,
  NATIONALITY_OPTIONS,
  PHONE_COUNTRY_OPTIONS,
} from '@/lib/user-auth/register-options';
import { formatDobInput } from '@/lib/user-auth/validation';

const inputClass =
  'w-full rounded border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#16a34a] focus:ring-1 focus:ring-[#16a34a]';

function RequiredLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-900">
      {children} <span className="text-red-500">*</span>
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

export default function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCountryCode: '+91',
    phone: '',
    dateOfBirth: '',
    gender: '',
    nationality: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onDobChange = (raw: string) => {
    set('dateOfBirth', formatDobInput(raw));
    if (fieldErrors.dateOfBirth) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.dateOfBirth;
        return next;
      });
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);
    try {
      const res = await fetch('/api/user/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form),
      });
      const body = (await res.json()) as {
        error?: string;
        fieldErrors?: Record<string, string>;
        token?: string;
      };
      if (!res.ok) {
        if (body.fieldErrors) setFieldErrors(body.fieldErrors);
        setError(body.error || 'Unable to create account.');
        return;
      }
      if (body.token) {
        try {
          sessionStorage.setItem(USER_TOKEN_STORAGE_KEY, body.token);
        } catch {
          // ignore
        }
      }
      router.push('/user-dashboard');
      router.refresh();
    } catch {
      setError('Unable to connect. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell title="New to Indian Treks? Register" titleInsideCard tagline="Treks that transform lives">
      <form onSubmit={onSubmit} className="space-y-4">
        {error ? (
          <div className="rounded border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        ) : null}

        <div>
          <RequiredLabel htmlFor="firstName">First name</RequiredLabel>
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            value={form.firstName}
            onChange={(e) => set('firstName', e.target.value)}
            className={inputClass}
            required
          />
          <FieldError message={fieldErrors.firstName} />
        </div>

        <div>
          <RequiredLabel htmlFor="lastName">Last name</RequiredLabel>
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            value={form.lastName}
            onChange={(e) => set('lastName', e.target.value)}
            className={inputClass}
            required
          />
          <FieldError message={fieldErrors.lastName} />
        </div>

        <div>
          <RequiredLabel htmlFor="email">Email</RequiredLabel>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className={inputClass}
            required
          />
          <FieldError message={fieldErrors.email} />
        </div>

        <div>
          <RequiredLabel htmlFor="phone">Phone Number</RequiredLabel>
          <div className="flex gap-2">
            <div className="relative w-[118px] shrink-0">
              <select
                id="phoneCountryCode"
                aria-label="Country code"
                value={form.phoneCountryCode}
                onChange={(e) => set('phoneCountryCode', e.target.value)}
                className={`${inputClass} appearance-none pr-8`}
              >
                {PHONE_COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.code} value={opt.code}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            </div>
            <input
              id="phone"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className={inputClass}
              placeholder="9876543210"
              required
            />
          </div>
          <FieldError message={fieldErrors.phone || fieldErrors.phoneCountryCode} />
        </div>

        <div>
          <RequiredLabel htmlFor="dateOfBirth">Date of birth</RequiredLabel>
          <input
            id="dateOfBirth"
            type="text"
            inputMode="numeric"
            autoComplete="bday"
            value={form.dateOfBirth}
            onChange={(e) => onDobChange(e.target.value)}
            className={inputClass}
            placeholder="dd/mm/yyyy"
            maxLength={10}
            required
          />
          <p className="mt-1 text-xs text-slate-500">Type digits only — slashes are added automatically.</p>
          <FieldError message={fieldErrors.dateOfBirth} />
        </div>

        <div>
          <RequiredLabel htmlFor="gender">Gender</RequiredLabel>
          <div className="relative">
            <select
              id="gender"
              value={form.gender}
              onChange={(e) => set('gender', e.target.value)}
              className={`${inputClass} appearance-none pr-10`}
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              {GENDER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <FieldError message={fieldErrors.gender} />
        </div>

        <div>
          <RequiredLabel htmlFor="nationality">Nationality</RequiredLabel>
          <div className="relative">
            <select
              id="nationality"
              value={form.nationality}
              onChange={(e) => set('nationality', e.target.value)}
              className={`${inputClass} appearance-none pr-10`}
              required
            >
              <option value="" disabled>
                Select nationality
              </option>
              {NATIONALITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          <FieldError message={fieldErrors.nationality} />
        </div>

        <div>
          <RequiredLabel htmlFor="password">Password</RequiredLabel>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => set('password', e.target.value)}
              className={`${inputClass} pr-11`}
              placeholder="At least 8 characters"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <FieldError message={fieldErrors.password} />
        </div>

        <div>
          <RequiredLabel htmlFor="confirmPassword">Confirm password</RequiredLabel>
          <div className="relative">
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(e) => set('confirmPassword', e.target.value)}
              className={`${inputClass} pr-11`}
              placeholder="Re-enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <FieldError message={fieldErrors.confirmPassword} />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded bg-[#16a34a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#15803d] disabled:opacity-60"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          Create Account
        </button>

        <p className="pt-1 text-center text-sm">
          <Link href="/login" className="font-medium text-[#2563eb] hover:underline">
            « Back to Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
