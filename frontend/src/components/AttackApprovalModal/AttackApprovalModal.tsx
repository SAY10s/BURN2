import type { AttackData } from "../../shared/types/attackData";
import type { Socket } from "socket.io-client";

type Props = {
  socket: typeof Socket;
  attackData: AttackData;
  setAttackData: (data: AttackData) => void;
  setShowGameMastersApprovalModal: (showModal: boolean) => void;
};

export default function AttackApprovalModal({
  socket,
  attackData,
  setAttackData,
  setShowGameMastersApprovalModal,
}: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
          Potwierdź Atak
        </h2>

        <div className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-700">
          {/* Offensive */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Rzut Ataku
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={attackData.offensiveRoll}
                onChange={(e) =>
                  setAttackData({
                    ...attackData,
                    offensiveRoll: +e.target.value,
                  })
                }
                className="w-16 px-2 py-1 border border-gray-300 rounded-md"
              />
              <span className="text-gray-600">
                + ({attackData.offensiveStat} stat + {attackData.offensiveSkill}{" "}
                skill) ={" "}
                <span className="font-semibold text-gray-800">
                  {attackData.offensiveRoll +
                    attackData.offensiveStat +
                    attackData.offensiveSkill}
                </span>
              </span>
            </div>
          </div>

          {/* Defensive */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Rzut Obrony
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={attackData.defensiveRoll}
                onChange={(e) =>
                  setAttackData({
                    ...attackData,
                    defensiveRoll: +e.target.value,
                  })
                }
                className="w-16 px-2 py-1 border border-gray-300 rounded-md"
              />
              <span className="text-gray-600">
                + ({attackData.defensiveStat} stat + {attackData.defensiveSkill}{" "}
                skill) ={" "}
                <span className="font-semibold text-gray-800">
                  {attackData.defensiveRoll +
                    attackData.defensiveStat +
                    attackData.defensiveSkill}
                </span>
              </span>
            </div>
          </div>

          {/* Damage */}
          <div className="col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Obrażenia
            </label>
            <input
              type="number"
              value={attackData.damageRoll}
              onChange={(e) =>
                setAttackData({
                  ...attackData,
                  damageRoll: +e.target.value,
                })
              }
              className="w-24 px-2 py-1 border border-gray-300 rounded-md"
            />
          </div>

          {/* isTargetHit */}
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
