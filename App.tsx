
import React, { useState, useEffect, useCallback } from 'react';
import { GameState, MetricType, Difficulty, INITIAL_METRICS, Choice, Scenario, MetricState, RoundFeedbackData } from './types';
import { SCENARIOS } from './data/scenarios';
import { Dashboard } from './components/Dashboard';
import { ScenarioView } from './components/ScenarioView';
import { RoundFeedbackView } from './components/RoundFeedbackView';
import { GameOver } from './components/GameOver';
import { DIFFICULTY_SETTINGS, CRITICAL_THRESHOLD, MAX_ROUNDS } from './constants';
import { ShieldCheck, PlayCircle, Settings, Target, AlertTriangle, Clock, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    round: 1,
    maxRounds: 10,
    metrics: JSON.parse(JSON.stringify(INITIAL_METRICS)), // Deep copy
    status: 'IDLE',
    difficulty: Difficulty.NORMAL,
    history: [],
    resilienceScore: 0,
    bailoutUsed: false,
    finalBailoutUsed: false,
    investorDebuffRounds: 0,
    currentScenario: null,
    loading: false,
    timeLimit: 25
  });

  const [showIntro, setShowIntro] = useState(true);
  const [feedbackToast, setFeedbackToast] = useState<{title: string, items: string[]} | null>(null);
  const [scenarioDeck, setScenarioDeck] = useState<Scenario[]>([]);
  const [bailoutUnlocked, setBailoutUnlocked] = useState(false);

  // Check unlock status on mount
  useEffect(() => {
    const hasLost = localStorage.getItem('hasLostGame') === 'true';
    setBailoutUnlocked(hasLost);
  }, []);

  // Shuffle helper
  const shuffleDeck = (array: Scenario[]): Scenario[] => {
    const deck = [...array];
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  };

  // Initialize or Next Round
  const startRound = useCallback((currentState: GameState, deck: Scenario[]) => {
    setGameState(prev => ({ ...prev, loading: true, status: 'PLAYING' }));
    
    // Pick next scenario from deck
    const scenarioIndex = currentState.round - 1;
    
    // Check bounds
    const scenario = scenarioIndex < deck.length ? deck[scenarioIndex] : deck[0];

    // Short artificial delay to simulate transition
    setTimeout(() => {
        setGameState(prev => ({
            ...prev,
            currentScenario: scenario,
            loading: false
        }));
    }, 500);
    
  }, []);

  const startGame = (difficulty: Difficulty) => {
    const settings = DIFFICULTY_SETTINGS[difficulty];
    
    // Create and shuffle deck for this session
    const newDeck = shuffleDeck(SCENARIOS);
    setScenarioDeck(newDeck);

    const initialState: GameState = {
      round: 1,
      maxRounds: settings.rounds,
      metrics: JSON.parse(JSON.stringify(INITIAL_METRICS)),
      status: 'PLAYING',
      difficulty,
      history: [{
          round: 0,
          metrics: {
            [MetricType.MORALE]: 6,
            [MetricType.FINANCES]: 6,
            [MetricType.SUPPLY_CHAIN]: 6,
            [MetricType.PUBLIC_IMAGE]: 6
          },
          eventTitle: "Game Start",
          choiceSelected: "N/A"
      }],
      resilienceScore: 0,
      bailoutUsed: false,
      finalBailoutUsed: false,
      investorDebuffRounds: 0,
      currentScenario: null,
      loading: true,
      timeLimit: settings.timeLimit
    };
    setGameState(initialState);
    setShowIntro(false);
    startRound(initialState, newDeck);
  };

  const handleChoice = (choice: Choice, isTimeout: boolean = false) => {
    if (!gameState.currentScenario) return;

    setGameState(prev => {
      const newMetrics = { ...prev.metrics };
      const impactStrings: string[] = [];
      let scoreDelta = 0;
      let gameOverReason: string | undefined;

      // 1. Apply Impacts
      (Object.keys(choice.impacts) as MetricType[]).forEach(key => {
        let change = choice.impacts[key];
        
        // Apply volatility based on difficulty
        const volatility = DIFFICULTY_SETTINGS[prev.difficulty].volatility;
        change = Math.round(change * volatility);

        // Apply Debuff: No positive finance gains if debuff active
        if (key === MetricType.FINANCES && prev.investorDebuffRounds > 0 && change > 0) {
          change = 0;
          impactStrings.push(`Finances frozen by Investors`);
        }

        // Timeout penalty
        if (isTimeout) change -= 1;

        const oldValue = newMetrics[key].value;
        let newValue = oldValue + change;
        
        // Clamping 0-10
        newValue = Math.max(0, Math.min(10, newValue));
        
        newMetrics[key] = {
          type: key,
          value: newValue,
          delta: newValue - oldValue
        };

        // Record simplified impact string for feedback
        if (newValue - oldValue !== 0) {
            const sign = newValue > oldValue ? '+' : '';
            impactStrings.push(`${key} ${sign}${newValue - oldValue}`);
        }

        if (newValue !== oldValue) {
           if (newValue > oldValue) scoreDelta += (newValue - oldValue) * 10;
           if (newValue < oldValue) scoreDelta -= (oldValue - newValue) * 5;
        }
      });

      if (isTimeout) impactStrings.push("Timeout Penalty (-1 All)");

      // Prepare Feedback Data
      const feedbackData: RoundFeedbackData = {
        scenario: prev.currentScenario!,
        selectedChoiceId: choice.id,
        impacts: impactStrings,
        isTimeout
      };

      // 2. Check Survival
      const failedMetrics = (Object.values(newMetrics) as MetricState[]).filter(m => m.value < CRITICAL_THRESHOLD);
      
      if (failedMetrics.length > 0) {
        gameOverReason = `Critical failure in: ${failedMetrics.map(m => m.type).join(', ')}`;
        
        // Unlock bailout for future runs since they lost
        localStorage.setItem('hasLostGame', 'true');
        setBailoutUnlocked(true);

        return {
            ...prev,
            metrics: newMetrics,
            status: 'GAME_OVER',
            gameOverReason,
            lastRoundFeedback: feedbackData, // Save feedback even on game over for final bailout view
            history: [...prev.history, {
                round: prev.round,
                metrics: {
                    [MetricType.MORALE]: newMetrics[MetricType.MORALE].value,
                    [MetricType.FINANCES]: newMetrics[MetricType.FINANCES].value,
                    [MetricType.SUPPLY_CHAIN]: newMetrics[MetricType.SUPPLY_CHAIN].value,
                    [MetricType.PUBLIC_IMAGE]: newMetrics[MetricType.PUBLIC_IMAGE].value,
                },
                eventTitle: prev.currentScenario!.title,
                choiceSelected: isTimeout ? "TIMEOUT" : choice.text
            }]
        };
      }

      // 3. Update Rounds & Status
      const nextRound = prev.round + 1;
      
      // Resilience Bonus: All metrics >= 4 gets bonus
      if ((Object.values(newMetrics) as MetricState[]).every(m => m.value >= 4)) scoreDelta += 20;

      // Decrement debuff
      const newDebuff = prev.investorDebuffRounds > 0 ? prev.investorDebuffRounds - 1 : 0;

      const nextState: GameState = {
        ...prev,
        round: nextRound,
        metrics: newMetrics,
        resilienceScore: prev.resilienceScore + scoreDelta,
        investorDebuffRounds: newDebuff,
        status: 'ROUND_FEEDBACK',
        lastRoundFeedback: feedbackData,
        history: [...prev.history, {
            round: prev.round,
            metrics: {
                [MetricType.MORALE]: newMetrics[MetricType.MORALE].value,
                [MetricType.FINANCES]: newMetrics[MetricType.FINANCES].value,
                [MetricType.SUPPLY_CHAIN]: newMetrics[MetricType.SUPPLY_CHAIN].value,
                [MetricType.PUBLIC_IMAGE]: newMetrics[MetricType.PUBLIC_IMAGE].value,
            },
            eventTitle: prev.currentScenario!.title,
            choiceSelected: isTimeout ? "TIMEOUT" : choice.text
        }],
        currentScenario: null
      };

      return nextState;
    });
  };

  const handleNextRound = () => {
    if (gameState.round > gameState.maxRounds) {
      setGameState(prev => ({ ...prev, status: 'VICTORY' }));
    } else {
      startRound(gameState, scenarioDeck);
    }
  };

  const handleTimeout = () => {
      if (!gameState.currentScenario) return;
      const safeChoice = gameState.currentScenario.choices.find(c => c.riskLevel === 'Low') || gameState.currentScenario.choices[0];
      handleChoice(safeChoice, true);
  };

  const handleBailout = () => {
      setGameState(prev => {
          const newMetrics = { ...prev.metrics };
          newMetrics[MetricType.FINANCES].value = Math.min(10, newMetrics[MetricType.FINANCES].value + 3);
          newMetrics[MetricType.FINANCES].delta = 3;
          
          newMetrics[MetricType.PUBLIC_IMAGE].value = Math.min(10, newMetrics[MetricType.PUBLIC_IMAGE].value + 1);
          newMetrics[MetricType.PUBLIC_IMAGE].delta = 1;
          
          newMetrics[MetricType.MORALE].value = Math.max(0, newMetrics[MetricType.MORALE].value - 2);
          newMetrics[MetricType.MORALE].delta = -2;

          setFeedbackToast({
              title: "Bailout Secured",
              items: ["Finances +3", "Image +1", "Morale -2", "Investors control finances for 2 rounds."]
          });
          setTimeout(() => setFeedbackToast(null), 4000);

          return {
              ...prev,
              metrics: newMetrics,
              bailoutUsed: true,
              investorDebuffRounds: 2,
              resilienceScore: prev.resilienceScore - 50 // Heavy penalty
          };
      });
  };

  const handleFinalBailout = () => {
    setGameState(prev => {
        const newMetrics = { ...prev.metrics };
        // Reset criticals to 3
        (Object.values(newMetrics) as MetricState[]).forEach(m => {
            if (m.value < 2) {
                m.value = 3;
                m.delta = 3 - m.value;
            }
        });
        
        // Proceed to next round logic similar to handleChoice success path
        const nextRound = prev.round + 1;
        const newDebuff = prev.investorDebuffRounds > 0 ? prev.investorDebuffRounds - 1 : 0;

        setFeedbackToast({
            title: "Federal Rescue Accepted",
            items: ["Critical Metrics Reset to 3", "Resilience Score Halved", "Continuing Game..."]
        });
        setTimeout(() => setFeedbackToast(null), 4000);

        return {
            ...prev,
            metrics: newMetrics,
            status: 'ROUND_FEEDBACK', // Show them what happened that almost killed them
            round: nextRound,
            investorDebuffRounds: newDebuff,
            resilienceScore: Math.floor(prev.resilienceScore / 2), // Massive penalty
            finalBailoutUsed: true,
            gameOverReason: undefined
        };
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8 font-sans">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-cyan-900/10 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-purple-900/10 blur-3xl rounded-full"></div>
      </div>

      {showIntro ? (
        <div className="max-w-4xl mx-auto mt-6 text-center space-y-8 z-10 relative animate-fade-in">
          <div className="bg-slate-800/50 p-8 md:p-10 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-sm">
            <div className="flex justify-center mb-4">
                <ShieldCheck size={64} className="text-cyan-500" />
            </div>
            <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
              Crisis Management
            </h1>
            <h2 className="text-2xl text-slate-200 font-semibold mb-8">
              Turn Your Company Around
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-10">
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                    <h3 className="text-cyan-400 font-bold text-lg mb-3 flex items-center gap-2">
                        <Target className="w-5 h-5" /> Mission Objective
                    </h3>
                    <p className="text-slate-300 leading-relaxed text-sm">
                        Steer a vulnerable corporation through a series of unpredictable crises. 
                        Your goal is to <strong>survive all rounds</strong> without allowing any of your four key indicators to crash.
                    </p>
                </div>
                
                <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                     <h3 className="text-red-400 font-bold text-lg mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" /> Risk Factors
                    </h3>
                     <ul className="space-y-2 text-slate-300 text-sm">
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                            <span><strong>Morale:</strong> Employee trust and motivation.</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            <span><strong>Finances:</strong> Cash reserves and stock price.</span>
                        </li>
                         <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            <span><strong>Supply Chain:</strong> Logistics and production.</span>
                        </li>
                         <li className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                            <span><strong>Public Image:</strong> Brand reputation.</span>
                        </li>
                     </ul>
                </div>
            </div>

            <div className="text-left mb-10 space-y-4">
                <h3 className="text-white font-bold text-lg border-b border-slate-700 pb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    How to Play
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <div className="text-cyan-400 font-bold mb-1 flex items-center gap-2">1. Analyze</div>
                        <p className="text-slate-400 text-sm">Read the crisis scenario carefully. Identify the immediate threats to your company.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <div className="text-cyan-400 font-bold mb-1 flex items-center gap-2">2. Decide</div>
                        <p className="text-slate-400 text-sm">Choose 1 of 4 actions. Every choice has trade-offs. There are no perfect answers.</p>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                        <div className="text-cyan-400 font-bold mb-1 flex items-center gap-2">3. Act Fast</div>
                        <p className="text-slate-400 text-sm">The clock is ticking. Hesitation leads to default decisions and penalties.</p>
                    </div>
                </div>
                 <div className="text-center mt-4 bg-red-900/20 py-3 rounded border border-red-900/30">
                    <p className="text-red-400 text-sm font-bold">
                        ⚠️ GAME OVER CONDITION: If ANY metric drops below 2.0
                    </p>
                </div>
            </div>

            <div className="border-t border-slate-700 pt-8">
                <p className="text-slate-400 mb-6 text-sm uppercase tracking-widest font-semibold">Select Difficulty to Start</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(Object.values(Difficulty) as Difficulty[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => startGame(level)}
                      className="flex flex-col items-center justify-center p-5 bg-slate-700 hover:bg-cyan-600 rounded-xl transition-all border border-slate-600 hover:border-cyan-400 group shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-1 duration-200"
                    >
                      <span className="font-bold text-xl text-white group-hover:text-white mb-1">{level}</span>
                      <div className="flex items-center gap-1 text-xs text-slate-400 group-hover:text-cyan-100">
                        <Clock size={12} />
                        <span>{DIFFICULTY_SETTINGS[level].timeLimit}s Timer</span>
                      </div>
                    </button>
                  ))}
                </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Toast Notification */}
          {feedbackToast && (
             <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-bounce-in">
                 <div className="bg-slate-800 text-white px-6 py-4 rounded-lg shadow-2xl border border-slate-600 flex flex-col items-center">
                     <h4 className="font-bold text-lg mb-1 text-cyan-400">{feedbackToast.title}</h4>
                     {feedbackToast.items.map((item, i) => (
                         <p key={i} className="text-xs text-slate-400">{item}</p>
                     ))}
                 </div>
             </div>
          )}

          {gameState.status === 'GAME_OVER' || gameState.status === 'VICTORY' ? (
             <GameOver 
               gameState={gameState} 
               onRestart={() => setShowIntro(true)} 
               onFinalBailout={handleFinalBailout}
             />
          ) : (
            <>
              <Dashboard 
                gameState={gameState} 
                onBailout={handleBailout} 
                bailoutUnlocked={bailoutUnlocked}
              />
              
              {gameState.status === 'ROUND_FEEDBACK' && gameState.lastRoundFeedback && (
                <RoundFeedbackView 
                  data={gameState.lastRoundFeedback} 
                  onNext={handleNextRound} 
                />
              )}

              {(gameState.status === 'PLAYING' && (gameState.currentScenario || gameState.loading)) && (
                <ScenarioView 
                  scenario={gameState.currentScenario!} 
                  onChoose={handleChoice} 
                  timeLimit={gameState.timeLimit}
                  onTimeout={handleTimeout}
                  loading={gameState.loading}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
