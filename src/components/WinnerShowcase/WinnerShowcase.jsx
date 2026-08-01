import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Sparkles, Star, CheckCircle2 } from 'lucide-react';
import { formatTicketId } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Ponnonam Grand Winners Showcase Component — 3 Winner Cards with Petal Confetti
 */
export const WinnerShowcase = ({ className }) => {
  const winners = [
    {
      rank: 1,
      prize: 'Smart Watch',
      prizeEmoji: '⌚',
      ribbonText: '1ST BUMPER',
      winnerName: 'Prof. Ananthakrishnan Nair',
      department: 'Computer Science & Engineering',
      ticketNumber: '8942',
      color: {
        card: 'border-2 border-[#D4A017] shadow-[0_0_40px_rgba(212,160,23,0.2)]',
        ribbon: 'bg-gradient-to-r from-[#D4A017] to-[#E5B83B] text-[#0F5132]',
        icon: 'bg-gradient-to-tr from-[#D4A017] to-[#E5B83B]',
        badge: 'bg-[#D4A017]/15 text-[#0F5132] border-[#D4A017]/40',
      },
      RankIcon: Crown,
    },
    {
      rank: 2,
      prize: 'Bluetooth Speaker',
      prizeEmoji: '🔊',
      ribbonText: '2ND PRIZE',
      winnerName: 'Dr. Sunitha Menon',
      department: 'Electronics & Communication',
      ticketNumber: '7610',
      color: {
        card: 'border border-slate-200',
        ribbon: 'bg-gradient-to-r from-slate-700 to-slate-900 text-white',
        icon: 'bg-gradient-to-tr from-slate-600 to-slate-800',
        badge: 'bg-slate-100 text-slate-800 border-slate-300',
      },
      RankIcon: Trophy,
    },
    {
      rank: 3,
      prize: 'Onakkodi',
      prizeEmoji: '👘',
      ribbonText: '3RD PRIZE',
      winnerName: 'Mr. Rajesh Varma',
      department: 'Administration',
      ticketNumber: '5234',
      color: {
        card: 'border border-[#8B1E3F]/30',
        ribbon: 'bg-gradient-to-r from-[#8B1E3F] to-[#A61E3F] text-white',
        icon: 'bg-gradient-to-tr from-[#8B1E3F] to-[#A61E3F]',
        badge: 'bg-[#8B1E3F]/10 text-[#8B1E3F] border-[#8B1E3F]/20',
      },
      RankIcon: Trophy,
    },
  ];

  // Flower Petal Confetti
  const petalConfetti = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${(i * 3.4) % 100}%`,
    delay: (i * 0.15) % 3,
    duration: 3 + ((i % 4) * 0.7),
    size: 10 + (i % 3) * 5,
    color: i % 4 === 0 ? '#D4A017' : i % 4 === 1 ? '#8B1E3F' : i % 4 === 2 ? '#F59E0B' : '#0F5132',
  }));

  return (
    <section id="winners" className={cn('py-16 md:py-24 relative bg-[#FFF9F0] overflow-hidden', className)}>
      {/* Petal Confetti */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {petalConfetti.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{
              y: ['0vh', '105vh'],
              x: ['0px', `${(petal.id % 2 === 0 ? 28 : -28)}px`],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: petal.duration,
              repeat: Infinity,
              delay: petal.delay,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: petal.left,
              top: 0,
              width: `${petal.size}px`,
              height: `${petal.size * 0.7}px`,
              backgroundColor: petal.color,
              borderRadius: '50% 0 50% 50%',
              boxShadow: `0 0 6px ${petal.color}`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D4A017] animate-spin" />
            <span>OFFICIAL WINNER ANNOUNCEMENT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading">
            Ponnonam Grand Winners
          </h2>
          <p className="text-slate-500 text-sm font-sans">
            Congratulations to the lucky winners of Ponnonam 2026 Bumper Draw!
          </p>
        </div>

        {/* 3 Winner Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {winners.map((winner, idx) => {
            const RankIcon = winner.RankIcon;
            return (
              <motion.div
                key={winner.rank}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className={cn(
                  'bg-white rounded-[2rem] p-6 sm:p-8 relative overflow-hidden shadow-soft flex flex-col items-center text-center space-y-5 transition-all duration-300',
                  winner.color.card
                )}
              >
                {/* Top Kasavu Ribbon */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F5132] via-[#D4A017] to-[#8B1E3F]" />

                {/* Rank Ribbon Badge */}
                <div className="absolute top-4 right-4">
                  <span className={cn('px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest font-heading shadow-xs border', winner.color.ribbon)}>
                    {winner.ribbonText}
                  </span>
                </div>

                {/* Trophy Icon */}
                <div className={cn('w-16 h-16 rounded-full p-0.5 shadow-md flex items-center justify-center mt-2', winner.color.icon)}>
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                    <RankIcon className={cn('w-8 h-8', winner.rank === 1 ? 'text-[#D4A017] fill-[#D4A017]' : winner.rank === 2 ? 'text-slate-700' : 'text-[#8B1E3F]')} />
                  </div>
                </div>

                {/* Prize */}
                <div className="space-y-1">
                  <span className="text-3xl">{winner.prizeEmoji}</span>
                  <p className={cn('text-xl font-black font-heading', winner.rank === 1 ? 'text-[#D4A017]' : winner.rank === 2 ? 'text-slate-700' : 'text-[#8B1E3F]')}>
                    {winner.prize}
                  </p>
                </div>

                {/* Winner Info */}
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0F5132] shrink-0" />
                    <h3 className="text-base font-black text-[#0F5132] font-heading">{winner.winnerName}</h3>
                  </div>
                  <p className="text-xs text-slate-500 font-sans">{winner.department}</p>
                </div>

                {/* Ticket Number */}
                <div className="w-full p-3 rounded-2xl bg-[#FFF9F0] border border-amber-200/80 text-center">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block font-heading">
                    WINNING TICKET
                  </span>
                  <span className="text-lg font-black text-[#0F5132] font-heading tracking-widest mt-0.5 block">
                    {formatTicketId(winner.ticketNumber)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WinnerShowcase;
