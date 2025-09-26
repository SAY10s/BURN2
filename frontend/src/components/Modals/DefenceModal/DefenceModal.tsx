import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import type { AttackData } from "../../../shared/types/attackData";
import type { Character } from "../../../shared/types/character";
import {
  TYPES_OF_DEFENCE_TRANSLATION,
  TypesOfDefence,
} from "../../../shared/types/typesOfDefence";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

type DefenceModalProps = {
  onDefend: (type: TypesOfDefence) => void;
  attackData: AttackData;
  characters: Character[];
};

export default function DefenceModal({
  onDefend,
  attackData,
  characters,
}: DefenceModalProps) {
  const actorCharacter = getCharacterByCharactersId(
    attackData.actorCharacterID,
    characters,
  );
  return (
    <Modal>
      <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
        En garde!
      </h2>
      <p className="text-secondary mb-6 text-center text-lg">
        <span className="text-primary font-bold">{actorCharacter.name}</span>{" "}
        atakuje Cię przy użyciu {attackData.actorWeapon.name}.
      </p>
      <div className="grid grid-cols-3 gap-4">
        {Object.values(TypesOfDefence).map((value) => (
          <Button key={value} onClick={() => onDefend(value as TypesOfDefence)}>
            {TYPES_OF_DEFENCE_TRANSLATION[value as TypesOfDefence]}
          </Button>
        ))}
      </div>
    </Modal>
  );
}
