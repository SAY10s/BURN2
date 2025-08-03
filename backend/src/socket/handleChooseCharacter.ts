import { Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { GameStateSingleton } from "../singletons/GameStateSingleton";

export const handleChooseCharacter = (
  socket: Socket,
  characterID: string,
  updateGameState: () => void
) => {
  const gameState = GameStateSingleton.getInstance();
  gameState.players = gameState.players.map((player) =>
    player.socketID === socket.id
      ? { ...player, controlledCharacterID: characterID }
      : player
  );
  updateGameState();
};
