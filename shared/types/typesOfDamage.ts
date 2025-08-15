//@ts-ignore this code is valid after copying its to its final destination. This file itself is never used.
export enum TypesOfDamage {
  SLASHING = "slashing",
  PIERCING = "piercing",
  BLUDGEONING = "bludgeoning",
  ELEMENTAL = "elemental",
  SILVER = "silver",
  MONSTER = "monster",
  MAGIC = "magic",
  FIRE = "fire",
  TRUE_DAMAGE = "true_damage",
}

export const TYPES_OF_DAMAGE_TRANSLATION: Record<TypesOfDamage, string> = {
  [TypesOfDamage.SLASHING]: "Cięte",
  [TypesOfDamage.PIERCING]: "Kłute",
  [TypesOfDamage.BLUDGEONING]: "Obuchowe",
  [TypesOfDamage.ELEMENTAL]: "Nadprzyrodzone",
  [TypesOfDamage.SILVER]: "Srebrne",
  [TypesOfDamage.MONSTER]: "Potworne",
  [TypesOfDamage.MAGIC]: "Magiczne",
  [TypesOfDamage.FIRE]: "Ogniste",
  [TypesOfDamage.TRUE_DAMAGE]: "Nieuchronne",
};
