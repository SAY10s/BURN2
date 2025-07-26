import type { Character } from "../types/character";
import type { Player } from "../types/player";

export const getCharacterByCharactersId = (
  characterID: string,
  characters: Character[]
): Character => {
  const character = characters.find(
    (character) => character.id === characterID
  );
  if (!character) {
    throw new Error(`Character with ID ${characterID} not found`);
  }
  return character;
};

export const getPlayerByCharactersId = (
  characterID: string,
  players: Player[]
): Player => {
  const player = players.find(
    (player) => player.controlledCharacterID === characterID
  );
  if (!player) {
    throw new Error(
      `Player with controlledCharacterID ${characterID} not found`
    );
  }
  return player;
};

export const getPlayerByPlayersSocketId = (
  socketID: string,
  players: Player[]
): Player => {
  const player = players.find((player) => player.socketID === socketID);
  if (!player) {
    throw new Error(`Player with socketID ${socketID} not found`);
  }
  return player;
};

export const getGameMasterPlayer = (players: Player[]) => {
  const gameMaster = players.find((player) => player.isGameMaster);
  if (!gameMaster) {
    throw new Error(`No game master was found`);
  }
  return gameMaster;
};

export const isPlayerAdmin = (socketID: string, players: Player[]) => {
  const player = getPlayerByPlayersSocketId(socketID, players);
  return player.isGameMaster;
};
