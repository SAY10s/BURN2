import { type ReactNode } from "react";
import { useGameStore } from "../../../hooks/useGameStore";
import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import { ValueBar } from "../../CharactersTable/ValueBar";

type SpecialGameMastersActionsModalProps = {
  onClose: () => void;
  targetCharacterID: string;
};

export default function SpecialGameMastersActionsModal({
  onClose,
  targetCharacterID,
}: SpecialGameMastersActionsModalProps) {
  try {
    const characters = useGameStore((state) => state.gameState.characters);
    const targetCharacter = getCharacterByCharactersId(
      targetCharacterID,
      characters,
    );
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
                title={
                  "HP: " +
                  targetCharacter.currentHP +
                  "/" +
                  targetCharacter.maxHP
                }
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
                title={
                  "Stamina: " +
                  targetCharacter.currentStamina +
                  "/" +
                  targetCharacter.maxStamina
                }
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
                title={
                  "Przytomność: " +
                  targetCharacter.currentStunScore +
                  "/" +
                  targetCharacter.maxStunScore
                }
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
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  } catch {
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
    </div>;
  }

  return null;
}

type ValueBarWrapperProps = {
  children: ReactNode;
  title: string;
};

const ValueBarWrapper = ({ children, title }: ValueBarWrapperProps) => {
  return (
    <div className="mb-8 w-full text-center">
      {title}:
      <div className="flex items-center justify-center space-x-2">
        <button className="border-witcher-yellow bg-witcher-yellow text-secondary hover:bg-witcher-orange flex w-12 cursor-pointer items-center justify-center border-4 border-double text-xl font-bold">
          -
        </button>
        {children}
        <button className="border-witcher-yellow bg-witcher-yellow text-secondary hover:bg-witcher-orange flex w-12 cursor-pointer items-center justify-center border-4 border-double text-xl font-bold">
          +
        </button>
      </div>
    </div>
  );
};
