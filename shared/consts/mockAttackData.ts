import type { AttackData } from "../types/attackData";
import { TypesOfAttack } from "../types/TypesOfAttack";
import { TypesOfDamage } from "../types/typesOfDamage";
import { TypesOfDefence } from "../types/typesOfDefence";
import { MOCK_WEAPON } from "./mockWeapon";

export const MOCK_ATTACK_DATA: AttackData = {
  attackStage: "none",
  actorCharacterID: "actor",
  targetCharacterID: "target",

  targetWeapon: MOCK_WEAPON,
  actorWeapon: MOCK_WEAPON,

  offensiveStat: 6,
  offensiveSkill: 3,
  offensiveRoll: { total: 5 },
  offensiveModifier: 0,

  typeOfDamage: TypesOfDamage.SLASHING,
  typeOfDefence: TypesOfDefence.DODGE,
  typeOfAttack: TypesOfAttack.FAST_STRIKE,
  appliedStatuses: [],

  defensiveStat: 6,
  defensiveSkill: 3,
  defensiveRoll: { total: 5 },
  defensiveModifier: 0,

  damageRoll: { total: 5 },
  locationRoll: { total: 5 },
  isTargetHit: false,
} as unknown as AttackData;
