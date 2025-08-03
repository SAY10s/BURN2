import { Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { isPlayerAdmin } from "../shared/helpers/characterGetters";
import { GameStateSingleton } from "../singletons/GameStateSingleton";

export const handleChangeGameMaster = (
  socket: Socket,
  /**
   * socket id of player, that should become a gamemaster
   */
  socketID: string,
  updateGameState: () => void
) => {
  const gameState = GameStateSingleton.getInstance();
  if (isPlayerAdmin(socket.id, gameState.players))
    gameState.players = gameState.players.map((player) =>
      player.socketID === socketID
        ? { ...player, isGameMaster: true }
        : { ...player, isGameMaster: false }
    );
  updateGameState();
};
