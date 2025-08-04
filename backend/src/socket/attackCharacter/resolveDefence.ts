import { Character } from "../../shared/types/character";
import { TypesOfDefence } from "../../shared/types/typesOfDefence";
import { AttackDataSingleton } from "../../singletons/AttackDataSingleton";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";

export function resolveDefence(
  defenceType: TypesOfDefence,
  targetCharacter: Character
) {
  const attackData = AttackDataSingleton.getInstance();
  const gameState = GameStateSingleton.getInstance();

  switch (defenceType) {
    case TypesOfDefence.DODGE:
      gameState.debugMessage += ` ${targetCharacter.name} próbuje uniknąć.`;
      attackData.defensiveStat = targetCharacter.stats.reflex;
      attackData.defensiveSkill =
        targetCharacter.skills.reflexSkills.dodgeEscape;
      break;
    case TypesOfDefence.REPOSITION:
      gameState.debugMessage += ` ${targetCharacter.name} próbuje zejść z linii.`;
      attackData.defensiveStat = targetCharacter.stats.dexterity;
      attackData.defensiveSkill =
        targetCharacter.skills.dexteritySkills.athletics;
      break;
    default:
    // gameState.debugMessage = "Błąd przy określaniu obrony.";
  }
}
