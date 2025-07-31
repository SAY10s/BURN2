import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import { AttackData } from "../../shared/types/attackData";
import { Character } from "../../shared/types/character";

export function createAttackData(
  attackData: AttackData,
  characters: Character[]
): AttackData {
  const actorCharacter = getCharacterByCharactersId(
    attackData.actorCharacterID,
    characters
  );

  return {
    ...attackData,
    offensiveStat: actorCharacter.skills.reflexSkills.swordsmanship,
    offensiveSkill: actorCharacter.stats.reflex,
    offensiveRoll: new DiceRoll("1d10!").total,
    offensiveModifier: 0,

    defensiveStat: 0,
    defensiveSkill: 0,
    defensiveRoll: new DiceRoll("1d10!").total,
    defensiveModifier: 0,

    damageRoll: new DiceRoll("3d6").total,
    location: new DiceRoll("1d10").total,

    isTargetHit: false,
  };
}
