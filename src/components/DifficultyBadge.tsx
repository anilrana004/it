export default function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const levels = ['Easy', 'Easy to Moderate', 'Moderate', 'Moderate-Difficult', 'Difficult'];
  const idx = levels.indexOf(difficulty);
  const pct = idx >= 0 ? ((idx + 1) / levels.length) * 100 : 50;

  const colors = idx <= 1 ? 'bg-[#afde1e]' : idx === 2 ? 'bg-[#F5A623]' : 'bg-[#afde1e]';

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-gray-700">{difficulty}</span>
      <div className="flex-1 max-w-[120px] h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${colors}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
