import { AttackData } from "../../shared/types/attackData";
import { GameState } from "../../shared/types/gameState";
import { createAttackData } from "./createAttackData";
import { resolveDefence } from "./resolveDefence";
import { checkHit } from "./checkHit";
import { applyAttackResults } from "./applyAttackResults";
import { Socket, Server } from "socket.io";
import { getActorAndTarget } from "./getActorAndTarget";
import { getSocketFromIObySocketID } from "../utils/getSocketFromIObySocketID";
import { AttackDataSingleton } from "../../singletons/AttackDataSingleton";
import { GameStateSingleton } from "../../singletons/GameStateSingleton";

export async function handleAttackCharacter(
  socket: Socket,
  io: Server,
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
  } = getActorAndTarget(socket, attackDataProp.targetCharacterID);

  attackDataProp.actorCharacterID = actorCharacter.id;
  Object.assign(
    AttackDataSingleton.getInstance(),
    createAttackData(attackDataProp)
  );

  GameStateSingleton.getInstance().debugMessage = `${actorCharacter.name}(${actorPlayer.socketID}) zaatakował ${targetCharacter.name}(${targetPlayer.socketID}).`;
  updateGameState();
  updateAttackData();

  const targetSocket = getSocketFromIObySocketID(io, targetPlayer.socketID);
  const gameMasterSocket = getSocketFromIObySocketID(
    io,
    gameMasterPlayer.socketID
  );

  io.to(targetPlayer.socketID).emit("requestDefence", actorCharacter);

  targetSocket.once("defend", (defenceType) => {
    resolveDefence(defenceType, targetCharacter);

    AttackDataSingleton.getInstance().isTargetHit = checkHit(
      AttackDataSingleton.getInstance()
    );

    updateAttackData();

    io.to(gameMasterPlayer.socketID).emit(
      "requestGameMastersApproval",
      AttackDataSingleton.getInstance()
    );

    gameMasterSocket.once("executeAttack", (finalAttackData: AttackData) => {
      applyAttackResults(attackDataProp.targetCharacterID, finalAttackData);
      updateGameState();
      updateAttackData();
    });
  });
}
