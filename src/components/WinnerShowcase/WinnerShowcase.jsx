import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Crown, Sparkles, Download, CheckCircle2, Award, Coins, GraduationCap } from 'lucide-react';
import { Button } from '../Button';
import { formatCurrency, formatTicketId } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Premium Winner Showcase Component with Flower Petal Confetti & Download Certificate
 */
export const WinnerShowcase = ({
  winnerName = 'Prof. Ananthakrishnan Nair',
  department = 'Computer Science & Engineering',
  ticketNumber = '8942',
  prize = '1st Bumper: 1 Sovereign Gold Coin (8g) + ₹50,000 Cash Reward',
  winnerImage = '/onam_hero_illustration.jpg',
  className,
}) => {
  // Flower Petal Confetti Array (36 Particles)
  const petalConfetti = Array.from({ length: 36 }).map((_, i) => ({
    id: i,
    left: `${(i * 2.8) % 100}%`,
    delay: (i * 0.12) % 3,
    duration: 3 + ((i % 4) * 0.7),
    size: 12 + (i % 3) * 6,
    color: i % 4 === 0 ? '#D4A017' : i % 4 === 1 ? '#8B1E3F' : i % 4 === 2 ? '#F59E0B' : '#0F5132',
  }));

  const handleDownloadCertificate = () => {
    window.print();
  };

  return (
    <section id="winners" className={cn('py-16 md:py-24 relative bg-[#FFF9F0] overflow-hidden', className)}>
      {/* 1. Flower Petal Confetti Particle Shower */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {petalConfetti.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{
              y: ['0vh', '105vh'],
              x: ['0px', `${(petal.id % 2 === 0 ? 30 : -30)}px`],
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
              boxShadow: `0 0 8px ${petal.color}`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center space-y-10">
        {/* Section Header */}
        <div className="space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading shadow-xs">
            <Sparkles className="w-4 h-4 text-[#D4A017] animate-spin" />
            <span>OFFICIAL WINNER ANNOUNCEMENT</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading">
            Thiruvonam Grand Winner
          </h2>
        </div>

        {/* Large Trophy Graphic */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="relative inline-flex items-center justify-center py-2"
        >
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#D4A017] via-[#E5B83B] to-[#A67C0E] p-1 shadow-soft-lg flex items-center justify-center">
            <div className="w-full h-full bg-[#0F5132] rounded-full flex items-center justify-center border-4 border-white">
              <Trophy className="w-16 h-16 sm:w-20 sm:h-20 text-[#D4A017]" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 p-2.5 rounded-full bg-[#8B1E3F] text-white shadow-md">
            <Crown className="w-6 h-6 fill-[#D4A017]" />
          </div>
        </motion.div>

        {/* Main Winner Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[2.5rem] p-8 sm:p-12 border-2 border-[#D4A017] shadow-soft-lg space-y-8 relative overflow-hidden text-slate-800"
        >
          {/* Top Kasavu Ribbon Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0F5132] via-[#D4A017] to-[#8B1E3F]" />

          {/* Winner Image & Name Section */}
          <div className="flex flex-col items-center space-y-4">
            {/* Winner Image Placeholder */}
            <div className="relative">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#0F5132] to-[#D4A017] shadow-soft-lg overflow-hidden">
                <img
                  src={winnerImage}
                  alt={winnerName}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#0F5132] text-white border-2 border-white shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#D4A017]" />
              </div>
            </div>

            {/* Winner Name & Department */}
            <div>
              <h3 className="text-2xl sm:text-4xl font-black text-[#0F5132] font-heading">
                {winnerName}
              </h3>
              <p className="text-sm font-extrabold text-slate-700 font-heading mt-1">
                {department} Department
              </p>
            </div>
          </div>

          {/* Ticket Number & Awarded Prize Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-200/90 text-center">
              <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block font-heading">
                WINNING TICKET NUMBER
              </span>
              <span className="text-2xl font-black text-[#0F5132] font-heading tracking-widest mt-0.5 block">
                {formatTicketId(ticketNumber)}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F5132] text-white text-center flex flex-col justify-center">
              <span className="text-[10px] font-black uppercase text-[#D4A017] tracking-widest block font-heading">
                AWARDED BUMPER PRIZE
              </span>
              <span className="text-sm font-black text-white font-heading mt-0.5 block">
                {prize}
              </span>
            </div>
          </div>

          {/* Download Certificate CTA Button */}
          <div className="pt-4 border-t border-amber-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              leftIcon={Download}
              onClick={handleDownloadCertificate}
              className="w-full sm:w-auto shadow-md"
            >
              Download Winner Certificate
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WinnerShowcase;
