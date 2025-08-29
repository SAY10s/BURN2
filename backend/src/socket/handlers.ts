import { Server, Socket } from "socket.io";
import { AttackData } from "../shared/types/attackData";
import { handleChooseCharacter } from "./handleChooseCharacter";
import { handleChangeGameMaster } from "./handleChangeGameMaster";
import { handleCreateRandomCharacter } from "./handleCreateRandomCharacter";
import { handleDisconnect } from "./handleDisconnect";
import { handleAttackCharacter } from "./attackCharacter/handleAttackCharacter";
import { handleDeleteAllCharacters } from "./handleDeleteAllCharacters";
import { GameStateSingleton } from "../singletons/GameStateSingleton";
import { AttackDataSingleton } from "../singletons/AttackDataSingleton";
import { handleEditCharacter } from "./handleEditCharacter";
import { handleDeathRoll } from "./handleDeathRoll";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    const updateGameState = (animationDelay = 0) => {
      io.emit("updateGameState", {
        gameState: GameStateSingleton.getInstance(),
        animationDelay,
      });
    };
    const updateAttackData = () => {
      io.emit("updateAttackData", AttackDataSingleton.getInstance());
    };

    GameStateSingleton.getInstance().players.push({
      socketID: socket.id,
      controlledCharacterID: "none",
      isGameMaster:
        GameStateSingleton.getInstance().players.length === 0 ? true : false,
    });

    updateGameState();
    updateAttackData();

    socket.on("deleteAllCharacters", () => {
      handleDeleteAllCharacters(updateGameState);
    });

    socket.on(
      "deathRoll",
      ({ characterID, didDie }: { characterID: string; didDie: boolean }) => {
        handleDeathRoll(characterID, didDie, updateGameState);
      }
    );

    socket.on("chooseCharacter", (characterID: string) => {
      handleChooseCharacter(socket, characterID, updateGameState);
    });

    socket.on("changeGameMaster", (socketID: string) => {
      handleChangeGameMaster(socket, socketID, updateGameState);
    });

    socket.on("createRandomCharacter", async () => {
      handleCreateRandomCharacter(updateGameState);
    });

    socket.on("editCharacter", async (characterID: string) => {
      handleEditCharacter(socket, characterID, updateGameState);
    });

    /**
     * Handles the "attackCharacter" event.
     *
     * @param attackDataProp - The partial AttackData object sent from the client.
     *
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
    socket.on("attackCharacter", async (attackDataProp: AttackData) => {
      handleAttackCharacter(
        socket,
        io,
        attackDataProp,
        updateGameState,
        updateAttackData
      );
    });

    socket.on("disconnect", () => {
      handleDisconnect(socket, updateGameState);
    });
  });
}
