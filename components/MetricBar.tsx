import React from 'react';
import { MetricState, MetricType } from '../types';
import { COLORS } from '../constants';

interface MetricBarProps {
  metric: MetricState;
}

export const MetricBar: React.FC<MetricBarProps> = ({ metric }) => {
  const { type, value, delta } = metric;
  const color = COLORS[type];
  
  // Determine zone color
  let zoneColor = color;
  if (value <= 2) zoneColor = '#ef4444'; // Red-500
  else if (value <= 4) zoneColor = '#f59e0b'; // Amber-500

  const percentage = (value / 10) * 100;

  return (
    <div className="mb-4 relative group">
      <div className="flex justify-between text-sm font-semibold mb-1 text-slate-300">
        <span>{type}</span>
        <span>{value.toFixed(1)} / 10</span>
      </div>
      <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden relative shadow-inner">
        <div 
          className="h-full transition-all duration-700 ease-out rounded-full"
          style={{ width: `${percentage}%`, backgroundColor: zoneColor }}
        />
        
        {/* Critical threshold marker */}
        <div className="absolute top-0 bottom-0 w-0.5 bg-red-600 opacity-50 z-10" style={{ left: '20%' }} title="Critical Threshold" />
      </div>
      
      {/* Delta Feedback Animation */}
      {delta !== 0 && (
        <div className={`absolute right-0 -top-1 text-sm font-bold animate-bounce ${delta > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {delta > 0 ? '+' : ''}{delta}
        </div>
      )}
    </div>
  );
};