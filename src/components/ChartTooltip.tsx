import React from "react";
import { TooltipProps } from "recharts";

interface ChartTooltipProps extends TooltipProps<string | number, string> {
  selectedPlayers?: number[];
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  active,
  payload,
  label,
  selectedPlayers = [],
}) => {
  if (!active || !payload) return null;

  const getValue = (key: string): string => {
    const item = payload.find((p) => p.dataKey === key);
    return item ? Number(item.value).toFixed(2) : "0.00";
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-3 border border-gray-200 shadow-lg rounded-lg">
      <p className="font-bold mb-2">Round {label}</p>
      <div className="space-y-1">
        <p className="text-orange-500">
          Ensemble Average (Simulation): {getValue("average")}$
        </p>
        <p className="text-red-500">
          Ensemble Average (Theory): {getValue("theoreticalEnsemble")}$
        </p>
        <p className="text-green-500">
          Time Average (Theory): {getValue("theoreticalTime")}$
        </p>
        {selectedPlayers.length > 0 && (
          <>
            {selectedPlayers.map((playerId) => {
              return (
                <p key={playerId} className="text-blue-600">
                  Player {playerId}: {getValue(`player${playerId}`)}$
                </p>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
