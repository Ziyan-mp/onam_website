import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Premium Non-Interactive Payment Processing Modal Page Component
 */
export const PaymentProcessing = ({
  isOpen = true,
  amount = 150,
  participantName = 'Prof. Staff Member',
  onComplete,
  className,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const processingSteps = [
    'Connecting to Secure Razorpay Gateway...',
    'Encrypting Staff Verification Credentials...',
    'Confirming ₹150 Entry Payment...',
    'Generating Digital QR Ticket...',
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Advance steps automatically
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isOpen, onComplete]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 z-50 bg-[#0F5132]/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-hidden select-none pointer-events-auto cursor-wait',
            className
          )}
          // Block user interactions
          onClick={(e) => e.stopPropagation()}
        >
          {/* Ambient Decorative Glow Background Orbs */}
          <div className="absolute w-[30rem] h-[30rem] bg-[#D4A017]/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          {/* Central Card Container */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-md w-full bg-[#0A3722] border-2 border-[#D4A017]/50 rounded-[2.5rem] p-8 text-center shadow-soft-lg space-y-8 overflow-hidden z-10"
          >
            {/* Top Kasavu Ribbon Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#E5B83B] via-[#D4A017] to-[#A67C0E]" />

            {/* Premium Animated Spinner Graphics */}
            <div className="relative flex items-center justify-center py-4">
              {/* Outer Golden Rotating Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                className="w-32 h-32 rounded-full border-4 border-dashed border-[#D4A017]/40 border-t-[#D4A017]"
              />

              {/* Inner Reverse Spinner */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute w-24 h-24 rounded-full border-4 border-transparent border-t-white border-r-white/60"
              />

              {/* Central Glowing Sparkle Emblem */}
              <div className="absolute w-16 h-16 rounded-2xl bg-[#0F5132] border border-[#D4A017] flex items-center justify-center shadow-md">
                <Sparkles className="w-8 h-8 text-[#D4A017] animate-pulse" />
              </div>
            </div>

            {/* Main Header Text */}
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
                Processing Payment...
              </h2>
              <p className="text-xs text-amber-100/80 font-sans">
                Please do not refresh or close this browser window.
              </p>
            </div>

            {/* Dynamic Step Status Display */}
            <div className="p-4 rounded-2xl bg-[#0F5132] border border-[#D4A017]/30 space-y-2 text-xs font-heading">
              <div className="flex items-center justify-center gap-2 text-[#D4A017] font-bold">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <ShieldCheck className="w-4 h-4" />
                </motion.div>
                <span>{processingSteps[currentStep]}</span>
              </div>
            </div>

            {/* Security Guarantee Footer */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-amber-200/70 font-sans border-t border-[#167448]">
              <span className="flex items-center gap-1 font-bold text-[#D4A017] font-heading">
                <Lock className="w-3 h-3" /> Razorpay 256-Bit SSL
              </span>
              <span>₹{amount}.00 Authorized</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentProcessing;
