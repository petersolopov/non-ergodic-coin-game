import React from "react";
import { Card, CardContent } from "./Card";
import { Statistics } from "./GamePage";

interface StatisticsCardProps {
  statistics: Statistics | null;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  statistics,
}) => {
  if (!statistics) return null;

  return (
    <Card className="mb-4 bg-gray-50 dark:bg-gray-900">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <h3 className="text-sm text-gray-500">Expected Value per Round</h3>
            <p
              className={`text-lg font-semibold ${statistics.isPositiveEV ? "text-green-600" : "text-red-600"}`}
            >
              {statistics.expectedMultiplier}x
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Average Winnings</h3>
            <p className="text-lg font-semibold">{statistics.finalAverage}$</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Winning Players</h3>
            <p className="text-lg font-semibold">
              {statistics.winnerCount} ({statistics.winnerPercentage}%)
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Best Result</h3>
            <p className="text-lg font-semibold text-green-600">
              {statistics.topPlayerBalance}$ ({statistics.topPlayerMultiplier}x)
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
