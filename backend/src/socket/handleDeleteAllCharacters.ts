import { GameState } from "../shared/types/gameState";
import { deleteAllCharacters } from "../db/character.repository";

export const handleDeleteAllCharacters = async (
  gameState: GameState,
  updateGameState: () => void
) => {
  await deleteAllCharacters();
  gameState.characters = [];
  updateGameState();
};
