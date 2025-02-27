import React from "react";
import { Button } from "./Button";
import { StatisticsCard } from "./StatisticsCard";
import { Chart } from "./Chart";
import { PlayersTable } from "./PlayersTable";
import { Config, Player, RoundData, Statistics } from "./GamePage";

interface TabSimulationProps {
  config: Config;
  statistics: Statistics | null;
  data: RoundData[];
  players: Player[];
  hoveredPlayer: number | null;
  selectedPlayers: number[];
  playersToShow: number[];
  isSimulating: boolean;
  simulateGames: () => void;
  togglePlayerSelection: (playerId: number) => void;
  setHoveredPlayer: (playerId: number | null) => void;
  setSelectedTab: (tab: string) => void;
}

export const TabSimulation: React.FC<TabSimulationProps> = ({
  config,
  statistics,
  data,
  players,
  hoveredPlayer,
  selectedPlayers,
  playersToShow,
  isSimulating,
  simulateGames,
  togglePlayerSelection,
  setHoveredPlayer,
  setSelectedTab,
}) => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-2 mt-4">
        Non-Ergodic Coin Game Simulation
      </h1>
      <h2 className="text-xl font-bold mb-4">
        {config.numPlayers} players, {config.numRounds} rounds
      </h2>
      <p className="mb-4 max-w-200">
        This{" "}
        <a
          href="#"
          className="underline"
          onClick={(event) => {
            event.preventDefault();
            setSelectedTab("help");
          }}
        >
          game
        </a>{" "}
        can demonstrate that even though the{" "}
        <b>total amount of money increases</b> over time, most players are{" "}
        <b>lose money in the long run.</b>
      </p>

      <div className="flex gap-2 mb-4">
        <Button
          className="flex-1"
          onClick={simulateGames}
          disabled={isSimulating}
        >
          {isSimulating ? "Simulating..." : "Run New Simulation"}
        </Button>
      </div>

      <StatisticsCard statistics={statistics} />

      <div className="flex flex-col gap-4">
        <Chart
          data={data}
          playersToShow={playersToShow}
          hoveredPlayer={hoveredPlayer}
          selectedPlayers={selectedPlayers}
        />

        <PlayersTable
          players={players}
          selectedPlayers={selectedPlayers}
          togglePlayerSelection={togglePlayerSelection}
          setHoveredPlayer={setHoveredPlayer}
        />
      </div>
    </div>
  );
};
