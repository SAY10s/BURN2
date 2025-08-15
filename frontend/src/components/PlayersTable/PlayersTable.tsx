import { useGameStore } from "../../hooks/useGameStore";

interface PlayersTableProps {
  changeGameMaster: (socketID: string) => void;
}

export default function PlayersTable({ changeGameMaster }: PlayersTableProps) {
  const players = useGameStore((state) => state.gameState.players);
  return (
    <details className="">
      <summary className="cursor-pointer px-4 py-3 text-center text-2xl uppercase">
        GRACZE
      </summary>
      <div className="border-border w-full border-4 border-double">
        <div className="border-border grid grid-cols-3 border-b-4 border-double px-4 py-3 pl-6">
          <div className="text-left font-bold">Socket ID</div>
          <div className="text-center font-bold">Character ID</div>
          <div className="text-center font-bold">Role</div>
        </div>
        {players.map((player) => (
          <div
            key={player.socketID}
            className={`to-transparent-special ${player.isGameMaster ? "from-witcher-blue" : "from-witcher-yellow"} m-2 grid grid-cols-3 bg-gradient-to-r to-50% px-4 py-3`}
          >
            <div>{player.socketID}</div>
            <div className="text-center">{player.controlledCharacterID}</div>
            <div
              onClick={() => changeGameMaster(player.socketID)}
              className="flex cursor-pointer items-center justify-center"
            >
              {player.isGameMaster ? (
                <div className="bg-witcher-blue text-secondary ml-4 w-16 rounded-full px-2 py-1 pr-4 pl-4 text-center text-xs">
                  GM
                </div>
              ) : (
                <div className="bg-witcher-yellow text-secondary ml-4 w-16 rounded-full px-2 py-1 pr-4 pl-4 text-center text-xs">
                  Player
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </details>
  );
}
