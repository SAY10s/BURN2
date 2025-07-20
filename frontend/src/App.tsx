import { useState, useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

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

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    lastAction: {
      actor: "",
      target: "",
      name: "start",
      damage: "0d0",
    },
    debugMessage: "",
  });

  useEffect(() => {
    socket.on("updateGameState", (gameState: GameState) => {
      setGameState(gameState);
    });
  }, []);

  const handleAttack = (target: string) => {
    const numberOfDice: number = Math.floor(Math.random() * 5) + 1;
    const damage = `${numberOfDice}d6`;
    const attackData = {
      actor: socket.id,
      target: target,
      name: "Atak mieczem",
      damage: damage,
    };
    socket.emit("playerAction", attackData);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina
      </h1>
      <div className="text-center text-lg text-gray-700">
        {gameState.lastAction.actor} zadał {gameState.lastAction.damage}{" "}
        graczowi {gameState.lastAction.target}
      </div>
      <div className="text-center text-lg text-gray-700">
        {gameState.debugMessage}
      </div>
      <div className="p-2">
        {gameState.players.map((player) => {
          return (
            <div>
              <div>
                {player.name} - {player.socketID}{" "}
                {player.socketID === socket.id && "(That's you!)"}
              </div>
              <div>
                {player.currentHP}/{player.maxHP}
              </div>
              <button
                onClick={() => {
                  handleAttack(player.socketID);
                }}
                className="block w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors mb-4"
              >
                Atak
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
