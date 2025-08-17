import type { AttackData } from "../../../shared/types/attackData";
import type { Socket } from "socket.io-client";
import { DiceRoll } from "@dice-roller/rpg-dice-roller";
import { TypesOfStatus } from "../../../shared/types/typesOfStatus";
import Button from "../../UI/Button";

type Props = {
  socket: typeof Socket;
  attackData: AttackData;
  setAttackData: (attackData: AttackData) => void;
  setShowGMsApprovalModal: (showModal: boolean) => void;
};

export default function GameMastersApprovalModal({
  socket,
  attackData,
  setAttackData,
  setShowGMsApprovalModal,
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
    diceNotation: string = "1d10",
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
    <div className="bg-opacity-40 k fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="border-border bg-smoke w-full max-w-xl rounded-lg border-4 border-double p-8 shadow-lg">
        <h2 className="text-primary mb-6 text-center text-2xl font-bold uppercase">
          Potwierdź Atak
        </h2>

        <div className="text-primary grid grid-cols-2 gap-x-6 gap-y-4 text-base">
          <div className="col-span-2">
            <h2 className="text-primary mb-2 text-lg font-semibold">Atak</h2>
            <label className="text-primary mb-1 block font-bold">
              Rzut Ataku
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={attackData.offensiveRoll.total}
                onChange={(e) =>
                  handleRollChange("offensiveRoll", Number(e.target.value))
                }
                className="border-witcher-yellow text-primary w-16 rounded-md border-4 border-double bg-neutral-950 px-2 py-1 font-semibold focus:outline-none"
              />
              <span className="text-secondary">
                + ({attackData.offensiveStat} cecha +{" "}
                {attackData.offensiveSkill} zdol. +{" "}
                {attackData.offensiveModifier} mod.) ={" "}
                <span className="text-primary font-semibold">
                  {attackData.offensiveRoll.total +
                    attackData.offensiveStat +
                    attackData.offensiveSkill +
                    attackData.offensiveModifier}
                </span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <label className="text-primary font-bold">
                Modyfikator ataku:
              </label>
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
                className="border-witcher-yellow text-primary w-16 rounded-md border-4 border-double bg-neutral-950 px-2 py-1 font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div className="border-witcher-yellow col-span-2 mt-4 border-t pt-4">
            <h2 className="text-primary mb-2 text-lg font-semibold">Obrona</h2>
            <label className="text-primary mb-1 block font-bold">
              Rzut Obrony
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={attackData.defensiveRoll.total}
                onChange={(e) =>
                  handleRollChange("defensiveRoll", Number(e.target.value))
                }
                className="border-witcher-yellow text-primary w-16 rounded-md border-4 border-double bg-neutral-950 px-2 py-1 font-semibold focus:outline-none"
              />
              <span className="text-secondary">
                + ({attackData.defensiveStat} stat + {attackData.defensiveSkill}{" "}
                skill + {attackData.defensiveModifier} mod.) ={" "}
                <span className="text-primary font-semibold">
                  {attackData.defensiveRoll.total +
                    attackData.defensiveStat +
                    attackData.defensiveSkill +
                    attackData.defensiveModifier}
                </span>
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <label className="text-primary font-bold">
                Modyfikator obrony:
              </label>
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
                className="border-witcher-yellow text-primary w-16 rounded-md border-4 border-double bg-neutral-950 px-2 py-1 font-semibold focus:outline-none"
              />
            </div>
          </div>

          <div className="border-witcher-yellow col-span-2 mt-4 grid grid-cols-2 gap-x-6 gap-y-4 border-t pt-4">
            <div>
              <label className="text-primary mb-1 block font-bold">
                Obrażenia ({attackData.weapon.damage})
              </label>
              <input
                type="number"
                value={attackData.damageRoll.total}
                onChange={(e) =>
                  handleRollChange(
                    "damageRoll",
                    Number(e.target.value),
                    attackData.weapon.damage,
                  )
                }
                className="border-witcher-yellow text-primary w-24 rounded-md border-4 border-double bg-neutral-950 px-2 py-1 font-semibold focus:outline-none"
              />
            </div>
            <div>
              <label className="text-primary mb-1 block font-bold">
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
                className="border-witcher-yellow text-primary w-36 rounded-md border-4 border-double bg-neutral-950 px-2 py-1 font-semibold focus:outline-none"
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

          <div className="col-span-2 mt-2 flex items-center">
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
              className="border-witcher-yellow text-primary h-4 w-4 rounded bg-neutral-950"
            />
            <label
              htmlFor="isTargetHit"
              className="text-primary ml-2 font-bold"
            >
              Cel został trafiony
            </label>
          </div>
          <div className="col-span-2 mt-4">
            <label className="text-primary mb-1 block font-bold">
              Statusy do nałożenia
            </label>
            <div className="flex flex-wrap gap-4">
              {Object.values(TypesOfStatus).map((status) => (
                <label
                  key={status}
                  className="text-secondary flex items-center gap-1"
                >
                  <input
                    type="checkbox"
                    checked={attackData.appliedStatuses.includes(status)}
                    onChange={(e) => {
                      const newStatuses = e.target.checked
                        ? [...attackData.appliedStatuses, status]
                        : attackData.appliedStatuses.filter(
                            (s) => s !== status,
                          );
                      setAttackData({
                        ...attackData,
                        appliedStatuses: newStatuses,
                      });
                    }}
                    className="border-witcher-yellow text-primary h-4 w-4 rounded bg-neutral-950"
                  />
                  <span>{status}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            onClick={() => {
              socket.emit("executeAttack", attackData);
              setShowGMsApprovalModal(false);
            }}
          >
            Wykonaj Atak
          </Button>
        </div>
      </div>
    </div>
  );
}
