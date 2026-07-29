'use client';
import { MessageCircle, Share2 } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <>
      {/* WhatsApp */}
      <a href="https://wa.me/919999999999?text=Hi%20TrekRoot!%20I%27m%20interested%20in%20a%20trek."
        target="_blank" rel="noopener noreferrer"
        className="fixed bottom-20 lg:bottom-6 right-4 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-all">
        <MessageCircle className="w-7 h-7 text-white fill-white" />
      </a>
      {/* Share */}
      <button onClick={() => { if (navigator.share) navigator.share({ title: 'TrekRoot - Explore the Himalayas', url: window.location.href }); }}
        className="fixed bottom-36 lg:bottom-20 right-4 z-40 w-11 h-11 bg-[#afde1e] hover:bg-[#8cb818] rounded-full flex items-center justify-center shadow-lg shadow-[#afde1e]/25 hover:scale-110 transition-all">
        <Share2 className="w-5 h-5 text-white" />
      </button>
    </>
  );
}
