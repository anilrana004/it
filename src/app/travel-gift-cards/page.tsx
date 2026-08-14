'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Gift, ArrowRight, Check, Copy, Heart } from 'lucide-react';

const amounts = [1000, 2500, 5000, 10000, 15000, 25000];

export default function GiftCardsPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ amount: 5000, recipientName: '', recipientEmail: '', message: '', senderName: '' });
  const [code, setCode] = useState('');

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    const generated = 'TR' + Math.random().toString(36).substring(2, 10).toUpperCase();
    setCode(generated);
    setStep(3);
  };

  return (
    <div className="pt-20 lg:pt-28 pb-12 lg:pb-20">
      {/* Hero */}
      <section className="relative h-[35vh] min-h-[220px] overflow-hidden mb-8">
        <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80" alt="Gift Cards" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl lg:text-5xl font-bold text-white mb-2">Travel Gift Cards</h1>
            <p className="text-gray-200 text-sm lg:text-lg">The Gift of Travel - Give Memories That Last a Lifetime</p>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4">
        {step === 1 && (
          <div className="text-center mb-8 lg:mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl lg:text-3xl font-bold text-[#000000] mb-3">The Gift of Travel</h2>
            <p className="text-gray-600 text-sm lg:text-base max-w-2xl mx-auto mb-6">
              Say goodbye to chocolates, flowers, and cakes! Give the gift of unforgettable experiences with Indian Treks Travel Gift Cards.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Gift, t: 'Choose Amount', d: 'Select from multiple gift card values starting at ?1,000' },
                { icon: Heart, t: 'Personalize', d: 'Add a heartfelt message for your loved ones' },
                { icon: Check, t: 'Instant Delivery', d: 'E-gift card delivered instantly via email' },
              ].map(f => (
                <div key={f.t} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-[#16a34a]/10 rounded-xl flex items-center justify-center mx-auto mb-3"><f.icon className="w-5 h-5 text-[#16a34a]" /></div>
                  <h3 className="font-bold text-sm text-gray-900 mb-1">{f.t}</h3>
                  <p className="text-xs text-gray-500">{f.d}</p>
                </div>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-8 py-3.5 rounded-full transition-all inline-flex items-center gap-2">
              Buy a Gift Card <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handlePurchase} className="max-w-2xl mx-auto">
            <button onClick={() => setStep(1)} className="text-sm text-gray-500 hover:text-[#16a34a] mb-6">&larr; Back</button>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8 space-y-6">
              <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-[#000000]">Customize Your Gift Card</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
                <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                  {amounts.map(a => (
                    <button key={a} type="button" onClick={() => setForm(f=>({...f,amount:a}))}
                      className={`py-3 rounded-xl border-2 text-sm font-semibold transition-all ${form.amount === a ? 'border-[#16a34a] bg-[#16a34a]/5 text-[#16a34a]' : 'border-gray-100 text-gray-600 hover:border-gray-200'}`}>
                      ₹{a.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name *</label><input type="text" required value={form.recipientName} onChange={e => setForm(f=>({...f,recipientName:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#16a34a] text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email *</label><input type="email" required value={form.recipientEmail} onChange={e => setForm(f=>({...f,recipientEmail:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#16a34a] text-sm" /></div>
                <div><label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label><input type="text" required value={form.senderName} onChange={e => setForm(f=>({...f,senderName:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#16a34a] text-sm" /></div>
              </div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label><textarea rows={3} value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#16a34a] text-sm resize-none" placeholder="Write a heartfelt message..." /></div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 border border-pink-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-gray-900">Gift Card Preview</h3>
                  <Gift className="w-5 h-5 text-pink-500" />
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#16a34a]">₹{form.amount.toLocaleString()}</div>
                    <p className="text-sm text-gray-600 mt-1">Indian Treks Travel Gift Card</p>
                    {form.message && <p className="text-xs text-gray-500 mt-2 italic">&ldquo;{form.message}&rdquo;</p>}
                    <p className="text-xs text-gray-400 mt-2">From: {form.senderName || 'You'}</p>
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-8 py-3.5 rounded-full transition-all text-sm">
                Purchase Gift Card - ₹{form.amount.toLocaleString()}
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="max-w-lg mx-auto text-center">
            <div className="w-16 h-16 bg-[#16a34a]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-[#16a34a]" />
            </div>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#000000] mb-2">Gift Card Purchased!</h2>
            <p className="text-gray-600 text-sm mb-6">Your e-gift card has been sent to {form.recipientEmail}</p>
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <p className="text-xs text-gray-500 mb-2">Gift Card Code</p>
              <div className="flex items-center justify-center gap-2">
                <span className="font-mono text-xl lg:text-2xl font-bold text-[#16a34a]">{code}</span>
                <button onClick={() => navigator.clipboard.writeText(code)} className="p-1.5 text-gray-400 hover:text-[#16a34a]">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm font-semibold text-gray-800 mt-3">₹{form.amount.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Valid for 1 year</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button onClick={() => { setStep(1); setCode(''); setForm({ amount: 5000, recipientName: '', recipientEmail: '', message: '', senderName: '' }); }}
                className="bg-[#16a34a] text-white font-semibold px-8 py-3 rounded-full text-sm hover:bg-[#15803d]">Buy Another</button>
              <Link href="/treks" className="border-2 border-gray-200 text-gray-700 font-semibold px-8 py-3 rounded-full text-sm hover:border-gray-300">Browse Treks</Link>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        <div className="mt-12 lg:mt-16">
          <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-[#000000] text-center mb-6">Frequently Asked Questions</h2>
          <div className="max-w-2xl mx-auto space-y-3">
            {[
              { q: 'What is an Indian Treks Travel Gift Card?', a: 'An Indian Treks Travel Gift Card is a prepaid gift card that can be used to book any trek or yatra on Indian Treks. It\'s an easy and hassle-free way to gift someone a travel experience.' },
              { q: 'How do I redeem my gift card?', a: 'Simply select your trek, proceed to booking, and enter your unique gift card code in the designated section at checkout. The amount will be deducted automatically.' },
              { q: 'What is the validity of the gift card?', a: 'The gift card is valid for one year from the date of purchase.' },
              { q: 'Can I use the gift card for any trek?', a: 'Yes! The gift card can be used to book any group trips or customized trips available on Indian Treks.' },
            ].map(f => (
              <details key={f.q} className="bg-white rounded-xl border border-gray-100 overflow-hidden group">
                <summary className="p-4 lg:p-5 font-semibold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between">
                  {f.q}
                  <svg className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-4 lg:px-5 pb-4 lg:pb-5"><p className="text-gray-600 text-sm leading-relaxed">{f.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
