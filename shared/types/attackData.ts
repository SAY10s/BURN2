import type { Weapon } from "./weapon";

export type typeOfAttack = "FAST_STRIKE" | "STRONG_STRIKE" | "SPELL";

export interface AttackData {
  actorCharacterID: string;
  targetCharacterID: string;

  weapon: Weapon;

  offensiveStat: number;
  offensiveSkill: number;
  offensiveRoll: number;
  offensiveModifier: number;

  typeOfDamage: string;
  typeOfAttack: typeOfAttack;

  defensiveStat: number;
  defensiveSkill: number;
  defensiveRoll: number;
  defensiveModifier: number;

  damageRoll: number;
  /**
   * @head 1
   * @torso 2-4
   * @rightArm 5
   * @leftArm 6
   * @rightLeg 7-8
   * @leftLeg 9-10
   */
  location: number;

  isTargetHit: boolean;
}
