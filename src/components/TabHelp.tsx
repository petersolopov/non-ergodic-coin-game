import React from "react";
import { Card, CardContent } from "./Card";

export const TabHelp: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-2">Game Rules</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            A player starts with a certain amount of money (for example, 100$)
          </li>
          <li>
            In each round, the player bets their entire amount and flips a coin
          </li>
          <li>
            When winning, the amount increases by a certain percentage (for
            example, by 50%)
          </li>
          <li>
            When losing, the amount decreases by a certain percentage (for
            example, by 40%)
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">Key Concepts</h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            <strong>Ergodicity</strong> – a property of a system where observing
            one element of the system for a long enough time provides the same
            statistics as looking at many elements at one moment in time. In
            other words, the average value calculated over time for one object
            coincides with the ensemble average
          </li>
          <li>
            <strong>Ensemble Average</strong> — the average value of all players
            at a specific point in time
          </li>
          <li>
            <strong>Time Average</strong> — the average value of one player over
            all time
          </li>
          <li>
            <strong>Expected Value</strong> — the expected result for one round
          </li>
          <li>
            <strong>Stochastic Process</strong> - a mathematical model that
            describes random changes in a system over time
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">
          Chart Interpretation
        </h3>
        <ul className="list-disc pl-5 mb-4">
          <li>
            Orange line — actual ensemble average (average value of all players)
          </li>
          <li>Red line — theoretical ensemble average</li>
          <li>Green line — theoretical time average</li>
          <li>Thin gray lines — individual player trajectories</li>
        </ul>

        <p>
          This experiment shows that even if the expected value is positive
          (greater than 1), most players can lose money in the long run.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">References</h3>

        <ul className="list-disc pl-5 mb-4">
          <li>
            <a href="https://www.nature.com/articles/s41567-019-0732-0">
              The ergodicity problem in economics | Nature Physics
            </a>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
