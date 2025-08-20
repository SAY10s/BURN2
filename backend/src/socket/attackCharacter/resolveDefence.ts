import { AttackData } from "../../shared/types/attackData";
import { Character } from "../../shared/types/character";
import { TypesOfDefence } from "../../shared/types/typesOfDefence";
import { addDebugMessage } from "../utils/addDebugMessage";

/**
 * Resolves the defensive action taken by the target character during an attack.
 *
 * Based on the selected defence type, this function updates the provided `AttackData` object
 * with the appropriate defensive stat and skill from the target character. It also logs a debug
 * message describing the defensive action.
 *
 * @param defenceType - The type of defence chosen by the target character (e.g., DODGE, REPOSITION).
 * @param targetCharacter - The character object representing the target of the attack.
 * @param attackDataProp - The current `AttackData` object to be updated with defensive values.
 * @returns The updated `AttackData` object with defensive stat and skill set according to the defence type.

 */
export function resolveDefence(
  defenceType: TypesOfDefence,
  targetCharacter: Character,
  attackDataProp: AttackData
) {
  switch (defenceType) {
    case TypesOfDefence.DODGE:
      addDebugMessage(` ${targetCharacter.name} próbuje uniknąć.`);
      attackDataProp.defensiveStat = targetCharacter.stats.reflex;
      attackDataProp.defensiveSkill =
        targetCharacter.skills.reflexSkills.dodgeEscape;
      return attackDataProp;
    case TypesOfDefence.REPOSITION:
      addDebugMessage(` ${targetCharacter.name} próbuje zejść z linii.`);
      attackDataProp.defensiveStat = targetCharacter.stats.dexterity;
      attackDataProp.defensiveSkill =
        targetCharacter.skills.dexteritySkills.athletics;
      return attackDataProp;
    case TypesOfDefence.NONE:
      addDebugMessage(` ${targetCharacter.name} nie podejmuje obrony.`);
      attackDataProp.defensiveStat = targetCharacter.stats.body;
      attackDataProp.defensiveSkill = 0;
      return attackDataProp;
    default:
      addDebugMessage("Błąd przy określaniu obrony.");
      return attackDataProp;
  }
}
