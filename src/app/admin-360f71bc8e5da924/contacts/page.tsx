'use client';
import { useState } from 'react';
import { contacts, updateContactStatus } from '@/lib/admin/store';
import { Search, X, ChevronRight, MessageSquare } from 'lucide-react';

export default function AdminContacts() {
  const [c, setC] = useState(contacts);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<typeof contacts[0] | null>(null);
  const filtered = c.filter(ct => ct.name.toLowerCase().includes(search.toLowerCase()) || ct.email.includes(search));

  const markRead = (msg: typeof contacts[0]) => {
    if (msg.status === 'new') {
      updateContactStatus(msg.id, 'read');
      setC([...contacts]);
    }
    setSelected(msg);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#040921]">Contact Messages</h1>
          <p className="text-gray-500 text-sm">{c.length} messages</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#afde1e]" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${selected ? 'hidden lg:block' : ''} lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden`}>
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
                  <tr key={msg.id} onClick={() => markRead(msg)} className="border-b border-gray-50 hover:bg-gray-50/50 cursor-pointer">
                    <td className="p-4 font-medium text-gray-800 flex items-center gap-2">{msg.status === 'new' && <span className="w-2 h-2 bg-[#afde1e] rounded-full shrink-0" />}{msg.name}</td>
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
        {selected && (
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#040921]">Message Detail</h3>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3 text-sm">
              <div><span className="text-gray-500 text-xs block">Name</span><span className="font-medium">{selected.name}</span></div>
              <div><span className="text-gray-500 text-xs block">Email</span><span className="font-medium">{selected.email}</span></div>
              {selected.phone && <div><span className="text-gray-500 text-xs block">Phone</span><span className="font-medium">{selected.phone}</span></div>}
              <div><span className="text-gray-500 text-xs block">Date</span><span className="font-medium">{new Date(selected.createdAt).toLocaleString()}</span></div>
              <hr className="border-gray-100" />
              <div><span className="text-gray-500 text-xs block mb-1">Message</span><p className="text-gray-700 leading-relaxed">{selected.message}</p></div>
            </div>
            <div className="mt-4 flex gap-2">
              {selected.status === 'new' && (
                <button onClick={() => { updateContactStatus(selected.id, 'read'); setC([...contacts]); }} className="text-xs font-semibold px-3 py-1.5 bg-[#afde1e] text-gray-900 rounded-full hover:bg-[#8cb818]">Mark Read</button>
              )}
              <a href={`mailto:${selected.email}`} className="text-xs font-semibold px-3 py-1.5 border border-gray-200 text-gray-700 rounded-full hover:bg-gray-50">Reply via Email</a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
