import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

import { registerSocketHandlers } from "./socket/handlers";
import { connectToDB } from "./db/mongo";
import { getAllCharacters } from "./db/character.repository";

import { GameStateSingleton } from "./singletons/GameStateSingleton";
import { generateRandomCharacter } from "./shared/helpers/generateRandomCharacter";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

async function startServer() {
  // await connectToDB();
  // const charactersFromDB = await getAllCharacters();
  GameStateSingleton.getInstance().characters = [
    generateRandomCharacter(),
    generateRandomCharacter(),
    generateRandomCharacter(),
  ];
  registerSocketHandlers(io);

  httpServer.listen(3001, "0.0.0.0", () => {
    console.log("✅ Server is running on http://localhost:3001");
  });
}

startServer();
