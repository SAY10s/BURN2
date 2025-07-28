import { Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";

export const disconnect = async (
  socket: Socket,
  gameState: GameState,
  updateGameState: () => void
) => {
  gameState.players = gameState.players.filter(
    (player) => player.socketID !== socket.id
  );
  if (gameState.players[0]) gameState.players[0].isGameMaster = true;
  updateGameState();
};
