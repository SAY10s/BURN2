import { SKILLS_TRANSLATION, type Skills } from "../../shared/types/character";

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
  gameMasterView,
  isPlayer,
}: SkillsTableProps) {
  return (
    <>
      {(gameMasterView || isPlayer) && (
        <div
          className={`border-border m-2 grid grid-cols-3 gap-x-16 gap-y-2 border-4 border-double p-4 ${className}`}
        >
          {Object.entries(skills).flatMap(([category, skillGroup]) =>
            Object.entries(skillGroup).map(([skill, value]) => (
              <div
                key={`${category}-${skill}`}
                className="flex items-center justify-between"
              >
                <div className="text-primary uppercase">
                  {SKILLS_TRANSLATION?.[
                    skill as keyof typeof SKILLS_TRANSLATION
                  ] || skill}
                </div>
                <div className="text-secondary text-right font-mono text-xl font-semibold">
                  {String(value)}
                </div>
              </div>
            )),
          )}
        </div>
      )}
    </>
  );
}
