import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sparkles, Compass } from 'lucide-react';
import { Button } from '../components/Button';

/**
 * Minimal Beautiful 404 Page - Onam Theme
 */
export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#FFF9F0] flex flex-col items-center justify-center p-6 text-center relative overflow-hidden select-none">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#D4A017]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#0F5132]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-8">
        {/* Onam Illustration Badge Container */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative inline-block"
        >
          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-[2.5rem] bg-white p-2.5 border-2 border-[#D4A017]/50 shadow-soft-lg overflow-hidden mx-auto">
            <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
              <img
                src="/onam_hero_illustration.jpg"
                alt="Onam Festival Illustration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F5132]/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span className="text-[10px] font-black uppercase text-amber-200 tracking-widest font-heading">
                  OFFICIAL FESTIVAL PORTAL
                </span>
              </div>
            </div>
          </div>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-2 -right-2 p-2.5 rounded-2xl bg-[#0F5132] text-[#D4A017] border border-[#D4A017] shadow-md"
          >
            <Compass className="w-5 h-5" />
          </motion.div>
        </motion.div>

        {/* 404 Heading & Minimal Messaging */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          <span className="text-6xl sm:text-7xl font-black text-[#0F5132] font-heading tracking-tight drop-shadow-xs">
            404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
            Page Not Found
          </h1>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans max-w-sm mx-auto">
            Oops! The page you are looking for seems to have taken a festive Onam break or does not exist.
          </p>
        </motion.div>

        {/* Return Home Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-2"
        >
          <a href="/">
            <Button
              variant="primary"
              size="lg"
              leftIcon={Home}
              className="px-8 py-3.5 shadow-md font-heading text-sm"
            >
              Return Home
            </Button>
          </a>
        </motion.div>

        {/* Minimal Footer */}
        <p className="text-[11px] text-slate-400 font-sans pt-4">
          Onam Lucky Draw 2026 • Official College Festival Portal
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
