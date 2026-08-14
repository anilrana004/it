import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20 min-h-screen flex items-center">
      <div className="container mx-auto max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#000000]">Create Account</h1>
            <p className="text-sm text-gray-500 mt-1">Join Indian Treks and start planning your next adventure</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input type="tel" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none" placeholder="+91 98765 43210" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#16a34a] outline-none" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 rounded-full transition-all">
              Create Account
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-[#16a34a] hover:text-[#15803d] font-medium">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
