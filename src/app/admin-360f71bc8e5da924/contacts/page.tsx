'use client';
import { useState } from 'react';
import { contacts, addContact } from '@/lib/admin/store';
import { MessageSquare, Mail, Phone, Search } from 'lucide-react';

export default function AdminContacts() {
  const [c, setC] = useState(contacts);
  const [search, setSearch] = useState('');
  const filtered = c.filter(ct => ct.name.toLowerCase().includes(search.toLowerCase()) || ct.email.includes(search));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e]">Contact Messages</h1>
          <p className="text-gray-500 text-sm">{c.length} messages</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#359DFC]" />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Email</th>
                <th className="p-4 font-semibold text-gray-600">Message</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-gray-400">No messages</td></tr>
              ) : filtered.map(msg => (
                <tr key={msg.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800">{msg.name}</td>
                  <td className="p-4 text-gray-600">{msg.email}</td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">{msg.message}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${msg.status === 'new' ? 'bg-yellow-100 text-yellow-700' : msg.status === 'read' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>{msg.status}</span></td>
                  <td className="p-4 text-gray-500 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
