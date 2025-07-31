import { Server, Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { AttackData } from "../shared/types/attackData";
import { handleChooseCharacter } from "./handleChooseCharacter";
import { handleChangeGameMaster } from "./handleChangeGameMaster";
import { handleCreateRandomCharacter } from "./handleCreateRandomCharacter";
import { handleDisconnect } from "./handleDisconnect";
import { handleAttackCharacter } from "./attackCharacter/handleAttackCharacter";
import { handleDeleteAllCharacters } from "./handleDeleteAllCharacters";

export function registerSocketHandlers(io: Server, gameState: GameState) {
  io.on("connection", (socket: Socket) => {
    const updateGameState = () => {
      io.emit("updateGameState", gameState);
    };

    gameState.players.push({
      socketID: socket.id,
      controlledCharacterID: "none",
      isGameMaster: gameState.players.length === 0 ? true : false,
    });

    updateGameState();

    socket.on("deleteAllCharacters", () => {
      handleDeleteAllCharacters(gameState, updateGameState);
    });

    socket.on("chooseCharacter", (characterID: string) => {
      handleChooseCharacter(socket, gameState, characterID, updateGameState);
    });

    socket.on("changeGameMaster", (socketID: string) => {
      handleChangeGameMaster(socket, gameState, socketID, updateGameState);
    });

    socket.on("createRandomCharacter", async () => {
      handleCreateRandomCharacter(gameState, updateGameState);
    });

    socket.on("attackCharacter", async (attackData: AttackData) => {
      handleAttackCharacter(socket, io, gameState, attackData, updateGameState);
    });

    socket.on("disconnect", () => {
      handleDisconnect(socket, gameState, updateGameState);
    });
  });
}
