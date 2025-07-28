import { AttackData } from "../shared/types/attackData";
import { GameState } from "../shared/types/gameState";
import {
  getActorAndTarget,
  createAttackData,
  resolveDefence,
  applyAttackResults,
  checkHit,
} from "./attackSteps";
import { Socket, Server } from "socket.io";

export async function handleAttack(
  socket: Socket,
  io: Server,
  gameState: GameState,
  targetCharacterID: string,
  updateGameState: () => void
) {
  const {
    actorPlayer,
    actorCharacter,
    targetPlayer,
    targetCharacter,
    gameMasterPlayer,
  } = getActorAndTarget(socket, gameState, targetCharacterID);

  const attackData = createAttackData(actorCharacter);

  gameState.debugMessage = `${actorCharacter.name}(${actorPlayer.socketID}) zaatakował ${targetCharacter.name}(${targetPlayer.socketID}).`;
  updateGameState();

  const targetSocket = io.sockets.sockets.get(targetPlayer.socketID);
  if (!targetSocket)
    throw new Error(`Target socket (${targetPlayer.socketID}) not found`);

  const gameMasterSocket = io.sockets.sockets.get(gameMasterPlayer.socketID);
  if (!gameMasterSocket)
    throw new Error(`GM socket (${gameMasterPlayer.socketID}) not found`);

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
      applyAttackResults(finalAttackData, targetCharacterID, gameState);
      updateGameState();
    });
  });
}
