import { Socket } from "socket.io";
import { GameState } from "../../shared/types/gameState";
import {
  getCharacterByCharactersId,
  getGameMasterPlayer,
  getPlayerByCharactersId,
  getPlayerByPlayersSocketId,
} from "../../shared/helpers/characterGetters";

export function getActorAndTarget(
  socket: Socket,
  gameState: GameState,
  targetCharacterID: string
) {
  const actorPlayer = getPlayerByPlayersSocketId(socket.id, gameState.players);
  const actorCharacter = getCharacterByCharactersId(
    actorPlayer.controlledCharacterID,
    gameState.characters
  );
  const targetPlayer = getPlayerByCharactersId(
    targetCharacterID,
    gameState.players,
    true
  );
  const targetCharacter = getCharacterByCharactersId(
    targetCharacterID,
    gameState.characters
  );
  const gameMasterPlayer = getGameMasterPlayer(gameState.players);

  return {
    actorPlayer,
    actorCharacter,
    targetPlayer,
    targetCharacter,
    gameMasterPlayer,
  };
}
