import type { AttackData } from "../../../shared/types/attackData";
import type { Socket } from "socket.io-client";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { TypesOfStatus } from "../../../shared/types/typesOfStatus";

type Props = {
  socket: typeof Socket;
  attackData: AttackData;
  setAttackData: (attackData: AttackData) => void;
  setShowGameMastersApprovalModal: (showModal: boolean) => void;
};

export default function GamesMasterApproval({
  socket,
  attackData,
  setAttackData,
  setShowGameMastersApprovalModal,
}: Props) {
  function checkHit(attackData: AttackData): boolean {
    const attackTotal =
      attackData.offensiveRoll.total +
      attackData.offensiveStat +
      attackData.offensiveSkill +
      attackData.offensiveModifier;
    const defenceTotal =
      attackData.defensiveRoll.total +
      attackData.defensiveStat +
      attackData.defensiveSkill +
      attackData.defensiveModifier;
    return attackTotal > defenceTotal;
  }

  const handleRollChange = (
    rollType: "offensiveRoll" | "defensiveRoll" | "damageRoll",
    total: number,
    /**
     * Optional parameter to specify the dice notation.
     * If not provided, defaults to "1d10".
     * @default "1d10"
     */
    diceNotation: string = "1d10"
  ) => {
    const newRoll = new DiceRoll({
      notation: diceNotation,
      rolls: [total],
    });

    setAttackData({
      ...attackData,
      isTargetHit: checkHit({
        ...attackData,
        [rollType]: newRoll,
      }),
      [rollType]: newRoll,
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Potwierdź Atak
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
          <div className="col-span-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Atak</h2>
            <label className="block text-gray-700 font-medium mb-1">
              Rzut Ataku
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={attackData.offensiveRoll.total}
                onChange={(e) =>
                  handleRollChange("offensiveRoll", Number(e.target.value))
                }
                className="w-16 px-2 py-1 border border-gray-300 rounded-md"
              />
              <span className="text-gray-600">
                + ({attackData.offensiveStat} cecha +{" "}
                {attackData.offensiveSkill} zdol. +{" "}
                {attackData.offensiveModifier} mod.) ={" "}
                <span className="font-semibold text-gray-800">
                  {attackData.offensiveRoll.total +
                    attackData.offensiveStat +
                    attackData.offensiveSkill +
                    attackData.offensiveModifier}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="text-gray-700">Modyfikator ataku:</label>
              <input
                type="number"
                value={attackData.offensiveModifier}
                onChange={(e) =>
                  setAttackData({
                    ...attackData,
                    offensiveModifier: Number(e.target.value),
                    isTargetHit: checkHit({
                      ...attackData,
                      offensiveModifier: Number(e.target.value),
                    }),
                  })
                }
                className="w-16 px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="col-span-2 border-t border-gray-200 mt-4 pt-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Obrona</h2>
            <label className="block text-gray-700 font-medium mb-1">
              Rzut Obrony
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={attackData.defensiveRoll.total}
                onChange={(e) =>
                  handleRollChange("defensiveRoll", Number(e.target.value))
                }
                className="w-16 px-2 py-1 border border-gray-300 rounded-md"
              />
              <span className="text-gray-600">
                + ({attackData.defensiveStat} stat + {attackData.defensiveSkill}{" "}
                skill + {attackData.defensiveModifier} mod.) ={" "}
                <span className="font-semibold text-gray-800">
                  {attackData.defensiveRoll.total +
                    attackData.defensiveStat +
                    attackData.defensiveSkill +
                    attackData.defensiveModifier}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <label className="text-gray-700">Modyfikator obrony:</label>
              <input
                type="number"
                value={attackData.defensiveModifier}
                onChange={(e) =>
                  setAttackData({
                    ...attackData,
                    defensiveModifier: Number(e.target.value),
                    isTargetHit: checkHit({
                      ...attackData,
                      defensiveModifier: Number(e.target.value),
                    }),
                  })
                }
                className="w-16 px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="col-span-2 border-t border-gray-200 mt-4 pt-4 grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Obrażenia ({attackData.weapon.damage})
              </label>
              <input
                type="number"
                value={attackData.damageRoll.total}
                onChange={(e) =>
                  handleRollChange(
                    "damageRoll",
                    Number(e.target.value),
                    attackData.weapon.damage
                  )
                }
                className="w-24 px-2 py-1 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Lokacja trafienia (rzut)
              </label>
              <select
                value={attackData.locationRoll.total}
                onChange={(e) =>
                  setAttackData({
                    ...attackData,
                    locationRoll: new DiceRoll({
                      notation: "1d10",
                      rolls: [Number(e.target.value)],
                    }),
                  })
                }
                className="w-36 px-2 py-1 border border-gray-300 rounded-md"
              >
                <option value={1}>Głowa (x3)</option>
                <option value={2}>Tułów (x1)</option>
                <option value={3}>Tułów (x1)</option>
                <option value={4}>Tułów (x1)</option>
                <option value={5}>Prawa Ręka (x0.5)</option>
                <option value={6}>Lewa Ręka (x0.5)</option>
                <option value={7}>Prawa Noga (x0.5)</option>
                <option value={8}>Prawa Noga (x0.5)</option>
                <option value={9}>Lewa Noga (x0.5)</option>
                <option value={10}>Lewa Noga (x0.5)</option>
              </select>
            </div>
          </div>

          <div className="col-span-2 flex items-center mt-2">
            <input
              id="isTargetHit"
              type="checkbox"
              checked={attackData.isTargetHit}
              onChange={(e) =>
                setAttackData({
                  ...attackData,
                  isTargetHit: e.target.checked,
                })
              }
              className="w-4 h-4 text-gray-800 border-gray-300 rounded"
            />
            <label htmlFor="isTargetHit" className="ml-2 text-gray-700">
              Cel został trafiony
            </label>
          </div>
          <div className="col-span-2 mt-4">
            <label className="block text-gray-700 font-medium mb-1">
              Statusy do nałożenia
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.values(TypesOfStatus).map((status) => (
                <label key={status} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={attackData.appliedStatuses.includes(status)}
                    onChange={(e) => {
                      const newStatuses = e.target.checked
                        ? [...attackData.appliedStatuses, status]
                        : attackData.appliedStatuses.filter(
                            (s) => s !== status
                          );
                      setAttackData({
                        ...attackData,
                        appliedStatuses: newStatuses,
                      });
                    }}
                    className="w-4 h-4 text-gray-800 border-gray-300 rounded"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => {
              socket.emit("executeAttack", attackData);
              setShowGameMastersApprovalModal(false);
            }}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 text-sm font-medium"
          >
            Wykonaj Atak
          </button>
        </div>
      </div>
    </div>
  );
}
