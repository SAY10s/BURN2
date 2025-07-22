import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "./generated/prisma/client";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { GameState } from "./shared/types/gameState";
import { Action } from "./shared/types/action";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

const gameState: GameState = INITIAL_GAME_STATE;

io.on("connection", (socket) => {
  const updateGameState = () => {
    io.emit("updateGameState", gameState);
  };
  console.log("Użytkownik podłączony");

  // FIXME: its hardcoded so far
  gameState.players.push({
    socketID: socket.id,
    name: "taco",
    maxHP: 100,
    currentHP: 100,
  });

  updateGameState();

  socket.on("playerAction", (action: Action) => {
    const damageRoll = new DiceRoll(action.damage);

    gameState.lastAction = {
      ...action,
      damage: damageRoll.total.toString(),
    };
    gameState.players = gameState.players.map((player) => {
      if (player.socketID === action.target) {
        return {
          ...player,
          currentHP: player.currentHP - damageRoll.total,
        };
      } else return player;
    });
    gameState.debugMessage = damageRoll.rolls.toString();
    updateGameState();
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
