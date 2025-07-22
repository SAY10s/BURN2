import { Player } from "./player";
import { Action } from "./action";
export interface GameState {
  players: Player[];
  lastAction: Action;
  debugMessage: string;
}
