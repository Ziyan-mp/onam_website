import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Reusable Modal Dialog - Elegant Onam Theme
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  className,
  maxWidth = 'max-w-lg',
}) => {
  // ESC key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
          />

          {/* Modal Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn(
              'relative w-full bg-white border border-[#D4A017]/40 rounded-[2rem] shadow-soft-lg p-7 z-10 overflow-hidden text-slate-800',
              maxWidth,
              className
            )}
          >
            {/* Top decorative Kasavu line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F5132] via-[#D4A017] to-[#8B1E3F]" />

            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div>
                {title && <h3 className="text-xl font-bold text-[#0F5132] font-heading">{title}</h3>}
                {subtitle && <p className="text-xs text-slate-500 mt-0.5 font-sans">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-[#0F5132] p-2 rounded-xl hover:bg-[#FFF9F0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
