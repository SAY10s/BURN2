import { Character } from "../../shared/types/character";
import { TypesOfDefence } from "../../shared/types/typesOfDefence";
import { AttackDataSingleton } from "../../singletons/AttackDataSingleton";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";
import { addDebugMessage } from "../utils/addDebugMessage";

export function resolveDefence(
  defenceType: TypesOfDefence,
  targetCharacter: Character
) {
  const attackData = AttackDataSingleton.getInstance();
  const gameState = GameStateSingleton.getInstance();

  switch (defenceType) {
    case TypesOfDefence.DODGE:
      addDebugMessage(` ${targetCharacter.name} próbuje uniknąć.`);
      attackData.defensiveStat = targetCharacter.stats.reflex;
      attackData.defensiveSkill =
        targetCharacter.skills.reflexSkills.dodgeEscape;
      break;
    case TypesOfDefence.REPOSITION:
      addDebugMessage(` ${targetCharacter.name} próbuje zejść z linii.`);
      attackData.defensiveStat = targetCharacter.stats.dexterity;
      attackData.defensiveSkill =
        targetCharacter.skills.dexteritySkills.athletics;
      break;
    default:
      addDebugMessage("Błąd przy określaniu obrony.");
  }
}
