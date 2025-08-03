import { AttackData } from "../../shared/types/attackData";
import { GameState } from "../../shared/types/gameState";
import { createAttackData } from "./createAttackData";
import { resolveDefence } from "./resolveDefence";
import { checkHit } from "./checkHit";
import { applyAttackResults } from "./applyAttackResults";
import { Socket, Server } from "socket.io";
import { getActorAndTarget } from "./getActorAndTarget";
import { getSocketFromIObySocketID } from "../utils/getSocketFromIObySocketID";

export async function handleAttackCharacter(
  socket: Socket,
  io: Server,
  gameState: GameState,
  attackData: AttackData,
  attackDataProp: AttackData,
  updateGameState: () => void,
  updateAttackData: () => void
) {
  const {
    actorPlayer,
    actorCharacter,
    targetPlayer,
    targetCharacter,
    gameMasterPlayer,
  } = getActorAndTarget(socket, gameState, attackDataProp.targetCharacterID);

  attackDataProp.actorCharacterID = actorCharacter.id;
  Object.assign(
    attackData,
    createAttackData(attackDataProp, gameState.characters)
  );

  gameState.debugMessage = `${actorCharacter.name}(${actorPlayer.socketID}) zaatakował ${targetCharacter.name}(${targetPlayer.socketID}).`;
  updateGameState();
  updateAttackData();

  const targetSocket = getSocketFromIObySocketID(io, targetPlayer.socketID);
  const gameMasterSocket = getSocketFromIObySocketID(
    io,
    gameMasterPlayer.socketID
  );

  io.to(targetPlayer.socketID).emit("requestDefence", actorCharacter);

  targetSocket.once("defend", (defenceType) => {
    resolveDefence(defenceType, attackData, targetCharacter, gameState);

    const isHit = checkHit(attackData);
    attackData.isTargetHit = isHit;

    updateAttackData();

    io.to(gameMasterPlayer.socketID).emit(
      "requestGameMastersApproval",
      attackData
    );

    gameMasterSocket.once("executeAttack", (finalAttackData: AttackData) => {
      applyAttackResults(
        finalAttackData,
        attackDataProp.targetCharacterID,
        gameState
      );
      updateGameState();
      updateAttackData();
    });
  });
}
