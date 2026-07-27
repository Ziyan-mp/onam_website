import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '../Button';
import { formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Optimized & Memoized PrizeCard Component
 */
export const PrizeCard = memo(({
  title = 'Grand Thiruvonam Bumper',
  subtitle = '1st Prize',
  amount = 50000,
  perks = [],
  ribbonText = 'GRAND BUMPER',
  rank = 1,
  isFeatured = false,
  className,
}) => {
  const rankColors = {
    1: {
      bg: 'bg-white',
      border: 'border-2 border-[#D4A017]',
      ribbon: 'bg-gradient-to-r from-[#D4A017] to-[#E5B83B] text-[#0F5132]',
      accent: 'text-[#0F5132]',
      badge: 'bg-[#D4A017]/15 text-[#0F5132] border-[#D4A017]/40',
    },
    2: {
      bg: 'bg-white',
      border: 'border border-amber-200/90',
      ribbon: 'bg-gradient-to-r from-slate-700 to-slate-900 text-white',
      accent: 'text-slate-800',
      badge: 'bg-slate-100 text-slate-800 border-slate-300',
    },
    3: {
      bg: 'bg-white',
      border: 'border border-amber-200/90',
      ribbon: 'bg-gradient-to-r from-[#8B1E3F] to-[#A61E3F] text-white',
      accent: 'text-[#8B1E3F]',
      badge: 'bg-[#8B1E3F]/10 text-[#8B1E3F] border-[#8B1E3F]/20',
    },
  };

  const style = rankColors[rank] || rankColors[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className={cn(
        'rounded-[2.5rem] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-soft hover:shadow-soft-lg transition-all duration-300',
        style.bg,
        style.border,
        isFeatured && 'shadow-gold-glow border-2 border-[#D4A017]',
        className
      )}
    >
      {/* Corner Ribbon Badge */}
      {ribbonText && (
        <div className="absolute top-4 right-4 z-10">
          <span className={cn('px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-heading shadow-xs border', style.ribbon)}>
            {ribbonText}
          </span>
        </div>
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#0F5132]/10 flex items-center justify-center text-[#0F5132] border border-[#0F5132]/20">
            {rank === 1 ? <Crown className="w-6 h-6 text-[#D4A017]" /> : <Trophy className="w-6 h-6 text-[#0F5132]" />}
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D4A017] font-heading block">
              {subtitle}
            </span>
            <h3 className="text-xl font-black text-slate-800 font-heading mt-0.5">
              {title}
            </h3>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-200/80 text-center">
          <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider font-heading block">
            CASH REWARD POOL
          </span>
          <span className={cn('text-3xl sm:text-4xl font-black font-heading tracking-tight mt-1 block', style.accent)}>
            {formatCurrency(amount)}
          </span>
        </div>

        {perks.length > 0 && (
          <div className="space-y-2.5 pt-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-heading block">
              BUMPER INCLUSIONS
            </span>
            <ul className="space-y-2 text-xs text-slate-700 font-sans">
              {perks.map((perk, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="pt-6 border-t border-amber-100 mt-6">
        <a href="#register">
          <Button
            variant={isFeatured ? 'secondary' : 'primary'}
            size="md"
            className="w-full justify-center shadow-xs"
          >
            Enter Bumper Draw
          </Button>
        </a>
      </div>
    </motion.div>
  );
});

PrizeCard.displayName = 'PrizeCard';
export default PrizeCard;
