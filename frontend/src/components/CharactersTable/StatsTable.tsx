import { useGameStore } from "../../hooks/useGameStore";
import { STATS_TRANSLATION, type Stats } from "../../shared/types/character";

interface StatsTableProps {
  stats: Stats;
  className?: string;
  isPlayer: boolean;
  currentHP: number;
  maxHP: number;
}

export default function StatsTable({
  stats,
  className = "",
  isPlayer,
  currentHP,
  maxHP,
}: StatsTableProps) {
  const gameMasterView = useGameStore(
    (state) => state.clientPlayer.isGameMaster,
  );

  if (!gameMasterView && !isPlayer) {
    return <></>;
  }
  const currentHPPercentage = (currentHP / maxHP) * 100;

  return (
    <div className={`${className} grid grid-cols-1`}>
      <div className="border-border border-4 border-double">
        <div className="border-border flex border-b-2">
          <div className="text-primary w-2/3 px-4 py-2 text-left font-semibold uppercase">
            Statystyka
          </div>
          <div className="text-secondary w-1/3 px-4 py-2 text-right font-semibold uppercase">
            Wartość
          </div>
        </div>
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className={`border-border flex border-b`}>
            <div className="text-primary w-2/3 px-4 py-2">
              {STATS_TRANSLATION[key as keyof Stats] || key}
            </div>
            <div className="text-secondary w-1/3 px-4 py-2 text-right font-mono text-xl font-semibold">
              {
                <DerrivedValue
                  value={value}
                  currentHPPercentage={currentHPPercentage}
                  statsName={key}
                />
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
interface DerivedValueProps {
  value: number;
  currentHPPercentage: number;
  statsName: string;
}

const DerrivedValue = ({
  value,
  currentHPPercentage,
  statsName,
}: DerivedValueProps) => {
  const deepWoundsAffectedStats = [
    "reflex",
    "will",
    "dexterity",
    "intelligence",
  ];

  if (currentHPPercentage < 0) {
    return (
      <>
        <span className="text-red-700">{Math.floor(value / 3)}</span>{" "}
        <span className="line-through">{value}</span>
      </>
    );
  }
  if (currentHPPercentage < 50) {
    if (deepWoundsAffectedStats.includes(statsName)) {
      return (
        <>
          <span className="text-red-700">{Math.floor(value / 2)}</span>{" "}
          <span className="line-through">{value}</span>
        </>
      );
    }
  }
  return <span>{value}</span>;
};
