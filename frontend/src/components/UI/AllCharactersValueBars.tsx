import type { Character } from "../../shared/types/character";
import ValueBar from "./ValueBar";

export default function AllCharactersValueBars({
  character,
}: {
  character: Character | undefined;
}) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <ValueBar
        current={character ? character.currentHP : 0}
        max={character ? character.maxHP : 1}
        height="h-3"
        isPlayer={character?.isPlayer}
        title="HP"
      />
      <div className="grid w-full grid-cols-2 gap-2">
        <ValueBar
          current={character ? character.currentStamina : 0}
          max={character ? character.maxStamina : 1}
          bgColor="bg-bar-stamina"
          isPlayer={character?.isPlayer}
          title="Stamina"
        />
        <ValueBar
          current={character ? character.currentStunScore : 0}
          max={character ? character.maxStunScore : 1}
          bgColor="bg-bar-stun"
          title="Przytomność"
          isPlayer={character?.isPlayer}
        />
      </div>
    </div>
  );
}
