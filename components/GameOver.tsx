import React from 'react';
import { GameState, MetricType } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { COLORS } from '../constants';
import { Trophy, Skull, RefreshCcw } from 'lucide-react';

interface GameOverProps {
  gameState: GameState;
  onRestart: () => void;
}

export const GameOver: React.FC<GameOverProps> = ({ gameState, onRestart }) => {
  const { history, status, resilienceScore, gameOverReason, difficulty } = gameState;

  const isVictory = status === 'VICTORY';

  // Prepare chart data
  const chartData = history.map(h => ({
    round: h.round,
    [MetricType.MORALE]: h.metrics[MetricType.MORALE],
    [MetricType.FINANCES]: h.metrics[MetricType.FINANCES],
    [MetricType.SUPPLY_CHAIN]: h.metrics[MetricType.SUPPLY_CHAIN],
    [MetricType.PUBLIC_IMAGE]: h.metrics[MetricType.PUBLIC_IMAGE],
  }));

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
        <h3 className="text-lg font-bold text-slate-300 mb-4">Performance Trend</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="round" stroke="#94a3b8" />
              <YAxis domain={[0, 10]} stroke="#94a3b8" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', color: '#f1f5f9' }} 
              />
              <Legend />
              <Line type="monotone" dataKey={MetricType.MORALE} stroke={COLORS[MetricType.MORALE]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey={MetricType.FINANCES} stroke={COLORS[MetricType.FINANCES]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey={MetricType.SUPPLY_CHAIN} stroke={COLORS[MetricType.SUPPLY_CHAIN]} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey={MetricType.PUBLIC_IMAGE} stroke={COLORS[MetricType.PUBLIC_IMAGE]} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <button 
          onClick={onRestart}
          className="mt-8 w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <RefreshCcw size={20} />
          Play Again
        </button>
      </div>
    </div>
  );
};