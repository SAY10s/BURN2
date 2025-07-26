import { useState, useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "./shared/types/gameState";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";
import CharacterTable from "./components/CharactersTable/CharactersTable";
import PlayersTable from "./components/PlayersTable/PlayersTable";
import type { Character } from "./shared/types/character";
const socket = io("http://localhost:3001");

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [clientsCharacterID, setClientsCharacterID] = useState("");

  const [showDefenceModal, setShowDefenceModal] = useState(false);
  const [defenceMessage, setDefenceMessage] = useState("");

  useEffect(() => {
    socket.on("updateGameState", (gameState: GameState) => {
      setGameState(gameState);
      const controlledCharacterID = gameState.players.find(
        (player) => player.socketID === socket.id
      )?.controlledCharacterID;
      setClientsCharacterID(controlledCharacterID || "none");
    });

    socket.on("requestDefence", (actorCharacter: Character) => {
      setShowDefenceModal(true);
      setDefenceMessage(`${actorCharacter.name} zaatakował Cię!`);
    });
  }, []);

  const defendSelf = (typeOfDefence: "DODGE" | "REPOSITION") => {
    socket.emit("defend", typeOfDefence);
    setShowDefenceModal(false);
  };
  const chooseCharacter = (characterID: string) => {
    socket.emit("chooseCharacter", characterID);
  };
  const changePlayersRole = (socketID: string) => {
    socket.emit("changePlayersRole", socketID);
  };
  const addCharacter = () => {
    socket.emit("createCharacter");
  };
  const attackCharacter = (targetCharacterID: string) => {
    socket.emit("attackCharacter", targetCharacterID);
  };

  return (
    <div className="p-4 mx-auto bg-gray-100 rounded-lg shadow-md relative">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina
      </h1>
      <div onClick={addCharacter}>New char</div>

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
        clientsCharacterId={clientsCharacterID}
        attackCharacter={attackCharacter}
      />

      {showDefenceModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
              En garde!
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              {defenceMessage}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  defendSelf("DODGE");
                }}
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                Dodge
              </button>
              <button
                onClick={() => {
                  defendSelf("REPOSITION");
                }}
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                Reposition
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
