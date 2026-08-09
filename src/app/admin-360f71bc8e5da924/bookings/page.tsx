'use client';
import { useState } from 'react';
import { bookings as storeBookings, updateBookingStatus } from '@/lib/admin/store';
import { CalendarCheck, Search } from 'lucide-react';

export default function AdminBookings() {
  const [b, setB] = useState(storeBookings);
  const [search, setSearch] = useState('');

  const filtered = b.filter(book => 
    book.name.toLowerCase().includes(search.toLowerCase()) ||
    book.trekTitle.toLowerCase().includes(search.toLowerCase()) ||
    book.phone.includes(search)
  );

  const updateStatus = (id: string, status: string) => {
    const result = updateBookingStatus(id, status as any);
    if (result) setB([...storeBookings]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#000000]">Bookings</h1>
          <p className="text-gray-500 text-sm">{b.length} total bookings</p>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#16a34a] w-48 lg:w-64" />
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-left">
                <th className="p-4 font-semibold text-gray-600">Name</th>
                <th className="p-4 font-semibold text-gray-600">Trek</th>
                <th className="p-4 font-semibold text-gray-600">Package</th>
                <th className="p-4 font-semibold text-gray-600">Persons</th>
                <th className="p-4 font-semibold text-gray-600">Date</th>
                <th className="p-4 font-semibold text-gray-600">Amount</th>
                <th className="p-4 font-semibold text-gray-600">Status</th>
                <th className="p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="p-8 text-center text-gray-400">No bookings found</td></tr>
              ) : filtered.map(book => (
                <tr key={book.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4">
                    <div className="font-medium text-gray-800">{book.name}</div>
                    <div className="text-xs text-gray-400">{book.phone}</div>
                  </td>
                  <td className="p-4 text-gray-600">{book.trekTitle}</td>
                  <td className="p-4"><span className="text-xs font-semibold text-[#16a34a]">{book.package}</span></td>
                  <td className="p-4 text-gray-600">{book.persons}</td>
                  <td className="p-4 text-gray-600">{book.date}</td>
                  <td className="p-4 font-semibold">₹{book.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      book.status === 'confirmed' ? 'bg-green-100 text-green-700' : 
                      book.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                      book.status === 'cancelled' ? 'bg-red-100 text-red-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>{book.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {book.status === 'pending' && (
                        <>
                          <button onClick={() => updateStatus(book.id, 'confirmed')} className="text-xs font-semibold px-2.5 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600">Confirm</button>
                          <button onClick={() => updateStatus(book.id, 'cancelled')} className="text-xs font-semibold px-2.5 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600">Cancel</button>
                        </>
                      )}
                      {book.status === 'confirmed' && (
                        <button onClick={() => updateStatus(book.id, 'completed')} className="text-xs font-semibold px-2.5 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Complete</button>
                      )}
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
