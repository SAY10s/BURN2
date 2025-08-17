import { Socket } from "socket.io";
import {
  getCharacterByCharactersId,
  getGameMasterPlayer,
  getPlayerByCharactersId,
  getPlayerByPlayersSocketId,
} from "../../../shared/helpers/characterGetters";
import { GameStateSingleton } from "../../../singletons/GameStateSingleton";

export function getActorAndTarget(socket: Socket, targetCharacterID: string) {
  const gameState = GameStateSingleton.getInstance();

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
