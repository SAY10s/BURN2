import { getCharacterByCharactersId } from "../../shared/helpers/characterGetters";
import type { AttackData } from "../../shared/types/attackData";
import type { Character } from "../../shared/types/character";
import { TypesOfAttack } from "../../shared/types/TypesOfAttack";

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
  console.table(attackData.weapon.typesOfDamage);
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
            onChange={(e) => {
              const selectedWeapon = actorCharacter.weapons.find(
                (weapon) => weapon.id === e.target.value
              );
              if (selectedWeapon) {
                setAttackData({
                  ...attackData,
                  weapon: selectedWeapon,
                });
              }
            }}
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
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Wybierz typ Ataku
          </label>
          <select
            value={attackData.typeOfAttack}
            onChange={(e) =>
              setAttackData({
                ...attackData,
                typeOfAttack: e.target.value as AttackData["typeOfAttack"],
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            {Object.values(TypesOfAttack).map((type) => (
              <option key={type} value={type}>
                {type.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 font-medium mb-1">
            Wybierz typ obrażeń
          </label>
          <select
            value={attackData.typeOfDamage}
            onChange={(e) =>
              setAttackData({
                ...attackData,
                typeOfDamage: e.target.value as AttackData["typeOfDamage"],
              })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Wybierz typ obrażeń --
            </option>
            {attackData.weapon.typesOfDamage.map((damageType) => (
              <option key={damageType} value={damageType}>
                {damageType.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Szczegóły Broni
        </h3>
        {attackData.weapon.id ? (
          <div className="text-gray-700">
            <p>
              <strong>Nazwa:</strong> {attackData.weapon.name}
            </p>
            <p>
              <strong>Obrażenia:</strong> {attackData.weapon.damage}
            </p>
          </div>
        ) : (
          <p className="text-gray-500">Brak wybranej broni.</p>
        )}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Szczegóły efektów
          </h3>
          {attackData.weapon.statusChances ? (
            <div className="text-gray-700">
              <p>
                <strong>Podpalenie:</strong>{" "}
                {attackData.weapon.statusChances.BURN}%
              </p>
              <p>
                <strong>Krwawienie:</strong>{" "}
                {attackData.weapon.statusChances.BLEEDING}%
              </p>
              <p>
                <strong>Zatrucie:</strong>{" "}
                {attackData.weapon.statusChances.POISON}%
              </p>
              <p>
                <strong>Duszenie:</strong>{" "}
                {attackData.weapon.statusChances.CHOKE}%
              </p>
            </div>
          ) : (
            <p className="text-gray-500">Brak statusów dla tej broni.</p>
          )}
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
