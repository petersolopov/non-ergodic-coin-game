import { Config } from "./GamePage";

export interface TheoreticalValues {
  theoreticalEnsemble: number;
  theoreticalTime: number;
  expectedValue: number;
  startingCapital: number;
}

export const getWinMultiplier = (percent: number): number =>
  (100 + percent) / 100;
export const getLoseMultiplier = (percent: number): number =>
  (100 - percent) / 100;

export const calculateTheoretical = (
  round: number,
  config: Config,
): TheoreticalValues => {
  const { winProbability, startingCapital, winPercentage, losePercentage } =
    config;

  const winMultiplier = getWinMultiplier(winPercentage);
  const loseMultiplier = getLoseMultiplier(losePercentage);

  // Expected value calculation for one round
  const expectedValue =
    winProbability * winMultiplier + (1 - winProbability) * loseMultiplier;

  // Ensemble average (theoretical)
  const theoreticalEnsemble = startingCapital * Math.pow(expectedValue, round);

  // Time average (theoretical)
  const theoreticalTime =
    startingCapital * Math.pow(expectedValue - 0.1, round);

  return {
    theoreticalEnsemble,
    theoreticalTime,
    expectedValue,
    startingCapital,
  };
};
