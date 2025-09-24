import type { AttackData } from "../../shared/types/attackData";
import { useState, useEffect } from "react";
import { useGameStore } from "../../hooks/useGameStore";
import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";

import executedAttack from "../../assets/AttackDataBox/executed-attack.svg";
import waitingForDefence from "../../assets/AttackDataBox/waiting-for-defence.svg";
import waitingForGMfrom from "../../assets/AttackDataBox/waiting-for-gm.svg";
import d20 from "../../assets/AttackDataBox/d20.svg";
import { TYPES_OF_DEFENCE_TRANSLATION } from "../../shared/types/typesOfDefence";
import CharacterBox from "./CharacterBox";
import { TYPES_OF_ATTACK_TRANSLATION } from "../../shared/types/TypesOfAttack";

interface AttackDataBoxProps {
  attackData: AttackData;
}

export default function AttackDataBox({ attackData }: AttackDataBoxProps) {
  const characters = useGameStore((state) => state.gameState.characters);
  const isAnimating = useGameStore((state) => state.animationData.isAnimating);

  let winner = undefined;

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
  if (attackData.attackStage === "executed_attack") {
    if (attackData.isTargetHit) {
      winner = "actor";
    } else {
      winner = "target";
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
    <>
      <div className="my-16 grid grid-cols-3">
        {/* ACTOR */}
        <CharacterBox
          character={actorCharacter}
          attackStage={attackData.attackStage}
          isAnimating={isAnimating}
          isWinner={winner === "actor"}
          rollValue={attackData.offensiveRoll.total}
          randomNum={randomNum}
        >
          <div>
            {attackData.attackStage !== "none" &&
              TYPES_OF_ATTACK_TRANSLATION[attackData.typeOfAttack]}
          </div>
        </CharacterBox>

        {/* ADDITIONAL DATA */}
        <div className="height-full flex flex-col items-center justify-center">
          <div className="text-center uppercase">{currentStageTitle} </div>
          <div className="mt-4 flex items-center justify-center">
            {currentStageIcon}
          </div>
        </div>

        {/* TARGET */}
        <CharacterBox
          character={targetCharacter}
          attackStage={attackData.attackStage}
          isAnimating={isAnimating}
          isWinner={winner === "target"}
          rollValue={attackData.defensiveRoll.total}
          randomNum={randomNum}
        >
          <div>
            {attackData.attackStage !== "none" &&
              TYPES_OF_DEFENCE_TRANSLATION[attackData.typeOfDefence]}
          </div>
        </CharacterBox>
      </div>
    </>
  );
}
