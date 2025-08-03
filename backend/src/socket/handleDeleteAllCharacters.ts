import { GameState } from "../shared/types/gameState";
import { deleteAllCharacters } from "../db/character.repository";
import { GameStateSingleton } from "../singletons/GameStateSingleton";

export const handleDeleteAllCharacters = async (
  updateGameState: () => void
) => {
  await deleteAllCharacters();
  const gameState = GameStateSingleton.getInstance();
  gameState.characters = [];
  updateGameState();
};
