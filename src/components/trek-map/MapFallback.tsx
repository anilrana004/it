'use client';

type Props = {
  message: string;
  detail?: string;
};

export default function MapFallback({ message, detail }: Props) {
  return (
    <div className="tm-fallback" role="status">
      <div className="tm-fallback-inner">
        <i className="fa-solid fa-map-location-dot" aria-hidden />
        <p>{message}</p>
        {detail && <p className="tm-fallback-detail">{detail}</p>}
      </div>
    </div>
  );
}
