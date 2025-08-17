import { useGameStore } from "../../hooks/useGameStore";
import { socket } from "../../hooks/useSocketHandlers";
import Button from "../UI/Button";

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
        <Button onClick={() => socket.emit("createRandomCharacter")}>
          New character
        </Button>
        <Button onClick={() => socket.emit("deleteAllCharacters")}>
          DELETE ALL CHARACTERS
        </Button>
      </div>
      <div className="text-secondary text-center text-lg">
        {gameState.debugMessage}
      </div>
    </header>
  );
}
