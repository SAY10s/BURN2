import React, { useState } from "react";
import Button from "../UI/Button";

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
      <div className="mb-4 text-4xl font-bold">
        {number !== null ? number : "?"}
      </div>
      <Button onClick={startAnimation} disabled={isAnimating}>
        {isAnimating ? "Losowanie..." : "Losuj liczbę"}
      </Button>
    </div>
  );
}
