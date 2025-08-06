import { WEAPON_1, WEAPON_2 } from "../consts/initialWeapons";
import { ArmorPiece, Character } from "../types/character";
import { TypesOfDamage } from "../types/typesOfDamage";

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
  "Ciri",
  "Yennefer",
  "Triss",
  "Dandelion",
  "Vesemir",
  "Zoltan",
  "Roach",
  "Ves",
  "Lambert",
  "Eskel",
  "Shani",
  "Priscilla",
  "Emhyr",
  "Cahir",
  "Dijkstra",
  "Philippa",
  "Fringilla",
  "Keira",
  "Saskia",
  "Iorveth",
  "Letho",
  "Aveline",
  "Isabelle",
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
 * Generates a random ArmorPiece with default values
 * @returns {ArmorPiece} A randomly generated armor piece
 */
const getRandomArmorPiece = (): ArmorPiece => {
  const maxSP = Math.floor(Math.random() * 5) + 1;
  return {
    reductions: [TypesOfDamage.BLUDGEONING],
    maxSP: maxSP,
    currentSP: maxSP,
    encumbranceValue: 0,
  };
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
    maxStamina: maxHP,
    currentStamina: maxHP,
    maxStunScore: maxHP * 2,
    currentStunScore: maxHP * 2,
    stats,
    skills: {
      reflexSkills: {
        brawling: getRandomSkillValue(),
        smallBlades: getRandomSkillValue(),
        staffSpear: getRandomSkillValue(),
        swordsmanship: getRandomSkillValue(),
        dodgeEscape: getRandomSkillValue(),
        melee: getRandomSkillValue(),
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
    status: [],
    characterArmor: {
      head: getRandomArmorPiece(),
      torso: getRandomArmorPiece(),
      rightArm: getRandomArmorPiece(),
      leftArm: getRandomArmorPiece(),
      rightLeg: getRandomArmorPiece(),
      leftLeg: getRandomArmorPiece(),
    },
    weapons: [WEAPON_1, WEAPON_2],
    susceptibilities: [TypesOfDamage.SLASHING],
    immunities: [TypesOfDamage.PIERCING],
  };

  return character;
};
