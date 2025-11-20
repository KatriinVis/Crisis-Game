
import React from 'react';
import { GameState, MetricType } from '../types';
import { COLORS } from '../constants';
import { Trophy, Skull, RefreshCcw, Siren } from 'lucide-react';

interface GameOverProps {
  gameState: GameState;
  onRestart: () => void;
  onFinalBailout: () => void;
  bailoutUnlocked: boolean;
}

export const GameOver: React.FC<GameOverProps> = ({ gameState, onRestart, onFinalBailout, bailoutUnlocked }) => {
  const { history, status, resilienceScore, gameOverReason, difficulty, finalBailoutUsed } = gameState;

  const isVictory = status === 'VICTORY';
  const canRescue = !isVictory && !finalBailoutUsed && bailoutUnlocked;

  let title = isVictory ? "Company Saved!" : "Bankruptcy Declared";
  let subtitle = isVictory 
    ? "You successfully navigated the crisis period." 
    : gameOverReason || "Indicators fell below critical levels.";

  // Victory Tier
  let tier = "";
  if (isVictory) {
    const finalMetrics = history[history.length - 1].metrics;
    const minVal = Math.min(...(Object.values(finalMetrics) as number[]));
    if (minVal >= 6) tier = "Legendary CEO (All Metrics Strong)";
    else if (minVal >= 5) tier = "Stable Leadership (Solid)";
    else tier = "Survivalist (Barely Made It)";
  }

  // --- Custom Simple Chart Logic ---
  // We map the rounds to X coordinates (0 to 100%) and values to Y coordinates (0 to 100%)
  const rounds = history.map(h => h.round);
  const maxR = Math.max(...rounds, 1); // avoid div by 0

  const getPoints = (type: MetricType) => {
    return history.map((h, i) => {
      const x = (h.round / maxR) * 100;
      const val = h.metrics[type];
      // Y axis: 0 is bottom (100%), 10 is top (0%)
      // Value 0-10. 
      const y = 100 - (val * 10); 
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div className="max-w-4xl mx-auto bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700 animate-fade-in">
      <div className={`p-8 text-center ${isVictory ? 'bg-green-900/20' : 'bg-red-900/20'}`}>
        {isVictory ? (
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-green-400 w-10 h-10" />
          </div>
        ) : (
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Skull className="text-red-400 w-10 h-10" />
          </div>
        )}
        
        <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
        <p className="text-xl text-slate-300 mb-6">{subtitle}</p>
        
        {isVictory && (
          <div className="inline-block px-4 py-2 bg-slate-900 rounded-lg border border-slate-600 text-cyan-400 font-bold mb-6">
            {tier}
          </div>
        )}

        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Final Score</div>
            <div className="text-3xl font-mono font-bold text-white">{resilienceScore}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 uppercase tracking-wider">Difficulty</div>
            <div className="text-3xl font-mono font-bold text-white">{difficulty}</div>
          </div>
        </div>
      </div>

      <div className="p-8">
        
        {canRescue && (
            <div className="mb-8 p-5 bg-indigo-900/20 border border-indigo-500/50 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
                <h4 className="text-indigo-400 font-bold flex items-center gap-2 mb-2 text-lg">
                    <Siren className="animate-pulse w-5 h-5" /> 
                    Government Intervention Available
                </h4>
                <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                The federal government is offering a one-time emergency rescue package to prevent total collapse. 
                This will restore your critical metrics to survival levels (3.0), but your Resilience Score will be halved.
                </p>
                <button 
                    onClick={onFinalBailout} 
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-all shadow-lg shadow-indigo-900/50 hover:shadow-indigo-700/50 flex justify-center gap-2 items-center"
                >
                    Accept Final Bailout & Continue
                </button>
            </div>
        )}

        <h3 className="text-lg font-bold text-slate-300 mb-4">Performance Trend</h3>
        
        {/* Custom SVG Chart */}
        <div className="w-full bg-slate-900/50 rounded-xl p-4 border border-slate-700 mb-6 relative h-64">
           {/* Grid Lines */}
           <div className="absolute inset-4 flex flex-col justify-between pointer-events-none text-xs text-slate-600 font-mono z-0">
              <div className="border-b border-slate-700/50 w-full h-0 flex items-center"><span className="-ml-6 absolute">10</span></div>
              <div className="border-b border-slate-700/50 w-full h-0 flex items-center"><span className="-ml-6 absolute">7.5</span></div>
              <div className="border-b border-slate-600 w-full h-0 flex items-center"><span className="-ml-6 absolute text-slate-400">5.0</span></div>
              <div className="border-b border-red-900/50 w-full h-0 flex items-center"><span className="-ml-6 absolute text-red-500">2.5</span></div>
              <div className="border-b border-slate-700/50 w-full h-0 flex items-center"><span className="-ml-6 absolute">0</span></div>
           </div>

           <svg className="w-full h-full overflow-visible relative z-10" preserveAspectRatio="none" viewBox="0 0 100 100">
              {Object.values(MetricType).map((type) => (
                <polyline
                   key={type}
                   points={getPoints(type)}
                   fill="none"
                   stroke={COLORS[type]}
                   strokeWidth="2"
                   vectorEffect="non-scaling-stroke"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   className="opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
              ))}
           </svg>
           
           {/* Legend */}
           <div className="absolute top-2 right-2 flex flex-col gap-1 bg-slate-900/80 p-2 rounded border border-slate-700 backdrop-blur-sm">
              {Object.values(MetricType).map(type => (
                 <div key={type} className="flex items-center gap-2 text-[10px]">
                    <span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[type]}}></span>
                    <span className="text-slate-300">{type}</span>
                 </div>
              ))}
           </div>
        </div>

        <button 
          onClick={onRestart}
          className="mt-8 w-full py-4 bg-slate-700 hover:bg-cyan-600 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 border border-slate-600 hover:border-cyan-400"
        >
          <RefreshCcw size={20} />
          {isVictory ? 'Play Again' : 'Restart Game'}
        </button>
      </div>
    </div>
  );
};
