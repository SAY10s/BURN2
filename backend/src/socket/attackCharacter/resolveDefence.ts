import { AttackData } from "../../shared/types/attackData";
import { Character } from "../../shared/types/character";
import { GameState } from "../../shared/types/gameState";

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
