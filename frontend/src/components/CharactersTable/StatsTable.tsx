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
      className={`border-border m-2 grid grid-cols-3 gap-x-16 gap-y-2 border-4 border-double p-4 ${className} `}
    >
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="flex items-center justify-between">
          <div className="text-primary uppercase">
            {STATS_TRANSLATION[key as keyof Stats] || key}
          </div>
          <div className="text-secondary text-right font-mono text-xl font-semibold">
            {value}
          </div>
        </div>
      ))}
    </div>
  );
}
