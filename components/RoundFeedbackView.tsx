
import React from 'react';
import { RoundFeedbackData, MetricType, Choice } from '../types';
import { ArrowRight, CheckCircle, Clock, Target } from 'lucide-react';
import { COLORS } from '../constants';

interface RoundFeedbackViewProps {
  data: RoundFeedbackData;
  onNext: () => void;
}

export const RoundFeedbackView: React.FC<RoundFeedbackViewProps> = ({ data, onNext }) => {
  const { scenario, selectedChoiceId, impacts, isTimeout } = data;
  const selectedChoice = scenario.choices.find(c => c.id === selectedChoiceId);

  // Helper to render small impact badges
  const renderImpactBadges = (choiceImpacts: Record<MetricType, number>) => {
    return (Object.keys(choiceImpacts) as MetricType[]).map(key => {
      const val = choiceImpacts[key];
      if (val === 0) return null;
      const isPositive = val > 0;
      const color = COLORS[key];
      return (
        <span key={key} className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800/80 border border-slate-700 flex items-center gap-1" style={{ color: color }}>
           {key.split(' ')[0]} {isPositive ? '+' : ''}{val}
        </span>
      );
    });
  };

  return (
    <div className="mt-8 animate-fade-in pb-12">
      <div className="bg-slate-800 border border-slate-600 rounded-xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 border-b border-slate-700 flex justify-between items-center">
          <div>
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
               <Target className="text-cyan-400" />
               Round Analysis
             </h2>
             <p className="text-slate-400 text-sm uppercase tracking-wider mt-1">{scenario.title}</p>
          </div>
          <button
            onClick={onNext}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg shadow-lg transition-all flex items-center gap-2 group"
          >
            Next Round
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Selected Choice Focus */}
          <div className="lg:col-span-5">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Your Decision</h3>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-cyan-500/50 rounded-xl p-6 shadow-lg relative">
               {isTimeout && (
                 <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                   <Clock size={12} /> TIMEOUT
                 </div>
               )}
               <div className="mb-4">
                 <h4 className="text-xl font-bold text-white mb-2">{selectedChoice?.text || "No Choice Made"}</h4>
                 <p className="text-sm text-slate-300 leading-relaxed">{selectedChoice?.description}</p>
               </div>

               <div className="bg-slate-950/50 rounded-lg p-4 border border-slate-700/50 mb-4">
                  <span className="text-xs font-bold text-cyan-400 uppercase block mb-1">Outcome</span>
                  <p className="text-slate-200 italic">"{selectedChoice?.narrativeOutcome}"</p>
               </div>

               <div>
                 <span className="text-xs font-bold text-slate-500 uppercase block mb-2">Net Impact</span>
                 <div className="flex flex-wrap gap-2">
                   {impacts.length > 0 ? impacts.map((imp, idx) => (
                     <span key={idx} className="px-3 py-1 bg-slate-800 rounded-md border border-slate-600 text-sm font-mono text-slate-200">
                       {imp}
                     </span>
                   )) : <span className="text-slate-500 text-sm italic">No significant changes</span>}
                 </div>
               </div>
            </div>
          </div>

          {/* Other Choices Grid */}
          <div className="lg:col-span-7">
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-4">Missed Opportunities & Analysis</h3>
            <div className="grid grid-cols-1 gap-4">
               {scenario.choices.filter(c => c.id !== selectedChoiceId).map(choice => (
                 <div key={choice.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-bold text-slate-300 group-hover:text-white transition-colors">{choice.text}</h4>
                       <div className="flex flex-wrap gap-1 justify-end max-w-[120px]">
                         {renderImpactBadges(choice.impacts)}
                       </div>
                    </div>
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2 group-hover:line-clamp-none transition-all">
                      {choice.description}
                    </p>
                    <div className="text-xs text-slate-500 border-t border-slate-700/50 pt-2 mt-2 flex gap-2">
                       <span className="font-bold uppercase tracking-wider text-slate-600">Result:</span>
                       <span className="italic text-slate-400">{choice.narrativeOutcome}</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
