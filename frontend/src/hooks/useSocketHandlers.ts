import { useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "../shared/types/gameState";
import type { AttackData } from "../shared/types/attackData";
import type { Player } from "../shared/types/player";
import { getPlayerByPlayersSocketId } from "../shared/helpers/characterGetters";

const socket = io("http://localhost:3001");

export function useSocketHandlers(
  setGameState: (state: GameState) => void,
  setClientsCharacterID: (id: string) => void,
  setShowDefenceModal: (show: boolean) => void,
  setShowGameMastersApprovalModal: (show: boolean) => void,
  setAttackData: (data: AttackData) => void,
  setClientPlayer: (player: Player) => void
) {
  useEffect(() => {
    socket.on("updateGameState", (gameState: GameState) => {
      setGameState(gameState);
      const controlledCharacterID = gameState.players.find(
        (player) => player.socketID === socket.id
      )?.controlledCharacterID;
      setClientsCharacterID(controlledCharacterID || "none");
      setClientPlayer(getPlayerByPlayersSocketId(socket.id, gameState.players));
    });

    socket.on("updateAttackData", (attackData: AttackData) => {
      setAttackData(attackData);
    });

    socket.on("requestDefence", () => {
      setShowDefenceModal(true);
    });

    socket.on("requestGameMastersApproval", () => {
      setShowGameMastersApprovalModal(true);
    });
  }, []);
}

export { socket };
