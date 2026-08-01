import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Ticket, Trophy, ArrowRight, Star } from 'lucide-react';
import { Button } from '../Button';
import { Countdown } from '../Countdown';
import { cn } from '../../utils/cn';

/**
 * Premium Responsive Hero Section - Onam Lucky Draw 2026
 */
export const Hero = ({ className }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="home" className={cn('relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden bg-[#FFF9F0]', className)}>
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/3 w-[36rem] h-[36rem] bg-[#D4A017]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#0F5132]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-10 w-72 h-72 bg-[#8B1E3F]/08 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Top Split Layout: Left Text & Right Illustration */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Top Festive Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading shadow-xs">
              <Sparkles className="w-4 h-4 text-[#D4A017] animate-spin" />
              <span>DEPARTMENT OF EC</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1 className="text-4xl sm:text-6xl lg:text-6xl font-black text-[#0F5132] tracking-tight leading-[1.08] font-heading">
                ONAM LUCKY DRAW <br />
                <span className="text-gold-gradient drop-shadow-xs">2026</span>
              </h1>
            </motion.div>

            {/* Subheading Block */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight font-heading">
                Celebrate Onam Together
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <span className="px-3.5 py-1 rounded-xl bg-[#8B1E3F] text-white text-xs font-bold uppercase tracking-wider shadow-sm font-heading">
                  Teachers & Staff Only
                </span>
                <span className="px-3.5 py-1 rounded-xl bg-[#0F5132] text-[#FFF9F0] text-xs font-bold uppercase tracking-wider shadow-sm font-heading">
                  Participate for just ₹150
                </span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2 font-sans max-w-xl">
                Join the official College Onam celebration! Win exciting prizes and live digital lucky draw.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a href="#register">
                <Button variant="primary" size="lg" leftIcon={Ticket} rightIcon={ArrowRight} className="w-full sm:w-auto shadow-md">
                  Register & Pay ₹150
                </Button>
              </a>
              <a href="#prizes">
                <Button variant="secondary" size="lg" leftIcon={Trophy} className="w-full sm:w-auto shadow-md">
                  View Prizes
                </Button>
              </a>
            </motion.div>

            {/* Countdown Component Integration */}
            <motion.div variants={itemVariants} className="pt-2">
              <Countdown title="Registration Closes & Live Draw Begins In" targetDate="2026-08-28T17:00:00+05:30" />
            </motion.div>
          </div>

          {/* Right Column: Beautiful Onam Illustration Placeholder */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* Animated Floating Card Frame */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative w-full max-w-md bg-white p-4 rounded-[2.5rem] border-2 border-[#D4A017]/40 shadow-soft-lg overflow-hidden group"
            >
              {/* Illustration Image */}
              <div className="relative rounded-[2rem] overflow-hidden aspect-square border border-amber-100 bg-[#FFF9F0]">
                <img
                  src="/onam_hero_illustration.jpg"
                  alt="Onam Festival Celebration Illustration"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Ambient Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F5132]/80 via-transparent to-transparent opacity-60" />

                {/* Floating Glassmorphism Badge on Image */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-3.5 border border-[#D4A017]/40 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#0F5132] text-[#D4A017]">
                      <Star className="w-5 h-5 fill-[#D4A017]" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 block font-heading">Onam Lucky Draw 2026</span>
                      <span className="text-[10px] text-slate-500 font-semibold font-sans">Live Staff Draw</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-[#0F5132] bg-[#0F5132]/10 px-2.5 py-1 rounded-lg border border-[#0F5132]/20 font-heading">
                    ₹150 Entry
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
