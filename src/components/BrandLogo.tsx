import { SITE_LOGO_URL } from '@/lib/brand-assets';

const LOGO_SRC = SITE_LOGO_URL;

type BrandLogoProps = {
  /** Tailwind size classes. Wide wordmark - keep height modest. */
  className?: string;
};

/** IndianTreks wordmark used across header, hero, and footer. */
export default function BrandLogo({
  className = 'h-8 w-auto max-w-[168px] object-contain object-left',
}: BrandLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="IndianTreks - Offbeat & Active Travel Specialists Since 2015"
      width={192}
      height={36}
      className={className}
      decoding="async"
      fetchPriority="high"
    />
  );
}

export { LOGO_SRC };
