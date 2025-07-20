import { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

export default function App() {
  const [actions, setActions] = useState<string[]>([]);

  useEffect(() => {
    socket.on("pendingAction", (action) => {
      setActions((prev) => [...prev, `Oczekuje: ${action.name}`]);
    });

    socket.on("executeAction", (action) => {
      setActions((prev) => [...prev, `Wykonano: ${action.name}`]);
    });
  }, []);

  const handleAttack = () => {
    socket.emit("playerAction", { name: "Atak mieczem", damage: "2d6" });
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1>Walka Wiedźmina</h1>
      <button onClick={handleAttack}>Atakuj</button>
      <div>
        {actions.map((action, i) => (
          <div key={i}>{action}</div>
        ))}
      </div>
    </div>
  );
}
