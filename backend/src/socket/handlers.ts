// socket/handlers.ts
import { Server, Socket } from "socket.io";
import { GameState } from "../shared/types/gameState";
import { insertCharacter, getAllCharacters } from "../db/character.repository";
import { generateRandomCharacter } from "../shared/helpers/generateRandomCharacter";
import { getCharacterByCharactersId } from "../shared/helpers/characterGetters";

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
      console.log(`Actor: ${socket.id}, targer: ${targetCharacterID}`);
      const target = getCharacterByCharactersId(
        targetCharacterID,
        gameState.characters
      );
      gameState.debugMessage = `Oczekiwanie na obronę postaci ${target?.name}`;
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
