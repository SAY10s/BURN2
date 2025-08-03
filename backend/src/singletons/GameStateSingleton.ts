import { GameState } from "../shared/types/gameState";
import { INITIAL_GAME_STATE } from "../shared/consts/initialGameState";

export class GameStateSingleton {
  private static instance: GameState;

  private constructor() {}

  public static getInstance(): GameState {
    if (!GameStateSingleton.instance) {
      GameStateSingleton.instance = { ...INITIAL_GAME_STATE };
    }
    return GameStateSingleton.instance;
  }

  public static reset(): void {
    GameStateSingleton.instance = { ...INITIAL_GAME_STATE };
  }
}
