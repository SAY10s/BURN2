import type { TypesOfDamage } from "./typesOfDamage";

/**
 * Chances for a status to be aplied upon attack, given in %.
 * @min 0
 * @max 100
 * @default 0
 */
export interface StatusChances {
  burn: number;
  bleed: number;
  poison: number;
  choke: number;
}

export interface Weapon {
  /**
   * Random string of 7 characters that allows to identify Character
   * @formula Math.random().toString(36).substring(2, 9);
   * @example "1234567"
   */
  id: string;

  name: string;
  /**
   * Weapons damage written in standard notation
   * @example "2d6+2";
   * @example "1d10";
   * @example "4d4";
   */
  damage: string;
  /**
   * Weapon Accuracy describes how well-balanced a weapon is. When attacking a target with a weapon, add its Weapon Accuracy to the attack.
   * @default 0
   */
  weaponAccuracy: number;
  typesOfDamaga: TypesOfDamage;
  statusChances: StatusChances;
  /**
   * This weapon reduces Stopping Power by an additional 1d6/2 upon armor penetration.
   */
  armorShreding: boolean;
  /**
   * Ignore Damage Resistance.
   */
  armorPiercing: boolean;
  /**
   * When subtracting armor from this weapon’s damage, only subtract half the armor’s current value
   */
  improvedArmorPiercing: boolean;
}
