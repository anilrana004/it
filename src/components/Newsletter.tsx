'use client';
export default function Newsletter() {
  return (
    <section className="py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&h=800&fit=crop" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1a1a2e]/80" />
      </div>
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Newsletter</h2>
        <p className="text-white/70 text-sm lg:text-base mb-5">Sign up now!</p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required
            className="flex-1 px-5 py-3.5 rounded-full outline-none text-sm text-gray-800 bg-white/90 backdrop-blur-sm placeholder:text-gray-400 border border-white/10 focus:border-[#359DFC] transition-colors" />
          <button type="submit" className="bg-gradient-to-r from-[#359DFC] to-[#29C80F] hover:opacity-90 text-white font-semibold px-6 lg:px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#359DFC]/25 text-sm whitespace-nowrap">
            Subscribe
          </button>
        </form>
        <p className="text-white/40 text-xs mt-3">No spam, we promise. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
