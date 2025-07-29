import { Weapon } from "../types/weapon";

export const WEAPON_1: Weapon = {
  name: "Bazowa Halabarda",
  damage: "2d6",
  weaponAccuracy: 0,
  typesOfDamaga: {
    fire: false,
    slashing: true,
    piercing: true,
    bludgeoning: true,
    elemental: false,
    silver: false,
    monster: false,
  },
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
  name: "Bazowy Miecz",
  damage: "3d6",
  weaponAccuracy: 0,
  typesOfDamaga: {
    fire: false,
    slashing: true,
    piercing: true,
    bludgeoning: false,
    elemental: false,
    silver: false,
    monster: false,
  },
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
