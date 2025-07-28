export const ValueBar = ({
  current,
  max,
  gamemasterView = false,
  isPlayer = false,
}: {
  current: number;
  max: number;
  gamemasterView: boolean;
  isPlayer: boolean;
}) => {
  const percentage = (current / max) * 100;
  let colorClass = "bg-green-500";
  if (percentage <= 50) colorClass = "bg-yellow-500";
  if (percentage <= 25) colorClass = "bg-red-500";

  return (
    <div className="flex items-center flex-col w-full">
      <div className="w-full bg-gray-600 rounded-full overflow-hidden shadow-inner relative">
        <div
          className={`h-4 transition-all duration-300 ${colorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
        {(isPlayer || gamemasterView) && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-mono text-white">
            {current}/{max}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValueBar;
