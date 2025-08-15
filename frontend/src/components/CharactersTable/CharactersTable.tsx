import { useState } from "react";
import type { Character } from "../../shared/types/character";
import ValueBar from "./ValueBar";
import SkillsTable from "./SkillsTable";
import StatsTable from "./StatsTable";
import { TypesOfStatus } from "../../shared/types/typesOfStatus";
import ArmorTable from "./ArmorTable";
import { useGameStore } from "../../hooks/useGameStore";

interface CharacterTableProps {
  chooseCharacter: (characterId: string) => void;
  attackCharacter: (targetID: string) => void;
}

export default function CharacterTable({
  chooseCharacter,
  attackCharacter,
}: CharacterTableProps) {
  const characters = useGameStore((state) => state.gameState.characters);
  const clientsCharacterID = useGameStore(
    (state) => state.clientPlayer.controlledCharacterID,
  );

  const [visibleDetails, setVisibleDetails] = useState<Record<string, boolean>>(
    {},
  );

  const toggleDetailsDiv = (id: string) => {
    setVisibleDetails((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <details className="" open>
      <summary className="cursor-pointer px-4 py-3 text-center text-2xl uppercase">
        POSTACIE
      </summary>
      <div className="border-border w-full border-4 border-double">
        <div className="border-border grid grid-cols-4 border-b-4 border-double px-4 py-3 pl-6">
          <div className="text-left font-bold">Imię</div>
          <div className="text-center font-bold">Status</div>
          <div className="text-center font-bold">HP/Stamina/Stun</div>
          <div className="text-center font-bold"></div>
        </div>
        {characters.map((character: Character) => {
          let color = "";
          if (character.isPlayer) {
            color = "from-witcher-yellow";
          }
          if (clientsCharacterID === character.id) {
            color = "from-witcher-red";
          }

          let wrapperClass = visibleDetails[character.id] ? "border-2" : "";
          if (visibleDetails[character.id]) {
            wrapperClass = ` to-transparent-special ${color} border-4 border-border border-double grid grid-cols-4 bg-gradient-to-r to-50% px-3 py-2`;
          } else
            wrapperClass = ` to-transparent-special ${color} m-2 grid grid-cols-4 bg-gradient-to-r to-50% px-4 py-3`;

          let conditionalClass2 = visibleDetails[character.id]
            ? "border-2"
            : "";
          if (visibleDetails[character.id]) {
            conditionalClass2 = ` m-2`;
          } else conditionalClass2 = ` m-0`;

          return (
            <div key={character.id} className={conditionalClass2}>
              <div className={`${wrapperClass}`}>
                {/* Name & Type */}
                <div
                  className="flex cursor-pointer flex-col items-start justify-center"
                  onClick={() => chooseCharacter(character.id)}
                >
                  <div className="text-lg font-medium">{character.name}</div>
                  <div className="mt-1 font-mono text-xs text-gray-500">
                    ID: {character.id}
                  </div>
                </div>
                {/* Status */}
                <div className="flex flex-col items-center justify-center">
                  <div className="flex justify-center space-x-2 text-lg">
                    {character.status.includes(TypesOfStatus.BLEEDING) && (
                      <span className="text-red-500" title="Krwawienie">
                        🩸
                      </span>
                    )}
                    {character.status.includes(TypesOfStatus.BURN) && (
                      <span className="text-orange-500" title="Podpalenie">
                        🔥
                      </span>
                    )}
                    {character.status.includes(TypesOfStatus.POISON) && (
                      <span className="text-green-500" title="Zatrucie">
                        🧪
                      </span>
                    )}
                  </div>
                </div>
                {/* Bars */}
                <div className="flex flex-col items-center justify-center space-y-2">
                  <ValueBar
                    current={character.currentHP}
                    max={character.maxHP}
                    height="h-3"
                    isPlayer={character.isPlayer}
                  />
                  <div className="grid w-full grid-cols-2 gap-2">
                    <ValueBar
                      current={character.currentStamina}
                      max={character.maxStamina}
                      bgColor="bg-bar-stamina"
                      isPlayer={character.isPlayer}
                    />
                    <ValueBar
                      current={character.currentStunScore}
                      max={character.maxStunScore}
                      bgColor="bg-bar-stun"
                      isPlayer={character.isPlayer}
                    />
                  </div>
                </div>
                {/* Actions */}
                <div className="flex justify-center gap-2">
                  <button
                    className="border-witcher-yellow k bg-witcher-yellow text-secondary hover:bg-witcher-orange cursor-pointer border-4 border-double px-8 py-2 font-bold transition-colors"
                    onClick={() => attackCharacter(character.id)}
                  >
                    ATTACK
                  </button>
                  <button
                    className="border-witcher-yellow bg-witcher-yellow text-secondary hover:bg-witcher-orange w-12 cursor-pointer border-4 border-double font-bold transition-colors"
                    onClick={() => toggleDetailsDiv(character.id)}
                  >
                    a
                  </button>
                </div>
              </div>
              {visibleDetails[character.id] && (
                <>
                  <div className="grid grid-cols-4">
                    <StatsTable
                      stats={character.stats}
                      isPlayer={character.isPlayer}
                    />
                    <ArmorTable
                      characterArmor={character.characterArmor}
                      isPlayer={character.isPlayer}
                      className="col-span-2"
                    />
                    <SkillsTable
                      skills={character.skills}
                      isPlayer={character.isPlayer}
                    />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </details>
  );
}
