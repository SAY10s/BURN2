import { STATS_TRANSLATION, type Stats } from "../../shared/types/character";

interface StatsTableProps {
  stats: Stats;
  className?: string;
  isPlayer: boolean;
  gameMasterView: boolean;
}

export default function StatsTable({
  stats,
  className = "",
  isPlayer,
  gameMasterView,
}: StatsTableProps) {
  if (!gameMasterView && !isPlayer) {
    return <></>;
  }

  return (
    <div
      className={`grid max-w-3xs grid-cols-2 space-y-1 gap-x-12 ${className}`}
    >
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="grid grid-cols-2 gap-x-2">
          <span className="text-gray-600 uppercase">
            {STATS_TRANSLATION[key as keyof Stats] || key}
          </span>
          <span className="text-right font-mono">{value}</span>
        </div>
      ))}
    </div>
  );
}
