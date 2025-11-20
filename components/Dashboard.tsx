
import React from 'react';
import { GameState, MetricType } from '../types';
import { MetricBar } from './MetricBar';
import { Activity, ShieldAlert, Banknote, Info } from 'lucide-react';

interface DashboardProps {
  gameState: GameState;
  onTakeLoan: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ gameState, onTakeLoan }) => {
  const { metrics, resilienceScore, round, maxRounds, difficulty, investorDebuffRounds, status, loanTaken } = gameState;
  
  // Loan condition: Finances < 4, Game Active, Not already taken this round
  const showLoanButton = status === 'PLAYING' && metrics[MetricType.FINANCES].value < 4 && !loanTaken;

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl border border-slate-700 shadow-xl mb-6 z-20 relative">
      <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="text-cyan-400" />
            Company Status
          </h2>
          <p className="text-xs text-slate-400 mt-1">Difficulty: {difficulty} | Round: {round}/{maxRounds}</p>
        </div>
        <div className="flex items-center gap-4">
           {showLoanButton && (
               <button 
                 onClick={onTakeLoan}
                 className="px-4 py-2 bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/50 text-amber-400 rounded-lg text-sm font-bold flex items-center gap-2 transition-all animate-pulse hover:animate-none"
               >
                 <Banknote size={16} />
                 Emergency Bank Loan
               </button>
           )}
           
           {/* Resilience Score with Tooltip */}
           <div className="text-right relative group cursor-help">
             <div className="text-sm text-slate-400 flex items-center justify-end gap-1 hover:text-cyan-300 transition-colors">
                Resilience Score <Info size={14} />
             </div>
             <div className="text-2xl font-mono font-bold text-cyan-400">{resilienceScore}</div>
             
             {/* Tooltip */}
             <div className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-slate-500 p-4 rounded-lg shadow-2xl z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none translate-y-2 group-hover:translate-y-0">
                <h4 className="text-white font-bold border-b border-slate-700 pb-2 mb-2 text-sm flex items-center gap-2">
                    <Activity size={14} className="text-cyan-400"/> Scoring Rules
                </h4>
                <ul className="space-y-2 text-xs text-left">
                    <li className="flex justify-between items-center text-green-400">
                        <span>Growth (per +1.0 metric)</span> 
                        <span className="font-mono font-bold bg-green-900/30 px-2 py-0.5 rounded">+10 pts</span>
                    </li>
                    <li className="flex justify-between items-center text-cyan-400">
                        <span>Stability Bonus (All > 4.0)</span> 
                        <span className="font-mono font-bold bg-cyan-900/30 px-2 py-0.5 rounded">+20 pts/rnd</span>
                    </li>
                     <li className="flex justify-between items-center text-red-400">
                        <span>Decline (per -1.0 metric)</span> 
                        <span className="font-mono font-bold bg-red-900/30 px-2 py-0.5 rounded">-5 pts</span>
                    </li>
                     <li className="flex justify-between items-center text-amber-400">
                        <span>Taking Bank Loan</span> 
                        <span className="font-mono font-bold bg-amber-900/30 px-2 py-0.5 rounded">-10 pts</span>
                    </li>
                </ul>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed text-left">
                    Tip: Maintaining a balanced company (Stability) yields more points long-term than sacrificing one metric to max out another.
                </div>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
        <MetricBar metric={metrics[MetricType.MORALE]} />
        <MetricBar metric={metrics[MetricType.FINANCES]} />
        <MetricBar metric={metrics[MetricType.SUPPLY_CHAIN]} />
        <MetricBar metric={metrics[MetricType.PUBLIC_IMAGE]} />
      </div>

      <div className="mt-6 min-h-[24px]">
         {investorDebuffRounds > 0 && (
             <div className="flex items-center gap-2 text-amber-400 text-xs bg-amber-950/30 px-3 py-1 rounded-full border border-amber-900/50 inline-flex">
                 <ShieldAlert size={14} />
                 Investor Control: Finances frozen for {investorDebuffRounds} rounds
             </div>
         )}
      </div>
    </div>
  );
};
