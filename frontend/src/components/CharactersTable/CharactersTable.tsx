import type { Character } from "../../shared/types/character";
import ValueBar from "./ValueBar";
import SkillsTable from "./SkillsTable";
import StatsTable from "./StatsTable";
import ArmorPiece from "./ArmorPiece";

interface CharacterTableProps {
  characters: Character[];
  chooseCharacter: (characterId: string) => void;
  clientsCharacterId: string;
  attackCharacter: (targetID: string) => void;
  gameMasterView: boolean;
}

export default function CharacterTable({
  characters,
  chooseCharacter,
  clientsCharacterId,
  attackCharacter,
  gameMasterView,
}: CharacterTableProps) {
  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      {characters.map((character: Character) => (
        <div
          key={character.id}
          className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition-colors grid grid-rows-auto gap-4"
        >
          {/* Character Info and Bars */}
          <div
            className="grid grid-cols-2"
            style={{ gridTemplateColumns: "30% 70%" }}
          >
            <div
              className="cursor-pointer flex flex-col items-center justify-center"
              onClick={() => {
                chooseCharacter(character.id);
              }}
            >
              <div className={`font-medium text-lg`}>
                {clientsCharacterId === character.id ? (
                  <span className="font-black">→{character.name}</span>
                ) : (
                  character.name
                )}
                <span
                  className={`ml-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    character.isPlayer
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {character.isPlayer ? "Player" : "NPC"}
                </span>
              </div>
              <div className="text-xs text-gray-500 font-mono mt-1">
                ID: {character.id}
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              {/* Status Indicators */}
              <div>
                <div className="flex space-x-2 justify-center text-lg">
                  {character.status.isBleeding && (
                    <span className="text-red-500" title="Bleeding">
                      🩸
                    </span>
                  )}
                  {character.status.isBurning && (
                    <span className="text-orange-500" title="Burning">
                      🔥
                    </span>
                  )}
                  {character.status.isPoisoned && (
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
              {/* Stamina (Mocked Data) */}
              <ValueBar
                current={50} // Mocked current stamina
                max={100} // Mocked max stamina
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
              <div className="grid grid-cols-2 gap-4 mt-4">
                {Object.entries(character.characterArmor).map(
                  ([armorPart, armorPiece]) => (
                    <div key={armorPart}>
                      <ArmorPiece
                        armorPiece={armorPiece}
                        armorPart={armorPart}
                      />
                    </div>
                  )
                )}
              </div>
            )}

            {/* Stats and Skills */}
            <div className="grid grid-cols-2 gap-4 mt-4">
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
            <div className="flex justify-center mt-4">
              <button
                className="flex items-center justify-center cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
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
