import { Weapon } from "../types/weapon";

export const MOCK_WEAPON: Weapon = {
  id: "w1",
  name: "Test Sword",
  damage: "1d10",
  improvedArmorPiercing: false,
  armorShreding: false,
  armorPiercing: false,
  weaponAccuracy: 3,
  typesOfDamage: [],
  statusChances: { BURN: 0, BLEEDING: 0, POISON: 0, CHOKE: 0, STUN: 0 },
  associatedSkill: "swordsmanship",
};
