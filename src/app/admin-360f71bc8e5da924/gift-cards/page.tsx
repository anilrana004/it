'use client';
import { useState } from 'react';
import { getGiftCards, addGiftCard } from '@/lib/admin/store';
import { Gift, Plus, Copy } from 'lucide-react';

export default function AdminGiftCards() {
  const [cards, setCards] = useState(getGiftCards());
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ amount: 1000, recipientName: '', recipientEmail: '', message: '' });

  const generateCode = () => 'TR' + Math.random().toString(36).substring(2, 10).toUpperCase();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateCode();
    addGiftCard({
      code, amount: form.amount, balance: form.amount,
      recipientName: form.recipientName, recipientEmail: form.recipientEmail,
      message: form.message, status: 'active',
      expiresAt: new Date(Date.now() + 365*24*60*60*1000).toISOString(),
    });
    setCards([...getGiftCards()]);
    setShowForm(false);
    setForm({ amount: 1000, recipientName: '', recipientEmail: '', message: '' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e]">Gift Cards</h1>
          <p className="text-gray-500 text-sm">{cards.length} gift cards issued</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#359DFC] text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-[#1a7de0] transition-all">
          <Plus className="w-4 h-4" /> Issue Gift Card
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 lg:p-6 mb-6 space-y-4">
          <h3 className="font-bold text-lg">Issue New Gift Card</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)</label><input type="number" required min={500} value={form.amount} onChange={e => setForm(f=>({...f,amount:parseInt(e.target.value)}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Recipient Name</label><input type="text" required value={form.recipientName} onChange={e => setForm(f=>({...f,recipientName:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Recipient Email</label><input type="email" required value={form.recipientEmail} onChange={e => setForm(f=>({...f,recipientEmail:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Message (optional)</label><input type="text" value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#359DFC] text-sm" /></div>
          </div>
          <div className="flex gap-3">
            <button type="submit" className="bg-[#359DFC] text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-[#1a7de0]">Issue Card</button>
            <button type="button" onClick={() => setShowForm(false)} className="border border-gray-200 text-gray-700 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-gray-50">Cancel</button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="p-4 font-semibold text-gray-600">Code</th>
                <th className="p-4 font-semibold text-gray-600">Recipient</th>
                <th className="p-4 font-semibold text-gray-600">Amount</th>
                <th className="p-4 font-semibold text-gray-600">Balance</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Expires</th>
              </tr>
            </thead>
            <tbody>
              {cards.map(c => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-mono font-semibold text-[#359DFC] flex items-center gap-2">{c.code} <button onClick={() => navigator.clipboard.writeText(c.code)} className="text-gray-400 hover:text-[#359DFC]"><Copy className="w-3.5 h-3.5" /></button></td>
                  <td className="p-4 text-gray-600">{c.recipientName}<br /><span className="text-xs text-gray-400">{c.recipientEmail}</span></td>
                  <td className="p-4 font-semibold">₹{c.amount.toLocaleString()}</td>
                  <td className="p-4 text-gray-600">₹{c.balance.toLocaleString()}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${c.status === 'active' ? 'bg-green-100 text-green-700' : c.status === 'redeemed' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{c.status}</span></td>
                  <td className="p-4 text-gray-500 text-xs">{new Date(c.expiresAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {cards.length === 0 && <tr><td colSpan={6} className="p-8 text-center text-gray-400">No gift cards issued</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
