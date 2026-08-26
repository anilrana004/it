'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { Check, Copy, Gift } from 'lucide-react';

const DEFAULT_AMOUNTS = [1000, 2500, 5000, 10000, 15000, 25000];

export default function GiftPurchasePanel({ amounts = DEFAULT_AMOUNTS }: { amounts?: number[] }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState({
    amount: amounts[2] ?? 5000,
    recipientName: '',
    recipientEmail: '',
    message: '',
    senderName: '',
  });
  const [code, setCode] = useState('');

  const handlePurchase = (e: FormEvent) => {
    e.preventDefault();
    const generated = `TR${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    setCode(generated);
    setStep(3);
  };

  return (
    <section className="it-corp__section" id="gift-purchase">
      <div className="it-corp__container">
        <div className="it-corp__heading it-corp__heading--center">
          <p className="it-corp__kicker">Buy now</p>
          <h2>Get an Indian Treks Travel Gift Card</h2>
          <p>Choose an amount, add a message, and send an e-gift in minutes.</p>
        </div>

        {step === 1 ? (
          <div className="it-corp__gift-start">
            <div className="it-corp__gift-amounts">
              {amounts.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`it-corp__gift-amount${form.amount === a ? ' is-active' : ''}`}
                  onClick={() => setForm((f) => ({ ...f, amount: a }))}
                >
                  ₹{a.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="it-corp__btn it-corp__btn--primary"
              onClick={() => setStep(2)}
            >
              <Gift size={16} /> Continue · ₹{form.amount.toLocaleString('en-IN')}
            </button>
          </div>
        ) : null}

        {step === 2 ? (
          <form className="it-corp__form it-corp__gift-form" onSubmit={handlePurchase}>
            <button type="button" className="it-corp__gift-back" onClick={() => setStep(1)}>
              ← Back
            </button>
            <div className="it-corp__form-row">
              <div className="it-corp__field">
                <label htmlFor="gift-recipient">Recipient name *</label>
                <input
                  id="gift-recipient"
                  required
                  value={form.recipientName}
                  onChange={(e) => setForm((f) => ({ ...f, recipientName: e.target.value }))}
                />
              </div>
              <div className="it-corp__field">
                <label htmlFor="gift-email">Recipient email *</label>
                <input
                  id="gift-email"
                  type="email"
                  required
                  value={form.recipientEmail}
                  onChange={(e) => setForm((f) => ({ ...f, recipientEmail: e.target.value }))}
                />
              </div>
            </div>
            <div className="it-corp__field">
              <label htmlFor="gift-sender">Your name *</label>
              <input
                id="gift-sender"
                required
                value={form.senderName}
                onChange={(e) => setForm((f) => ({ ...f, senderName: e.target.value }))}
              />
            </div>
            <div className="it-corp__field">
              <label htmlFor="gift-msg">Message (optional)</label>
              <textarea
                id="gift-msg"
                rows={3}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                placeholder="Write a short note…"
              />
            </div>
            <div className="it-corp__gift-preview">
              <p className="it-corp__gift-preview-label">Preview</p>
              <strong>₹{form.amount.toLocaleString('en-IN')}</strong>
              <span>Indian Treks Travel Gift Card</span>
              {form.message ? <em>“{form.message}”</em> : null}
              <span>From: {form.senderName || 'You'}</span>
            </div>
            <button type="submit" className="it-corp__btn it-corp__btn--primary">
              Purchase · ₹{form.amount.toLocaleString('en-IN')}
            </button>
          </form>
        ) : null}

        {step === 3 ? (
          <div className="it-corp__success it-corp__gift-success">
            <Check size={36} color="#16a34a" />
            <h3>Gift card ready</h3>
            <p>E-gift details for {form.recipientEmail}</p>
            <div className="it-corp__gift-code">
              <span>{code}</span>
              <button
                type="button"
                aria-label="Copy code"
                onClick={() => navigator.clipboard.writeText(code)}
              >
                <Copy size={16} />
              </button>
            </div>
            <p>₹{form.amount.toLocaleString('en-IN')} · Valid 1 year</p>
            <div className="it-corp__trek-foot">
              <button
                type="button"
                className="it-corp__btn it-corp__btn--primary"
                onClick={() => {
                  setStep(1);
                  setCode('');
                  setForm({
                    amount: amounts[2] ?? 5000,
                    recipientName: '',
                    recipientEmail: '',
                    message: '',
                    senderName: '',
                  });
                }}
              >
                Buy another
              </button>
              <Link href="/treks" className="it-corp__btn it-corp__btn--dark-ghost">
                Browse treks
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
