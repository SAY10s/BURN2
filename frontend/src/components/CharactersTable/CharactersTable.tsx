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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {characters.map((character: Character) => (
        <div
          key={character.id}
          className="bg-white rounded-lg shadow-md p-4 hover:bg-gray-50 transition-colors"
        >
          {/* Character Info */}
          <div
            className="cursor-pointer"
            onClick={() => {
              chooseCharacter(character.id);
            }}
          >
            <div className={`font-medium`}>
              {clientsCharacterId === character.id ? (
                <span className="font-black">→{character.name}</span>
              ) : (
                character.name
              )}
            </div>
            <div className="text-xs text-gray-500 font-mono mt-1">
              ID: {character.id}
            </div>
          </div>

          {/* Player/NPC Status */}
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                character.isPlayer
                  ? "bg-blue-100 text-blue-800"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              {character.isPlayer ? "Player" : "NPC"}
            </span>
          </div>

          {/* Status Indicators */}
          <div className="mt-4">
            <div className="flex space-x-2">
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
          <div className="mt-4">
            <ValueBar
              current={character.currentHP}
              max={character.maxHP}
              gamemasterView={gameMasterView}
              isPlayer={character.isPlayer}
            />
          </div>

          {/* Armor */}
          {(gameMasterView || character.isPlayer) && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              {Object.entries(character.characterArmor).map(
                ([armorPart, armorPiece]) => (
                  <div key={armorPart} className="mt-2">
                    <ArmorPiece armorPiece={armorPiece} armorPart={armorPart} />
                  </div>
                )
              )}
            </div>
          )}
          <div className="mt-4">
            <StatsTable
              stats={character.stats}
              gamemasterView={gameMasterView}
              isPlayer={character.isPlayer}
            />
          </div>

          {/* Skills - Dynamically rendered */}
          <div className="mt-4">
            <SkillsTable
              skills={character.skills}
              gamemasterView={gameMasterView}
              isPlayer={character.isPlayer}
            />
          </div>

          {/* Attack Button */}
          <div className="mt-4">
            <button
              className="flex items-center justify-center cursor-pointer"
              onClick={() => {
                attackCharacter(character.id);
              }}
            >
              <img src="/fight-icon.png" alt="Attack" className="w-8 h-8" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
