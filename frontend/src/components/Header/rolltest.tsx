import React, { useState } from "react";

type RandomNumberProps = {
  min: number;
  max: number;
  duration: number; // czas trwania animacji w milisekundach
};

export default function RandomNumber({
  min,
  max,
  duration,
}: RandomNumberProps) {
  const [number, setNumber] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const startAnimation = () => {
    setIsAnimating(true);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;

      if (elapsedTime >= duration) {
        clearInterval(interval);
        setNumber(Math.floor(Math.random() * (max - min + 1)) + min); // ustaw ostateczną liczbę
        setIsAnimating(false);
      } else {
        setNumber(Math.floor(Math.random() * (max - min + 1)) + min); // losuj liczbę w trakcie animacji
      }
    }, 50); // częstotliwość odświeżania animacji
  };

  return (
    <div className="text-center">
      <div className="text-4xl font-bold mb-4">
        {number !== null ? number : "?"}
      </div>
      <button
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        onClick={startAnimation}
        disabled={isAnimating}
      >
        {isAnimating ? "Losowanie..." : "Losuj liczbę"}
      </button>
    </div>
  );
}
