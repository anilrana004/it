'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, MapPin, Phone, Mail } from 'lucide-react';

const sections = [
  {
    title: 'Company',
    links: [
      { l: 'About Us', h: '/about' },
      { l: 'Contact Us', h: '/contact' },
      { l: 'Our Blogs', h: '/blog' },
      { l: 'Career With Us', h: '/careers' },
      { l: 'Payment Policy', h: '/payment-policy' },
      { l: 'Campus Ambassador Program', h: '/campus-ambassador' },
      { l: 'Newsletter', h: '/newsletter' },
    ],
  },
  {
    title: 'Group Tours',
    links: [
      { l: 'Backpacking Trips', h: '/backpacking-trips' },
      { l: 'Treks', h: '/treks' },
      { l: 'Biking Trips', h: '/biking-trips' },
      { l: 'Upcoming Trips', h: '/upcoming-trips' },
      { l: 'International Trips', h: '/international-trips' },
    ],
  },
  {
    title: 'Customized Trips',
    links: [
      { l: 'Corporate Tours', h: '/corporate' },
      { l: 'Domestic Tours', h: '/domestic-tours' },
      { l: 'International Getaways', h: '/international-getaways' },
      { l: 'Honeymoon Trips', h: '/honeymoon' },
    ],
  },
];

const socialLinks = [
  {
    label: 'Facebook', href: 'https://facebook.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#1877F2" rx="5" />
        <path fill="#fff" d="M24 16c0-4.4-3.6-8-8-8s-8 3.6-8 8c0 4 2.9 7.3 6.7 7.9v-5.6h-2V16h2v-1.8c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V16h2.2l-.4 2.3h-1.9V24c4-.6 6.9-4 6.9-8z" />
      </svg>
    ),
  },
  {
    label: 'Twitter', href: 'https://twitter.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#1DA1F2" rx="5" />
        <path fill="#fff" d="M24 11c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.6-2.1.8-.6-.6-1.5-1-2.4-1-2.1 0-3.7 2-3.2 4-2.7-.1-5.1-1.4-6.8-3.4-.9 1.5-.4 3.4 1 4.4-.5 0-1-.2-1.5-.4 0 1.5 1.1 2.9 2.6 3.3-.5.1-1 .2-1.5.1.4 1.3 1.6 2.3 3.1 2.3-1.2.9-3 1.4-4.7 1.2 1.5.9 3.2 1.5 5 1.5 6.1 0 9.5-5.1 9.3-9.8.7-.4 1.3-1 1.7-1.7z" />
      </svg>
    ),
  },
  {
    label: 'Instagram', href: 'https://instagram.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#F00073" rx="6" />
        <path fill="#fff" d="M16 9.2h3.4c.8 0 1.2.2 1.5.3.4.2.7.3 1 .6.3.3.5.6.6 1 .1.3.2.7.3 1.5v6.8c0 .8-.2 1.2-.3 1.5-.2.4-.3.7-.6 1-.3.3-.6.5-1 .6-.3.1-.7.2-1.5.3h-6.8c-.8 0-1.2-.2-1.5-.3-.4-.2-.7-.3-1-.6-.3-.3-.5-.6-.6-1-.1-.3-.2-.7-.3-1.5V16v-3.4c0-.8.2-1.2.3-1.5.2-.4.3-.7.6-1 .3-.3.6-.5 1-.6.3-.1.7-.2 1.5-.3H16zm0-1.5h-3.4c-.9 0-1.5.2-2 .4s-1 .5-1.5 1-.7.9-1 1.5c-.2.5-.3 1.1-.4 2v6.8c0 .9.2 1.5.4 2s.5 1 1 1.5.9.7 1.5 1c.5.2 1.1.3 2 .4h6.8c.9 0 1.5-.2 2-.4s1-.5 1.5-1 .7-.9 1-1.5c.2-.5.3-1.1.4-2V16v-3.4c0-.9-.2-1.5-.4-2s-.5-1-1-1.5-.9-.7-1.5-1c-.5-.2-1.1-.3-2-.4H16z" />
        <path fill="#fff" d="M16 11.7c-2.4 0-4.3 1.9-4.3 4.3s1.9 4.3 4.3 4.3 4.3-1.9 4.3-4.3-1.9-4.3-4.3-4.3zm0 7.1c-1.5 0-2.8-1.2-2.8-2.8 0-1.5 1.2-2.8 2.8-2.8 1.5 0 2.8 1.2 2.8 2.8 0 1.5-1.3 2.8-2.8 2.8zM20.4 12.6a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn', href: 'https://linkedin.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#2867B2" rx="6" />
        <path fill="#fff" d="M11.6 24H8.2V13.3h3.4V24zM9.9 11.8C8.8 11.8 8 11 8 9.9 8 8.8 8.9 8 9.9 8c1.1 0 1.9.8 1.9 1.9 0 1.1-.8 1.9-1.9 1.9zM24 24h-3.4v-5.8c0-1.7-.7-2.2-1.7-2.2s-2 .8-2 2.3V24h-3.4V13.3h3.2v1.5c.3-.7 1.5-1.8 3.2-1.8 1.9 0 3.9 1.1 3.9 4.4V24h.2z" />
      </svg>
    ),
  },
  {
    label: 'YouTube', href: 'https://youtube.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="red" rx="6" />
        <path fill="#fff" d="M23.6 12.1c-.2-.7-.7-1.2-1.4-1.4-1.2-.3-6.3-.3-6.3-.3s-5 0-6.3.3c-.7.2-1.2.7-1.4 1.4C8 13.4 8 16 8 16s0 2.6.3 3.9c.2.7.7 1.2 1.4 1.4 1.2.3 6.3.3 6.3.3s5 0 6.3-.3c.7-.2 1.2-.7 1.4-1.4.3-1.3.3-3.9.3-3.9s0-2.6-.4-3.9zm-9.2 6.3v-4.8l4.2 2.4-4.2 2.4z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest', href: 'https://pinterest.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#E60023" rx="6" />
        <path fill="#fff" d="M16 8c-4.4 0-8 3.6-8 8 0 3.3 2 6.1 4.8 7.3 0-.6 0-1.2.1-1.8.2-.7 1-4.4 1-4.4s-.3-.5-.3-1.3c0-1.2.7-2.1 1.5-2.1.7 0 1.1.5 1.1 1.2s-.5 1.8-.7 2.8c-.2.8.4 1.5 1.3 1.5 1.5 0 2.5-1.9 2.5-4.3 0-1.8-1.2-3.1-3.3-3.1-2.4 0-3.9 1.8-3.9 3.8 0 .7.2 1.2.5 1.6.1.2.2.2.1.4 0 .1-.1.5-.2.6-.1.2-.2.3-.4.2-1.1-.5-1.6-1.7-1.6-3.1 0-2.3 1.9-5 5.7-5 3.1 0 5.1 2.2 5.1 4.6 0 3.1-1.7 5.5-4.3 5.5-.9 0-1.7-.5-2-1 0 0-.5 1.8-.6 2.2-.2.6-.5 1.2-.8 1.7.7.2 1.5.3 2.3.3 4.4 0 8-3.6 8-8C24 11.6 20.4 8 16 8z" />
      </svg>
    ),
  },
  {
    label: 'TripAdvisor', href: 'https://tripadvisor.in/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#589541" rx="6" />
        <path fill="#fff" d="M16 8.5c-3.331 0-5.831.838-8.331 3.338H3.5s0 1.25 1.669 1.668C4.419 14.525 3.5 16.3 3.5 17.67c0 3.437 2.394 5.831 5.831 5.831 1.95 0 3.857-1.094 5-2.5L16 23.5l1.669-2.5c1.143 1.406 3.05 2.5 5 2.5 3.437 0 5.831-2.394 5.831-5.831 0-1.369-.919-3.138-1.669-4.169 1.669-.419 1.669-1.669 1.669-1.669h-4.169c-2.5-2.5-5-3.331-8.331-3.331zm0 .831c4.169 0 6.669 2.5 6.669 2.5C19.33 11.831 16 16 16 20.17c0-4.169-3.331-8.332-6.669-8.332 0-.006 2.5-2.506 6.669-2.506zM9.331 13.5c2.3 0 4.169 1.863 4.169 4.169 0 2.3-1.863 4.168-4.169 4.168a4.164 4.164 0 01-4.168-4.168A4.176 4.176 0 019.33 13.5zm13.338 0c2.3 0 4.168 1.863 4.168 4.169a4.168 4.168 0 11-8.337 0c0-2.3 1.863-4.169 4.169-4.169zM9.33 15.169a2.5 2.5 0 10-.001 4.998 2.5 2.5 0 00.001-4.998zm13.338 0a2.5 2.5 0 10-.002 4.998 2.5 2.5 0 00.002-4.998zM9.33 16c.919 0 1.669.75 1.669 1.669a1.668 1.668 0 01-3.338 0A1.677 1.677 0 019.332 16zm13.338 0c.918 0 1.668.75 1.668 1.669 0 .918-.75 1.668-1.668 1.668a1.668 1.668 0 110-3.337zm-13.338.831a.831.831 0 10.832.832.827.827 0 00-.832-.832zm13.338 0a.831.831 0 100 1.662.831.831 0 000-1.662z" />
      </svg>
    ),
  },
  {
    label: 'Quora', href: 'https://quora.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <path fill="#F44336" d="M23.471 26.68a14.441 14.441 0 006.75-12.266C30.221 6.456 23.853 0 16 0 8.143 0 1.777 6.456 1.777 14.416c0 7.964 6.366 14.416 14.222 14.416 1.156 0 2.276-.142 3.352-.406 1.348 2.454 3.408 4.194 7.772 3.364v-2.446s-2.798-.704-3.652-2.664zm-.1-10.356c0 2.406-.768 4.592-2.012 6.204a8.98 8.98 0 00-7.12-2.858v2.834s2.11.084 3.552 2.564a5.914 5.914 0 01-1.684.246c-4.012 0-7.262-4.026-7.262-8.992V12.61c0-4.968 3.25-8.994 7.262-8.994s7.266 4.026 7.266 8.994l-.002 3.714z" />
      </svg>
    ),
  },
  {
    label: 'Spotify', href: 'https://open.spotify.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <rect width="32" height="32" fill="#3BD75F" rx="6" />
        <path fill="#fff" d="M16 28c6.627 0 12-5.373 12-12S22.627 4 16 4 4 9.373 4 16s5.373 12 12 12z" />
        <path stroke="#3BD75F" strokeLinecap="round" strokeWidth="3" d="M8.813 10.854c4.687-1.25 10.25-.937 14.874 1.5" />
        <path stroke="#3BD75F" strokeLinecap="round" strokeWidth="2" d="M9.5 16.062c3.813-1.062 9-.812 12.688 1.5" />
        <path stroke="#3BD75F" strokeLinecap="round" d="M9.75 21.021c3.375-.75 7.25-1.062 11.125 1.25" />
      </svg>
    ),
  },
  {
    label: 'Google Podcast', href: 'https://podcasts.google.com/',
    icon: (s: number) => (
      <svg xmlns="http://www.w3.org/2000/svg" width={s} height={s} fill="none" viewBox="0 0 32 32">
        <path fill="#0066D9" d="M4 14.91v2.181a2 2 0 11-4 0v-2.182a2 2 0 114 0z" />
        <path fill="#4285F4" d="M28 14.966v-.057a2 2 0 114 0v2.239a2 2 0 01-3.998 0v-2.182H28z" />
        <path fill="#EA4335" d="M10.908 21.454v2.182a2 2 0 01-4 0v-2.182a2 2 0 114 0zm0-13.09V15.5a2 2 0 01-4 0V8.363a2 2 0 014 0z" />
        <path fill="#34A853" d="M21.092 10.545a2 2 0 104 0V8.363a2 2 0 10-4 0v2.182z" />
        <path fill="#FAB908" d="M14 4.182a2 2 0 104 0V2a2 2 0 10-4 0v2.182zm0 23.636a2 2 0 114 0V30a2 2 0 01-4 0v-2.182z" />
        <path fill="#34A853" d="M21.092 16.546a2 2 0 014 0v7.091a2 2 0 01-4 0v-7.091z" />
        <path fill="#FAB908" d="M18 10.182v11.636a2 2 0 11-4 0V10.182a2 2 0 014 0z" />
      </svg>
    ),
  },
];

const row1 = socialLinks.slice(0, 5);
const row2 = socialLinks.slice(5);

export default function Footer() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  return (
    <footer className="bg-[#ffaf21] text-gray-900 pb-[62px] lg:pb-0">
      <div className="container mx-auto py-8 lg:py-16">
        {/* Mobile */}
        <div className="lg:hidden">
          <div className="flex flex-col items-center mb-6">
            <Link href="/" className="flex items-center justify-center mb-2">
              <img src="https://res.cloudinary.com/pg8uhzw0/image/upload/v1785363638/l_kceoj5.png" alt="TrekRoot" className="h-9 w-auto" />
            </Link>
            <p className="text-gray-600 text-xs text-center">India&apos;s #1 Social Travel Community</p>
          </div>

          <div className="bg-black/5 rounded-xl p-4 mb-5 space-y-3">
            <p className="text-sm font-semibold text-gray-900">Contact Us</p>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">B-42, 2nd Floor, Tower- B, The Corenthum, Block A, Sector 62, Noida, Uttar Pradesh 201301</p>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-500 shrink-0" />
              <a href="tel:+919797972175" className="text-xs text-gray-700">+91-9797 972 175</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-500 shrink-0" />
              <a href="mailto:contact@trekroot.com" className="text-xs text-gray-700">contact@trekroot.com</a>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            {row1.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon(32)}
              </a>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {row2.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                {s.icon(32)}
              </a>
            ))}
          </div>

          <div className="space-y-0.5">
            {sections.map((s, i) => (
              <div key={s.title} className="border-b border-[#d49400]/30">
                <button onClick={() => setOpenSection(openSection === i ? null : i)}
                  className="w-full flex items-center justify-between py-3.5 px-1 text-sm font-semibold text-gray-900">
                  {s.title}
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${openSection === i ? 'rotate-180' : ''}`} />
                </button>
                {openSection === i && (
                  <div className="pb-3 space-y-2 px-1">
                    {s.links.map(l => (
                      <Link key={l.l} href={l.h}
                        className="block text-sm text-gray-700 hover:text-gray-900 transition-colors py-1">
                        {l.l}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-5 mt-6">
            <Link href="/privacy-policy" className="text-xs text-gray-600 hover:text-gray-900">Privacy Policy</Link>
            <div className="h-3 w-[1px] bg-[#d49400]/50" />
            <Link href="/terms-and-conditions" className="text-xs text-gray-600 hover:text-gray-900">Terms &amp; Conditions</Link>
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">c 2015-2026 TrekRoot Pvt. Ltd.</p>
        </div>

        {/* Desktop */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-10">
            <Link href="/" className="flex items-center gap-2">
              <img src="https://res.cloudinary.com/pg8uhzw0/image/upload/v1785363638/l_kceoj5.png" alt="TrekRoot" className="h-9 w-auto" />
            </Link>
            <span className="text-gray-600 text-sm ml-2">#wravelerforlife</span>
          </div>

          <div className="grid grid-cols-5 gap-8 mb-12">
            <div className="col-span-1">
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 leading-relaxed">B-42, 2nd Floor, Tower- B, The Corenthum, Block A, Sector 62, Noida, Uttar Pradesh 201301</p>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-gray-500 shrink-0" />
                <a href="tel:+919797972175" className="text-xs text-gray-700 hover:text-gray-900">+91-9797 972 175</a>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Mail className="w-4 h-4 text-gray-500 shrink-0" />
                <a href="mailto:contact@trekroot.com" className="text-xs text-gray-700 hover:text-gray-900">contact@trekroot.com</a>
              </div>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    {s.icon(28)}
                  </a>
                ))}
              </div>
            </div>
            {sections.map(s => (
              <div key={s.title}>
                <h4 className="font-bold text-xs mb-4 text-gray-900 uppercase tracking-wider">{s.title}</h4>
                <ul className="space-y-2.5">
                  {s.links.map(l => (
                    <li key={l.l}>
                      <Link href={l.h} className="text-xs text-gray-700 hover:text-gray-900 transition-colors">{l.l}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-[#d49400]/30 pt-5 flex items-center justify-between">
            <p className="text-xs text-gray-500">c 2015-2026 TrekRoot Pvt. Ltd.</p>
            <div className="flex items-center gap-4 text-xs text-gray-600">
              <Link href="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
              <div className="h-4 w-[1px] bg-[#d49400]/50" />
              <Link href="/terms-and-conditions" className="hover:text-gray-900">Terms &amp; Conditions</Link>
              <div className="h-4 w-[1px] bg-[#d49400]/50" />
              <Link href="/payment-policy" className="hover:text-gray-900">Payment Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
