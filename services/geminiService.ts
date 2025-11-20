import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GameState, MetricType, Scenario } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelId = 'gemini-2.5-flash';

const scenarioSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    category: { type: Type.STRING },
    choices: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          text: { type: Type.STRING },
          description: { type: Type.STRING },
          riskLevel: { type: Type.STRING, enum: ["Low", "Medium", "High"] },
          narrativeOutcome: { type: Type.STRING },
          impacts: {
            type: Type.OBJECT,
            properties: {
              [MetricType.MORALE]: { type: Type.INTEGER },
              [MetricType.FINANCES]: { type: Type.INTEGER },
              [MetricType.SUPPLY_CHAIN]: { type: Type.INTEGER },
              [MetricType.PUBLIC_IMAGE]: { type: Type.INTEGER },
            },
            required: [MetricType.MORALE, MetricType.FINANCES, MetricType.SUPPLY_CHAIN, MetricType.PUBLIC_IMAGE]
          }
        },
        required: ["id", "text", "description", "riskLevel", "impacts", "narrativeOutcome"]
      }
    }
  },
  required: ["id", "title", "description", "category", "choices"]
};

export const generateScenario = async (gameState: GameState): Promise<Scenario> => {
  const { difficulty, metrics, round } = gameState;
  
  // Construct a context string detailing the current state
  const statusReport = `
    Current Round: ${round}
    Difficulty: ${difficulty}
    Metrics (Scale 0-10):
    - Morale: ${metrics[MetricType.MORALE].value}
    - Finances: ${metrics[MetricType.FINANCES].value}
    - Supply Chain: ${metrics[MetricType.SUPPLY_CHAIN].value}
    - Public Image: ${metrics[MetricType.PUBLIC_IMAGE].value}
  `;

  const prompt = `
    You are the Game Master for a corporate crisis simulation.
    Generate a new, unique crisis scenario for the player to solve.
    
    Context:
    ${statusReport}
    
    Requirements:
    1. Crisis categories can be HR, Supply Chain, PR, Finance, Cyber Security, Regulatory, etc.
    2. Provide 4 distinct choices.
    3. Each choice must have specific integer impacts on the 4 metrics (typically ranging from -3 to +3).
    4. Trade-offs are essential. A choice shouldn't be purely positive. Risky choices can have high reward or high penalty.
    5. "narrativeOutcome" is a short text explaining what happens if this choice is picked.
    6. Ensure variety from previous crises.
    
    Output JSON matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: scenarioSchema,
        temperature: 0.8, // Some creativity but structured
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text response from Gemini");
    
    return JSON.parse(text) as Scenario;
  } catch (error) {
    console.error("Failed to generate scenario:", error);
    // Fallback scenario in case of API failure to prevent game crash
    return {
      id: `fallback-${Date.now()}`,
      title: "Communication Breakdown",
      description: "Internal servers are down, causing confusion. (API connection failed, using backup scenario)",
      category: "IT",
      choices: [
        {
          id: "c1",
          text: "Reboot Systems Manually",
          description: "Takes time but is safe.",
          riskLevel: "Low",
          narrativeOutcome: "Systems back online after a delay.",
          impacts: {
            [MetricType.MORALE]: -1,
            [MetricType.FINANCES]: -1,
            [MetricType.SUPPLY_CHAIN]: 0,
            [MetricType.PUBLIC_IMAGE]: 0
          }
        },
        {
          id: "c2",
          text: "Hire External Consultants",
          description: "Expensive but fast.",
          riskLevel: "Low",
          narrativeOutcome: "Problem fixed immediately, but at a cost.",
          impacts: {
            [MetricType.MORALE]: 0,
            [MetricType.FINANCES]: -2,
            [MetricType.SUPPLY_CHAIN]: 1,
            [MetricType.PUBLIC_IMAGE]: 0
          }
        },
        {
          id: "c3",
          text: "Ignore and Wait",
          description: "Hope it resolves itself.",
          riskLevel: "High",
          narrativeOutcome: "Customers noticed the outage.",
          impacts: {
            [MetricType.MORALE]: -1,
            [MetricType.FINANCES]: 0,
            [MetricType.SUPPLY_CHAIN]: -2,
            [MetricType.PUBLIC_IMAGE]: -2
          }
        },
        {
          id: "c4",
          text: "Blame Hackers publicly",
          description: "Deflect responsibility.",
          riskLevel: "High",
          narrativeOutcome: "Media frenzy ensues.",
          impacts: {
            [MetricType.MORALE]: -1,
            [MetricType.FINANCES]: 0,
            [MetricType.SUPPLY_CHAIN]: 0,
            [MetricType.PUBLIC_IMAGE]: -2 // Backfired
          }
        }
      ]
    };
  }
};