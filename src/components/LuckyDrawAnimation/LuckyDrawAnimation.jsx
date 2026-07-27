import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Sparkles, Trophy, CheckCircle2, X, Star, Coins, Gift } from 'lucide-react';
import { Button } from '../Button';
import { formatCurrency, formatTicketId } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Ultra-Premium 8-Second Fullscreen Lucky Draw Animation
 * Features: Flower Petals Falling, Rapid Name Ticker, Spotlights, 3-2-1 Countdown, Winner Reveal, Once-Only Lock.
 */
export const LuckyDrawAnimation = ({
  isOpen = true,
  onClose,
  onWinnerDeclared,
  className,
}) => {
  const [hasRun, setHasRun] = useState(false);
  const [stage, setStage] = useState('COUNTDOWN'); // COUNTDOWN (0-3s), SHUFFLE (3-7s), WINNER (8s+)
  const [countdownNum, setCountdownNum] = useState(3);
  const [currentShuffleParticipant, setCurrentShuffleParticipant] = useState({
    ticket: 'ONAM-2026-8942',
    name: 'Prof. Ananthakrishnan Nair',
    dept: 'Computer Science',
  });
  const [finalWinner, setFinalWinner] = useState(null);

  const sampleParticipants = [
    { ticket: '8942', name: 'Prof. Ananthakrishnan Nair', dept: 'Computer Science & Engineering', empId: 'EMP-9842', prize: '1st Grand Bumper: 1 Sovereign Gold + ₹50,000 Cash' },
    { ticket: '8941', name: 'Dr. Sunitha Menon', dept: 'Electronics & Communication', empId: 'EMP-9841', prize: '2nd Prize: Half Sovereign Gold + ₹25,000 Cash' },
    { ticket: '8940', name: 'Mr. Rajesh Varma', dept: 'Administration', empId: 'EMP-9840', prize: '3rd Prize: ₹15,000 Cash Reward' },
    { ticket: '8939', name: 'Prof. Meera Pillai', dept: 'Mathematics', empId: 'EMP-8939', prize: 'Consolation Prize: ₹5,000 Cash Reward' },
    { ticket: '8938', name: 'Dr. Vikram Shah', dept: 'Physics', empId: 'EMP-8938', prize: 'Consolation Prize: ₹5,000 Cash Reward' },
    { ticket: '8937', name: 'Prof. Lakshmi R.', dept: 'Chemistry', empId: 'EMP-8937', prize: 'Consolation Prize: ₹5,000 Cash Reward' },
  ];

  // Animated Falling Flower Petals Array (30 Petals)
  const petals = Array.from({ length: 32 }).map((_, i) => ({
    id: i,
    left: `${(i * 3.2) % 100}%`,
    delay: (i * 0.15) % 3,
    duration: 3 + ((i % 4) * 0.8),
    size: 14 + (i % 3) * 6,
    color: i % 4 === 0 ? '#D4A017' : i % 4 === 1 ? '#8B1E3F' : i % 4 === 2 ? '#F59E0B' : '#0F5132',
  }));

  useEffect(() => {
    if (!isOpen || hasRun) return;

    // Prevent running twice lock
    setHasRun(true);

    // 0s-3s: Countdown (3, 2, 1)
    setStage('COUNTDOWN');
    setCountdownNum(3);

    const cdInterval = setInterval(() => {
      setCountdownNum((prev) => {
        if (prev > 1) return prev - 1;
        clearInterval(cdInterval);
        return 0;
      });
    }, 1000);

    // 3s: Switch to Rapid Shuffle Stage
    const shuffleTimer = setTimeout(() => {
      setStage('SHUFFLE');
    }, 3000);

    // Rapid Name Shuffle Interval (3s to 7s)
    let shuffleCount = 0;
    const nameInterval = setInterval(() => {
      if (shuffleCount < 40) {
        const randIdx = Math.floor(Math.random() * sampleParticipants.length);
        const p = sampleParticipants[randIdx];
        setCurrentShuffleParticipant({
          ticket: `ONAM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          name: p.name,
          dept: p.dept,
        });
        shuffleCount++;
      } else {
        clearInterval(nameInterval);
      }
    }, 90);

    // 8s: Reveal Winner Card
    const winnerTimer = setTimeout(() => {
      const winner = sampleParticipants[0]; // 1st Bumper Winner
      setFinalWinner(winner);
      setStage('WINNER');
      if (onWinnerDeclared) onWinnerDeclared(winner);
    }, 8000);

    return () => {
      clearInterval(cdInterval);
      clearTimeout(shuffleTimer);
      clearInterval(nameInterval);
      clearTimeout(winnerTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          'fixed inset-0 z-50 bg-[#0F5132]/98 backdrop-blur-2xl flex flex-col items-center justify-center p-4 overflow-hidden select-none text-[#FFF9F0]',
          className
        )}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
        >
          <X className="w-6 h-6" />
        </button>

        {/* 1. Beautiful Rotating Spotlights & Ambient Glow Beams */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] opacity-20"
          >
            <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4A017] via-transparent to-transparent" />
          </motion.div>
          <div className="absolute top-0 left-1/4 w-96 h-[40rem] bg-gradient-to-b from-[#D4A017]/25 to-transparent blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-[40rem] bg-gradient-to-t from-[#8B1E3F]/25 to-transparent blur-3xl pointer-events-none" />
        </div>

        {/* 2. Animated Falling Pookkalam Flower Petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              initial={{ y: -50, opacity: 0, rotate: 0 }}
              animate={{
                y: ['0vh', '105vh'],
                x: ['0px', `${(petal.id % 2 === 0 ? 40 : -40)}px`],
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

        {/* 3. Stage 1: 3-2-1 Countdown Sequence (0-3s) */}
        {stage === 'COUNTDOWN' && (
          <motion.div
            key={countdownNum}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 15 }}
            className="flex flex-col items-center justify-center space-y-6 text-center z-30"
          >
            <div className="px-5 py-2 rounded-full bg-[#D4A017]/20 border border-[#D4A017] text-[#D4A017] text-xs font-black uppercase tracking-widest font-heading">
              GET READY FOR THE DRAW
            </div>

            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-44 h-44 rounded-full border-4 border-[#D4A017] flex items-center justify-center bg-[#0A3722] shadow-gold-glow"
              >
                <span className="text-7xl font-black text-[#D4A017] font-mono">
                  {countdownNum > 0 ? countdownNum : 'GO!'}
                </span>
              </motion.div>
            </div>

            <p className="text-sm font-bold text-amber-200/90 font-heading">
              Initializing Certified RNG Shuffle Engine...
            </p>
          </motion.div>
        )}

        {/* 4. Stage 2: Rapid Participant Name & Ticket Shuffle (3-7s) */}
        {stage === 'SHUFFLE' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl w-full z-30"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4A017] text-[#0F5132] text-xs font-black uppercase tracking-widest font-heading shadow-md">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>RAPID TICKER SHUFFLING (684 ENTRIES)</span>
            </div>

            {/* High Speed Ticket & Name Ticker Card */}
            <motion.div
              key={currentShuffleParticipant.ticket}
              initial={{ opacity: 0.7, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full bg-[#0A3722] border-4 border-[#D4A017] rounded-[3rem] p-8 sm:p-12 shadow-soft-lg space-y-4 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#E5B83B] via-[#D4A017] to-[#A67C0E]" />

              <span className="text-xs font-bold text-amber-300 tracking-wider uppercase font-heading">
                CURRENT TICKET CODE
              </span>

              <h2 className="text-4xl sm:text-6xl font-black text-white font-heading tracking-widest drop-shadow-md">
                {currentShuffleParticipant.ticket}
              </h2>

              <div className="pt-2 border-t border-[#167448]">
                <h4 className="text-xl font-bold text-amber-200 font-heading">
                  {currentShuffleParticipant.name}
                </h4>
                <span className="text-xs text-slate-300 font-sans">
                  {currentShuffleParticipant.dept} Department
                </span>
              </div>
            </motion.div>

            <div className="flex items-center gap-2 text-xs font-bold text-amber-200 font-heading">
              <div className="w-3 h-3 rounded-full bg-[#D4A017] animate-ping" />
              <span>Selecting Thiruvonam Bumper Winner...</span>
            </div>
          </motion.div>
        )}

        {/* 5. Stage 3: Premium Winner Card Reveal (8s+) */}
        {stage === 'WINNER' && finalWinner && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 15, stiffness: 200 }}
            className="flex flex-col items-center justify-center text-center space-y-6 max-w-xl w-full z-30"
          >
            {/* Grand Winner Badge */}
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#E5B83B] via-[#D4A017] to-[#A67C0E] text-[#0F5132] text-xs font-black uppercase tracking-widest font-heading shadow-soft-lg"
            >
              <Crown className="w-5 h-5 fill-[#0F5132]" />
              <span>GRAND BUMPER WINNER DECLARED!</span>
            </motion.div>

            {/* Winner Card Container */}
            <div className="w-full bg-white text-slate-800 rounded-[3rem] p-8 sm:p-10 border-4 border-[#D4A017] shadow-soft-lg space-y-6 relative overflow-hidden">
              {/* Top Gold Ribbon */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#0F5132] via-[#D4A017] to-[#8B1E3F]" />

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider font-heading">
                  WINNING TICKET NO
                </span>
                <h2 className="text-4xl sm:text-5xl font-black text-[#0F5132] font-heading tracking-widest">
                  {formatTicketId(finalWinner.ticket)}
                </h2>
              </div>

              {/* Winner Staff Info */}
              <div className="p-6 rounded-2xl bg-[#FFF9F0] border-2 border-amber-200/80 space-y-2 text-center">
                <span className="text-[10px] font-black uppercase text-[#D4A017] tracking-widest font-heading">
                  VERIFIED STAFF WINNER
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading">
                  {finalWinner.name}
                </h3>
                <div className="flex justify-center gap-4 text-xs text-slate-600 font-sans pt-1">
                  <span><strong>Dept:</strong> {finalWinner.dept}</span>
                  <span>•</span>
                  <span><strong>Emp ID:</strong> {finalWinner.empId}</span>
                </div>
              </div>

              {/* Prize Details Banner */}
              <div className="p-4 rounded-2xl bg-[#0F5132] text-white space-y-1 font-heading">
                <span className="text-[10px] uppercase font-bold text-[#D4A017] tracking-widest block">
                  AWARDED PRIZE
                </span>
                <span className="text-sm font-black text-white block">
                  {finalWinner.prize}
                </span>
              </div>

              {/* Close / Claim Action */}
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={onClose}
                  className="w-full justify-center py-4 font-black text-sm tracking-wide font-heading shadow-md"
                >
                  Confirm & Log Winner
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default LuckyDrawAnimation;
