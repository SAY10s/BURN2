import { AttackData } from "../../shared/types/attackData";
import { GameState } from "../../shared/types/gameState";
import {
  createAttackData,
  resolveDefence,
  applyAttackResults,
  checkHit,
} from "./attackSteps";
import { Socket, Server } from "socket.io";
import { getSocketFromIO } from "../utils/getSocketFromIO";
import { getActorAndTarget } from "./getActorAndTarget";

export async function handleAttackCharacter(
  socket: Socket,
  io: Server,
  gameState: GameState,
  attackDataProp: AttackData,
  updateGameState: () => void
) {
  const {
    actorPlayer,
    actorCharacter,
    targetPlayer,
    targetCharacter,
    gameMasterPlayer,
  } = getActorAndTarget(socket, gameState, attackDataProp.targetCharacterID);

  attackDataProp.actorCharacterID = actorCharacter.id;
  const attackData = createAttackData(attackDataProp, gameState.characters);

  gameState.debugMessage = `${actorCharacter.name}(${actorPlayer.socketID}) zaatakował ${targetCharacter.name}(${targetPlayer.socketID}).`;
  updateGameState();

  const targetSocket = getSocketFromIO(io, targetPlayer.socketID);
  const gameMasterSocket = getSocketFromIO(io, gameMasterPlayer.socketID);

  io.to(targetPlayer.socketID).emit("requestDefence", actorCharacter);

  targetSocket.once("defend", (defenceType) => {
    resolveDefence(defenceType, attackData, targetCharacter, gameState);

    const isHit = checkHit(attackData);
    attackData.isTargetHit = isHit;

    updateGameState();

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
    });
  });
}
