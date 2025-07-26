import type { Player } from "../../shared/types/player";
interface PlayersTableProps {
  players: Player[];
  changeGameMaster: (socketID: string) => void;
}

export default function PlayersTable({
  players,
  changeGameMaster,
}: PlayersTableProps) {
  return (
    <table className="w-full max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="px-4 py-3 text-left">Socket ID</th>
          <th className="px-4 py-3 text-left">Character ID</th>
          <th className="px-4 py-3 text-left">Role</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {players.map((player) => (
          <tr
            key={player.socketID}
            className="hover:bg-gray-50 transition-colors"
          >
            <td className="px-4 py-3 text-sm font-mono text-gray-700 truncate max-w-[120px]">
              {player.socketID}
            </td>
            <td className="px-4 py-3 text-sm font-mono text-gray-700 truncate max-w-[120px]">
              {player.controlledCharacterID}
            </td>
            <td
              className="px-4 py-3 text-sm font-medium cursor-pointer"
              onClick={() => {
                changeGameMaster(player.socketID);
              }}
            >
              {(player.isGameMaster && (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  GM
                </span>
              )) || (
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  Player
                </span>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
