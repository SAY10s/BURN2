import { useState, useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

interface gameState {
  lastAction: {
    name: string;
    damage: string;
  };
}

export default function App() {
  const [gameState, setGameState] = useState<gameState>({
    lastAction: {
      name: "start",
      damage: "0d0",
    },
  });

  useEffect(() => {
    socket.on("updateGameState", (gameState: gameState) => {
      setGameState(gameState);
    });
  }, []);

  const handleAttack = () => {
    const numberOfDice: number = Math.floor(Math.random() * 5) + 1;
    const damage = `${numberOfDice}d6`;
    socket.emit("playerAction", { name: "Atak mieczem", damage: damage });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina
      </h1>
      <button
        onClick={handleAttack}
        className="block w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded transition-colors mb-4"
      >
        Atakuj
      </button>
      <div className="text-center text-lg text-gray-700">
        {gameState.lastAction.name} zadał {gameState.lastAction.damage}
      </div>
    </div>
  );
}
