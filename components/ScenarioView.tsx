
import React from 'react';
import { Scenario, Choice } from '../types';
import { Timer } from './Timer';
import { AlertTriangle } from 'lucide-react';

interface ScenarioViewProps {
  scenario: Scenario;
  onChoose: (choice: Choice) => void;
  timeLimit: number;
  onTimeout: () => void;
  loading: boolean;
}

export const ScenarioView: React.FC<ScenarioViewProps> = ({ scenario, onChoose, timeLimit, onTimeout, loading }) => {
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4 animate-pulse">
        <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400 font-mono text-sm">Analyzing Market Data...</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
       <Timer duration={timeLimit} onExpire={onTimeout} isActive={true} />

      <div className="bg-slate-800 border border-slate-600 rounded-xl p-6 shadow-lg relative overflow-hidden">
        {/* Header Decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>

        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-red-500/10 rounded-lg text-red-400 border border-red-500/20">
            <AlertTriangle size={32} />
          </div>
          <div>
            <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1">{scenario.category} CRISIS</h3>
            <h2 className="text-2xl font-bold text-white">{scenario.title}</h2>
          </div>
        </div>

        <p className="text-slate-300 text-lg leading-relaxed mb-8 border-l-4 border-slate-600 pl-4">
          {scenario.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scenario.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoose(choice)}
              className="group relative flex flex-col items-start p-5 bg-slate-900/50 border border-slate-700 rounded-xl hover:bg-slate-700 hover:border-cyan-500/50 transition-all duration-200 text-left h-full"
            >
              <div className="flex justify-between w-full mb-2">
                <span className="text-white font-bold group-hover:text-cyan-400 transition-colors text-lg">{choice.text}</span>
              </div>
              <p className="text-sm text-slate-400 group-hover:text-slate-300 leading-relaxed">
                {choice.description}
              </p>
              
              {/* Hover indicator */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/20 rounded-xl pointer-events-none transition-colors"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
