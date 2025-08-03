import { generateRandomCharacter } from "../shared/helpers/generateRandomCharacter";
import { getAllCharacters, insertCharacter } from "../db/character.repository";
import { GameStateSingleton } from "../singletons/GameStateSingleton";

export const handleCreateRandomCharacter = async (
  updateGameState: () => void
) => {
  const newCharacter = generateRandomCharacter();
  await insertCharacter(newCharacter);
  const characters = await getAllCharacters();
  GameStateSingleton.getInstance().characters = characters;
  updateGameState();
};
