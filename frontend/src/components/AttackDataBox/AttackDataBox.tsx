import type { AttackData } from "../../shared/types/attackData";
import { useState, useEffect } from "react";
import { useGameStore } from "../../hooks/useGameStore";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";

import executedAttack from "../../assets/AttackDataBox/executed-attack.svg";
import waitingForDefence from "../../assets/AttackDataBox/waiting-for-defence.svg";
import waitingForGMfrom from "../../assets/AttackDataBox/waiting-for-gm.svg";
import d20 from "../../assets/AttackDataBox/d20.svg";
import AllCharactersValueBars from "../UI/AllCharactersValueBars";
import { TYPES_OF_DEFENCE_TRANSLATION } from "../../shared/types/typesOfDefence";

interface AttackDataBoxProps {
  attackData: AttackData;
}

export default function AttackDataBox({ attackData }: AttackDataBoxProps) {
  const characters = useGameStore((state) => state.gameState.characters);
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

  let currentStageIcon = <div className="h-16 w-16"></div>;
  let currentStageTitle = "";

  switch (attackData.attackStage) {
    case "executed_attack":
      if (!isAnimating) {
        currentStageIcon = (
          <img src={executedAttack} alt="Wykonany atak" className="h-16 w-16" />
        );
        currentStageTitle = "Wykonany atak";
      } else {
        currentStageIcon = (
          <img src={d20} alt="Losowanie liczb" className="h-16 w-16" />
        );
        currentStageTitle = "Rzucanie koścmi";
      }
      break;
    case "waiting_for_defence":
      currentStageIcon = (
        <img
          src={waitingForDefence}
          alt="Oczekiwanie na obronę"
          className="h-16 w-16"
        />
      );
      currentStageTitle = "Oczekiwanie na obronę";
      break;
    case "waiting_for_gms_approval":
      currentStageIcon = (
        <img
          src={waitingForGMfrom}
          alt="Oczekiwanie na Mistrza Gry"
          className="h-16 w-16"
        />
      );
      currentStageTitle = "Oczekiwanie na Mistrza Gry";
      break;
    default:
      currentStageIcon = <div className="h-16 w-16"></div>;
  }

  const [randomNum, setRandomNum] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    if (isAnimating) {
      interval = setInterval(() => {
        setRandomNum(Math.floor(Math.random() * 15) + 1);
      }, 100);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAnimating]);

  return (
    <div className="my-16 grid grid-cols-3">
      {/* ACTOR */}
      <div className="attack-box-wrapper flex flex-col items-center">
        <div className="attack-box-inner-div text-center text-3xl font-bold uppercase">
          {(attackData.attackStage !== "none" &&
            actorCharacter &&
            actorCharacter.name) ||
            "Atakujący"}
        </div>
        <AllCharactersValueBars character={actorCharacter} />
        <div>
          Rzut:{" "}
          {attackData.attackStage === "executed_attack" &&
            (isAnimating ? randomNum : attackData.offensiveRoll.total)}
        </div>
      </div>

      {/* ADDITIONAL DATA */}
      <div className="height-full flex flex-col items-center justify-center">
        <div className="text-center uppercase">{currentStageTitle} </div>
        <div className="mt-4 flex items-center justify-center">
          {currentStageIcon}
        </div>
      </div>

      {/* TARGET */}
      <div className="attack-box-wrapper flex flex-col items-center">
        <div className="text-center text-3xl font-bold uppercase">
          {(attackData.attackStage !== "none" && targetCharacter?.name) ||
            "Obrońca"}
        </div>
        <AllCharactersValueBars character={targetCharacter} />
        <div>
          {attackData.attackStage !== "none" &&
            TYPES_OF_DEFENCE_TRANSLATION[attackData.typeOfDefence]}
        </div>
        {/* <div className="flex justify-center space-x-2 text-lg">
          {targetCharacter?.status.includes(TypesOfStatus.BLEEDING) && (
            <span className="text-red-500" title="Krwawienie">
              🩸
            </span>
          )}
          {targetCharacter?.status.includes(TypesOfStatus.BURN) && (
            <span className="text-orange-500" title="Podpalenie">
              🔥
            </span>
          )}
          {targetCharacter?.status.includes(TypesOfStatus.POISON) && (
            <span className="text-green-500" title="Zatrucie">
              🧪
            </span>
          )}
        </div> */}
        <div>
          Rzut:{" "}
          {attackData.attackStage === "executed_attack" &&
            (isAnimating ? randomNum : attackData.defensiveRoll.total)}
        </div>
      </div>
    </div>
  );
}
