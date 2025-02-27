import React from "react";
import {
  simulationTimeAverageLineColor,
  theoreticalEnsembleAverageLineColor,
  theoreticalTimeAverageLineColor,
} from "./Chart";

export const ChartLegend: React.FC = () => {
  const mainLines = [
    {
      color: simulationTimeAverageLineColor,
      value: "Ensemble Average (Simulation)",
    },
    {
      color: theoreticalEnsembleAverageLineColor,
      value: "Ensemble Average (Theory)",
    },
    {
      color: theoreticalTimeAverageLineColor,
      value: "Time Average (Theory)",
    },
    {
      color: "#eee",
      value: "Individual player trajectories",
    },
  ];

  return (
    <div className="absolute top-2 left-20 p-2 bg-white dark:bg-gray-900 bg-opacity-75 rounded text-xs max-sm:hidden">
      {mainLines.map((entry, index) => (
        <div key={`legend-${index}`} className="flex items-center mb-1">
          <span
            className="inline-block w-4 h-0.5 mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};
