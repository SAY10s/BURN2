import { Socket } from "socket.io/dist/socket";
import { AttackData } from "../../shared/types/attackData";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { getActorAndTarget } from "./getActorAndTarget";
import { TypesOfAttack } from "../../shared/types/TypesOfAttack";
import { getMeleeBonus } from "../utils/getBonusMeleeDamage";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { LevelsOfCriticalHit } from "../../shared/types/levelsOfCriticalHit";

export function applyAttackResults(socket: Socket, attackDataProp: AttackData) {
  const gameState = GameStateSingleton.getInstance();
  if (attackDataProp.isTargetHit) {
    GameStateSingleton.getInstance().debugMessage += ` Atak trafił.`;
    const { actorPlayer, actorCharacter, targetPlayer, targetCharacter } =
      getActorAndTarget(socket, attackDataProp.targetCharacterID);

    let actorBonusMeleeDamage = 0;
    if (
      attackDataProp.typeOfAttack !== TypesOfAttack.SPELL &&
      attackDataProp.typeOfAttack !== TypesOfAttack.REGULAR_STRIKE
    ) {
      actorBonusMeleeDamage = getMeleeBonus(actorCharacter.stats.body);
    }
    let damage = attackDataProp.damageRoll.total + actorBonusMeleeDamage;
    if (
      attackDataProp.typeOfAttack === TypesOfAttack.STRONG_STRIKE ||
      attackDataProp.typeOfAttack === TypesOfAttack.CHARGE
    ) {
      damage = damage * 2;
    }
    const location = attackDataProp.locationRoll.total;
    const locationToArmorPieceKey: Record<
      number,
      keyof typeof targetCharacter.characterArmor
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
    const armorPieceKey = locationToArmorPieceKey[location];
    if (!armorPieceKey) {
      throw new Error("Invalid location roll: " + location);
    }
    GameStateSingleton.getInstance().debugMessage += ` Trafienie w ${armorPieceKey}.`;

    const armorPiece = targetCharacter.characterArmor[armorPieceKey];
    const armorSP = armorPiece?.currentSP ?? 0;

    if (attackDataProp.weapon.improvedArmorPiercing) {
      damage = damage - Math.floor(armorSP / 2);
    } else {
      damage = damage - armorSP;
    }
    if (damage < 0) damage = 0;
    if (damage > 0) {
      GameStateSingleton.getInstance().debugMessage += ` Przebito pancerz.`;
      if (armorPiece && armorPiece.currentSP > 0) {
        if (attackDataProp.weapon.armorShreding) {
          const armorShredingRoll = new DiceRoll("1d6");
          armorPiece.currentSP -= Math.floor(armorShredingRoll.total / 2);
        }
        armorPiece.currentSP -= 1;
      }
    } else {
      GameStateSingleton.getInstance().debugMessage += ` Pancerz zatrzymał atak.`;
    }

    let isDamageReduced = armorPiece.reductions.includes(
      attackDataProp.typeOfDamage
    );
    if (
      attackDataProp.weapon.armorPiercing ||
      attackDataProp.weapon.improvedArmorPiercing
    ) {
      isDamageReduced = false;
    }
    if (isDamageReduced) {
      damage = Math.floor(damage / 2);
      GameStateSingleton.getInstance().debugMessage += ` Pancerz zredukował obrażenia.`;
    }

    let isTargetImmune = targetCharacter.immunities.includes(
      attackDataProp.typeOfDamage
    );
    if (isTargetImmune) {
      damage = 0;
      GameStateSingleton.getInstance().debugMessage += ` Cel jest odporny na obrażenia.`;
    }

    let isTargetSusceptible = targetCharacter.susceptibilities.includes(
      attackDataProp.typeOfDamage
    );
    if (isTargetSusceptible) {
      damage = Math.floor(damage * 2);
      GameStateSingleton.getInstance().debugMessage += ` Cel jest podatny na obrażenia.`;
    }

    const locationMultipliers: Record<
      keyof typeof targetCharacter.characterArmor,
      number
    > = {
      head: 3,
      torso: 1,
      rightArm: 0.5,
      leftArm: 0.5,
      rightLeg: 0.5,
      leftLeg: 0.5,
    };

    const locationMultiplier = locationMultipliers[armorPieceKey] || 1;
    damage = Math.floor(damage * locationMultiplier);

    const fullOffensiveValue =
      attackDataProp.offensiveRoll.total +
      attackDataProp.offensiveSkill +
      attackDataProp.offensiveStat +
      attackDataProp.offensiveModifier;

    const fullDefensiveValue =
      attackDataProp.defensiveRoll.total +
      attackDataProp.defensiveSkill +
      attackDataProp.defensiveStat +
      attackDataProp.defensiveModifier;

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
    GameStateSingleton.getInstance().debugMessage += ` Obrażenia: ${damage}. Trafienie krytyczne: ${levelOfCriticalHit}.`;

    GameStateSingleton.getInstance().debugMessage += ` Nałożono efekty: ${attackDataProp.appliedStatuses.join(
      ", "
    )}.`;
    gameState.characters = gameState.characters.map((character) =>
      character.id === targetCharacter.id
        ? {
            ...character,
            currentHP: character.currentHP - damage,
            status: [...character.status, ...attackDataProp.appliedStatuses],
          }
        : character
    );
  } else {
    GameStateSingleton.getInstance().debugMessage += ` Atak nie trafił.`;
  }
}
