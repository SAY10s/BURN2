import type { Character } from "../types/character";

export const getCharacterByCharactersId = (
  characterID: string,
  characters: Character[]
) => {
  const character = characters.find(
    (character) => character.id === characterID
  );
  return character;
};
