import { Character } from "../shared/types/character";

/**
 * Collection of predefined character names for random selection
 * @constant {string[]} randomNames
 */
const randomNames: string[] = [
  "Taco",
  "Rizzo",
  "Zuko",
  "Tao Tan",
  "Azrael",
  "Mika",
  "Geralt",
];

/**
 * Randomly selects a name from the available options
 * @returns {string} A randomly selected name from the randomNames array
 * @example
 * const name = getRandomName(); // Returns "Zuko" (random example)
 */
const getRandomName = (): string => {
  const randomIndex = Math.floor(Math.random() * randomNames.length);
  return randomNames[randomIndex];
};

/**
 * Generates a random integer between 2 and 8 (inclusive)
 * @returns {number} Random integer from 2 to 8
 * @example
 * const dexterity = getRandomStatValue(); // Possible results: 2, 3, 4, 5, 6, 7, 8
 */
const getRandomStatValue = () => {
  return Math.floor(Math.random() * 7) + 2;
};

/**
 * Generates a random integer between 2 and 6 (inclusive)
 * @returns {number} Random integer from 2 to 6
 * @example
 * const swordsmanship = getRandomSkillValue(); // Possible results: 2, 3, 4, 5, 6, 7, 8
 */
const getRandomSkillValue = () => {
  return Math.floor(Math.random() * 7);
};

export const generateRandomCharacter = (socketID: string) => {
  const stats = {
    reflex: getRandomStatValue(),
    dexterity: getRandomStatValue(),
    body: getRandomStatValue(),
    will: getRandomStatValue(),
  };
  const maxHP = Math.floor(stats.body + stats.will / 2) * 5;

  const character: Character = {
    socketID,
    name: getRandomName(),
    maxHP,
    currentHP: maxHP,
    stats,
    skills: {
      reflexSkills: {
        dodgeEscape: getRandomSkillValue(),
        staffSpear: getRandomSkillValue(),
        swordsmanship: getRandomSkillValue(),
        smallBlades: getRandomSkillValue(),
      },
      dexteritySkills: {
        athletics: getRandomSkillValue(),
      },
    },
  };
  return character;
};
