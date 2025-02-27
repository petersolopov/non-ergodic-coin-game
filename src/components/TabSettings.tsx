import React from "react";
import { Card, CardContent } from "./Card";
import { Button } from "./Button";
import { Range } from "./Range";
import { Config } from "./GamePage";
import { TheoreticalValues } from "./gameUtils";

interface TabSettingsProps {
  config: Config;
  defaultConfig: Config;
  updateConfig: (key: keyof Config, value: number) => void;
  resetConfig: () => void;
  calculateTheoretical: (round: number) => TheoreticalValues;
}

export const TabSettings: React.FC<TabSettingsProps> = ({
  defaultConfig,
  config,
  updateConfig,
  resetConfig,
  calculateTheoretical,
}) => {
  const isConfigEqual = Object.keys(defaultConfig).every(
    (key) => defaultConfig[key as keyof Config] === config[key as keyof Config],
  );
  return (
    <Card>
      <CardContent className="pt-6">
        <h2 className="text-xl font-bold mb-4">Simulation Parameters</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Range
              label="Number of Players"
              paramKey="numPlayers"
              min={10}
              max={150}
              step={1}
              value={config.numPlayers}
              onChange={updateConfig}
            />
            <Range
              label="Number of Rounds"
              paramKey="numRounds"
              min={10}
              max={150}
              step={1}
              value={config.numRounds}
              onChange={updateConfig}
            />
            <Range
              label="Starting Capital"
              paramKey="startingCapital"
              min={10}
              max={1000}
              step={10}
              value={config.startingCapital}
              onChange={updateConfig}
            />
          </div>
          <div>
            <Range
              label="Win Percentage Increase (%)"
              paramKey="winPercentage"
              min={0}
              max={100}
              step={1}
              value={config.winPercentage}
              onChange={updateConfig}
            />
            <Range
              label="Loss Percentage Decrease (%)"
              paramKey="losePercentage"
              min={0}
              max={100}
              step={1}
              value={config.losePercentage}
              onChange={updateConfig}
            />
            <Range
              label="Win Probability"
              paramKey="winProbability"
              min={0}
              max={1}
              step={0.1}
              value={config.winProbability}
              onChange={updateConfig}
            />
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h3 className="text-base font-bold mb-2">
            Ensemble Average
            <span
              className={`font-semibold ml-4 ${
                calculateTheoretical(1).expectedValue >= 1
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {calculateTheoretical(1).expectedValue.toFixed(2)}
            </span>
          </h3>

          <p className="text-sm">
            The average income of all players after each round will
            <b>
              {calculateTheoretical(1).expectedValue >= 1
                ? " increase"
                : " decrease"}
            </b>
            .
          </p>
          <h3 className="text-base font-bold mt-8 mb-2">
            Time Average
            <span
              className={`font-semibold ml-4 ${
                calculateTheoretical(1).theoreticalTime /
                  calculateTheoretical(1).startingCapital >=
                1
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {(
                calculateTheoretical(1).theoreticalTime /
                calculateTheoretical(1).startingCapital
              ).toFixed(2)}
            </span>
          </h3>

          <p className="text-sm">
            Each individual player will
            <b>
              {calculateTheoretical(1).theoreticalTime /
                calculateTheoretical(1).startingCapital >=
              1
                ? " win "
                : " lose "}
            </b>
            money over time.
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          <Button disabled={isConfigEqual} onClick={resetConfig}>
            Reset Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
