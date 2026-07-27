import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { cn } from '../../utils/cn';

/**
 * Reusable Elegant Onam Theme Countdown Timer Component
 */
export const Countdown = ({
  targetDate = '2026-08-28T17:00:00+05:30',
  className,
  title = 'Live Draw Begins In',
}) => {
  const { days, hours, minutes, seconds, isCompleted } = useCountdown(targetDate);

  const units = [
    { label: 'Days', value: days },
    { label: 'Hours', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Seconds', value: seconds },
  ];

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {title && (
        <span className="text-xs font-bold uppercase tracking-widest text-[#0F5132] font-heading">
          {title}
        </span>
      )}

      {isCompleted ? (
        <div className="px-6 py-3 bg-[#0F5132] text-[#FFF9F0] border border-[#D4A017] rounded-2xl font-bold animate-pulse shadow-md">
          🎉 THE LIVE ONAM DRAW IS HAPPENING NOW! 🎉
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-4">
          {units.map((unit, idx) => (
            <React.Fragment key={unit.label}>
              <div className="flex flex-col items-center">
                <div className="w-16 sm:w-22 h-18 sm:h-24 bg-white border-2 border-[#D4A017]/40 rounded-2xl flex items-center justify-center shadow-soft">
                  <span className="text-2xl sm:text-4xl font-black text-[#0F5132] font-mono">
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-bold text-slate-600 mt-2 uppercase tracking-wider font-heading">
                  {unit.label}
                </span>
              </div>
              {idx < units.length - 1 && (
                <span className="text-xl sm:text-3xl font-black text-[#D4A017] -mt-6">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default Countdown;
