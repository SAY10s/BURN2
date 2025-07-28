import { useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "../shared/types/gameState";
import type { Character } from "../shared/types/character";
import type { AttackData } from "../shared/types/attackData";

const socket = io("http://localhost:3001");

export function useSocketHandlers(
  setGameState: (state: GameState) => void,
  setClientsCharacterID: (id: string) => void,
  setShowDefenceModal: (show: boolean) => void,
  setDefenceMessage: (msg: string) => void,
  setShowGameMastersApprovalModal: (show: boolean) => void,
  setAttackData: (data: AttackData) => void
) {
  useEffect(() => {
    socket.on("updateGameState", (gameState: GameState) => {
      setGameState(gameState);
      const controlledCharacterID = gameState.players.find(
        (player) => player.socketID === socket.id
      )?.controlledCharacterID;
      setClientsCharacterID(controlledCharacterID || "none");
    });

    socket.on("requestDefence", (actorCharacter: Character) => {
      setShowDefenceModal(true);
      setDefenceMessage(`${actorCharacter.name} zaatakował Cię!`);
    });

    socket.on("requestGameMastersApproval", (attackData: AttackData) => {
      setShowGameMastersApprovalModal(true);
      setAttackData(attackData);
    });
  }, []);
}

export { socket };
