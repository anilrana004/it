'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import type { PublicUser } from '@/lib/user-auth/types';
import { GENDER_OPTIONS } from '@/lib/user-auth/register-options';

export default function ProfilePage() {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/user/auth/me', { credentials: 'include', cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) return;
        const body = (await res.json()) as { user: PublicUser };
        setUser(body.user);
        setName(body.user.name);
        setPhone(body.user.phone || '');
      })
      .catch(() => undefined);
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ name, phone }),
      });
      const body = (await res.json()) as { error?: string; user?: PublicUser };
      if (!res.ok) {
        setError(body.error || 'Unable to update profile.');
        return;
      }
      if (body.user) setUser(body.user);
      setMessage('Profile updated.');
    } catch {
      setError('Unable to connect.');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <p className="text-sm text-slate-500">Loading profile…</p>;
  }

  const genderLabel =
    GENDER_OPTIONS.find((g) => g.value === user.gender)?.label || user.gender || '—';

  return (
    <div className="max-w-lg space-y-4">
      <div className="rounded-2xl border border-[#d8e8dc] bg-white p-5 sm:p-6">
        <h2 className="mb-4 text-lg font-bold text-slate-900">Profile</h2>
        <dl className="mb-6 grid gap-3 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">First name</dt>
            <dd className="font-medium text-slate-900">{user.firstName || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Last name</dt>
            <dd className="font-medium text-slate-900">{user.lastName || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Date of birth</dt>
            <dd className="font-medium text-slate-900">{user.dateOfBirth || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Gender</dt>
            <dd className="font-medium text-slate-900">{genderLabel}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Nationality</dt>
            <dd className="font-medium text-slate-900">{user.nationality || '—'}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Phone code</dt>
            <dd className="font-medium text-slate-900">{user.phoneCountryCode || '—'}</dd>
          </div>
        </dl>

        <form onSubmit={onSubmit} className="space-y-4">
          {error ? <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
          {message ? (
            <div className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">{message}</div>
          ) : null}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              value={user.email}
              disabled
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-500"
            />
          </div>
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-slate-700">
              Display name
            </label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#16a34a]"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-[#16a34a]"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-full bg-[#16a34a] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#15803d] disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
