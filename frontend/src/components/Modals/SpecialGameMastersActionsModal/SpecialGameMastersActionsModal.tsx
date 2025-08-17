import { type ReactNode } from "react";
import { useGameStore } from "../../../hooks/useGameStore";
import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import { ValueBar } from "../../CharactersTable/ValueBar";

type SpecialGameMastersActionsModalProps = {
  onConfirm: () => void;
  onClose: () => void;
  targetCharacterID: string;
};

export default function SpecialGameMastersActionsModal({
  onConfirm,
  onClose,
  targetCharacterID,
}: SpecialGameMastersActionsModalProps) {
  const characters = useGameStore((state) => state.gameState.characters);
  const updateCharacterStat = useGameStore(
    (state) => state.updateCharacterStat,
  );
  const targetCharacter = getCharacterByCharactersId(
    targetCharacterID,
    characters,
  );

  if (!targetCharacter) {
    return (
      <div className="bg-opacity-40 k fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="border-border bg-smoke w-full max-w-xl rounded-lg border-4 border-double p-8 shadow-lg">
          <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
            Specjalne Akcje Mistrza Gry
          </h2>
          Wystąpił błąd podczas ładowania danych postaci.
          <div className="mt-8 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="border-witcher-yellow k bg-witcher-yellow text-secondary hover:bg-witcher-orange cursor-pointer border-4 border-double px-8 py-2 font-bold transition-colors"
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleChange = (
    stat: "currentHP" | "currentStamina" | "currentStunScore",
    delta: number,
  ) => {
    updateCharacterStat(targetCharacterID, stat, delta);
  };

  return (
    <div className="bg-opacity-40 k fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border-border bg-smoke w-full max-w-xl rounded-lg border-4 border-double p-8 shadow-lg">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
          Specjalne Akcje Mistrza Gry
        </h2>
        <div className="mt-4 text-center">
          Wybrana postać: {targetCharacter.name}
          <div className="flex flex-col items-center justify-center space-y-2">
            <ValueBarWrapper
              title={`HP: ${targetCharacter.currentHP}/${targetCharacter.maxHP}`}
              onMinus={() => handleChange("currentHP", -1)}
              onPlus={() => handleChange("currentHP", 1)}
            >
              <ValueBar
                current={targetCharacter.currentHP}
                max={targetCharacter.maxHP}
                bgColor="bg-bar-health"
                height="h-3"
                title="HP"
              />
            </ValueBarWrapper>
            <ValueBarWrapper
              title={`Stamina: ${targetCharacter.currentStamina}/${targetCharacter.maxStamina}`}
              onMinus={() => handleChange("currentStamina", -1)}
              onPlus={() => handleChange("currentStamina", 1)}
            >
              <ValueBar
                current={targetCharacter.currentStamina}
                max={targetCharacter.maxStamina}
                bgColor="bg-bar-stamina"
                height="h-3"
                title="Stamina"
              />
            </ValueBarWrapper>
            <ValueBarWrapper
              title={`Przytomność: ${targetCharacter.currentStunScore}/${targetCharacter.maxStunScore}`}
              onMinus={() => handleChange("currentStunScore", -1)}
              onPlus={() => handleChange("currentStunScore", 1)}
            >
              <ValueBar
                current={targetCharacter.currentStunScore}
                max={targetCharacter.maxStunScore}
                bgColor="bg-bar-stun"
                height="h-3"
                title="Przytomność"
              />
            </ValueBarWrapper>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="border-witcher-yellow k bg-witcher-yellow text-secondary hover:bg-witcher-orange cursor-pointer border-4 border-double px-8 py-2 font-bold transition-colors"
          >
            X
          </button>
          <button
            onClick={() => onConfirm()}
            className="border-witcher-yellow k bg-witcher-yellow text-secondary hover:bg-witcher-orange cursor-pointer border-4 border-double px-8 py-2 font-bold transition-colors"
          >
            Potwierdź
          </button>
        </div>
      </div>
    </div>
  );
}

type ValueBarWrapperProps = {
  children: ReactNode;
  title: string;
  onMinus: () => void;
  onPlus: () => void;
};

const ValueBarWrapper = ({
  children,
  title,
  onMinus,
  onPlus,
}: ValueBarWrapperProps) => {
  return (
    <div className="mb-8 w-full text-center">
      {title}:
      <div className="flex items-center justify-center space-x-2">
        <button
          className="border-witcher-yellow bg-witcher-yellow text-secondary hover:bg-witcher-orange flex w-12 cursor-pointer items-center justify-center border-4 border-double text-xl font-bold"
          onClick={onMinus}
        >
          -
        </button>
        {children}
        <button
          className="border-witcher-yellow bg-witcher-yellow text-secondary hover:bg-witcher-orange flex w-12 cursor-pointer items-center justify-center border-4 border-double text-xl font-bold"
          onClick={onPlus}
        >
          +
        </button>
      </div>
    </div>
  );
};
