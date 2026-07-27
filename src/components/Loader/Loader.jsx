import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Modern Concentric Ring Spinner Component
 */
export const Spinner = ({ size = 'md', className }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer Rotating Kasavu Gold Ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className={cn(
          'rounded-full border-t-[#D4A017] border-r-transparent border-b-[#0F5132] border-l-transparent',
          sizeClasses[size] || sizeClasses.md,
          className
        )}
      />
      {/* Inner Pulsing Core */}
      <motion.div
        animate={{ scale: [0.8, 1.1, 0.8] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="absolute w-2 h-2 rounded-full bg-[#0F5132]"
      />
    </div>
  );
};

/**
 * Skeleton Card Component (For Metric Cards & Prize Cards)
 */
export const SkeletonCard = ({ className }) => {
  return (
    <div className={cn('bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-4 animate-pulse', className)}>
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-2xl bg-amber-100/80" />
        <div className="w-20 h-5 rounded-full bg-amber-100/60" />
      </div>
      <div className="space-y-2">
        <div className="w-28 h-4 rounded-md bg-slate-200/70" />
        <div className="w-40 h-8 rounded-lg bg-slate-300/80" />
        <div className="w-32 h-3 rounded-md bg-slate-200/60" />
      </div>
    </div>
  );
};

/**
 * Skeleton Table Component (For Data Tables & Payment History)
 */
export const SkeletonTable = ({ rows = 5, cols = 6, className }) => {
  return (
    <div className={cn('bg-white rounded-3xl border border-amber-200/90 shadow-soft overflow-hidden animate-pulse', className)}>
      <div className="p-6 border-b border-amber-100 flex items-center justify-between">
        <div className="w-48 h-6 rounded-md bg-slate-300/80" />
        <div className="w-24 h-5 rounded-full bg-amber-100/80" />
      </div>
      <div className="divide-y divide-amber-100/60 p-4 space-y-4">
        {Array.from({ length: rows }).map((_, rIdx) => (
          <div key={rIdx} className="flex items-center justify-between gap-4 py-2">
            {Array.from({ length: cols }).map((_, cIdx) => (
              <div
                key={cIdx}
                className={cn(
                  'h-4 rounded-md bg-slate-200/70',
                  cIdx === 0 ? 'w-24 bg-emerald-100/80' : cIdx === 1 ? 'w-36' : 'w-20'
                )}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Progress Loader Component (For Loading Bars & Multi-step Sequences)
 */
export const ProgressLoader = ({ progress = 65, label = 'Loading data...', className }) => {
  return (
    <div className={cn('space-y-2 w-full', className)}>
      <div className="flex justify-between items-center text-xs font-heading font-bold text-slate-700">
        <span>{label}</span>
        <span className="text-[#0F5132] font-black">{progress}%</span>
      </div>
      <div className="w-full bg-[#FFF9F0] border border-amber-200/90 rounded-full h-3.5 p-0.5 overflow-hidden relative">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full rounded-full bg-gradient-to-r from-[#0F5132] via-[#167448] to-[#D4A017] relative overflow-hidden"
        >
          {/* Shimmer Line Overlay */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
          />
        </motion.div>
      </div>
    </div>
  );
};

/**
 * Page Loader Component (Centered Section / Page View Loader)
 */
export const PageLoader = ({ message = 'Loading Secretariat Portal...', className }) => {
  return (
    <div className={cn('min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-4', className)}>
      <Spinner size="lg" />
      <p className="text-xs font-bold text-[#0F5132] font-heading uppercase tracking-wider animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default {
  Spinner,
  SkeletonCard,
  SkeletonTable,
  ProgressLoader,
  PageLoader,
};
