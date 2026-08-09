'use client';
export default function Newsletter() {
  return (
    <section className="py-12 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="https://res.cloudinary.com/trekroot/image/fetch/f_auto,q_auto,w_1920,h_800,c_fill,g_auto/" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#000000]/80" />
      </div>
      <div className="container mx-auto relative z-10 text-center">
        <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">Newsletter</h2>
        <p className="text-white/70 text-sm lg:text-base mb-5">Sign up now!</p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" required
            className="flex-1 px-5 py-3.5 rounded-full outline-none text-sm text-gray-800 bg-white/90 backdrop-blur-sm placeholder:text-gray-400 border border-white/10 focus:border-[#16a34a] transition-colors" />
          <button type="submit" className="bg-gradient-to-r from-[#16a34a] to-[#16a34a] hover:opacity-90 text-white font-semibold px-6 lg:px-8 py-3.5 rounded-full transition-all shadow-lg shadow-[#16a34a]/25 text-sm whitespace-nowrap">
            Subscribe
          </button>
        </form>
        <p className="text-white/40 text-xs mt-3">No spam, we promise. Unsubscribe anytime.</p>
      </div>
    </section>
  );
}
