'use client';
import { useState } from 'react';
import { MessageCircle, Share2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import HelpAssistant from '@/components/HelpAssistant';

function hasDetailChrome(path: string) {
  if (path.startsWith('/booking/')) return true;
  if (/^\/treks\/[^/]+\/?$/.test(path)) return true;
  if (/^\/yatra\/[^/]+\/?$/.test(path)) return true;
  return false;
}

function isAdminPath(path: string) {
  return path.startsWith('/admin-');
}

export default function WhatsAppFloat() {
  const path = usePathname();
  const [assistantOpen, setAssistantOpen] = useState(false);
  const detail = hasDetailChrome(path);

  if (isAdminPath(path)) return null;

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
      /* cancelled */
    }
  };

  return (
    <div
      className={`fixed z-[45] flex flex-col-reverse items-center gap-2 pointer-events-none right-[max(0.75rem,env(safe-area-inset-right))] ${
        detail
          ? 'bottom-[calc(5.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-6'
          : 'bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] lg:bottom-6'
      }`}
      aria-label="Quick actions"
    >
      {/* AI Help Assistant (primary) */}
      <HelpAssistant open={assistantOpen} onOpenChange={setAssistantOpen} />

      {/* WhatsApp */}
      {!assistantOpen && (
        <a
          href="https://wa.me/919999999999?text=Hi%20TrekRoot!%20I%27m%20interested%20in%20a%20trek."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_16px_rgba(37,211,102,0.35)] hover:bg-[#20bd5a] active:opacity-90"
        >
          <MessageCircle className="h-4 w-4 fill-white" />
        </a>
      )}

      {/* Share */}
      {!assistantOpen && (
        <button
          type="button"
          onClick={handleShare}
          aria-label="Share this page"
          className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full bg-[#16a34a] text-white shadow-[0_4px_12px_rgba(22,163,74,0.28)] hover:bg-[#15803d] active:opacity-90"
        >
          <Share2 className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
