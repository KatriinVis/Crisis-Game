
export enum MetricType {
  MORALE = 'Morale',
  FINANCES = 'Finances',
  SUPPLY_CHAIN = 'Supply Chain',
  PUBLIC_IMAGE = 'Public Image'
}

export interface MetricState {
  type: MetricType;
  value: number; // 0-10
  delta: number; // For visual feedback of last change
}

export enum Difficulty {
  EASY = 'Easy',
  NORMAL = 'Normal',
  HARD = 'Hard'
}

export interface Choice {
  id: string;
  text: string;
  description: string;
  impacts: {
    [key in MetricType]: number;
  };
  riskLevel: 'Low' | 'Medium' | 'High';
  narrativeOutcome: string; // What happens if picked
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  category: string;
  choices: Choice[];
}

export interface RoundFeedbackData {
  scenario: Scenario;
  selectedChoiceId: string | null; // ID of the choice picked, or null if something weird happens
  isTimeout: boolean;
  impacts: string[]; // The specific calculated changes for the user
}

export interface GameState {
  round: number;
  maxRounds: number;
  metrics: Record<MetricType, MetricState>;
  status: 'IDLE' | 'PLAYING' | 'GAME_OVER' | 'VICTORY' | 'ROUND_FEEDBACK';
  difficulty: Difficulty;
  history: {
    round: number;
    metrics: Record<MetricType, number>;
    eventTitle: string;
    choiceSelected: string;
  }[];
  resilienceScore: number;
  finalBailoutUsed: boolean; // New: End game rescue
  loanTaken: boolean; // New: Track if loan was taken this round
  investorDebuffRounds: number; // If > 0, finance gains are blocked
  currentScenario: Scenario | null;
  loading: boolean;
  timeLimit: number;
  gameOverReason?: string;
  lastRoundFeedback?: RoundFeedbackData;
}

export const INITIAL_METRICS: Record<MetricType, MetricState> = {
  [MetricType.MORALE]: { type: MetricType.MORALE, value: 6, delta: 0 },
  [MetricType.FINANCES]: { type: MetricType.FINANCES, value: 6, delta: 0 },
  [MetricType.SUPPLY_CHAIN]: { type: MetricType.SUPPLY_CHAIN, value: 6, delta: 0 },
  [MetricType.PUBLIC_IMAGE]: { type: MetricType.PUBLIC_IMAGE, value: 6, delta: 0 },
};
