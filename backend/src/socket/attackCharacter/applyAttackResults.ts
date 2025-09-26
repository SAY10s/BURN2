import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { LevelsOfCriticalHit } from "../../shared/types/levelsOfCriticalHit";
import { TypesOfAttack } from "../../shared/types/TypesOfAttack";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { getMeleeBonus } from "../utils/getBonusMeleeDamage";
import { getActorAndTarget } from "./utils/getActorAndTarget";
import { Socket } from "socket.io";
import { AttackData } from "../../shared/types/attackData";
import { addDebugMessage } from "../utils/addDebugMessage";
import { Character } from "../../shared/types/character";

const locationToArmorPieceKey: Record<
  number,
  keyof Character["characterArmor"]
> = {
  1: "head",
  2: "torso",
  3: "torso",
  4: "torso",
  5: "rightArm",
  6: "leftArm",
  7: "rightLeg",
  8: "rightLeg",
  9: "leftLeg",
  10: "leftLeg",
};
const LOCATION_NAMES_TRANSLATION: Record<
  keyof Character["characterArmor"],
  string
> = {
  head: "głowa",
  torso: "tułów",
  rightArm: "prawa ręka",
  leftArm: "lewa ręka",
  rightLeg: "prawa noga",
  leftLeg: "lewa noga",
};
const locationMultipliers: Record<keyof Character["characterArmor"], number> = {
  head: 3,
  torso: 1,
  rightArm: 0.5,
  leftArm: 0.5,
  rightLeg: 0.5,
  leftLeg: 0.5,
};

export function applyAttackResults(socket: Socket, attackDataProp: AttackData) {
  const {
    isTargetHit,
    targetCharacterID,
    damageRoll,
    typeOfAttack,
    locationRoll,
    actorWeapon,
    targetWeapon,
    typeOfDamage,
    offensiveRoll,
    offensiveSkill,
    offensiveStat,
    offensiveModifier,
    defensiveRoll,
    defensiveSkill,
    defensiveStat,
    defensiveModifier,
    appliedStatuses,
  } = attackDataProp;

  const gameState = GameStateSingleton.getInstance();
  if (isTargetHit) {
    addDebugMessage(`Atak trafił.`);

    const { actorPlayer, actorCharacter, targetPlayer, targetCharacter } =
      getActorAndTarget(socket, targetCharacterID);

    let damage = damageRoll.total;

    let isTargetImmune = targetCharacter.immunities.includes(typeOfDamage);
    if (isTargetImmune) {
      damage = 0;
      addDebugMessage(`Cel jest odporny na obrażenia.`);
      return;
    }

    if (
      typeOfAttack !== TypesOfAttack.SPELL &&
      typeOfAttack !== TypesOfAttack.REGULAR_STRIKE
    ) {
      damage += getMeleeBonus(actorCharacter.stats.body);
    }

    if (
      typeOfAttack === TypesOfAttack.STRONG_STRIKE ||
      typeOfAttack === TypesOfAttack.CHARGE
    ) {
      damage = damage * 2;
    }

    const location = locationRoll.total;

    const armorPieceKey = locationToArmorPieceKey[location];
    if (!armorPieceKey) throw new Error("Invalid location roll: " + location);
    addDebugMessage(
      `Trafienie w ${LOCATION_NAMES_TRANSLATION[armorPieceKey]}.`
    );

    const armorPiece = targetCharacter.characterArmor[armorPieceKey];
    const armorSP = armorPiece?.currentSP ?? 0;

    damage = actorWeapon.improvedArmorPiercing
      ? damage - Math.floor(armorSP / 2)
      : damage - armorSP;

    if (damage < 0) {
      damage = 0;
      addDebugMessage(`Pancerz całkowicie zablokował obrażenia.`);
    } else {
      addDebugMessage(`Przebito pancerz.`);
      if (armorPiece && armorPiece.currentSP > 0) {
        if (actorWeapon.armorShreding) {
          const armorShredingRoll = new DiceRoll("1d6");
          armorPiece.currentSP -= Math.floor(armorShredingRoll.total / 2);
        }
        armorPiece.currentSP -= 1;
      }
    }

    let isDamageReduced =
      armorPiece.reductions.includes(typeOfDamage) &&
      !actorWeapon.armorPiercing &&
      !actorWeapon.improvedArmorPiercing;

    if (isDamageReduced) {
      damage = Math.floor(damage / 2);
      addDebugMessage(`Pancerz zredukował obrażenia.`);
    }

    let isTargetSusceptible =
      targetCharacter.susceptibilities.includes(typeOfDamage);
    if (isTargetSusceptible) {
      damage = Math.floor(damage * 2);
      addDebugMessage(`Cel jest podatny na obrażenia.`);
    }

    const locationMultiplier = locationMultipliers[armorPieceKey] || 1;
    damage = Math.floor(damage * locationMultiplier);

    const fullOffensiveValue =
      offensiveRoll.total + offensiveSkill + offensiveStat + offensiveModifier;

    const fullDefensiveValue =
      defensiveRoll.total + defensiveSkill + defensiveStat + defensiveModifier;

    const offensiveSubtractDefensive = fullOffensiveValue - fullDefensiveValue;

    let levelOfCriticalHit = LevelsOfCriticalHit.NONE;
    if (offensiveSubtractDefensive >= 15) {
      levelOfCriticalHit = LevelsOfCriticalHit.DEADLY;
      damage += 10;
    } else if (offensiveSubtractDefensive >= 13) {
      levelOfCriticalHit = LevelsOfCriticalHit.DIFFICULT;
      damage += 8;
    } else if (offensiveSubtractDefensive >= 10) {
      levelOfCriticalHit = LevelsOfCriticalHit.COMPLEX;
      damage += 5;
    } else if (offensiveSubtractDefensive >= 7) {
      levelOfCriticalHit = LevelsOfCriticalHit.SIMPLE;
      damage += 3;
    }
    addDebugMessage(
      ` Obrażenia: ${damage}. Trafienie krytyczne: ${levelOfCriticalHit}.`
    );

    addDebugMessage(`Nałożono efekty: ${appliedStatuses.join(", ")}.`);
    gameState.characters = gameState.characters.map((character) =>
      character.id === targetCharacter.id
        ? {
            ...character,
            currentHP: character.currentHP - damage,
            status: [...character.status, ...appliedStatuses],
          }
        : character
    );
  } else {
    addDebugMessage(`Atak nie trafił.`);
  }
}
