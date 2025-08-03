import type { AttackData } from "../../shared/types/attackData";
import { TypesOfDefence } from "../../shared/types/typesOfDefence";

type DefenceModalProps = {
  onDefend: (type: TypesOfDefence) => void;
  attackData: AttackData;
};

export default function DefenceModal({
  onDefend,
  attackData,
}: DefenceModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
        <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
          En garde!
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Zaatakowano Cię przy użyciu {attackData.weapon.name}
        </p>
        <div className="flex justify-center gap-4">
          {Object.values(TypesOfDefence).map((value) => (
            <button
              key={value}
              onClick={() => onDefend(value as TypesOfDefence)}
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-medium"
            >
              {value.charAt(0) + value.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
