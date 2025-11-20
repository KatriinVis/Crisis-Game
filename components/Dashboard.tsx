import React from 'react';
import { GameState, MetricType, MetricState } from '../types';
import { MetricBar } from './MetricBar';
import { Activity, ShieldAlert, TrendingUp } from 'lucide-react';

interface DashboardProps {
  gameState: GameState;
  onBailout: () => void;
  bailoutUnlocked: boolean;
}

export const Dashboard: React.FC<DashboardProps> = ({ gameState, onBailout, bailoutUnlocked }) => {
  const { metrics, bailoutUsed, resilienceScore, round, maxRounds, difficulty, investorDebuffRounds } = gameState;

  // Check if bailout is available (any metric < 3 and not used yet)
  const isCrisis = (Object.values(metrics) as MetricState[]).some(m => m.value < 3);
  const canBailout = !bailoutUsed && isCrisis;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-xl">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="text-cyan-400" />
            Company Status
          </h2>
          <p className="text-xs text-slate-400 mt-1">Difficulty: {difficulty} | Round: {round}/{maxRounds}</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-slate-400">Resilience Score</div>
          <div className="text-2xl font-mono font-bold text-cyan-400">{resilienceScore}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <MetricBar metric={metrics[MetricType.MORALE]} />
        <MetricBar metric={metrics[MetricType.FINANCES]} />
        <MetricBar metric={metrics[MetricType.SUPPLY_CHAIN]} />
        <MetricBar metric={metrics[MetricType.PUBLIC_IMAGE]} />
      </div>

      <div className="mt-6 flex items-center justify-between">
         {investorDebuffRounds > 0 ? (
             <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-950/30 px-3 py-1 rounded-full border border-amber-900/50">
                 <ShieldAlert size={14} />
                 Investor Control: Finances frozen for {investorDebuffRounds} rounds
             </div>
         ) : <div />}

        {bailoutUnlocked && (
          <button
            onClick={onBailout}
            disabled={!canBailout}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all
              ${canBailout 
                ? 'bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)] hover:shadow-[0_0_25px_rgba(220,38,38,0.7)]' 
                : 'bg-slate-700 text-slate-500 cursor-not-allowed opacity-50'}
            `}
          >
            <TrendingUp size={16} />
            {bailoutUsed ? 'Bailout Used' : 'Emergency Bailout'}
          </button>
        )}
      </div>
    </div>
  );
};