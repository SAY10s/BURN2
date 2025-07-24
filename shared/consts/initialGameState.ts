import { generateRandomCharacter } from "../helpers/generateRandomCharacter";
import { Character } from "../types/character";
import { GameState } from "../types/gameState";

const INITIAL_CHARACTERS: Character[] = [
  generateRandomCharacter(true),
  generateRandomCharacter(true),
  generateRandomCharacter(),
  generateRandomCharacter(),
  generateRandomCharacter(),
];

export const INITIAL_GAME_STATE: GameState = {
  players: [],
  characters: INITIAL_CHARACTERS,
  lastAction: {
    actorSocketID: "",
    targetSocketID: "",
    actionName: "Strong attack",
    type: "ATTACK",
    weapon: {
      damage: "2d6",
      name: "Battle axe",
    },
  },
  debugMessage: "",
};
