import type { TypesOfDamage } from "./typesOfDamage";
import type { TypesOfStatus } from "./typesOfStatus";
import type { Weapon } from "./weapon";
export const STATS_TRANSLATION = {
  speed: "Tempo",
  craft: "Fach",
  luck: "Fart",
  empathy: "Emocje",
  intelligence: "Rozum",
  reflex: "Reakcja",
  dexterity: "Gracja",
  body: "Ciało",
  will: "Wola",
};
export const SKILLS_TRANSLATION = {
  brawling: "Bójka",
  smallBlades: "Broń krótka",
  staffSpear: "Broń drzewcowa",
  swordsmanship: "Szermierka",
  melee: "Broń Bitewna",
  spellCasting: "Rzucanie Zaklęć",
  athletics: "Atletyka",
  archery: "Łucznictwo",
  crossbow: "Kusznictwo",
};

export interface Stats {
  /**
   * (pol. **Tempo**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  speed: number;
  /**
   * (pol. **Fach**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  craft: number;
  /**
   * (pol. **Fart**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  luck: number;
  /**
   * (pol. **Emocje**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  empathy: number;
  /**
   * (pol. **Rozum**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  intelligence: number;
  /**
   * (pol. **Rozum**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  reflex: number;
  /**
   * (pol. **Gracja**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  dexterity: number;
  /**
   * (pol. **ciało**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  body: number;
  /**
   * (pol. **Wola**)
   * @creationRange 2-8 The initial range during character creation
   * @max 10 The maximum achievable value through progression
   * @default 2
   */
  will: number;
}

export interface Skills {
  reflexSkills: {
    /**
     * (pol. **Bójka**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    brawling: number;
    /**
     * (pol. **Broń krótka**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    smallBlades: number;
    /**
     * (pol. **Broń drzewcowa**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    staffSpear: number;
    /**
     * (pol. **Szermierka**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    swordsmanship: number;
    /**
     * (pol. **Broń Bitewna**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    melee: number;
    /**
     * (pol. **Zwinność**) + **Reflex** (pol.  **Reakcja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    dodgeEscape: number;
  };
  dexteritySkills: {
    /**
     * (pol. **Atletyka**) + **Dexterity** (pol.  **Gracja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    athletics: number;
    /**
     * (pol. **łucznictwo**) + **Dexterity** (pol.  **Gracja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    archery: number;
    /**
     * (pol. **Kusznistwo**) + **Dexterity** (pol.  **Gracja**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    crossbow: number;
  };
  willSkills: {
    /**
     * (pol. **Zaklęcia**) + **Will** (pol.  **Wola**)
     * @creationRange 0-6 The initial range during character creation
     * @max 10 The maximum achievable value through progression
     * @default 0
     */
    spellCasting: number;
  };
}

export interface ArmorPiece {
  /**
   *Reductions tell you if armor piece reduces given type of damage by 50%
   */
  reductions: TypesOfDamage[];
  /**
   *Stopping Power describes how much damage armor stops when struck by a weapon or attack.
   */
  maxSP: number;
  /**
   *Stopping Power describes how much damage armor stops when struck by a weapon or attack.
   * @default maxSP
   * @warning This value should never be higher than maxSP
   * @example If maxSP is 10, then currentSP can be 10,
   */
  currentSP: number;
  /**
   * Encumbrance Value describes how stiff the armor is and how hard it is to move in. This value is subtracted from your Reflex and Dexterity.
   */
  encumbranceValue: number;
}
interface CharacterArmor {
  head: ArmorPiece;
  torso: ArmorPiece;
  rightArm: ArmorPiece;
  leftArm: ArmorPiece;
  rightLeg: ArmorPiece;
  leftLeg: ArmorPiece;
}

export interface Character {
  /**
   * States if given Character is playable by player. If it is, then it's value is `true`, if not, then it's NPC controlled by GameMaster, and therefore it's value is `false`.
   * @default false
   */
  isPlayer: boolean;
  /**
   * Random string of 7 characters that allows to identify Character
   * @warning _id !== id ; (THIS "id" NOT THE SAME AS "_id" IN MONGODB!)
   * @formula Math.random().toString(36).substring(2, 9);
   * @example "4f7d2e9"
   */
  id: string;
  name: string;

  /**
   * @Formula Math.floor(Body + Will / 2 ) * 5
   * @min 10
   * @max 65
   */
  maxHP: number;
  currentHP: number;

  /**
   * @Formula Math.floor(Body + Will / 2 ) * 5 (equals maxHP)
   * @min 10
   * @max 65
   */
  maxStamina: number;
  currentStamina: number;

  /**
   * @Formula Math.floor(Body + Will / 2 ) * 10 (equals 2 * maxHP)
   * @min 10
   * @max 65
   */
  maxStunScore: number;
  currentStunScore: number;

  stats: Stats;
  skills: Skills;

  status: TypesOfStatus[];
  characterArmor: CharacterArmor;
  weapons: Weapon[];
  /**
   * Character gets 2x more damage from given type of damage
   * By default all vulnerabilities are set to False, meaning that character is not vulnerable to any type of damage.
   */
  susceptibilities: TypesOfDamage[];
  /**
   * Character gets NO damage from given type of damage
   * By default all immunities are set to False, meaning that character is not immune to any type of damage.
   */
  immunities: TypesOfDamage[];
}
