import React, { useEffect, useState } from 'react';

interface TimerProps {
  duration: number;
  onExpire: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ duration, onExpire, isActive }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isActive) return;

    if (timeLeft <= 0) {
      onExpire();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onExpire]);

  const percentage = (timeLeft / duration) * 100;
  const isUrgent = timeLeft <= 5;

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className={`text-xs font-bold uppercase tracking-widest ${isUrgent ? 'text-red-500 animate-pulse' : 'text-slate-400'}`}>
          Decision Time
        </span>
        <span className={`text-lg font-mono font-bold ${isUrgent ? 'text-red-500' : 'text-slate-200'}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-linear ${isUrgent ? 'bg-red-500' : 'bg-cyan-500'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};