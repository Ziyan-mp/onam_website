import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, GraduationCap, Ticket, Trophy, Star, Home, ArrowRight } from 'lucide-react';
import { Button } from '../Button';

import { cn } from '../../utils/cn';

/**
 * Responsive Navbar Component with Dark Mode Toggle
 */
export const Navbar = ({ className }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


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
    { name: 'Home', href: '/', icon: Home, isRoute: true },
    { name: 'How It Works', href: '/#process', icon: Ticket, isRoute: false },
    { name: 'Registration', href: '/#register', icon: Star, isRoute: false },
    { name: 'Bumper Prizes', href: '/#prizes', icon: Trophy, isRoute: false },
    { name: 'Winners', href: '/#winners', icon: Star, isRoute: false },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-[#0F5132] border-b border-[#D4A017]/30 py-3',
        isScrolled ? 'shadow-[0_4px_24px_rgba(15,81,50,0.4)]' : 'shadow-sm',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Emblem */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#D4A017] to-[#E5B83B] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#0F5132] rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4A017] group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-black tracking-tight text-white uppercase font-heading">
                PONNONAM
              </span>
              <span className="px-1.5 py-0.5 rounded bg-[#D4A017] text-[#0F5132] text-[9px] font-black uppercase font-heading shadow-xs">
                OFFICIAL
              </span>
            </div>
            <span className="text-[10px] font-extrabold text-amber-200/80 tracking-widest uppercase font-heading">
              DEPARTMENT OF EC
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-bold uppercase tracking-wider font-heading">
          {navLinks.map((link) => {
            if (link.isRoute) {
              return (
                <NavLink
                  key={link.name}
                  to={link.href}
                  end={link.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'text-white/80 hover:text-[#D4A017] transition-colors relative py-1 group',
                      isActive && 'text-[#D4A017] font-black'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>{link.name}</span>
                      <span
                        className={cn(
                          'absolute bottom-0 left-0 h-0.5 bg-[#D4A017] transition-all duration-300',
                          isActive ? 'w-full' : 'w-0 group-hover:w-full'
                        )}
                      />
                    </>
                  )}
                </NavLink>
              );
            }

            return (
              <Link
                key={link.name}
                to={link.href}
                className="text-white/80 hover:text-[#D4A017] transition-colors relative py-1 group"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4A017] transition-all duration-300 group-hover:w-full" />
              </Link>
            );
          })}
        </nav>

        {/* Right Action CTA & Dark Mode Toggle */}
        <div className="flex items-center gap-3">


          {/* Admin Login CTA Link */}
          <Link to="/admin/login" className="hidden sm:inline-block">
            <Button variant="outline" size="sm" className="border-[#D4A017]/60 text-[#D4A017] hover:bg-[#D4A017]/15 bg-transparent">
              Admin Portal
            </Button>
          </Link>


          {/* Mobile Navigation Drawer Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2.5 rounded-2xl bg-[#0A3722] border border-[#D4A017]/40 text-white hover:text-[#D4A017] shadow-xs active:scale-95 transition-transform"
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
              className="fixed top-0 bottom-0 right-0 w-80 max-w-[85vw] bg-[#FFF9F0] dark:bg-[#0A3722] z-50 lg:hidden shadow-2xl flex flex-col p-6 border-l border-amber-200 dark:border-[#D4A017]/30"
            >
              <div className="flex items-center justify-between border-b border-amber-200/80 dark:border-[#D4A017]/30 pb-4 mb-6 shrink-0">
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

              <nav className="space-y-2 flex-1 overflow-y-auto min-h-0 pr-2">
                  {navLinks.map((link) => {
                    const IconComp = link.icon;
                    if (link.isRoute) {
                      return (
                        <NavLink
                          key={link.name}
                          to={link.href}
                          end={link.href === '/'}
                          onClick={() => setMobileMenuOpen(false)}
                          className={({ isActive }) =>
                            cn(
                              'flex items-center justify-between p-3 rounded-2xl text-xs font-black uppercase tracking-wider font-heading transition-colors',
                              isActive
                                ? 'bg-[#0F5132] text-white dark:bg-[#0F5132]'
                                : 'text-slate-800 dark:text-white hover:bg-[#0F5132]/10 dark:hover:bg-[#0F5132]'
                            )
                          }
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-white dark:bg-[#0F5132] border border-amber-200/80 dark:border-[#D4A017]/30 text-[#0F5132] dark:text-[#D4A017]">
                              <IconComp className="w-4 h-4" />
                            </div>
                            <span>{link.name}</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400" />
                        </NavLink>
                      );
                    }

                    return (
                      <Link
                        key={link.name}
                        to={link.href}
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
                      </Link>
                    );
                  })}
              </nav>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
