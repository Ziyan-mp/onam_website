import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CreditCard, Ticket, Clock, PlayCircle, Trophy, ArrowDown, Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useSettings } from '../../context/SettingsContext';

/**
 * Beautiful How It Works Timeline Component - 6 Step Process
 */
export const Timeline = ({ className }) => {
  const { settings } = useSettings();
  const steps = [
    {
      step: 1,
      title: 'Register',
      subtitle: 'Fill Staff Details',
      description: 'Enter your name, department, phone number, and email to start registration.',
      icon: UserPlus,
      color: 'bg-[#0F5132] text-white border-[#0F5132]',
      accentColor: 'text-[#0F5132]',
    },
    {
      step: 2,
      title: `Pay ₹${settings?.entryFee || 150}`,
      subtitle: 'UPI Payment',
      description: `Complete the ₹${settings?.entryFee || 150} entry fee payment via UPI.`,
      icon: CreditCard,
      color: 'bg-[#D4A017] text-[#0F5132] border-[#D4A017]',
      accentColor: 'text-[#D4A017]',
    },
    {
      step: 3,
      title: 'Receive Ticket',
      subtitle: 'Download Ticket',
      description: 'Get your digital ticket and download it.',
      icon: Ticket,
      color: 'bg-[#0F5132] text-white border-[#0F5132]',
      accentColor: 'text-[#0F5132]',
    },
    {
      step: 4,
      title: 'Winner Announcement',
      subtitle: 'Prizes & Rewards',
      description: 'Winner will be announced soon.',
      icon: Trophy,
      color: 'bg-[#D4A017] text-[#0F5132] border-[#D4A017]',
      accentColor: 'text-[#D4A017]',
    },
  ];

  return (
    <section id="process" className={cn('py-20 md:py-28 relative bg-[#FFF9F0] overflow-hidden', className)}>
      {/* Background Decorative Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#0F5132]/08 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading"
          >
            <Sparkles className="w-4 h-4 text-[#D4A017] animate-spin" />
            <span>SIMPLE & TRANSPARENT STEPS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading"
          >
            How It Works
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans"
          >
            Participating in the {settings?.eventName || 'Lucky Draw'} is fast and simple. Follow our 4-step journey from registration to winner declaration!
          </motion.p>
        </div>

        {/* Vertical Animated Timeline Flow */}
        <div className="relative">
          {/* Central Vertical Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-10 bottom-10 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#0F5132] via-[#D4A017] to-[#8B1E3F] rounded-full opacity-30" />

          <div className="space-y-12 md:space-y-16">
            {steps.map((item, idx) => {
              const IconComp = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div key={item.step} className="relative flex flex-col items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className={cn(
                      'w-full grid grid-cols-1 md:grid-cols-11 items-center gap-6 md:gap-0',
                      isEven ? 'md:text-right' : 'md:text-left'
                    )}
                  >
                    {/* Content Column 1 */}
                    <div className={cn('md:col-span-5', isEven ? 'md:order-1' : 'md:order-3')}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft transition-all duration-300 hover:border-[#D4A017]/60 hover:shadow-soft-lg"
                      >
                        <div className="flex items-center gap-2 mb-2 justify-start md:justify-inherit">
                          <span className="text-xs font-black uppercase tracking-widest text-[#0F5132] bg-[#0F5132]/10 px-3 py-0.5 rounded-full border border-[#0F5132]/20 font-heading">
                            STEP {item.step}
                          </span>
                          <span className="text-xs font-bold text-slate-500 font-sans">
                            {item.subtitle}
                          </span>
                        </div>

                        <h3 className="text-xl font-extrabold text-slate-800 mb-2 font-heading">
                          {item.title}
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed font-sans">
                          {item.description}
                        </p>
                      </motion.div>
                    </div>

                    {/* Central Icon Step Node */}
                    <div className="md:col-span-1 flex flex-col items-center justify-center md:order-2 z-10">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className={cn(
                          'w-14 h-14 rounded-2xl flex items-center justify-center shadow-md border-2 transition-transform duration-300 font-heading text-lg font-black',
                          item.color
                        )}
                      >
                        <IconComp className="w-7 h-7" />
                      </motion.div>
                    </div>

                    {/* Empty Opposite Column for Desktop Alignment */}
                    <div className={cn('hidden md:block md:col-span-5', isEven ? 'md:order-3' : 'md:order-1')} />
                  </motion.div>

                  {/* Downward Arrow Connector between steps */}
                  {idx < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                      className="my-3 text-[#D4A017] animate-bounce"
                    >
                      <ArrowDown className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
