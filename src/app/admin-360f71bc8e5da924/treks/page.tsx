'use client';
import Link from 'next/link';
import { useState } from 'react';
import { treks } from '@/lib/data';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';

export default function AdminTreks() {
  const [items, setItems] = useState(treks);
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#1a1a2e]">Manage Treks</h1>
          <p className="text-gray-500 text-sm">{items.length} treks & yatras</p>
        </div>
        <button className="flex items-center gap-2 bg-[#359DFC] text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-[#1a7de0] transition-all">
          <Plus className="w-4 h-4" /> Add New
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="p-4 font-semibold text-gray-600">Title</th>
                <th className="p-4 font-semibold text-gray-600">Type</th>
                <th className="p-4 font-semibold text-gray-600">Region</th>
                <th className="p-4 font-semibold text-gray-600">Duration</th>
                <th className="p-4 font-semibold text-gray-600">Difficulty</th>
                <th className="p-4 font-semibold text-gray-600">Price</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(t => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 font-medium text-gray-800">{t.title}</td>
                  <td className="p-4"><span className={`text-xs font-semibold px-2 py-1 rounded-full ${t.type==='yatra'?'bg-orange-100 text-orange-700':'bg-blue-100 text-blue-700'}`}>{t.type}</span></td>
                  <td className="p-4 text-gray-600 capitalize">{t.region}</td>
                  <td className="p-4 text-gray-600">{t.duration}</td>
                  <td className="p-4 text-gray-600">{t.difficulty}</td>
                  <td className="p-4 font-semibold">₹{Math.min(...t.pricing.map(p=>p.price)).toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <Link href={`/treks/${t.id}`} className="p-1.5 text-gray-400 hover:text-[#359DFC]"><Eye className="w-4 h-4" /></Link>
                      <button className="p-1.5 text-gray-400 hover:text-green-500"><Pencil className="w-4 h-4" /></button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
