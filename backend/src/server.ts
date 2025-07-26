// server.ts
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { GameState } from "./shared/types/gameState";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";
import { registerSocketHandlers } from "./socket/handlers";
import { connectToDB } from "./db/mongo";
import { getAllCharacters } from "./db/character.repository";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const gameState: GameState = INITIAL_GAME_STATE;

async function startServer() {
  await connectToDB();
  const charactersFromDB = await getAllCharacters();
  gameState.characters = charactersFromDB;
  registerSocketHandlers(io, gameState);

  httpServer.listen(3001, () => {
    console.log("✅ Server is running on http://localhost:3001");
  });
}

startServer();
