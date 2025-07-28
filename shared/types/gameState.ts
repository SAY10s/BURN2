import { Character } from "./character";
import { Action } from "./action";
import { Player } from "./player";
export interface GameState {
  /**
   * Array of connected players.
   */
  players: Player[];
  /**
   * Array of ALL characters, both Players and NPC's.
   */
  characters: Character[];
  debugMessage: string;
}
