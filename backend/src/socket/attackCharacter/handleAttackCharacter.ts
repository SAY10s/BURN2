import { AttackData } from "../../shared/types/attackData";
import { createAttackData } from "./createAttackData";
import { resolveDefence } from "./resolveDefence";
import { checkHit } from "./checkHit";
import { applyAttackResults } from "./applyAttackResults";
import { Socket, Server } from "socket.io";
import { getActorAndTarget } from "./utils/getActorAndTarget";
import { getSocketFromIObySocketID } from "../utils/getSocketFromIObySocketID";
import { AttackDataSingleton } from "../../singletons/AttackDataSingleton";
import { addDebugMessage } from "../utils/addDebugMessage";

/**
 * Handles the attack action initiated by a character against another character in the game.
 *
 * @param socket - The socket instance of the player initiating the attack.
 * @param io - The Socket.IO server instance for emitting and listening to events.
 * @param attackDataProp - The initial attack data containing information about the attack. SEE REMARKS.
 * @param updateGameState - Callback to update the current game state after changes.
 * @param updateAttackData - Callback to update the attack data after changes.
 * @remarks
 * The `attackDataProp` received from the client contains only the following fields:
 * - `targetCharacterID`: ID of the target character (string)
 * - `weapon`: selected weapon object (Weapon)
 * - `typeOfAttack`: selected type of attack (TypesOfAttack)
 * - `typeOfDamage`: selected type of damage (TypesOfDamage)
 *
 * The remaining fields of `AttackData` (such as dice rolls, stats, modifiers, statuses, etc.)
 * are populated on the backend (e.g., by `createAttackData`, `resolveDefence`).
 */
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

  // CREATE ATTACK DATA
  Object.assign(
    AttackDataSingleton.getInstance(),
    createAttackData(attackDataProp)
  );

  addDebugMessage(
    ` ${actorCharacter.name} zaatakował ${targetCharacter.name}.`
  );
  updateGameState();
  updateAttackData();

  const targetSocket = getSocketFromIObySocketID(io, targetPlayer.socketID);
  const gameMasterSocket = getSocketFromIObySocketID(
    io,
    gameMasterPlayer.socketID
  );

  io.to(targetPlayer.socketID).emit("requestDefence", actorCharacter);

  targetSocket.once("defend", (defenceType) => {
    // RESOLVE DEFENCE
    Object.assign(
      AttackDataSingleton.getInstance(),
      resolveDefence(
        defenceType,
        targetCharacter,
        AttackDataSingleton.getInstance()
      )
    );

    AttackDataSingleton.getInstance().isTargetHit = checkHit(
      AttackDataSingleton.getInstance()
    );

    updateGameState();
    updateAttackData();

    io.to(gameMasterPlayer.socketID).emit(
      "requestGameMastersApproval",
      AttackDataSingleton.getInstance()
    );

    gameMasterSocket.once("executeAttack", (finalAttackData: AttackData) => {
      applyAttackResults(socket, finalAttackData);
      Object.assign(AttackDataSingleton.getInstance(), finalAttackData);
      updateGameState();
      updateAttackData();
    });
  });
}
