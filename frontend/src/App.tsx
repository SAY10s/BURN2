import { useState, useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "./shared/types/gameState";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";
import CharacterTable from "./components/CharactersTable/CharactersTable";
import PlayersTable from "./components/PlayersTable/PlayersTable";

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
  const changePlayersRole = (socketID: string) => {
    socket.emit("changePlayersRole", socketID);
  };
  const addCharacter = () => {
    socket.emit("createCharacter");
  };

  return (
    <div className="p-4 mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina
      </h1>
      <div
        onClick={() => {
          addCharacter();
        }}
      >
        New char
      </div>
      <div className="text-center text-lg text-gray-700">
        {gameState.lastAction.actorSocketID} zadał{" "}
        {gameState.lastAction.weapon.damage} graczowi
        {gameState.lastAction.targetSocketID}
      </div>
      <div className="text-center text-lg text-gray-700">
        {gameState.debugMessage}
      </div>
      <div className="p-2">
        <PlayersTable
          players={gameState.players}
          changePlayersRole={changePlayersRole}
        />
      </div>
      <CharacterTable
        characters={gameState.characters}
        chooseCharacter={chooseCharacter}
      />
    </div>
  );
}
