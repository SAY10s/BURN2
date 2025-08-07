import type { Skills } from "../../shared/types/character";

interface SkillsTableProps {
  skills: Skills;
  className?: string;
  showCategory?: boolean;
  gameMasterView: boolean;
  isPlayer: boolean;
}

export default function SkillsTable({
  skills,
  className = "",
  showCategory = false,
  gameMasterView,
  isPlayer,
}: SkillsTableProps) {
  return (
    <div className={`space-y-2 ${className} grid grid-cols-2 gap-x-12`}>
      {Object.entries(skills).flatMap(([category, skillGroup]) =>
        Object.entries(skillGroup).map(([skill, value]) => (
          <div
            key={`${category}-${skill}`}
            className="grid grid-cols-2 gap-x-2"
          >
            {gameMasterView || isPlayer ? (
              <>
                <span className="text-gray-600 capitalize">
                  {showCategory && `${category} - `}
                  {skill.replace(/([A-Z])/g, " $1").trim()}:
                </span>
                <span className="text-right font-mono">{String(value)}</span>
              </>
            ) : null}
          </div>
        )),
      )}
    </div>
  );
}
