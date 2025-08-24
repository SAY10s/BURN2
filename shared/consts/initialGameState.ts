import type { Character } from "../types/character";
import type { GameState } from "../types/gameState";

const INITIAL_CHARACTERS: Character[] = [
  // generateRandomCharacter(true),
  // generateRandomCharacter(true),
  // generateRandomCharacter(),
  // generateRandomCharacter(),
  // generateRandomCharacter(),
];

export const INITIAL_GAME_STATE: GameState = {
  players: [],
  characters: INITIAL_CHARACTERS,
  debugMessage: "",
};
