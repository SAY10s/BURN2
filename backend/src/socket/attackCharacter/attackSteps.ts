import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { AttackData } from "../../shared/types/attackData";
import { Character } from "../../shared/types/character";
import { GameState } from "../../shared/types/gameState";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";

export function createAttackData(
  attackData: AttackData,
  characters: Character[]
): AttackData {
  console.log("actorCharacterID: ", attackData.actorCharacterID);
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

export function resolveDefence(
  defenceType: "DODGE" | "REPOSITION",
  attackData: AttackData,
  targetCharacter: Character,
  gameState: GameState
) {
  switch (defenceType) {
    case "DODGE":
      gameState.debugMessage += ` ${targetCharacter.name} próbuje uniknąć.`;
      attackData.defensiveStat = targetCharacter.stats.reflex;
      attackData.defensiveSkill =
        targetCharacter.skills.reflexSkills.dodgeEscape;
      break;
    case "REPOSITION":
      gameState.debugMessage += ` ${targetCharacter.name} próbuje zejść z linii.`;
      attackData.defensiveStat = targetCharacter.stats.dexterity;
      attackData.defensiveSkill =
        targetCharacter.skills.dexteritySkills.athletics;
      break;
    default:
      gameState.debugMessage = "Błąd przy określaniu obrony.";
  }
}

export function checkHit(attackData: AttackData): boolean {
  const attackTotal =
    attackData.offensiveRoll +
    attackData.offensiveStat +
    attackData.offensiveSkill;
  const defenceTotal =
    attackData.defensiveRoll +
    attackData.defensiveStat +
    attackData.defensiveSkill;
  return attackTotal > defenceTotal;
}

export function applyAttackResults(
  attackData: AttackData,
  targetCharacterID: string,
  gameState: GameState
) {
  if (attackData.isTargetHit) {
    gameState.characters = gameState.characters.map((character) =>
      character.id === targetCharacterID
        ? {
            ...character,
            currentHP: character.currentHP - attackData.damageRoll,
          }
        : character
    );
    gameState.debugMessage += ` Trafienie za ${attackData.damageRoll}`;
  } else {
    gameState.debugMessage += ` Atak nie trafia`;
  }
}
