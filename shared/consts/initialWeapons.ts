import { TypesOfDamage } from "../types/typesOfDamage";
import { TypesOfStatus } from "../types/typesOfStatus";
import type { Weapon } from "../types/weapon";

export const WEAPON_1: Weapon = {
  id: Math.random().toString(36).substring(2, 9),
  name: "Bazowa Halabarda",
  damage: "2d6",
  weaponAccuracy: 0,
  typesOfDamage: [
    TypesOfDamage.SLASHING,
    TypesOfDamage.PIERCING,
    TypesOfDamage.BLUDGEONING,
  ],

  statusChances: {
    [TypesOfStatus.BURN]: 0,
    [TypesOfStatus.BLEEDING]: 20,
    [TypesOfStatus.POISON]: 0,
    [TypesOfStatus.CHOKE]: 0,
    [TypesOfStatus.STUN]: 0,
  },
  armorShreding: false,
  armorPiercing: false,
  improvedArmorPiercing: false,
  associatedSkill: "staffSpear",
};
export const WEAPON_2: Weapon = {
  id: Math.random().toString(36).substring(2, 9),
  name: "OGNISTY Miecz ROZKURWIATORA 90% PODPALENIA",
  damage: "3d6",
  weaponAccuracy: 0,
  typesOfDamage: [TypesOfDamage.SLASHING, TypesOfDamage.PIERCING],
  statusChances: {
    [TypesOfStatus.BURN]: 90,
    [TypesOfStatus.BLEEDING]: 0,
    [TypesOfStatus.POISON]: 0,
    [TypesOfStatus.CHOKE]: 0,
    [TypesOfStatus.STUN]: 0,
  },
  armorShreding: false,
  armorPiercing: false,
  improvedArmorPiercing: false,
  associatedSkill: "swordsmanship",
};
