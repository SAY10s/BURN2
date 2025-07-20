import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "./generated/prisma/client";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

interface Player {
  socketID: string;
  name: string;
  maxHP: number;
  currentHP: number;
}

interface GameState {
  players: Player[];
  lastAction: {
    actor: string;
    target: string;
    name: string;
    damage: string;
  };
  debugMessage: string;
}

const gameState: GameState = {
  players: [],
  lastAction: {
    actor: "",
    target: "",
    name: "start",
    damage: "0d0",
  },
  debugMessage: "",
};
// Socket.io
io.on("connection", (socket) => {
  console.log("Użytkownik podłączony");

  gameState.players.push({
    socketID: socket.id,
    name: "taco",
    maxHP: 100,
    currentHP: 100,
  });

  io.emit("updateGameState", gameState);

  socket.on("playerAction", (action) => {
    console.log("Akcja gracza:", action);

    const damageRoll = new DiceRoll(action.damage);

    gameState.lastAction = {
      ...action,
      damage: damageRoll.total.toString(),
    };
    gameState.debugMessage = damageRoll.rolls.toString();
    io.emit("updateGameState", gameState);
  });

  socket.on("disconnect", () => {
    gameState.players = gameState.players.filter(
      (player) => player.socketID != socket.id
    );
  });
});

httpServer.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
