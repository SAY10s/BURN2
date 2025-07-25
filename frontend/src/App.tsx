import { useState, useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "./shared/types/gameState";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";
import CharacterTable from "./components/CharactersTable/CharactersTable";

const socket = io("http://localhost:3001");

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);

  useEffect(() => {
    socket.on("updateGameState", (gameState: GameState) => {
      setGameState(gameState);
    });
  }, []);

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
      </div>
      <CharacterTable
        characters={gameState.characters}
        chooseCharacter={chooseCharacter}
      />
    </div>
  );
}
