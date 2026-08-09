const LOGO_SRC =
  'https://res.cloudinary.com/pg8uhzw0/image/upload/f_auto,q_auto/v1786284069/indiantreks-01-1-1536x284_af65nt.png';

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
    />
  );
}

export { LOGO_SRC };
