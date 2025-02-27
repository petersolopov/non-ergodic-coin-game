import React from "react";
import { Card, CardContent } from "./Card";
import { Player } from "./GamePage";

interface PlayersTableProps {
  players: Player[];
  selectedPlayers: number[];
  togglePlayerSelection: (playerId: number) => void;
  setHoveredPlayer: (playerId: number | null) => void;
}

export const PlayersTable: React.FC<PlayersTableProps> = ({
  players,
  selectedPlayers,
  togglePlayerSelection,
  setHoveredPlayer,
}) => {
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="p-0">
        <div className="p-2 bg-white sticky top-0 z-10 border-b dark:bg-gray-900">
          <h3 className="text-base font-semibold">Player Results</h3>
        </div>
        <div className="max-h-[200px] overflow-auto">
          <table className="w-full">
            <thead className="bg-white sticky top-0 dark:bg-gray-900">
              <tr>
                <th className="text-left px-4 py-2">Player</th>
                <th className="text-right px-4 py-2">Balance</th>
                <th className="text-right px-4 py-2">Change</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr
                  key={player.id}
                  className={`
                    hover:bg-blue-50 hover:text-black cursor-pointer
                    hover:dark:bg-gray-500
                    transition-colors text-right
                    ${selectedPlayers.includes(player.id) ? "bg-blue-100 dark:text-black dark:bg-blue-500" : ""}
                  `}
                  onMouseEnter={() => setHoveredPlayer(player.id)}
                  onMouseLeave={() => setHoveredPlayer(null)}
                  onClick={() => togglePlayerSelection(player.id)}
                >
                  <td className="px-4 py-1 text-left">Player {player.id}</td>
                  <td className="px-4 py-1 text-right">
                    {player.formattedBalance}$
                  </td>
                  <td
                    className={`px-4 py-1 text-right ${
                      player.percentageChange >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {player.percentageChange >= 0 ? "+" : ""}
                    {player.formattedPercentage}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
