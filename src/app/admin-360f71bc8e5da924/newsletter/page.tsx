'use client';
import { useState } from 'react';
import { subscribers, addSubscriber } from '@/lib/admin/store';
import { Mail, Plus, Trash2 } from 'lucide-react';

export default function AdminNewsletter() {
  const [subs, setSubs] = useState(subscribers);
  const [email, setEmail] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const result = addSubscriber(email);
    if (result) { setSubs([...subscribers]); setEmail(''); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e]">Newsletter Subscribers</h1>
          <p className="text-gray-500 text-sm">{subs.length} subscribers</p>
        </div>
        <form onSubmit={handleAdd} className="flex gap-2">
          <input type="email" required placeholder="Add subscriber email..." value={email} onChange={e => setEmail(e.target.value)}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#359DFC]" />
          <button type="submit" className="flex items-center gap-1 bg-[#359DFC] text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#1a7de0]">
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Subscribed</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody>
              {subs.map(s => (
                <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800">{s.email}</td>
                  <td className="p-4 text-gray-500 text-xs">{new Date(s.subscribedAt).toLocaleDateString()}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${s.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{s.active ? 'Active' : 'Unsubscribed'}</span></td>
                </tr>
              ))}
              {subs.length === 0 && <tr><td colSpan={3} className="p-8 text-center text-gray-400">No subscribers yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
