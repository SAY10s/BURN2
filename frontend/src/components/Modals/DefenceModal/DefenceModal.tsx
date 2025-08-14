import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import type { AttackData } from "../../../shared/types/attackData";
import type { Character } from "../../../shared/types/character";
import { TypesOfDefence } from "../../../shared/types/typesOfDefence";

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
    <div className="bg-opacity-40 k fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border-border bg-smoke w-full max-w-xl rounded-lg border-4 border-double p-8 shadow-lg">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
          En garde!
        </h2>
        <p className="text-secondary mb-6 text-center text-lg">
          <span className="text-primary font-bold">{actorCharacter.name}</span>{" "}
          atakuje Cię przy użyciu {attackData.weapon.name}.
        </p>
        <div className="flex justify-center gap-4">
          {Object.values(TypesOfDefence).map((value) => (
            <button
              key={value}
              onClick={() => onDefend(value as TypesOfDefence)}
              className="border-witcher-yellow k bg-witcher-yellow text-secondary hover:bg-witcher-orange cursor-pointer border-4 border-double px-8 py-2 font-bold transition-colors"
            >
              {value.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
