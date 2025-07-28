import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import {
  getCharacterByCharactersId,
  getGameMasterPlayer,
  getPlayerByCharactersId,
  getPlayerByPlayersSocketId,
} from "../shared/helpers/characterGetters";
import { AttackData } from "../shared/types/attackData";
import { Character } from "../shared/types/character";
import { GameState } from "../shared/types/gameState";
import { Socket } from "socket.io";

export function getActorAndTarget(
  socket: Socket,
  gameState: GameState,
  targetCharacterID: string
) {
  const actorPlayer = getPlayerByPlayersSocketId(socket.id, gameState.players);
  const actorCharacter = getCharacterByCharactersId(
    actorPlayer.controlledCharacterID,
    gameState.characters
  );
  const targetPlayer = getPlayerByCharactersId(
    targetCharacterID,
    gameState.players,
    true
  );
  const targetCharacter = getCharacterByCharactersId(
    targetCharacterID,
    gameState.characters
  );
  const gameMasterPlayer = getGameMasterPlayer(gameState.players);

  return {
    actorPlayer,
    actorCharacter,
    targetPlayer,
    targetCharacter,
    gameMasterPlayer,
  };
}

export function createAttackData(actorCharacter: Character): AttackData {
  return {
    offensiveStat: actorCharacter.skills.reflexSkills.swordsmanship,
    offensiveSkill: actorCharacter.stats.reflex,
    offensiveRoll: new DiceRoll("1d10!").total,

    defensiveStat: 0,
    defensiveSkill: 0,
    defensiveRoll: new DiceRoll("1d10!").total,

    damageRoll: new DiceRoll("3d6").total,

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
