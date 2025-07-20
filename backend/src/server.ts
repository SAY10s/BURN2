console.log("xD?");
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { PrismaClient } from "./generated/prisma/client";

const prisma = new PrismaClient();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

// Middleware
app.use(express.json());

// Testowy endpoint REST
app.get("/characters", async (req, res) => {
  const characters = await prisma.character.findMany();
  res.json(characters);
});
// Socket.io
io.on("connection", (socket) => {
  console.log("Użytkownik podłączony");

  socket.on("playerAction", (action) => {
    console.log("Akcja gracza:", action);
    io.emit("pendingAction", action); // GM dostaje akcję
  });

  socket.on("approveAction", (action) => {
    io.emit("executeAction", action); // Wszyscy widzą efekt
  });
});

// Uruchom serwer
httpServer.listen(3001, () => {
  console.log("Serwer działa na http://localhost:3001");
});
