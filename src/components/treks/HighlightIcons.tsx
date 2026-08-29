import type { ReactNode } from 'react';

type IconProps = { id: string };

function SvgBase({ uid, children }: { uid: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#E0F2FE" />
          <stop offset="1" stopColor="#BAE6FD" />
        </linearGradient>
        <linearGradient id={`${uid}-grass`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#86EFAC" />
          <stop offset="1" stopColor="#22C55E" />
        </linearGradient>
        <linearGradient id={`${uid}-metal`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F8FAFC" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={`${uid}-pack`} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#78716C" />
          <stop offset="1" stopColor="#44403C" />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#0F172A" floodOpacity="0.18" />
        </filter>
      </defs>
      {children}
    </svg>
  );
}

function DifficultyIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <rect x="6" y="34" width="36" height="2" rx="1" fill="#166534" opacity="0.35" />
      <g filter={`url(#${uid}-soft)`}>
        <rect x="8" y="28" width="6" height="8" rx="2" fill="#FED7AA" />
        <rect x="8" y="28" width="6" height="3" rx="2" fill="#FFEDD5" opacity="0.8" />
        <rect x="16" y="22" width="6" height="14" rx="2" fill="#FDBA74" />
        <rect x="16" y="22" width="6" height="4" rx="2" fill="#FED7AA" opacity="0.75" />
        <rect x="24" y="15" width="6" height="21" rx="2" fill="#FB923C" />
        <rect x="24" y="15" width="6" height="5" rx="2" fill="#FDBA74" opacity="0.7" />
        <rect x="32" y="8" width="6" height="28" rx="2" fill="#EA580C" />
        <rect x="32" y="8" width="6" height="6" rx="2" fill="#FB923C" opacity="0.65" />
      </g>
    </SvgBase>
  );
}

function DurationIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <circle cx="24" cy="26" r="13" fill={`url(#${uid}-metal)`} stroke="#64748B" strokeWidth="1.2" />
      <circle cx="24" cy="26" r="10.5" fill={`url(#${uid}-sky)`} stroke="#0284C7" strokeWidth="1.2" />
      <path d="M24 18v8l6 4" stroke="#0C4A6E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="26" r="1.5" fill="#0369A1" />
      <rect x="21" y="10" width="6" height="4" rx="2" fill="#475569" />
      <path d="M12 14c-4 4.5-5.5 10.5-4 16" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" opacity="0.8" />
    </SvgBase>
  );
}

function AltitudeIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <path d="M4 36h40" stroke="#166534" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
      <path
        d="M6 34 16 16l7 9 6-14 13 23H6Z"
        fill={`url(#${uid}-grass)`}
        stroke="#15803D"
        strokeWidth="1.2"
        strokeLinejoin="round"
        filter={`url(#${uid}-soft)`}
      />
      <path d="M18 14 22 9l8 8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" strokeLinejoin="round" />
      <path d="M31 11v6" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
      <path d="M28 14h6" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </SvgBase>
  );
}

function SuitableIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <ellipse cx="24" cy="36" rx="16" ry="2.5" fill="#14532D" opacity="0.1" />
      <g filter={`url(#${uid}-soft)`}>
        <circle cx="16" cy="14" r="4.5" fill="#FECDD3" stroke="#FB7185" strokeWidth="0.8" />
        <path d="M9 34c0-6 3.2-9.5 7-9.5s7 3.5 7 9.5" fill="#F43F5E" />
        <circle cx="31" cy="17" r="3.8" fill="#FBCFE8" stroke="#F472B6" strokeWidth="0.8" />
        <path d="M25 34c0-5 2.8-7.8 6-7.8s6 2.8 6 7.8" fill="#EC4899" />
      </g>
    </SvgBase>
  );
}

function BasecampIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <rect x="5" y="8" width="38" height="28" rx="4" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
      <path d="M10 30c5-8 10-12 14-12s9 4 14 12" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M10 30h28" stroke="#BBF7D0" strokeWidth="1.5" strokeLinecap="round" />
      <g filter={`url(#${uid}-soft)`}>
        <path d="M12 30V20l4-3 4 3v10" fill="#4ADE80" stroke="#15803D" strokeWidth="0.9" />
        <path d="M26 30V17l4-3 4 3v13" fill="#86EFAC" stroke="#15803D" strokeWidth="0.9" />
      </g>
      <circle cx="12" cy="20" r="2.2" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" />
      <circle cx="34" cy="17" r="2.2" fill="#FACC15" stroke="#CA8A04" strokeWidth="0.8" />
    </SvgBase>
  );
}

function AccommodationIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <ellipse cx="24" cy="36" rx="14" ry="2.5" fill="#78350F" opacity="0.15" />
      <g filter={`url(#${uid}-soft)`}>
        <path d="M8 32 24 12 40 32Z" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M18 32v-8h12v8" fill="#F59E0B" stroke="#B45309" strokeWidth="1" />
        <path d="M21 28h6v4h-6z" fill="#FFFBEB" stroke="#92400E" strokeWidth="0.8" />
        <path d="M10 32h4M34 32h4" stroke="#57534E" strokeWidth="1.2" strokeLinecap="round" />
      </g>
    </SvgBase>
  );
}

function FitnessIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <path d="M8 20h3M37 26h3" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <g filter={`url(#${uid}-soft)`}>
        <circle cx="22" cy="12" r="4" fill="#FDBA74" stroke="#EA580C" strokeWidth="0.8" />
        <path d="M14 34c1.5-7 4.5-10.5 8-10.5s6.5 3.5 8 10.5" fill="#FB923C" stroke="#C2410C" strokeWidth="0.8" />
        <path d="M26 22l8-4 2.5 4.5-6.5 3z" fill="#0EA5E9" stroke="#0369A1" strokeWidth="0.8" />
        <path d="M14 18l3-2 2 2-2 2z" fill="#4ADE80" stroke="#15803D" strokeWidth="0.6" />
      </g>
    </SvgBase>
  );
}

function PickupIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <circle cx="24" cy="25" r="12" fill={`url(#${uid}-metal)`} stroke="#64748B" strokeWidth="1" />
      <circle cx="24" cy="25" r="9.5" fill="#DCFCE7" stroke="#16A34A" strokeWidth="1.2" />
      <path d="M24 17v8h7" stroke="#14532D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="25" r="1.4" fill="#15803D" />
      <path d="M34 13c3.5 2.5 5.5 6.5 5 11" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M37 11l2 2-2 2" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </SvgBase>
  );
}

function DropoffIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <circle cx="24" cy="25" r="12" fill={`url(#${uid}-metal)`} stroke="#64748B" strokeWidth="1" />
      <circle cx="24" cy="25" r="9.5" fill="#FFEDD5" stroke="#EA580C" strokeWidth="1.2" />
      <path d="M24 17v8h7" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="25" r="1.4" fill="#C2410C" />
      <path d="M14 13c-3.5 2.5-5.5 6.5-5 11" stroke="#FB923C" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M11 11l-2 2 2 2" stroke="#EA580C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </SvgBase>
  );
}

function PackingIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <g filter={`url(#${uid}-soft)`}>
        <path
          d="M14 16c0-2.2 1.8-4 4-4h12c2.2 0 4 1.8 4 4v16c0 2.2-1.8 4-4 4H18c-2.2 0-4-1.8-4-4V16Z"
          fill={`url(#${uid}-pack)`}
          stroke="#292524"
          strokeWidth="1"
        />
        <path d="M18 12h12v4H18z" fill="#57534E" stroke="#292524" strokeWidth="0.8" />
        <rect x="21" y="22" width="6" height="7" rx="1.2" fill="#D6D3D1" stroke="#44403C" strokeWidth="0.8" />
        <path d="M16 20h2M30 20h2" stroke="#A8A29E" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M20 12v-2c0-1 .8-2 2-2h4c1.2 0 2 1 2 2v2" stroke="#78716C" strokeWidth="1.2" />
      </g>
    </SvgBase>
  );
}

function CloakroomIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <ellipse cx="24" cy="37" rx="15" ry="2.5" fill="#0F172A" opacity="0.1" />
      <g filter={`url(#${uid}-soft)`}>
        <rect x="9" y="18" width="13" height="16" rx="2.5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
        <path d="M12 18v-3.5c0-1 .8-1.8 1.8-1.8h5.4c1 0 1.8.8 1.8 1.8V18" stroke="#92400E" strokeWidth="1" fill="none" />
        <rect x="22" y="20" width="14" height="14" rx="2.5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
        <circle cx="29" cy="16" r="2" fill="#0EA5E9" stroke="#0369A1" strokeWidth="0.8" />
        <circle cx="12" cy="34" r="1.2" fill="#57534E" />
        <circle cx="32" cy="34" r="1.2" fill="#57534E" />
      </g>
    </SvgBase>
  );
}

function OffloadingIcon({ uid }: { uid: string }) {
  return (
    <SvgBase uid={uid}>
      <ellipse cx="24" cy="35" rx="12" ry="3" fill="#78716C" opacity="0.25" />
      <g filter={`url(#${uid}-soft)`}>
        <path d="M12 30c1.2-6 4.8-9.5 10-9.5s8.8 3.5 10 9.5" fill="#A8A29E" stroke="#57534E" strokeWidth="1" />
        <rect x="17" y="13" width="14" height="9" rx="1.5" fill="#FDE68A" stroke="#D97706" strokeWidth="0.9" />
        <rect x="19" y="10" width="10" height="5" rx="1.2" fill="#FBBF24" stroke="#B45309" strokeWidth="0.8" />
        <path d="M10 30h4M34 30h4" stroke="#44403C" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.5" fill="#D6D3D1" stroke="#57534E" strokeWidth="0.8" />
      </g>
    </SvgBase>
  );
}

const renderers: Record<string, ({ uid }: { uid: string }) => ReactNode> = {
  difficulty: DifficultyIcon,
  duration: DurationIcon,
  altitude: AltitudeIcon,
  suitable: SuitableIcon,
  basecamp: BasecampIcon,
  accommodation: AccommodationIcon,
  fitness: FitnessIcon,
  pickup: PickupIcon,
  dropoff: DropoffIcon,
  packing: PackingIcon,
  cloakroom: CloakroomIcon,
  offloading: OffloadingIcon,
};

export function HighlightIcon({ id }: IconProps) {
  const Render = renderers[id] ?? renderers.difficulty;
  return <span className="kg-highlight-icon-art">{Render({ uid: `hl-${id}` })}</span>;
}
