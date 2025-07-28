import type { Skills } from "../../shared/types/character";

interface SkillsTableProps {
  skills: Skills;
  className?: string;
  showCategory?: boolean;
  gamemasterView: boolean;
  isPlayerSkills: boolean;
}

export default function SkillsTable({
  skills,
  className = "",
  showCategory = false,
  gamemasterView,
  isPlayerSkills,
}: SkillsTableProps) {
  return (
    <div className={`space-y-2 ${className} grid grid-cols-2 gap-x-12 `}>
      {Object.entries(skills).flatMap(([category, skillGroup]) =>
        Object.entries(skillGroup).map(([skill, value]) => (
          <div
            key={`${category}-${skill}`}
            className="grid grid-cols-2 gap-x-2"
          >
            {gamemasterView || isPlayerSkills ? (
              <>
                <span className="text-gray-600 capitalize">
                  {showCategory && `${category} - `}
                  {skill.replace(/([A-Z])/g, " $1").trim()}:
                </span>
                <span className="font-mono text-right">{String(value)}</span>
              </>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}
