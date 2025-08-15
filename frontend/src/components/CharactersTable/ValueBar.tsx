export const ValueBar = ({
  current,
  max,
  bgColor = "bg-bar-health",
  gamemasterView = false,
  height = "h-1",
  isPlayer = false,
}: {
  current: number;
  max: number;
  bgColor?: string;
  gamemasterView?: boolean;
  height?: string;
  isPlayer?: boolean;
}) => {
  let percentage = (current / max) * 100;
  if (percentage <= 0) percentage = 0;
  if (percentage >= 100) percentage = 100;

  return (
    <div className="flex w-full">
      <div className="border-border group relative w-full border-2 border-double">
        <div
          className={`${bgColor} m-0.5 ${height} transition-all duration-1000`}
          style={{
            width: percentage >= 100 ? "calc(100% - 4px)" : `${percentage}%`,
          }}
        ></div>
        {(isPlayer || gamemasterView) && (
          <div className="pointer-events-none absolute top-full left-1/2 z-10 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
            {current}/{max}
          </div>
        )}
      </div>
    </div>
  );
};

export default ValueBar;
