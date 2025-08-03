import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import { AttackData } from "../../shared/types/attackData";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";

export function createAttackData(attackDataProp: AttackData): AttackData {
  const actorCharacter = getCharacterByCharactersId(
    attackDataProp.actorCharacterID,
    GameStateSingleton.getInstance().characters
  );

  return {
    ...attackDataProp,
    offensiveStat: actorCharacter.skills.reflexSkills.swordsmanship,
    offensiveSkill: actorCharacter.stats.reflex,
    offensiveRoll: new DiceRoll("1d10!"),
    offensiveModifier: attackDataProp.weapon.weaponAccuracy,

    defensiveStat: 0,
    defensiveSkill: 0,
    defensiveRoll: new DiceRoll("1d10!"),
    defensiveModifier: 0,

    damageRoll: new DiceRoll(attackDataProp.weapon.damage),
    locationRoll: new DiceRoll("1d10"),

    isTargetHit: false,
  };
}
