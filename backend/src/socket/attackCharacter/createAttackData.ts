import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import { AttackData } from "../../shared/types/attackData";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";

/**
 * Generates a new `AttackData` object based on the provided attack properties.
 *
 * This function calculates the offensive stat and skill for the actor character
 * based on the weapon's associated skill, determines which statuses are applied
 * based on their chances, and initializes various roll and modifier fields for
 * the attack process.
 *
 * @param attackDataProp - The base attack data containing information about the actor,
 *   weapon, and initial attack parameters. SEE REMARKS.
 *
 * @remarks
 * The `attackDataProp` received from the client contains only the following fields:
 * - `targetCharacterID`: ID of the target character (string)
 * - `weapon`: selected weapon object (Weapon)
 * - `typeOfAttack`: selected type of attack (TypesOfAttack)
 * - `typeOfDamage`: selected type of damage (TypesOfDamage)
 * - Additionally this param HAS TO ALREADY INCLUDE `actorCharacterID` (string) that is derived from the socket.
 * @returns A new `AttackData` object with calculated offensive/defensive stats,
 *   rolls, modifiers, and applied statuses. SEE REMARKS.
 * @remarks
 * The returned `AttackData` object doesn't include the defensive stats.
 */
export function createAttackData(attackDataProp: AttackData): AttackData {
  const actorCharacter = getCharacterByCharactersId(
    attackDataProp.actorCharacterID,
    GameStateSingleton.getInstance().characters
  );

  console.log(attackDataProp.actorCharacterID);
  let offensiveStat = 0;
  let offensiveSkill = 0;

  const skillKey = attackDataProp.actorWeapon.associatedSkill;

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

  const appliedStatuses = Object.entries(
    attackDataProp.actorWeapon.statusChances
  )
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
    offensiveModifier: attackDataProp.actorWeapon.weaponAccuracy,

    defensiveStat: 0,
    defensiveSkill: 0,
    defensiveRoll: new DiceRoll("1d10!"),
    defensiveModifier: 0,

    damageRoll: new DiceRoll(attackDataProp.actorWeapon.damage),
    locationRoll: new DiceRoll("1d10"),
    appliedStatuses: appliedStatuses,

    isTargetHit: false,
  };
}
