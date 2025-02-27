import React, { useState, useEffect, useCallback, useMemo } from "react";
import { TabNavigation } from "./MenuTabs";
import { TabSimulation } from "./TabSimulation";
import { TabSettings } from "./TabSettings";
import { TabHelp } from "./TabHelp";
import {
  getWinMultiplier,
  getLoseMultiplier,
  calculateTheoretical as calculateTheoreticalUtil,
} from "./gameUtils";

export interface RoundData {
  round: number;
  average: number;
  theoreticalEnsemble: number;
  theoreticalTime: number;
  [key: string]: number; // For player{id} values
}

export interface Player {
  id: number;
  finalBalance: number;
  formattedBalance: string;
  percentageChange: number;
  formattedPercentage: string;
  history: number[];
}

export interface Statistics {
  expectedMultiplier: string;
  isPositiveEV: boolean;
  finalAverage: string;
  winnerCount: number;
  winnerPercentage: string;
  topPlayerBalance: string;
  topPlayerMultiplier: string;
  worstPlayerBalance?: string;
  worstPlayerMultiplier?: string;
}

export interface Config {
  numPlayers: number;
  numRounds: number;
  startingCapital: number;
  winPercentage: number;
  losePercentage: number;
  winProbability: number;
}

const defaultConfig: Config = {
  numPlayers: 100,
  numRounds: 100,
  startingCapital: 100,
  winPercentage: 50,
  losePercentage: 40,
  winProbability: 0.5,
};

const GamePage: React.FC = () => {
  // State variables
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [data, setData] = useState<RoundData[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [hoveredPlayer, setHoveredPlayer] = useState<number | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("simulation");

  // Calculate theoretical values for a given round
  const calculateTheoretical = useCallback(
    (round: number) => {
      return calculateTheoreticalUtil(round, config);
    },
    [config],
  );

  // Update configuration parameter
  const updateConfig = useCallback((key: keyof Config, value: number) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  // Reset configuration to default values
  const resetConfig = useCallback(() => {
    setConfig(defaultConfig);
  }, []);

  // Toggle player selection for chart
  const togglePlayerSelection = useCallback((playerId: number) => {
    setSelectedPlayers((prev) => {
      if (prev.includes(playerId)) {
        return prev.filter((id) => id !== playerId);
      }
      return [...prev, playerId];
    });
  }, []);

  // Game simulation function
  const simulateGames = useCallback(() => {
    setIsSimulating(true);

    // Use requestAnimationFrame to prevent UI blocking
    requestAnimationFrame(() => {
      const {
        numPlayers,
        numRounds,
        startingCapital,
        winProbability,
        winPercentage,
        losePercentage,
      } = config;

      const winMultiplier = getWinMultiplier(winPercentage);
      const loseMultiplier = getLoseMultiplier(losePercentage);

      // Initialize player data
      type PlayerData = {
        id: number;
        capital: number;
        history: number[];
      };

      const playersData: PlayerData[] = Array(numPlayers)
        .fill(null)
        .map((_, index) => ({
          id: index,
          capital: startingCapital,
          history: [startingCapital],
        }));

      const results: RoundData[] = [];

      // Initial round (0)
      let currentRound: RoundData = {
        round: 0,
        average: startingCapital,
        ...calculateTheoretical(0),
      };

      // Add values for each player
      playersData.forEach((p) => {
        currentRound[`player${p.id}`] = p.capital;
      });

      results.push(currentRound);

      // Simulate rounds
      for (let round = 1; round <= numRounds; round++) {
        // Update each player's state
        for (let i = 0; i < playersData.length; i++) {
          const flip = Math.random();
          const multiplier =
            flip < winProbability ? winMultiplier : loseMultiplier;
          playersData[i].capital *= multiplier;
          playersData[i].history.push(playersData[i].capital);
        }

        // Calculate average value for current round
        const roundAverage =
          playersData.reduce((sum, p) => sum + p.capital, 0) / numPlayers;
        const theoreticalValues = calculateTheoretical(round);

        // Create data for current round
        currentRound = {
          round,
          average: roundAverage,
          ...theoreticalValues,
        };

        // Add player data
        playersData.forEach((p) => {
          currentRound[`player${p.id}`] = p.capital;
        });

        results.push(currentRound);
      }

      // Calculate player statistics
      const playersStats: Player[] = playersData
        .map((p) => {
          const percentageChange =
            ((p.capital - startingCapital) / startingCapital) * 100;
          return {
            id: p.id,
            finalBalance: p.capital,
            formattedBalance: p.capital.toFixed(2),
            percentageChange: percentageChange,
            formattedPercentage: percentageChange.toFixed(2),
            history: p.history,
          };
        })
        .sort((a, b) => b.finalBalance - a.finalBalance);

      // Update component state
      setData(results);
      setPlayers(playersStats);
      setIsSimulating(false);
    });
  }, [config, calculateTheoretical]);

  // Run initial simulation when tab changes to simulation
  useEffect(() => {
    if (selectedTab === "simulation") {
      simulateGames();
    }
  }, [selectedTab, simulateGames]);

  // Calculate simulation statistics
  const statistics = useMemo((): Statistics | null => {
    if (data.length === 0 || players.length === 0) return null;

    const { expectedValue } = calculateTheoretical(1);
    const lastRound = data[data.length - 1];
    const winningPlayers = players.filter(
      (p) => p.finalBalance >= config.startingCapital,
    );

    return {
      expectedMultiplier: expectedValue.toFixed(4),
      isPositiveEV: expectedValue > 1,
      finalAverage: lastRound.average.toFixed(2),
      winnerCount: winningPlayers.length,
      winnerPercentage: (
        (winningPlayers.length / players.length) *
        100
      ).toFixed(2),
      topPlayerBalance: players[0]?.formattedBalance || "0.00",
      topPlayerMultiplier: (
        players[0]?.finalBalance / config.startingCapital
      ).toFixed(2),
      worstPlayerBalance:
        players[players.length - 1]?.formattedBalance || "0.00",
      worstPlayerMultiplier: (
        players[players.length - 1]?.finalBalance / config.startingCapital
      ).toFixed(2),
    };
  }, [data, players, config.startingCapital, calculateTheoretical]);

  // Determine which players to show on the chart
  const playersToShow = useMemo((): number[] => {
    return [...Array(config.numPlayers).keys()];
  }, [config.numPlayers]);

  return (
    <div className="space-y-4 mt-4">
      <TabNavigation selectedTab={selectedTab} onTabChange={setSelectedTab} />

      {selectedTab === "simulation" && (
        <TabSimulation
          config={config}
          statistics={statistics}
          data={data}
          players={players}
          hoveredPlayer={hoveredPlayer}
          selectedPlayers={selectedPlayers}
          playersToShow={playersToShow}
          isSimulating={isSimulating}
          simulateGames={simulateGames}
          togglePlayerSelection={togglePlayerSelection}
          setHoveredPlayer={setHoveredPlayer}
          setSelectedTab={setSelectedTab}
        />
      )}

      {selectedTab === "settings" && (
        <TabSettings
          config={config}
          defaultConfig={defaultConfig}
          updateConfig={updateConfig}
          resetConfig={resetConfig}
          calculateTheoretical={calculateTheoretical}
        />
      )}

      {selectedTab === "help" && <TabHelp />}
    </div>
  );
};

export default GamePage;
