import type { Character } from "../../shared/types/character";
import HealthBar from "./HealthBar";
import SkillsTable from "./SkillsTable";
import StatsTable from "./StatsTable";

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
    <div className="overflow-x-auto">
      <table className="w-full mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden max-w-7xl">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left min-w-[150px]">Name</th>
            <th className="px-4 py-3 text-left min-w-[100px]">Status</th>
            <th className="px-4 py-3 text-left min-w-[150px]">HP</th>
            <th className="px-4 py-3 text-left">Stats</th>
            <th className="px-4 py-3 text-left">Skills</th>
            <th className="px-4 py-3 text-left">x</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {characters.map((character: Character) => (
            <tr
              key={character.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Character Info */}
              <td
                className="px-4 py-3 cursor-pointer"
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
                  {character.status.isBleeding && "🩸"}
                  {character.status.isBurning && "🔥"}
                  {character.status.isPoisoned && "🧪"}
                </div>
                <div className="text-xs text-gray-500 font-mono mt-1">
                  ID: {character.id}
                </div>
              </td>

              {/* Player/NPC Status */}
              <td className="px-4 py-3">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    character.isPlayer
                      ? "bg-blue-100 text-blue-800"
                      : "bg-purple-100 text-purple-800"
                  }`}
                >
                  {character.isPlayer ? "Player" : "NPC"}
                </span>
              </td>

              {/* Health */}
              <td className="px-4 py-3">
                <HealthBar
                  current={character.currentHP}
                  max={character.maxHP}
                  gamemasterView={gameMasterView}
                  isPlayerHealth={character.isPlayer}
                />
              </td>

              {/* Stats - Dynamically rendered */}
              <td className="px-4 py-3">
                <StatsTable
                  stats={character.stats}
                  gamemasterView={gameMasterView}
                  isPlayerStats={character.isPlayer}
                />
              </td>

              {/* Skills - Dynamically rendered */}
              <td className="px-4 py-3">
                <SkillsTable
                  skills={character.skills}
                  gamemasterView={gameMasterView}
                  isPlayerSkills={character.isPlayer}
                />
              </td>
              <td className="px-4 py-3">
                <button
                  className="flex items-center justify-center cursoir-pointer"
                  onClick={() => {
                    attackCharacter(character.id);
                  }}
                >
                  <img src="/fight-icon.png" alt="Attack" className="w-8 h-8" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
