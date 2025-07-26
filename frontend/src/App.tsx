import { useState, useEffect } from "react";
//@ts-expect-error it actually works, no actions needed (probably installed types are not-perfect)
import { io } from "socket.io-client";
import type { GameState } from "./shared/types/gameState";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";
import CharacterTable from "./components/CharactersTable/CharactersTable";
import PlayersTable from "./components/PlayersTable/PlayersTable";
import type { Character } from "./shared/types/character";
import type { AttackData } from "./shared/types/attackData";
const socket = io("http://localhost:3001");

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [clientsCharacterID, setClientsCharacterID] = useState("");

  const [showDefenceModal, setShowDefenceModal] = useState(false);
  const [showGameMastersApprovalModal, setShowGameMastersApprovalModal] =
    useState(false);
  const [attackData, setAttackData] = useState<AttackData>({
    offensiveStat: 0,
    offensiveSkill: 0,
    offensiveRoll: 5,

    defensiveStat: 0,
    defensiveSkill: 0,
    defensiveRoll: 5,

    damageRoll: 0,

    isTargetHit: false,
  });

  const [defenceMessage, setDefenceMessage] = useState("");

  useEffect(() => {
    socket.on("updateGameState", (gameState: GameState) => {
      setGameState(gameState);
      const controlledCharacterID = gameState.players.find(
        (player) => player.socketID === socket.id
      )?.controlledCharacterID;
      setClientsCharacterID(controlledCharacterID || "none");
    });
    socket.on("requestDefence", (actorCharacter: Character) => {
      setShowDefenceModal(true);
      setDefenceMessage(`${actorCharacter.name} zaatakował Cię!`);
    });
    socket.on("requestGameMastersApproval", (attackData: AttackData) => {
      setShowGameMastersApprovalModal(true);
      setAttackData(attackData);
    });
  }, []);

  const defendSelf = (typeOfDefence: "DODGE" | "REPOSITION") => {
    socket.emit("defend", typeOfDefence);
    setShowDefenceModal(false);
  };
  const chooseCharacter = (characterID: string) => {
    socket.emit("chooseCharacter", characterID);
  };
  const changeGameMaster = (socketID: string) => {
    socket.emit("changeGameMaster", socketID);
  };
  const addCharacter = () => {
    socket.emit("createCharacter");
  };
  const attackCharacter = (targetCharacterID: string) => {
    socket.emit("attackCharacter", targetCharacterID);
  };

  return (
    <div className="p-4 mx-auto bg-gray-100 rounded-lg shadow-md relative">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina
      </h1>
      <div onClick={addCharacter}>New char</div>

      <div className="text-center text-lg text-gray-700">
        {gameState.debugMessage}
      </div>

      <div className="p-2">
        <PlayersTable
          players={gameState.players}
          changeGameMaster={changeGameMaster}
        />
      </div>
      <CharacterTable
        characters={gameState.characters}
        chooseCharacter={chooseCharacter}
        clientsCharacterId={clientsCharacterID}
        attackCharacter={attackCharacter}
      />

      {showDefenceModal && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs backdrop-brightness-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-4">
              En garde!
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              {defenceMessage}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  defendSelf("DODGE");
                }}
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                Dodge
              </button>
              <button
                onClick={() => {
                  defendSelf("REPOSITION");
                }}
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                Reposition
              </button>
            </div>
          </div>
        </div>
      )}
      {showGameMastersApprovalModal && (
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
                    + ({attackData.offensiveStat} stat +{" "}
                    {attackData.offensiveSkill} skill) ={" "}
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
                    + ({attackData.defensiveStat} stat +{" "}
                    {attackData.defensiveSkill} skill) ={" "}
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
                onClick={() => setShowGameMastersApprovalModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 text-sm"
              >
                Anuluj
              </button>
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
      )}
    </div>
  );
}
