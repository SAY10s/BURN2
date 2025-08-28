import { GameStateSingleton } from "../singletons/GameStateSingleton";

export function handleDeathRoll(
  characterID: string,
  didDie: boolean,
  updateGameState: () => void
) {
  const gameState = GameStateSingleton.getInstance();

  const index = gameState.characters.findIndex((c) => c.id === characterID);

  if (index === -1) {
    return;
  }

  const updatedCharacter = {
    ...gameState.characters[index],
    isAlive: !didDie,
    deathRollAdditionalDC:
      gameState.characters[index].deathRollAdditionalDC + 1,
  };
  gameState.characters[index] = updatedCharacter;
  updateGameState();
}
