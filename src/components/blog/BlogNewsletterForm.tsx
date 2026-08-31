'use client';

import { useState } from 'react';
import { publicApiFetch, publicApiErrorMessage } from '@/lib/api/client';

export default function BlogNewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = new FormData(form).get('email');
    if (!email || typeof email !== 'string') return;

    setStatus('loading');
    try {
      const res = await publicApiFetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'done' : 'error');
      if (res.ok) form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <span className="sr-only">Name</span>
        <input type="text" name="name" placeholder="Enter Your Name" autoComplete="name" />
      </label>
      <label>
        <span className="sr-only">Email</span>
        <input
          type="email"
          name="email"
          placeholder="Enter Email id*"
          required
          autoComplete="email"
        />
      </label>
      <button className="btn" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing…' : status === 'done' ? 'Subscribed!' : 'Subscribe'}
      </button>
      {status === 'error' ? (
        <p className="newsletter-box__note">Something went wrong. Please try again.</p>
      ) : null}
    </form>
  );
}
