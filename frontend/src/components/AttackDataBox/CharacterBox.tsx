import type { Character } from "../../shared/types/character";
import AllCharactersValueBars from "../UI/AllCharactersValueBars";

interface CharacterBoxProps {
  character: Character | undefined;
  attackStage:
    | "none"
    | "waiting_for_defence"
    | "executed_attack"
    | "waiting_for_gms_approval";
  isAnimating: boolean;
  isWinner: boolean;
  rollValue: number;
  randomNum: number;
  children?: React.ReactNode;
}

export default function CharacterBox({
  character,
  attackStage,
  isAnimating,
  isWinner,
  rollValue,
  randomNum,
  children,
}: CharacterBoxProps) {
  return (
    <div
      className={`attack-box-wrapper flex flex-col items-center ${!isAnimating && attackStage === "executed_attack" ? (isWinner ? "highlight-fade-success" : "highlight-fade-fail") : ""}`}
    >
      <div className="attack-box-inner-div text-center text-3xl font-bold uppercase">
        {(attackStage !== "none" && character && character?.name) ||
          "Atakujący"}
      </div>
      <AllCharactersValueBars character={character} />
      {children}
      <div className="text-center text-6xl font-bold">
        {attackStage === "executed_attack" &&
          (isAnimating ? randomNum : rollValue)}
      </div>
    </div>
  );
}
