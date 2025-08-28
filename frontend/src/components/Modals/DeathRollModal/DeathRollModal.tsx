import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { useGameStore } from "../../../hooks/useGameStore";
import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

interface DeathRollModalProps {
  deathRollTargetID: string;
  onConfirm: (didDie: boolean) => void;
  onClose: () => void;
}

export default function DeathRollModal({
  deathRollTargetID,
  onConfirm,
  onClose,
}: DeathRollModalProps) {
  const deathRollCharacter = getCharacterByCharactersId(
    deathRollTargetID,
    useGameStore((state) => state.gameState.characters),
  );

  const deathRoll = new DiceRoll(`1d10`);

  return (
    <Modal>
      <h1 className="text-center text-4xl">Death Roll Modal</h1>
      <div
        className={`align-center m-12 flex justify-center ${
          deathRoll.total +
            Math.floor(deathRollCharacter.currentStunScore / 10) >
          10 + deathRollCharacter.deathRollAdditionalDC
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        <div>
          <span className="text-sm opacity-60">
            {deathRoll.total}
            {" + "}
            {Math.floor(deathRollCharacter.currentStunScore / 10)}
            {" = "}
          </span>
          <span className="text-2xl font-bold">
            {deathRoll.total +
              Math.floor(deathRollCharacter.currentStunScore / 10)}
          </span>
        </div>
        <div className="mx-2 flex items-center">
          <span className="text-2xl font-bold">
            {deathRoll.total +
              Math.floor(deathRollCharacter.currentStunScore / 10) >
            10 + deathRollCharacter.deathRollAdditionalDC
              ? " > "
              : " < "}
          </span>
        </div>
        <div>
          <span className="text-2xl font-bold">
            {10 + deathRollCharacter.deathRollAdditionalDC}
          </span>
          <span className="text-sm opacity-60">{" = "}</span>

          <span className="text-sm opacity-60">
            10 + {deathRollCharacter.deathRollAdditionalDC}
          </span>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button onClick={onClose} className="m-2">
          Close
        </Button>
        <Button onClick={() => onConfirm(false)} className="m-2">
          Nie zabijaj
        </Button>
        <Button onClick={() => onConfirm(true)} className="m-2">
          Zabij
        </Button>
      </div>
    </Modal>
  );
}
