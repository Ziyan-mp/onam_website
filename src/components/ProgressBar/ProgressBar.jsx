import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Reusable Progress Bar Component with Primary Emerald & Kasavu Gold Shine
 */
export const ProgressBar = ({
  progress = 0,
  label,
  valueText,
  className,
  barClassName,
  showPercentage = true,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn('w-full flex flex-col gap-2', className)}>
      {(label || showPercentage || valueText) && (
        <div className="flex items-center justify-between text-xs font-semibold font-heading">
          {label && <span className="text-slate-700">{label}</span>}
          {valueText ? (
            <span className="text-[#0F5132] font-bold">{valueText}</span>
          ) : showPercentage ? (
            <span className="text-[#0F5132] font-bold">{clampedProgress.toFixed(0)}%</span>
          ) : null}
        </div>
      )}
      <div className="w-full bg-[#FFF9F0] border border-[#D4A017]/30 rounded-full h-3.5 p-0.5 overflow-hidden shadow-inner">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={cn(
            'h-full bg-gradient-to-r from-[#0F5132] via-[#167448] to-[#D4A017] rounded-full shadow-sm relative overflow-hidden',
            barClassName
          )}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
