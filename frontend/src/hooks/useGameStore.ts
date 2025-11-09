import { create } from "zustand";
import type { GameState } from "../shared/types/gameState";
import type { AttackData } from "../shared/types/attackData";
import { INITIAL_GAME_STATE } from "../shared/consts/initialGameState";
import { INITIAL_ATTACK_DATA } from "../shared/consts/initialAttackData";
import type { TypesOfStatus } from "../shared/types/typesOfStatus";

interface GameStore {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  attackData: AttackData;
  setAttackData: (data: AttackData) => void;

  clientPlayer: {
    controlledCharacterID: string;
    isGameMaster: boolean;
    socketID: string;
  };
  setClientPlayer: (player: {
    controlledCharacterID: string;
    isGameMaster: boolean;
    socketID: string;
  }) => void;

  animationData: {
    isAnimating: boolean;
    duration: number;
  };
  setAnimationData: (data: { isAnimating: boolean; duration: number }) => void;

  updateCharacterStat: (
    characterID: string,
    stat: "currentHP" | "currentStamina" | "currentStunScore",
    delta: number,
  ) => void;
  switchIsAlive: (characterID: string) => void;
  switchStatusEffect: (characterID: string, status: TypesOfStatus) => void;
}

export const useGameStore = create<GameStore>((set) => ({
  gameState: INITIAL_GAME_STATE,
  setGameState: (state) => set({ gameState: state }),
  attackData: INITIAL_ATTACK_DATA,
  setAttackData: (data) => set({ attackData: data }),
  clientPlayer: {
    controlledCharacterID: "",
    isGameMaster: false,
    socketID: "",
  },
  setClientPlayer: (player) => set({ clientPlayer: player }),
  animationData: {
    isAnimating: false,
    duration: 1000,
  },
  setAnimationData: (data) => set({ animationData: data }),
  updateCharacterStat: (characterID, stat, delta) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        characters: state.gameState.characters.map((char) =>
          char.id === characterID
            ? { ...char, [stat]: (char[stat] as number) + delta }
            : char,
        ),
      },
    })),
  switchIsAlive: (characterID) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        characters: state.gameState.characters.map((char) =>
          char.id === characterID ? { ...char, isAlive: !char.isAlive } : char,
        ),
      },
    })),
  switchStatusEffect: (characterID, status) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        characters: state.gameState.characters.map((char) => {
          if (char.id === characterID) {
            const hasStatus = char.status.includes(status);
            return {
              ...char,
              status: hasStatus
                ? char.status.filter((s) => s !== status)
                : [...char.status, status],
            };
          }
          return char;
        }),
      },
    })),
}));
