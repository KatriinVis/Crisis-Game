
import { GameState, Scenario } from "../types";

// This service is currently unused in favor of static scenarios.
// Logic is disabled to prevent build issues with missing dependencies/env vars.

export const generateScenario = async (gameState: GameState): Promise<Scenario> => {
  console.warn("Gemini Service is disabled in this version.");
  
  // Return a fallback empty scenario if called by mistake
  return {
    id: "fallback",
    title: "Service Disabled",
    description: "The AI service is not active.",
    category: "System",
    choices: []
  };
};
