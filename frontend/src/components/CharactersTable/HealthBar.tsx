export default function HealthBar({
  current,
  max,
}: {
  current: number;
  max: number;
}) {
  const percentage = (current / max) * 100;
  let colorClass = "bg-green-500";
  if (percentage <= 50) colorClass = "bg-yellow-500";
  if (percentage <= 25) colorClass = "bg-red-500";

  return (
    <div className="flex items-center">
      <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
        <div
          className={`h-2.5 rounded-full ${colorClass}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="text-sm font-mono whitespace-nowrap">
        {current}/{max}
      </span>
    </div>
  );
}
