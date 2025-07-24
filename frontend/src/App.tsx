import { useState, useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "./shared/types/gameState";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";
import type { Character } from "./shared/types/character";

const socket = io("http://localhost:3001");

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  useEffect(() => {
    socket.on("updateGameState", (gameState: GameState) => {
      setGameState(gameState);
    });
  }, []);

  // const handleAttack = (target: string) => {
  //   const numberOfDice: number = Math.floor(Math.random() * 5) + 1;
  //   const damage = `${numberOfDice}d6`;
  //   const attackData = {
  //     actor: socket.id,
  //     target: target,
  //     name: "Atak mieczem",
  //     damage: damage,
  //   };
  //   socket.emit("playerAction", attackData);
  // };
  const chooseCharacter = (characterID: string) => {
    socket.emit("chooseCharacter", characterID);
  };

  return (
    <div className="p-4 mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina
      </h1>
      <div className="text-center text-lg text-gray-700">
        {gameState.lastAction.actorSocketID} zadał{" "}
        {gameState.lastAction.weapon.damage} graczowi
        {gameState.lastAction.targetSocketID}
      </div>
      <div className="text-center text-lg text-gray-700">
        {gameState.debugMessage}
      </div>
      <div className="p-2">
        <table className="w-full max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Socket ID</th>
              <th className="px-4 py-3 text-left">Character ID</th>
              <th className="px-4 py-3 text-left">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {gameState.players.map((player) => (
              <tr
                key={player.socketID}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-mono text-gray-700 truncate max-w-[120px]">
                  {player.socketID}
                </td>
                <td className="px-4 py-3 text-sm font-mono text-gray-700 truncate max-w-[120px]">
                  {player.controlledCharacterID}
                </td>
                <td className="px-4 py-3 text-sm font-medium">
                  {(player.isGameMaster && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      GM
                    </span>
                  )) || (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      Player
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* {gameState.characters.map((character) => {
          return (
            <div>
              <div>
                {character.name} ({character.currentHP}/{character.maxHP})
              </div>

              <button
                onClick={() => {
                  handleAttack(socket.socketID);
                }}
                className="block w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors mb-4"
              >
                Atak
              </button>
            </div>
          );
        })} */}
      </div>
      <CharacterTable
        characters={gameState.characters}
        chooseCharacter={chooseCharacter}
      />
    </div>
  );
}
interface CharacterTableProps {
  characters: Character[];
  chooseCharacter: (characterId: string) => void;
}

const CharacterTable = ({
  characters,
  chooseCharacter,
}: CharacterTableProps) => {
  // Dynamic column generator
  const renderStatCells = (stats: Character["stats"]) => {
    return Object.entries(stats).map(([key, value]) => (
      <div key={key} className="grid grid-cols-2 gap-x-2">
        <span className="text-gray-600 capitalize">{key}:</span>
        <span className="font-mono text-right">{value}</span>
      </div>
    ));
  };

  const renderSkillCells = (skills: Character["skills"]) => {
    return Object.entries(skills).flatMap(([category, skillGroup]) =>
      Object.entries(skillGroup).map(([skill, value]) => (
        <div key={`${category}-${skill}`} className="grid grid-cols-2 gap-x-2">
          <span className="text-gray-600 capitalize">
            {skill.replace(/([A-Z])/g, " $1").trim()}:
          </span>
          <span className="font-mono text-right">{value}</span>
        </div>
      ))
    );
  };

  // Health bar component
  const HealthBar = ({ current, max }: { current: number; max: number }) => {
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
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="px-4 py-3 text-left min-w-[150px]">Name</th>
            <th className="px-4 py-3 text-left min-w-[100px]">Status</th>
            <th className="px-4 py-3 text-left min-w-[150px]">HP</th>
            <th className="px-4 py-3 text-left min-w-[150px]">Stats</th>
            <th className="px-4 py-3 text-left min-w-[150px]">Skills</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {characters.map((character) => (
            <tr
              key={character.id}
              className="hover:bg-gray-50 transition-colors"
            >
              {/* Character Info */}
              <td className="px-4 py-3">
                <div
                  className="font-medium"
                  onClick={() => {
                    chooseCharacter(character.id);
                  }}
                >
                  {character.name}
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
                />
              </td>

              {/* Stats - Dynamically rendered */}
              <td className="px-4 py-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {renderStatCells(character.stats)}
                </div>
              </td>

              {/* Skills - Dynamically rendered */}
              <td className="px-4 py-3">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  {renderSkillCells(character.skills)}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
