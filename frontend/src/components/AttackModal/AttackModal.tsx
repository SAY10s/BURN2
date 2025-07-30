import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import type { AttackData } from "../../shared/types/attackData";
import type { Character } from "../../shared/types/character";

type Props = {
  attackData: AttackData;
  actorCharacterID: string;
  characters: Character[];
  setAttackData: (data: AttackData) => void;
  setShowAttackModal: (showModal: boolean) => void;
  onConfirmAttack: (attackData: AttackData) => void;
};

export default function AttackModal({
  attackData,
  actorCharacterID,
  characters,
  setAttackData,
  setShowAttackModal,
  onConfirmAttack,
}: Props) {
  const actorCharacter = getCharacterByCharactersId(
    actorCharacterID,
    characters
  );
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Wykonaj Atak
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Wybierz Broń
          </label>
          <select
            value={attackData.weapon.id}
            onChange={(e) =>
              setAttackData({
                ...attackData,
                weapon: {
                  ...attackData.weapon,
                  id: e.target.value,
                },
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Wybierz Broń --
            </option>
            {actorCharacter.weapons.map((weapon) => (
              <option key={weapon.id} value={weapon.id}>
                {weapon.name}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => {
              // attackData.targetCharacterID = get
              onConfirmAttack(attackData);
              setShowAttackModal(false);
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm font-medium"
          >
            Potwierdź Atak
          </button>
        </div>
      </div>
    </div>
  );
}
