import { Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { isPlayerAdmin } from "../shared/helpers/characterGetters";

export const changeGameMaster = (
  socket: Socket,
  gameState: GameState,
  /**
   * socket id of player, that should become a gamemaster
   */
  socketID: string,
  updateGameState: () => void
) => {
  if (isPlayerAdmin(socket.id, gameState.players))
    gameState.players = gameState.players.map((player) =>
      player.socketID === socketID
        ? { ...player, isGameMaster: true }
        : { ...player, isGameMaster: false }
    );
  updateGameState();
};
