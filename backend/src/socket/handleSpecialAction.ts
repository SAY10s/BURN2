import { Socket } from "socket.io";
import { GameStateSingleton } from "../singletons/GameStateSingleton";

/**
 * Updates the character in the game state with the data received from the client.
 *
 * @param socket - The socket instance of the client
 * @param updatedCharacter - The full character object sent from the client
 * @param updateGameState - Callback to emit the updated game state
 */
export function handleSpecialAction(
  socket: Socket,
  updatedCharacter: any,
  updateGameState: () => void
) {
  const gameState = GameStateSingleton.getInstance();
  const index = gameState.characters.findIndex(
    (c) => c.id === updatedCharacter.id
  );

  if (index === -1) {
    socket.emit("error", "Character not found for special action.");
    return;
  }

  gameState.characters[index] = updatedCharacter;
  updateGameState();
}
