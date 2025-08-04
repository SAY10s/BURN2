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
import Header from "./components/Header/Header";
import RandomNumber from "./components/Header/rolltest";

export default function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [clientsCharacterID, setClientsCharacterID] = useState("");
  const [showDefenceModal, setShowDefenceModal] = useState(false);
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [showGameMastersApprovalModal, setShowGameMastersApprovalModal] =
    useState(false);
  const [attackData, setAttackData] = useState<AttackData>(INITIAL_ATTACK_DATA);
  const [clientPlayer, setClientPlayer] = useState<Player>({
    controlledCharacterID: "",
    isGameMaster: false,
    socketID: "",
  });

  useSocketHandlers(
    setGameState,
    setClientsCharacterID,
    setShowDefenceModal,
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
      <Header clientPlayer={clientPlayer} gameState={gameState} />
      <RandomNumber min={1} max={10} duration={3000} />

      <div className="flex  items-center">
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
        <DefenceModal onDefend={defendSelf} attackData={attackData} />
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
