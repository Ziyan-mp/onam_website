import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, GraduationCap, Ticket, Trophy, ShieldCheck, Home, ArrowRight, Sun, Moon } from 'lucide-react';
import { Button } from '../Button';
import { useTheme } from '../../context/ThemeContext';
import { cn } from '../../utils/cn';

/**
 * Responsive Navbar Component with Dark Mode Toggle
 */
export const Navbar = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: Home },
    { name: 'About', href: '#about', icon: Sparkles },
    { name: 'Process', href: '#process', icon: Ticket },
    { name: 'Bumper Prizes', href: '#prizes', icon: Trophy },
    { name: 'Verify Ticket', href: '#verify', icon: ShieldCheck },
    { name: 'FAQ', href: '#faq', icon: Sparkles },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 dark:bg-[#062617]/95 backdrop-blur-md shadow-soft border-b border-amber-200/60 dark:border-[#D4A017]/30 py-3'
          : 'bg-transparent py-5',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <a href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#D4A017] to-[#E5B83B] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#0F5132] rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A017] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-[#0F5132] dark:text-[#D4A017] uppercase font-heading">
                ONAM 2026
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#D4A017] text-[#0F5132] text-[9px] font-black uppercase font-heading shadow-xs">
                OFFICIAL
              </span>
            </div>
            <span className="text-[10px] font-extrabold text-slate-600 dark:text-amber-200/70 tracking-widest uppercase font-heading">
              COLLEGE OF ENGINEERING VADAKARA
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider font-heading">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-slate-700 dark:text-amber-100 hover:text-[#0F5132] dark:hover:text-[#D4A017] transition-colors relative py-1 group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A017] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Action CTA & Dark Mode Toggle */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode Theme"
            className="p-2.5 rounded-2xl bg-white dark:bg-[#0A3722] border border-amber-200 dark:border-[#D4A017]/40 text-[#0F5132] dark:text-[#D4A017] hover:scale-105 transition-all shadow-xs"
          >
            {isDark ? <Sun className="w-5 h-5 text-[#D4A017]" /> : <Moon className="w-5 h-5 text-[#0F5132]" />}
          </button>

          {/* Admin Login CTA Link */}
          <a href="/admin/login" className="hidden sm:inline-block">
            <Button variant="outline" size="sm" className="border-[#0F5132]/30 dark:border-[#D4A017]/40 text-[#0F5132] dark:text-[#D4A017] hover:bg-[#0F5132]/10">
              Admin Portal
            </Button>
          </a>

          {/* Participate Now CTA Button */}
          <a href="#register" className="hidden sm:inline-block">
            <Button variant="primary" size="sm" className="shadow-xs font-heading">
              Participate ₹150
            </Button>
          </a>

          {/* Mobile Navigation Drawer Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2.5 rounded-2xl bg-white dark:bg-[#0A3722] border border-amber-200 dark:border-[#D4A017]/40 text-slate-800 dark:text-white hover:text-[#0F5132] shadow-xs active:scale-95 transition-transform"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              className="fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-[#FFF9F0] dark:bg-[#0A3722] z-50 lg:hidden shadow-2xl flex flex-col justify-between p-6 border-l border-amber-200 dark:border-[#D4A017]/30"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-[#D4A017]/30 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#0F5132] text-[#D4A017] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-black text-[#0F5132] dark:text-[#D4A017] font-heading uppercase">Navigation</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-xl text-slate-500 hover:bg-amber-100/80 dark:hover:bg-[#0F5132]"
                  >
                    <X className="w-5 h-5 text-slate-700 dark:text-white" />
                  </button>
                </div>

                <nav className="space-y-2">
                  {navLinks.map((link) => {
                    const IconComp = link.icon;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between p-3 rounded-2xl text-xs font-black text-slate-800 dark:text-white uppercase tracking-wider font-heading hover:bg-[#0F5132]/10 dark:hover:bg-[#0F5132] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-xl bg-white dark:bg-[#0F5132] border border-amber-200/80 dark:border-[#D4A017]/30 text-[#0F5132] dark:text-[#D4A017]">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <span>{link.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              <div className="pt-6 border-t border-amber-200/80 dark:border-[#D4A017]/30 space-y-3">
                <a href="#register" onClick={() => setMobileMenuOpen(false)} className="block">
                  <Button variant="primary" size="md" className="w-full justify-center font-heading">
                    Participate Now (₹150)
                  </Button>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
