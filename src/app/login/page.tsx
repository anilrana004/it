import Link from 'next/link';
export default function LoginPage() {
  return (
    <div className="pt-24 lg:pt-28 pb-12 lg:pb-20 min-h-screen flex items-center">
      <div className="container mx-auto max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4"><div className="w-10 h-10 bg-gradient-to-br from-[#ffaf21] to-[#ffaf21] rounded-lg flex items-center justify-center"><span className="text-white font-bold text-lg">TR</span></div></Link>
            <h1 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-[#000000]">Welcome Back</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your TrekRoot account</p>
          </div>
          <form className="space-y-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#ffaf21] outline-none" placeholder="you@example.com" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Password</label><input type="password" className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-[#ffaf21] outline-none" placeholder="••••••••" /></div>
            <button type="submit" className="w-full bg-[#ffaf21] hover:bg-[#d49400] text-gray-900 font-semibold py-3 rounded-full transition-all">Sign In</button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">Don&apos;t have an account? <Link href="/signup" className="text-[#ffaf21] hover:text-[#d49400] font-medium">Sign Up</Link></p>
        </div>
      </div>
    </div>
  );
}
