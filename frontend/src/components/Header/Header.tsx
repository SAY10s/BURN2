import { socket } from "../../hooks/useSocketHandlers";
import type { Player } from "../../shared/types/player";
import type { GameState } from "../../shared/types/gameState";

type HeaderProps = {
  clientPlayer: Player;
  gameState: GameState;
};

export default function Header({ clientPlayer, gameState }: HeaderProps) {
  return (
    <header>
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina {clientPlayer.socketID}{" "}
        {clientPlayer.isGameMaster ? "(GM)" : ""}
      </h1>
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => socket.emit("createRandomCharacter")}
        >
          New character
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => socket.emit("deleteAllCharacters")}
        >
          DELETE ALL CHARACTERS
        </button>
      </div>
      <div className="text-center text-lg text-gray-700">
        {gameState.debugMessage}
      </div>
    </header>
  );
}
