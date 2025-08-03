import { AttackData } from "../../shared/types/attackData";
import { AttackDataSingleton } from "../../singletons/AttackDataSingleton";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";

export function applyAttackResults(
  targetCharacterID: string,
  attackDataProp: AttackData
) {
  const gameState = GameStateSingleton.getInstance();
  if (attackDataProp.isTargetHit) {
    gameState.characters = gameState.characters.map((character) =>
      character.id === targetCharacterID
        ? {
            ...character,
            currentHP: character.currentHP - attackDataProp.damageRoll.total,
          }
        : character
    );
    gameState.debugMessage += ` Trafienie za ${attackDataProp.damageRoll.total}`;
  } else {
    gameState.debugMessage += ` Atak nie trafia`;
  }
}
