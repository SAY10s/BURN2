import { Character } from "./character";
import { Action } from "./action";
export interface GameState {
  players: Character[];
  lastAction: Action;
  debugMessage: string;
}
