import type { ReactNode } from "react";
import { useGameStore } from "../../../hooks/useGameStore";
import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import { ValueBar } from "../../CharactersTable/ValueBar";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

type EditCharacterModalProps = {
  onConfirm: () => void;
  onClose: () => void;
  triggerDeathRoll: () => void;
  targetCharacterID: string;
};

export default function EditCharacterModal({
  onConfirm,
  onClose,
  targetCharacterID,
  triggerDeathRoll,
}: EditCharacterModalProps) {
  const characters = useGameStore((state) => state.gameState.characters);
  const updateCharacterStat = useGameStore(
    (state) => state.updateCharacterStat,
  );
  const switchIsAlive = useGameStore((state) => state.switchIsAlive);
  const targetCharacter = getCharacterByCharactersId(
    targetCharacterID,
    characters,
  );

  if (!targetCharacter) {
    return (
      <Modal>
        <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
          Specjalne Akcje Mistrza Gry
        </h2>
        Wystąpił błąd podczas ładowania danych postaci.
        <div className="mt-8 flex justify-end gap-3">
          <Button onClick={onClose}>Zamknij</Button>
        </div>
      </Modal>
    );
  }

  const handleChange = (
    stat: "currentHP" | "currentStamina" | "currentStunScore",
    delta: number,
  ) => {
    updateCharacterStat(targetCharacterID, stat, delta);
  };

  return (
    <Modal>
      <Button
        onClick={onClose}
        className="text-primary absolute top-4 right-4 h-8 w-8 cursor-pointer font-bold"
        aria-label="Close Modal"
      >
        ✕
      </Button>
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
        <Button onClick={triggerDeathRoll}>DeathRoll</Button>
        <Button
          onClick={() => {
            switchIsAlive(targetCharacterID);
          }}
        >
          {targetCharacter.isAlive ? "Zabij" : "Wskrześ"}
        </Button>
        <Button onClick={onConfirm}>Potwierdź</Button>
      </div>
    </Modal>
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
        <Button onClick={onMinus}>-</Button>
        {children}
        <Button onClick={onPlus}>+</Button>
      </div>
    </div>
  );
};
