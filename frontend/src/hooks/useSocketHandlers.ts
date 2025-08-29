import { useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "../shared/types/gameState";
import type { AttackData } from "../shared/types/attackData";
import { getPlayerByPlayersSocketId } from "../shared/helpers/characterGetters";
import { useGameStore } from "./useGameStore";

const socketUrl =
  window.location.hostname === "localhost" ? "http://localhost:3001" : "/";
const socket = io(socketUrl, { path: "/socket.io" });

export function useSocketHandlers(
  setShowDefenceModal: (show: boolean) => void,
  setShowGMsApprovalModal: (show: boolean) => void,
) {
  const setGameState = useGameStore((state) => state.setGameState);
  const setAttackData = useGameStore((state) => state.setAttackData);
  const setClientPlayer = useGameStore((state) => state.setClientPlayer);
  const setAnimationData = useGameStore((state) => state.setAnimationData);

  useEffect(() => {
    socket.on(
      "updateGameState",
      ({
        gameState,
        animationDelay,
      }: {
        gameState: GameState;
        animationDelay: number;
      }) => {
        setAnimationData({ isAnimating: true, duration: animationDelay });
        setTimeout(() => {
          setGameState(gameState);
          setClientPlayer(
            getPlayerByPlayersSocketId(socket.id, gameState.players),
          );
          setAnimationData({ isAnimating: false, duration: 0 });
        }, animationDelay);
      },
    );

    socket.on("updateAttackData", (attackData: AttackData) => {
      setAttackData(attackData);
    });

    socket.on("requestDefence", () => {
      setShowDefenceModal(true);
    });

    socket.on("requestGameMastersApproval", () => {
      setShowGMsApprovalModal(true);
    });
  }, []);
}

export { socket };
