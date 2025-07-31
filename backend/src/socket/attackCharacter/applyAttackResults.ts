import { AttackData } from "../../shared/types/attackData";
import { GameState } from "../../shared/types/gameState";

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
