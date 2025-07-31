import { TypesOfDamage } from "../types/typesOfDamage";
import { Weapon } from "../types/weapon";

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
    burn: 0,
    bleed: 20,
    poison: 0,
    choke: 0,
  },
  armorShreding: false,
  armorPiercing: false,
  improvedArmorPiercing: false,
};
export const WEAPON_2: Weapon = {
  id: Math.random().toString(36).substring(2, 9),
  name: "Bazowy Miecz",
  damage: "3d6",
  weaponAccuracy: 0,
  typesOfDamage: [TypesOfDamage.SLASHING, TypesOfDamage.PIERCING],
  statusChances: {
    burn: 0,
    bleed: 50,
    poison: 0,
    choke: 0,
  },
  armorShreding: false,
  armorPiercing: false,
  improvedArmorPiercing: false,
};
