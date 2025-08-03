import { AttackData } from "../types/attackData";
import { TypesOfAttack } from "../types/TypesOfAttack";
import { TypesOfDamage } from "../types/typesOfDamage";
import { TypesOfDefence } from "../types/typesOfDefence";
import { WEAPON_1 } from "./initialWeapons";

export const INITIAL_ATTACK_DATA: AttackData = {
  actorCharacterID: "",
  targetCharacterID: "",

  weapon: WEAPON_1,

  offensiveStat: 0,
  offensiveSkill: 0,
  offensiveRoll: 5,
  offensiveModifier: 0,

  typeOfDamage: TypesOfDamage.SLASHING,
  typeOfDefence: TypesOfDefence.DODGE,
  typeOfAttack: TypesOfAttack.FAST_STRIKE,

  defensiveStat: 0,
  defensiveSkill: 0,
  defensiveRoll: 5,
  defensiveModifier: 0,

  damageRoll: 0,
  location: 0,
  isTargetHit: false,
};
