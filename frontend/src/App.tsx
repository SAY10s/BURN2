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

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [clientsCharacterID, setClientsCharacterID] = useState("");
  const [showDefenceModal, setShowDefenceModal] = useState(false);
  const [showGameMastersApprovalModal, setShowGameMastersApprovalModal] =
    useState(false);
  const [attackData, setAttackData] = useState<AttackData>(INITIAL_ATTACK_DATA);
  const [defenceMessage, setDefenceMessage] = useState("");

  useSocketHandlers(
    setGameState,
    setClientsCharacterID,
    setShowDefenceModal,
    setDefenceMessage,
    setShowGameMastersApprovalModal,
    setAttackData
  );

  const defendSelf = (type: "DODGE" | "REPOSITION") => {
    socket.emit("defend", type);
    setShowDefenceModal(false);
  };

  return (
    <div className="p-4 mx-auto bg-gray-100 rounded-lg shadow-md relative">
      <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Walka Wiedźmina
      </h1>
      <div onClick={() => socket.emit("createRandomCharacter")}>New char</div>

      <div className="text-center text-lg text-gray-700">
        {gameState.debugMessage}
      </div>

      <PlayersTable
        players={gameState.players}
        changeGameMaster={(id) => socket.emit("changeGameMaster", id)}
      />

      <CharacterTable
        characters={gameState.characters}
        chooseCharacter={(id) => socket.emit("chooseCharacter", id)}
        clientsCharacterId={clientsCharacterID}
        attackCharacter={(id) => socket.emit("attackCharacter", id)}
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
    </div>
  );
}
