import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { TypesOfAttack } from "./TypesOfAttack";
import { TypesOfDamage } from "./typesOfDamage";
import { TypesOfDefence } from "./typesOfDefence";
import type { Weapon } from "./weapon";

export interface AttackData {
  actorCharacterID: string;
  targetCharacterID: string;

  weapon: Weapon;

  offensiveStat: number;
  offensiveSkill: number;
  offensiveRoll: DiceRoll;
  offensiveModifier: number;

  typeOfDamage: TypesOfDamage;
  typeOfAttack: TypesOfAttack;
  typeOfDefence: TypesOfDefence;

  defensiveStat: number;
  defensiveSkill: number;
  defensiveRoll: DiceRoll;
  defensiveModifier: number;

  damageRoll: DiceRoll;
  /**
   * @head 1
   * @torso 2-4
   * @rightArm 5
   * @leftArm 6
   * @rightLeg 7-8
   * @leftLeg 9-10
   */
  locationRoll: DiceRoll;

  isTargetHit: boolean;
}
