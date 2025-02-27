import React, { useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { Card, CardContent } from "./Card";
import { ChartTooltip } from "./ChartTooltip";
import { ChartLegend } from "./ChartLegend";
import { RoundData } from "./GamePage";

export const theoreticalEnsembleAverageLineColor = "#ff0000";
export const theoreticalTimeAverageLineColor = "#82ca9d";
export const simulationTimeAverageLineColor = "#9c27b0";

const xLabel = {
  value: "Round",
  position: "bottom",
  offset: 0,
};

export interface ChartProps {
  data: RoundData[];
  playersToShow: number[];
  hoveredPlayer: number | null;
  selectedPlayers: number[];
}

export const Chart: React.FC<ChartProps> = ({
  data,
  playersToShow,
  hoveredPlayer,
  selectedPlayers,
}) => {
  const tooltipContent = useCallback(
    (props: TooltipProps<string | number, string>) => {
      return <ChartTooltip selectedPlayers={selectedPlayers} {...props} />;
    },
    [selectedPlayers],
  );

  const tickFormatter = useCallback((value: number) => {
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M$`;
    if (value >= 1e3) return `${(value / 1e3).toFixed(1)}K$`;
    return `${value.toFixed(0)}$`;
  }, []);

  const isActiveLine = useCallback(
    (playerId: number) => {
      return hoveredPlayer === playerId || selectedPlayers.includes(playerId);
    },
    [hoveredPlayer, selectedPlayers],
  );

  return (
    <Card className="flex-1">
      <CardContent className="pt-6">
        <div className="h-[400px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 20, right: 0, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="round" label={xLabel} dy={4} />
              <YAxis
                yAxisId="display"
                scale="log"
                type="number"
                allowDataOverflow
                domain={[1, "auto"]}
                tickFormatter={tickFormatter}
              />
              <Tooltip content={tooltipContent} />
              <Legend
                verticalAlign="top"
                align="center"
                content={<ChartLegend />}
              />

              {playersToShow.map((playerId) => (
                <Line
                  key={playerId}
                  type="monotone"
                  dataKey={`player${playerId}`}
                  yAxisId="display"
                  stroke={
                    isActiveLine(playerId)
                      ? "#3b82f6"
                      : "rgba(156, 163, 175, 0.3)"
                  }
                  strokeWidth={isActiveLine(playerId) ? 2 : 0.5}
                  dot={false}
                  activeDot={false}
                  legendType="none"
                />
              ))}

              <Line
                type="monotone"
                dataKey="average"
                yAxisId="display"
                stroke={simulationTimeAverageLineColor}
                strokeWidth={2}
                name="Average Value"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="theoreticalEnsemble"
                yAxisId="display"
                stroke={theoreticalEnsembleAverageLineColor}
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Ensemble Average"
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey="theoreticalTime"
                yAxisId="display"
                stroke={theoreticalTimeAverageLineColor}
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Time Average"
                dot={false}
                activeDot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
