import { useState } from "react";
import { useSocketHandlers, socket } from "./hooks/useSocketHandlers";
import { INITIAL_GAME_STATE } from "./shared/consts/initialGameState";
import PlayersTable from "./components/PlayersTable/PlayersTable";
import CharacterTable from "./components/CharactersTable/CharactersTable";
import type { GameState } from "./shared/types/gameState";
import type { AttackData } from "./shared/types/attackData";
import AttackApprovalModal from "./components/AttackApprovalModal/AttackApprovalModal";
import DefenceModal from "./components/DefenceModal/DefenceModal";
import { INITIAL_ATTACK_DATA } from "./shared/consts/initialAttackData";
import type { Player } from "./shared/types/player";
import AttackModal from "./components/AttackModal/AttackModal";
import type { TypesOfDefence } from "./shared/types/typesOfDefence";
import AttackDataTable from "./components/DEV/attackData/AttackData";

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [clientsCharacterID, setClientsCharacterID] = useState("");
  const [showDefenceModal, setShowDefenceModal] = useState(false);
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [showGameMastersApprovalModal, setShowGameMastersApprovalModal] =
    useState(false);
  const [attackData, setAttackData] = useState<AttackData>(INITIAL_ATTACK_DATA);
  const [defenceMessage, setDefenceMessage] = useState("");
  const [clientPlayer, setClientPlayer] = useState<Player>({
    controlledCharacterID: "",
    isGameMaster: false,
    socketID: "",
  });

  useSocketHandlers(
    setGameState,
    setClientsCharacterID,
    setShowDefenceModal,
    setDefenceMessage,
    setShowGameMastersApprovalModal,
    setAttackData,
    setClientPlayer
  );

  const defendSelf = (type: TypesOfDefence) => {
    socket.emit("defend", type);
    setShowDefenceModal(false);
  };

  return (
    <div className="p-4 mx-auto bg-gray-100 rounded-lg shadow-md relative">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina {clientPlayer.socketID}{" "}
        {clientPlayer.isGameMaster ? "(GM)" : ""}
      </h1>
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => socket.emit("createRandomCharacter")}
        >
          New character
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => socket.emit("deleteAllCharacters")}
        >
          DELETE ALL CHARACTERS
        </button>
      </div>

      <div className="text-center text-lg text-gray-700">
        {gameState.debugMessage}
      </div>

      <div className="flex  items-center space-y-4">
        <PlayersTable
          players={gameState.players}
          changeGameMaster={(id) => socket.emit("changeGameMaster", id)}
        />
        <AttackDataTable attackData={attackData} />
      </div>

      <CharacterTable
        characters={gameState.characters}
        clientsCharacterId={clientsCharacterID}
        gameMasterView={clientPlayer.isGameMaster}
        chooseCharacter={(id) => socket.emit("chooseCharacter", id)}
        attackCharacter={(id) => {
          if (!clientsCharacterID || clientsCharacterID === "none") {
            alert("You need to choose a character first!");
            return;
          }
          setShowAttackModal(true);
          setAttackData({ ...attackData, targetCharacterID: id });
        }}
      />

      {showDefenceModal && (
        <DefenceModal message={defenceMessage} onDefend={defendSelf} />
      )}
      {showGameMastersApprovalModal && (
        <AttackApprovalModal
          attackData={attackData}
          setAttackData={setAttackData}
          socket={socket}
          setShowGameMastersApprovalModal={setShowGameMastersApprovalModal}
        />
      )}
      {showAttackModal && (
        <AttackModal
          attackData={attackData}
          setAttackData={setAttackData}
          setShowAttackModal={setShowAttackModal}
          characters={gameState.characters}
          actorCharacterID={clientsCharacterID}
          onConfirmAttack={(attackData: AttackData) => {
            socket.emit("attackCharacter", attackData);
            setShowAttackModal(false);
          }}
        />
      )}
    </div>
  );
}
