import { useState, useEffect } from "react";
import { useGameStore } from "../../hooks/useGameStore";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import type { AttackData } from "../../shared/types/attackData";

interface AttackDataBoxProps {
  attackData: AttackData;
}

export default function AttackDataBox({ attackData }: AttackDataBoxProps) {
  const characters = useGameStore((state) => state.gameState.characters);
  const setGameState = useGameStore((state) => state.setGameState);

  const isAnimating = useGameStore((state) => state.animationData.isAnimating);

  let actorCharacter;
  let targetCharacter;
  if (attackData.attackStage !== "none") {
    try {
      actorCharacter = getCharacterByCharactersId(
        attackData.actorCharacterID,
        characters,
      );
    } catch (error) {
      console.error("Error fetching actor character:", error);
    }
    try {
      targetCharacter = getCharacterByCharactersId(
        attackData.targetCharacterID,
        characters,
      );
    } catch (error) {
      console.error("Error fetching target character:", error);
    }
  }

  const [randomNum, setRandomNum] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isAnimating) {
      interval = setInterval(() => {
        setRandomNum(Math.floor(Math.random() * 100) + 1);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAnimating]);

  return (
    <div className="grid grid-cols-3">
      <div className="attack-box-wrapper flex flex-col items-center">
        <div className="attack-box-inner-div text-center text-3xl font-bold uppercase">
          {(attackData.attackStage !== "none" &&
            actorCharacter &&
            actorCharacter.name) ||
            "Atakujący"}
        </div>
        <div>
          Rzut:{" "}
          {attackData.attackStage === "executed_attack" &&
            (isAnimating ? randomNum : attackData.offensiveRoll.total)}
        </div>
      </div>
      <div className="attack-box-wrapper flex flex-col items-center">
        <div className="text-center uppercase">{attackData.attackStage}</div>
      </div>
      <div className="attack-box-wrapper flex flex-col items-center">
        <div className="text-center text-3xl font-bold uppercase">
          {attackData.attackStage !== "none" && targetCharacter?.name}
        </div>
        <div>
          Rzut:{" "}
          {attackData.attackStage === "executed_attack" &&
            (isAnimating ? randomNum : attackData.defensiveRoll.total)}
        </div>
      </div>
    </div>
  );
}
