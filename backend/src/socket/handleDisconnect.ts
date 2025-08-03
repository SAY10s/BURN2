import { Socket } from "socket.io";
import { GameStateSingleton } from "../singletons/GameStateSingleton";

export const handleDisconnect = async (
  socket: Socket,
  updateGameState: () => void
) => {
  const gameState = GameStateSingleton.getInstance();
  gameState.players = gameState.players.filter(
    (player) => player.socketID !== socket.id
  );
  if (gameState.players[0]) gameState.players[0].isGameMaster = true;
  updateGameState();
};
