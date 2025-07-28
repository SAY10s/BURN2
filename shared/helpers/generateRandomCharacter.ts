import { Character } from "../types/character";

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
 */
const getRandomName = (): string => {
  const randomIndex = Math.floor(Math.random() * randomNames.length);
  return randomNames[randomIndex];
};

/**
 * Generates a random integer between 2 and 8 (inclusive)
 * @returns {number} Random integer from 2 to 8
 */
const getRandomStatValue = (): number => {
  return Math.floor(Math.random() * 7) + 2;
};

/**
 * Generates a random integer between 0 and 6 (inclusive)
 * @returns {number} Random integer from 0 to 6
 */
const getRandomSkillValue = (): number => {
  return Math.floor(Math.random() * 7);
};

/**
 * Generates a random character with all required fields
 * @param {boolean} isPlayer - Whether the character is a player character
 * @returns {Character} Fully generated random character
 */
export const generateRandomCharacter = (
  isPlayer: boolean = false
): Character => {
  const stats = {
    speed: getRandomStatValue(),
    craft: getRandomStatValue(),
    luck: getRandomStatValue(),
    empathy: getRandomStatValue(),
    intelligence: getRandomStatValue(),
    reflex: getRandomStatValue(),
    dexterity: getRandomStatValue(),
    body: getRandomStatValue(),
    will: getRandomStatValue(),
  };

  const maxHP = Math.floor((stats.body + stats.will) / 2) * 5;

  const character: Character = {
    isPlayer,
    id: Math.random().toString(36).substring(2, 9),
    name: getRandomName(),
    maxHP,
    currentHP: maxHP,
    stats,
    skills: {
      reflexSkills: {
        brawling: getRandomSkillValue(),
        smallBlades: getRandomSkillValue(),
        staffSpear: getRandomSkillValue(),
        swordsmanship: getRandomSkillValue(),
        dodgeEscape: getRandomSkillValue(),
      },
      dexteritySkills: {
        athletics: getRandomSkillValue(),
        archery: getRandomSkillValue(),
        crossbow: getRandomSkillValue(),
      },
      willSkills: {
        spellCasting: getRandomSkillValue(),
      },
    },
    status: {
      isBurning: false,
      isChoking: false,
      isBleeding: false,
      isPoisoned: false,
    },
    characterArmor: {
      head: {
        reductions: {
          slashing: Math.random() > 0.5,
          piercing: Math.random() > 0.5,
          bludgeoning: Math.random() > 0.5,
          elemental: Math.random() > 0.5,
          silver: Math.random() > 0.8,
          monster: Math.random() > 0.8,
          fire: Math.random() > 0.5,
        },
        maxSP: Math.floor(Math.random() * 5),
        currentSP: Math.floor(Math.random() * 5),
        encumbranceValue: Math.floor(Math.random() * 2),
      },
      torso: {
        reductions: {
          slashing: Math.random() > 0.5,
          piercing: Math.random() > 0.5,
          bludgeoning: Math.random() > 0.5,
          elemental: Math.random() > 0.5,
          silver: Math.random() > 0.8,
          monster: Math.random() > 0.8,
          fire: Math.random() > 0.5,
        },
        maxSP: Math.floor(Math.random() * 8) + 2,
        currentSP: Math.floor(Math.random() * 8) + 2,
        encumbranceValue: Math.floor(Math.random() * 3) + 1,
      },
      leftArm: {
        reductions: {
          slashing: Math.random() > 0.5,
          piercing: Math.random() > 0.5,
          bludgeoning: Math.random() > 0.5,
          elemental: Math.random() > 0.5,
          silver: Math.random() > 0.8,
          monster: Math.random() > 0.8,
          fire: Math.random() > 0.5,
        },
        maxSP: Math.floor(Math.random() * 5),
        currentSP: Math.floor(Math.random() * 5),
        encumbranceValue: Math.floor(Math.random() * 2),
      },
      rightArm: {
        reductions: {
          slashing: Math.random() > 0.5,
          piercing: Math.random() > 0.5,
          bludgeoning: Math.random() > 0.5,
          elemental: Math.random() > 0.5,
          silver: Math.random() > 0.8,
          monster: Math.random() > 0.8,
          fire: Math.random() > 0.5,
        },
        maxSP: Math.floor(Math.random() * 5),
        currentSP: Math.floor(Math.random() * 5),
        encumbranceValue: Math.floor(Math.random() * 2),
      },
      leftLeg: {
        reductions: {
          slashing: Math.random() > 0.5,
          piercing: Math.random() > 0.5,
          bludgeoning: Math.random() > 0.5,
          elemental: Math.random() > 0.5,
          silver: Math.random() > 0.8,
          monster: Math.random() > 0.8,
          fire: Math.random() > 0.5,
        },
        maxSP: Math.floor(Math.random() * 5),
        currentSP: Math.floor(Math.random() * 5),
        encumbranceValue: Math.floor(Math.random() * 2),
      },
      rightLeg: {
        reductions: {
          slashing: Math.random() > 0.5,
          piercing: Math.random() > 0.5,
          bludgeoning: Math.random() > 0.5,
          elemental: Math.random() > 0.5,
          silver: Math.random() > 0.8,
          monster: Math.random() > 0.8,
          fire: Math.random() > 0.5,
        },
        maxSP: Math.floor(Math.random() * 5),
        currentSP: Math.floor(Math.random() * 5),
        encumbranceValue: Math.floor(Math.random() * 2),
      },
    },
    weapons: [],
    susceptibilities: {
      slashing: Math.random() > 0.9,
      piercing: Math.random() > 0.9,
      bludgeoning: Math.random() > 0.9,
      elemental: Math.random() > 0.9,
      silver: Math.random() > 0.9,
      monster: Math.random() > 0.9,
      fire: Math.random() > 0.9,
    },
    immunities: {
      slashing: Math.random() > 0.9,
      piercing: Math.random() > 0.9,
      bludgeoning: Math.random() > 0.9,
      elemental: Math.random() > 0.9,
      silver: Math.random() > 0.9,
      monster: Math.random() > 0.9,
      fire: Math.random() > 0.9,
    },
  };

  return character;
};
