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
    const handleUpdateGameState = ({
      gameState,
      animationDelay,
    }: {
      gameState: GameState;
      animationDelay: number;
    }) => {
      console.log("Received game state update from server", {
        animationDelay,
      });
      if (animationDelay > 0) {
        console.log("Playing animation sound");
        const animationSound = new Audio("/sounds/skillcheck.mp3");
        animationSound.play();
      }
      setAnimationData({ isAnimating: true, duration: animationDelay });
      setTimeout(() => {
        setGameState(gameState);
        setClientPlayer(
          getPlayerByPlayersSocketId(socket.id, gameState.players),
        );
        setAnimationData({ isAnimating: false, duration: 0 });
      }, animationDelay);
    };

    const handleUpdateAttackData = (attackData: AttackData) => {
      setAttackData(attackData);
    };

    const handleRequestDefence = () => {
      setShowDefenceModal(true);
    };

    const handleRequestGameMastersApproval = () => {
      setShowGMsApprovalModal(true);
    };

    socket.on("updateGameState", handleUpdateGameState);
    socket.on("updateAttackData", handleUpdateAttackData);
    socket.on("requestDefence", handleRequestDefence);
    socket.on("requestGameMastersApproval", handleRequestGameMastersApproval);

    return () => {
      socket.off("updateGameState", handleUpdateGameState);
      socket.off("updateAttackData", handleUpdateAttackData);
      socket.off("requestDefence", handleRequestDefence);
      socket.off(
        "requestGameMastersApproval",
        handleRequestGameMastersApproval,
      );
    };
  }, []);
}

export { socket };
