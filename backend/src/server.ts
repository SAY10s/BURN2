import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "./generated/prisma/client";
import { Dice, DiceRoll } from "@dice-roller/rpg-dice-roller";

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

interface gameState {
  lastAction: {
    name: string;
    damage: string;
  };
}

const gameState = {
  lastAction: {
    name: "start",
    damage: "0d0",
  },
};
// Socket.io
io.on("connection", (socket) => {
  console.log("Użytkownik podłączony");

  socket.on("playerAction", (action) => {
    console.log("Akcja gracza:", action);

    const damageRoll = new DiceRoll(action.damage);

    gameState.lastAction = {
      name: action.name,
      damage: damageRoll.total.toString(),
    };
    io.emit("updateGameState", gameState);
  });
});

// Uruchom serwer
httpServer.listen(3001, () => {
  console.log("Serwer działa na http://localhost:3001");
});
