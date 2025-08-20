import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import { AttackData } from "../../shared/types/attackData";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";

export function createAttackData(attackDataProp: AttackData): AttackData {
  const actorCharacter = getCharacterByCharactersId(
    attackDataProp.actorCharacterID,
    GameStateSingleton.getInstance().characters
  );

  let offensiveStat = 0;
  let offensiveSkill = 0;

  const skillKey = attackDataProp.weapon.associatedSkill;

  if (skillKey in actorCharacter.skills.reflexSkills) {
    offensiveSkill =
      actorCharacter.skills.reflexSkills[
        skillKey as keyof typeof actorCharacter.skills.reflexSkills
      ];
    offensiveStat = actorCharacter.stats.reflex;
  } else if (skillKey in actorCharacter.skills.dexteritySkills) {
    offensiveSkill =
      actorCharacter.skills.dexteritySkills[
        skillKey as keyof typeof actorCharacter.skills.dexteritySkills
      ];
    offensiveStat = actorCharacter.stats.dexterity;
  } else if (skillKey in actorCharacter.skills.willSkills) {
    offensiveSkill =
      actorCharacter.skills.willSkills[
        skillKey as keyof typeof actorCharacter.skills.willSkills
      ];
    offensiveStat = actorCharacter.stats.will;
  }

  const appliedStatuses = Object.entries(attackDataProp.weapon.statusChances)
    .filter(([status, chance]) => {
      if (typeof chance !== "number" || chance <= 0) return false;
      return Math.random() * 100 < chance;
    })
    .map(
      ([status]) => status as (typeof attackDataProp.appliedStatuses)[number]
    );

  return {
    ...attackDataProp,
    offensiveStat,
    offensiveSkill,
    offensiveRoll: new DiceRoll("1d10!"),
    offensiveModifier: attackDataProp.weapon.weaponAccuracy,

    defensiveStat: 0,
    defensiveSkill: 0,
    defensiveRoll: new DiceRoll("1d10!"),
    defensiveModifier: 0,

    damageRoll: new DiceRoll(attackDataProp.weapon.damage),
    locationRoll: new DiceRoll("1d10"),
    appliedStatuses: appliedStatuses,

    isTargetHit: false,
  };
}
