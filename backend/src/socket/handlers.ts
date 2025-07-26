// socket/handlers.ts
import { Server, Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { insertCharacter, getAllCharacters } from "../db/character.repository";
import { generateRandomCharacter } from "../shared/helpers/generateRandomCharacter";
import {
  getCharacterByCharactersId,
  getPlayerByCharactersId,
  getPlayerByPlayersSocketId,
} from "../shared/helpers/characterGetters";

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

    socket.on("chooseCharacter", (characterID) => {
      gameState.players = gameState.players.map((player) =>
        player.socketID === socket.id
          ? { ...player, controlledCharacterID: characterID }
          : player
      );
      updateGameState();
    });

    socket.on("changePlayersRole", (socketID: string) => {
      gameState.players = gameState.players.map((player) =>
        player.socketID === socketID
          ? { ...player, isGameMaster: !player.isGameMaster }
          : player
      );
      updateGameState();
    });

    socket.on("createCharacter", async () => {
      const newChar = generateRandomCharacter();
      await insertCharacter(newChar);
      const characters = await getAllCharacters();
      gameState.characters = characters;
      updateGameState();
    });

    socket.on("attackCharacter", async (targetCharacterID) => {
      const actorPlayer = getPlayerByPlayersSocketId(
        socket.id,
        gameState.players
      );
      const actorCharacter = getCharacterByCharactersId(
        actorPlayer.controlledCharacterID,
        gameState.characters
      );
      const targetPlayer = getPlayerByCharactersId(
        targetCharacterID,
        gameState.players
      );
      const targetCharacter = getCharacterByCharactersId(
        targetCharacterID,
        gameState.characters
      );

      gameState.debugMessage = `${actorCharacter.name}(${actorPlayer.socketID}) zaatakował ${targetCharacter.name}(${targetPlayer.socketID}).`;
      updateGameState();

      io.to(targetPlayer.socketID).emit("requestDefence", actorCharacter);

      const targetSocket = io.sockets.sockets.get(targetPlayer.socketID);
      if (!targetSocket) {
        throw new Error(`Target socket (${targetSocket}) not found`);
      }

      targetSocket.once("defend", (typeOfDefence: "DODGE" | "REPOSITION") => {
        switch (typeOfDefence) {
          case "DODGE":
            gameState.debugMessage += ` ${targetCharacter.name} próbuje uniknąć.`;
            break;

          case "REPOSITION":
            gameState.debugMessage += ` ${targetCharacter.name} próbuje zejść z linii.`;
            break;

          default:
            gameState.debugMessage = "Error occured while getting defence info";
        }
        updateGameState();
      });
    });

    socket.on("disconnect", () => {
      gameState.players = gameState.players.filter(
        (player) => player.socketID !== socket.id
      );
      updateGameState();
    });
  });
}
