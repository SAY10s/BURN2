import type { Stats } from "../../shared/types/character";

interface StatsTableProps {
  stats: Stats;
  className?: string;
  isPlayerStats: boolean;
  gamemasterView: boolean;
}

export default function StatsTable({
  stats,
  className = "",
  isPlayerStats,
  gamemasterView,
}: StatsTableProps) {
  if (!gamemasterView && !isPlayerStats) {
    return <div>SECRET!</div>;
  }

  return (
    <div
      className={`space-y-1 grid grid-cols-3 max-w-3xs gap-x-12 ${className}`}
    >
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="grid grid-cols-2 gap-x-2">
          <span className="text-gray-600 uppercase">
            {key[0]}
            {key[1]}
            {key[2]}
          </span>
          <span className="font-mono text-right">{value}</span>
        </div>
      ))}
    </div>
  );
}
