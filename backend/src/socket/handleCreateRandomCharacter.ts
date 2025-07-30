import { GameState } from "../shared/types/gameState";
import { generateRandomCharacter } from "../shared/helpers/generateRandomCharacter";
import { getAllCharacters, insertCharacter } from "../db/character.repository";

export const handleCreateRandomCharacter = async (
  gameState: GameState,
  updateGameState: () => void
) => {
  const newCharacter = generateRandomCharacter();
  await insertCharacter(newCharacter);
  const characters = await getAllCharacters();
  gameState.characters = characters;
  updateGameState();
};
