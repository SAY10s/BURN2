import { Server, Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import {
  getCharacterByCharactersId,
  getGameMasterPlayer,
  getPlayerByCharactersId,
  getPlayerByPlayersSocketId,
} from "../shared/helpers/characterGetters";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { AttackData } from "../shared/types/attackData";
import { chooseCharacter } from "./chooseCharacter";
import { changeGameMaster } from "./changeGameMaster";
import { createRandomCharacter } from "./createRandomCharacter";
import { disconnect } from "./disconnect";
import { attackCharacter } from "./attackCharacter";

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

    socket.on("chooseCharacter", (characterID: string) => {
      chooseCharacter(socket, gameState, characterID, updateGameState);
    });

    socket.on("changeGameMaster", (socketID: string) => {
      changeGameMaster(socket, gameState, socketID, updateGameState);
    });

    socket.on("createRandomCharacter", async () => {
      createRandomCharacter(gameState, updateGameState);
    });

    socket.on("attackCharacter", async (targetCharacterID) => {
      attackCharacter(
        socket,
        io,
        gameState,
        targetCharacterID,
        updateGameState
      );
    });

    socket.on("disconnect", () => {
      disconnect(socket, gameState, updateGameState);
    });
  });
}
