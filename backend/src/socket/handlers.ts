import { Server, Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { AttackData } from "../shared/types/attackData";
import { handleChooseCharacter } from "./handleChooseCharacter";
import { handleChangeGameMaster } from "./handleChangeGameMaster";
import { handleCreateRandomCharacter } from "./handleCreateRandomCharacter";
import { handleDisconnect } from "./handleDisconnect";
import { handleAttackCharacter } from "./attackCharacter/handleAttackCharacter";
import { handleDeleteAllCharacters } from "./handleDeleteAllCharacters";
import { GameStateSingleton } from "../singletons/GameStateSingleton";
import { AttackDataSingleton } from "../singletons/AttackDataSingleton";
import { handleSpecialAction } from "./handleSpecialAction";

export function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    const updateGameState = () => {
      io.emit("updateGameState", GameStateSingleton.getInstance());
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

    socket.on("chooseCharacter", (characterID: string) => {
      handleChooseCharacter(socket, characterID, updateGameState);
    });

    socket.on("changeGameMaster", (socketID: string) => {
      handleChangeGameMaster(socket, socketID, updateGameState);
    });

    socket.on("createRandomCharacter", async () => {
      handleCreateRandomCharacter(updateGameState);
    });

    socket.on("specialAction", async (characterID: string) => {
      handleSpecialAction(socket, characterID, updateGameState);
    });

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
