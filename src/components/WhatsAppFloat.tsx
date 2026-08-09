'use client';
import { MessageCircle, Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

/** Detail / checkout pages use a taller sticky CTA — lift FABs above it. */
function hasDetailChrome(path: string) {
  if (path.startsWith('/booking/')) return true;
  if (/^\/treks\/[^/]+\/?$/.test(path)) return true;
  if (/^\/yatra\/[^/]+\/?$/.test(path)) return true;
  return false;
}

export default function WhatsAppFloat() {
  const path = usePathname();
  const detail = hasDetailChrome(path);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'TrekRoot - Explore the Himalayas',
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      /* user cancelled share */
    }
  };

  return (
    <div
      className={`fixed z-[45] flex flex-col-reverse items-center gap-3 pointer-events-none right-[max(0.75rem,env(safe-area-inset-right))] ${
        detail
          ? 'bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-6'
          : 'bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-6'
      }`}
      aria-label="Quick actions"
    >
      <a
        href="https://wa.me/919999999999?text=Hi%20TrekRoot!%20I%27m%20interested%20in%20a%20trek."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.35)] transition-colors hover:bg-[#20bd5a] active:opacity-90 lg:h-14 lg:w-14"
      >
        <MessageCircle className="h-6 w-6 fill-white lg:h-7 lg:w-7" />
      </a>
      <button
        type="button"
        onClick={handleShare}
        aria-label="Share this page"
        className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_6px_18px_rgba(22,163,74,0.28)] transition-colors hover:bg-[#15803d] active:opacity-90 lg:h-11 lg:w-11"
      >
        <Share2 className="h-4 w-4 lg:h-5 lg:w-5" />
      </button>
    </div>
  );
}
