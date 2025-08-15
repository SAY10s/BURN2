import { useGameStore } from "../../hooks/useGameStore";
import { socket } from "../../hooks/useSocketHandlers";

export default function Header() {
  const clientPlayer = useGameStore((state) => state.clientPlayer);
  const gameState = useGameStore((state) => state.gameState);

  return (
    <header>
      <h1 className="text-primary mb-4 text-center text-3xl font-bold">
        Walka Wiedźmina {clientPlayer.socketID}{" "}
        {clientPlayer.isGameMaster ? "(GM)" : ""}
      </h1>
      <div className="mb-4 flex justify-center gap-4">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => socket.emit("createRandomCharacter")}
        >
          New character
        </button>
        <button
          className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={() => socket.emit("deleteAllCharacters")}
        >
          DELETE ALL CHARACTERS
        </button>
      </div>
      <div className="text-secondary text-center text-lg">
        {gameState.debugMessage}
      </div>
    </header>
  );
}
