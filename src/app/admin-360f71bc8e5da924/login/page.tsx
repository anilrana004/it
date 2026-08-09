'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        localStorage.setItem('adminAuth', 'true');
        router.push('/admin-360f71bc8e5da924');
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Connection error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-[#16a34a] to-[#16a34a] rounded-xl flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">TR</span>
            </div>
            <h1 className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#000000]">Admin Login</h1>
            <p className="text-gray-500 text-sm mt-1">Sign in to manage TrekRoot</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-sm text-red-600 bg-red-50 rounded-xl p-3 text-center">{error}</div>}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm(f=>({...f,email:e.target.value}))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#16a34a] text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" required value={form.password} onChange={e => setForm(f=>({...f,password:e.target.value}))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#16a34a] text-sm" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold px-6 py-3 rounded-full transition-all text-sm disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-[#16a34a]">Back to Site</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
