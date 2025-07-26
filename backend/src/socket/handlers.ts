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
      isGameMaster: false,
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

      gameState.debugMessage = `${actorCharacter.name}(${actorPlayer.socketID}) zaatakował ${targetCharacter.name}(${targetPlayer.socketID})`;

      updateGameState();
    });

    socket.on("disconnect", () => {
      gameState.players = gameState.players.filter(
        (player) => player.socketID !== socket.id
      );
      updateGameState();
    });
  });
}
