import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import type { AttackData } from "../../../shared/types/attackData";
import type { Character } from "../../../shared/types/character";
import { TypesOfAttack } from "../../../shared/types/TypesOfAttack";
import Button from "../../UI/Button";

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
    characters,
  );
  console.table(attackData.weapon.typesOfDamage);
  return (
    <div className="bg-opacity-40 k fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border-border bg-smoke w-full max-w-xl rounded-lg border-4 border-double p-8 shadow-lg">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
          Wykonaj Atak
        </h2>

        <div className="mb-4">
          <label className="text-primary mb-1 block font-bold">
            Wybierz Broń
          </label>
          <select
            value={attackData.weapon.id}
            onChange={(e) => {
              const selectedWeapon = actorCharacter.weapons.find(
                (weapon) => weapon.id === e.target.value,
              );
              if (selectedWeapon) {
                setAttackData({
                  ...attackData,
                  weapon: selectedWeapon,
                });
              }
            }}
            className="border-witcher-yellow text-primary w-full rounded-md border-4 border-double bg-neutral-950 px-3 py-2 font-semibold focus:outline-none"
          >
            <option value="" disabled>
              -- Wybierz Broń --
            </option>
            {actorCharacter.weapons.map((weapon) => (
              <option key={weapon.id} value={weapon.id}>
                {weapon.name} ({weapon.damage})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 flex flex-row gap-4">
          <div className="w-1/2">
            <label className="text-primary mb-1 block font-bold">
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
              className="border-witcher-yellow text-primary w-full rounded-md border-4 border-double bg-neutral-950 px-3 py-2 font-semibold focus:outline-none"
            >
              {Object.values(TypesOfAttack).map((type) => (
                <option key={type} value={type}>
                  {type.replace(/_/g, " ")}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/2">
            <label className="text-primary mb-1 block font-bold">
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
              className="border-witcher-yellow text-primary w-full rounded-md border-4 border-double bg-neutral-950 px-3 py-2 font-semibold focus:outline-none"
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
        </div>

        <div className="mt-4">
          {attackData.weapon.statusChances ? (
            <div className="flex flex-row justify-center gap-6 p-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl text-orange-500" title="Podpalenie">
                  🔥
                </span>
                <span className="font-bold">
                  {attackData.weapon.statusChances.BURN}%
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-red-500" title="Krwawienie">
                  🩸
                </span>
                <span className="font-bold">
                  {attackData.weapon.statusChances.BLEEDING}%
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-green-500" title="Zatrucie">
                  🧪
                </span>
                <span className="font-bold">
                  {attackData.weapon.statusChances.POISON}%
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl text-blue-500" title="Duszenie">
                  🫁
                </span>
                <span className="font-bold">
                  {attackData.weapon.statusChances.CHOKE}%
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Brak statusów dla tej broni.</p>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            onClick={() => {
              onConfirmAttack(attackData);
              setShowAttackModal(false);
            }}
          >
            Potwierdź Atak
          </Button>
        </div>
      </div>
    </div>
  );
}
