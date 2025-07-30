import { Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";

export const handleChooseCharacter = (
  socket: Socket,
  gameState: GameState,
  characterID: string,
  updateGameState: () => void
) => {
  gameState.players = gameState.players.map((player) =>
    player.socketID === socket.id
      ? { ...player, controlledCharacterID: characterID }
      : player
  );
  updateGameState();
};
