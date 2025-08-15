import { useGameStore } from "../../hooks/useGameStore";
import { SKILLS_TRANSLATION, type Skills } from "../../shared/types/character";
import { STATS_TRANSLATION } from "../../shared/types/character";

interface SkillsTableProps {
  skills: Skills;
  className?: string;
  showCategory?: boolean;
  isPlayer: boolean;
}

export default function SkillsTable({
  skills,
  className = "",
  isPlayer,
}: SkillsTableProps) {
  const gameMasterView = useGameStore(
    (state) => state.clientPlayer.isGameMaster,
  );

  return (
    <>
      {(gameMasterView || isPlayer) && (
        <div className={`${className} `}>
          {Object.entries(skills).map(([category, skillGroup]) => (
            <div key={category} className="">
              <div className="border-border border-4 border-double">
                <div className="border-border flex border-b-2">
                  <div className="text-primary w-2/3 px-4 py-2 text-left font-semibold uppercase">
                    {STATS_TRANSLATION?.[
                      category.replace(
                        "Skills",
                        "",
                      ) as keyof typeof STATS_TRANSLATION
                    ] || category}
                  </div>
                  <div className="text-secondary w-1/3 px-4 py-2 text-right font-semibold uppercase">
                    Wartość
                  </div>
                </div>
                {Object.entries(skillGroup).map(([skill, value], idx) => (
                  <div
                    key={`${category}-${skill}`}
                    className={`border-border flex border-b last:border-b-0 ${
                      idx % 2 === 0 ? "" : ""
                    }`}
                  >
                    <div className="text-primary w-2/3 px-4 py-2">
                      {SKILLS_TRANSLATION?.[
                        skill as keyof typeof SKILLS_TRANSLATION
                      ] || skill}
                    </div>
                    <div className="text-secondary w-1/3 px-4 py-2 text-right font-mono text-xl font-semibold">
                      {String(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
