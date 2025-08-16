import { useState } from "react";
import { useSocketHandlers, socket } from "./hooks/useSocketHandlers";
import { useGameStore } from "./hooks/useGameStore";

// COMPONENTS
import PlayersTable from "./components/PlayersTable/PlayersTable";
import CharacterTable from "./components/CharactersTable/CharactersTable";
import AttackDataTable from "./components/DEV/attackData/AttackData";
import Header from "./components/Header/Header";
// import RandomNumber from "./components/Header/rolltest";

//Modals
import AttackModal from "./components/Modals/AttackModal/AttackModal";
import DefenceModal from "./components/Modals/DefenceModal/DefenceModal";
import AttackApprovalModal from "./components/Modals/GameMastersApprovalModal/GameMastersApprovalModal";

// types
import type { AttackData } from "./shared/types/attackData";
import type { TypesOfDefence } from "./shared/types/typesOfDefence";
import SpecialGameMastersActionsModal from "./components/Modals/SpecialGameMastersActionsModal/SpecialGameMastersActionsModal";
export default function App() {
  const [showDefenceModal, setShowDefenceModal] = useState(false);
  const [showAttackModal, setShowAttackModal] = useState(false);
  const [showGMsApprovalModal, setShowGMsApprovalModal] = useState(false);
  const [showSpecialGMsActionsModal, setShowSpecialGMsActionsModal] =
    useState(false);

  const attackData = useGameStore((state) => state.attackData);
  const setAttackData = useGameStore((state) => state.setAttackData);
  const clientsCharacterID = useGameStore(
    (state) => state.clientPlayer.controlledCharacterID,
  );
  const gameState = useGameStore((state) => state.gameState);

  useSocketHandlers(setShowDefenceModal, setShowGMsApprovalModal);

  const defendSelf = (type: TypesOfDefence) => {
    socket.emit("defend", type);
    setShowDefenceModal(false);
  };

  return (
    <main className="font-primary flex min-h-screen flex-col items-center bg-[url('/smokebg.png')] bg-cover bg-center py-4 text-white">
      <Header />

      <div className="relative grid w-8/10 grid-cols-2 gap-4">
        {/* <RandomNumber min={1} max={10} duration={3000} /> */}

        <PlayersTable
          changeGameMaster={(id) => socket.emit("changeGameMaster", id)}
        />
        <AttackDataTable />
        <div className="col-span-2">
          <CharacterTable
            chooseCharacter={(id) => socket.emit("chooseCharacter", id)}
            attackCharacter={(id) => {
              if (!clientsCharacterID || clientsCharacterID === "none") {
                alert("You need to choose a character first!");
                return;
              }
              setShowAttackModal(true);
              setAttackData({ ...attackData, targetCharacterID: id });
            }}
            setShowSpecialGMsActionsModal={setShowSpecialGMsActionsModal}
          />
        </div>

        {showDefenceModal && (
          <DefenceModal
            onDefend={defendSelf}
            attackData={attackData}
            characters={gameState.characters}
          />
        )}
        {showGMsApprovalModal && (
          <AttackApprovalModal
            attackData={attackData}
            setAttackData={setAttackData}
            socket={socket}
            setShowGMsApprovalModal={setShowGMsApprovalModal}
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
        {showSpecialGMsActionsModal && (
          <SpecialGameMastersActionsModal
            onClose={() => setShowSpecialGMsActionsModal(false)}
          />
        )}
      </div>
    </main>
  );
}
