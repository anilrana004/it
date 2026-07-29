'use client';
export default function NewsletterPage() {
  return (
    <div className="pt-20 lg:pt-28 pb-12 lg:pb-20">
      <div className="container mx-auto max-w-2xl px-4 text-center">
        <h1 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-[#040921] mb-4">Newsletter</h1>
        <p className="text-gray-600 text-sm mb-8">Subscribe to our newsletter &quot;Raahgir&quot; to get the latest travel updates, offers, and inspiration delivered to your inbox.</p>
        <form className="flex gap-3 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
          <input type="email" placeholder="Enter your email" className="flex-1 px-5 py-3 rounded-full border border-gray-200 outline-none text-sm focus:border-[#afde1e]" />
          <button type="submit" className="bg-[#afde1e] hover:bg-[#8cb818] text-gray-900 font-semibold px-6 py-3 rounded-full transition-all text-sm whitespace-nowrap">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
