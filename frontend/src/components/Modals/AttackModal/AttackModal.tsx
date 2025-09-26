import { getCharacterByCharactersId } from "../../../shared/helpers/characterGetters";
import type { AttackData } from "../../../shared/types/attackData";
import type { Character } from "../../../shared/types/character";
import {
  TYPES_OF_ATTACK_TRANSLATION,
  TypesOfAttack,
} from "../../../shared/types/TypesOfAttack";
import { TYPES_OF_DAMAGE_TRANSLATION } from "../../../shared/types/typesOfDamage";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";

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
  console.table(attackData.actorWeapon.typesOfDamage);
  return (
    <Modal className="relative">
      <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
        Wykonaj Atak
      </h2>
      <Button
        onClick={() => setShowAttackModal(false)}
        className="text-primary absolute top-4 right-4 h-8 w-8 cursor-pointer font-bold"
        aria-label="Close Modal"
      >
        ✕
      </Button>
      <div className="mb-4">
        <label className="text-primary mb-1 block font-bold">
          Wybierz Broń
        </label>
        <select
          value={attackData.actorWeapon.id}
          onChange={(e) => {
            const selectedWeapon = actorCharacter.weapons.find(
              (weapon) => weapon.id === e.target.value,
            );
            if (selectedWeapon) {
              setAttackData({
                ...attackData,
                actorWeapon: selectedWeapon,
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
                {TYPES_OF_ATTACK_TRANSLATION[type]}
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
            {attackData.actorWeapon.typesOfDamage.map((damageType) => (
              <option key={damageType} value={damageType}>
                {TYPES_OF_DAMAGE_TRANSLATION[damageType]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4">
        {attackData.actorWeapon.statusChances ? (
          <div className="flex flex-row justify-center gap-6 p-3">
            <div className="flex flex-col items-center">
              <span className="text-2xl text-orange-500" title="Podpalenie">
                🔥
              </span>
              <span className="font-bold">
                {attackData.actorWeapon.statusChances.BURN}%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-red-500" title="Krwawienie">
                🩸
              </span>
              <span className="font-bold">
                {attackData.actorWeapon.statusChances.BLEEDING}%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-green-500" title="Zatrucie">
                🧪
              </span>
              <span className="font-bold">
                {attackData.actorWeapon.statusChances.POISON}%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl text-blue-500" title="Duszenie">
                🫁
              </span>
              <span className="font-bold">
                {attackData.actorWeapon.statusChances.CHOKE}%
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
    </Modal>
  );
}
