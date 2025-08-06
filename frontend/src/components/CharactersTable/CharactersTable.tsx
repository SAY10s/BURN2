import type { Character } from "../../shared/types/character";
import ValueBar from "./ValueBar";
import SkillsTable from "./SkillsTable";
import StatsTable from "./StatsTable";
import ArmorPiece from "./ArmorPiece";
import { TypesOfStatus } from "../../shared/types/typesOfStatus";

interface CharacterTableProps {
  characters: Character[];
  clientsCharacterId: string;
  gameMasterView: boolean;
  chooseCharacter: (characterId: string) => void;
  attackCharacter: (targetID: string) => void;
}

export default function CharacterTable({
  characters,
  chooseCharacter,
  clientsCharacterId,
  attackCharacter,
  gameMasterView,
}: CharacterTableProps) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-6">
      {characters.map((character: Character) => (
        <div
          key={character.id}
          className="grid-rows-auto grid gap-4 rounded-lg bg-white p-4 shadow-md transition-colors hover:bg-gray-50"
        >
          {/* Character Info and Bars */}
          <div
            className="grid grid-cols-2"
            style={{ gridTemplateColumns: "30% 70%" }}
          >
            <div
              className="flex cursor-pointer flex-col items-center justify-center"
              onClick={() => {
                chooseCharacter(character.id);
              }}
            >
              <div className={`text-lg font-medium`}>
                {clientsCharacterId === character.id ? (
                  <span className="font-black">→{character.name}</span>
                ) : (
                  character.name
                )}
                <span
                  className={`ml-1 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    character.isPlayer
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {character.isPlayer ? "Player" : "NPC"}
                </span>
              </div>
              <div className="mt-1 font-mono text-xs text-gray-500">
                ID: {character.id}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {/* Status Indicators */}
              <div>
                <div className="flex justify-center space-x-2 text-lg">
                  {character.status.includes(TypesOfStatus.BLEEDING) && (
                    <span className="text-red-500" title="Bleeding">
                      🩸
                    </span>
                  )}
                  {character.status.includes(TypesOfStatus.BURN) && (
                    <span className="text-orange-500" title="Burning">
                      🔥
                    </span>
                  )}
                  {character.status.includes(TypesOfStatus.POISON) && (
                    <span className="text-green-500" title="Poisoned">
                      🧪
                    </span>
                  )}
                </div>
              </div>
              {/* Health */}
              <ValueBar
                current={character.currentHP}
                max={character.maxHP}
                gamemasterView={gameMasterView}
                isPlayer={character.isPlayer}
              />
              {/* Stamina */}
              <ValueBar
                current={character.currentStamina}
                max={character.maxStamina}
                gamemasterView={gameMasterView}
                isPlayer={character.isPlayer}
              />
              {/* Stun Score*/}
              <ValueBar
                current={character.currentStunScore}
                max={character.maxStunScore}
                gamemasterView={gameMasterView}
                isPlayer={character.isPlayer}
              />
            </div>
          </div>

          {/* Collapsible Section */}
          <details className="mt-4">
            <summary className="cursor-pointer text-center font-medium">
              More Details
            </summary>
            {/* Armor */}
            {(gameMasterView || character.isPlayer) && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {Object.entries(character.characterArmor).map(
                  ([armorPart, armorPiece]) => (
                    <div key={armorPart}>
                      <ArmorPiece
                        armorPiece={armorPiece}
                        armorPart={armorPart}
                      />
                    </div>
                  ),
                )}
              </div>
            )}

            {/* Stats and Skills */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <StatsTable
                  stats={character.stats}
                  gamemasterView={gameMasterView}
                  isPlayer={character.isPlayer}
                />
              </div>
              <div>
                <SkillsTable
                  skills={character.skills}
                  gamemasterView={gameMasterView}
                  isPlayer={character.isPlayer}
                />
              </div>
            </div>

            {/* Attack Button */}
          </details>
          <div>
            <div className="mt-4 flex justify-center">
              <button
                className="flex cursor-pointer items-center justify-center rounded-full bg-red-500 p-2 text-white hover:bg-red-600"
                onClick={() => {
                  attackCharacter(character.id);
                }}
              >
                ATTACK{" "}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
