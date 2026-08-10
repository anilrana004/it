/** Colorful AI petal ring — transparent, no background */
export default function AssistantIcon({
  className = 'h-7 w-7',
  id = 'ai',
}: {
  className?: string;
  id?: string;
}) {
  // 8 petals matching the reference icon
  const petals = Array.from({ length: 8 }, (_, i) => ({
    rot: i * 45,
    g: i,
  }));

  const colors = [
    ['#ff4db8', '#ff2d95'],
    ['#ff3dce', '#d63bff'],
    ['#c44dff', '#9b4dff'],
    ['#8b5cff', '#5b6bff'],
    ['#4d7cff', '#2eb7ff'],
    ['#3d8bff', '#5b6bff'],
    ['#7a4dff', '#b44dff'],
    ['#e14bff', '#ff5ec8'],
  ];

  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" fill="none">
      <defs>
        {colors.map(([a, b], i) => (
          <linearGradient key={i} id={`${id}-g${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={a} />
            <stop offset="100%" stopColor={b} />
          </linearGradient>
        ))}
      </defs>
      {petals.map((p) => (
        <ellipse
          key={p.rot}
          cx="32"
          cy="13.5"
          rx="5.8"
          ry="11"
          fill={`url(#${id}-g${p.g})`}
          transform={`rotate(${p.rot} 32 32)`}
        />
      ))}
    </svg>
  );
}
