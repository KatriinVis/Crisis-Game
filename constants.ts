import { Difficulty } from './types';

export const MAX_ROUNDS = 10; // Standard length
export const CRITICAL_THRESHOLD = 2; // Below this is game over
export const BAILOUT_THRESHOLD = 3; // Can use bailout if any metric is below this

export const DIFFICULTY_SETTINGS = {
  [Difficulty.EASY]: {
    timeLimit: 45,
    volatility: 1, // Multiplier for impact
    rounds: 8
  },
  [Difficulty.NORMAL]: {
    timeLimit: 30,
    volatility: 1.2,
    rounds: 10
  },
  [Difficulty.HARD]: {
    timeLimit: 20,
    volatility: 1.5,
    rounds: 12
  }
};

export const COLORS = {
  Morale: '#3b82f6', // Blue
  Finances: '#22c55e', // Green
  'Supply Chain': '#f59e0b', // Amber
  'Public Image': '#a855f7', // Purple
};