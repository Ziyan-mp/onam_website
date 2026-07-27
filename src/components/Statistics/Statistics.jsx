import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Target, Calendar, Users, Sparkles, Activity } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Four Beautiful Statistic Cards Component
 * Cards:
 * 1. Entry Fee -> ₹150
 * 2. Target Amount -> Set by Admin
 * 3. Draw Date -> Set by Admin
 * 4. Participants -> Live Count
 */
export const Statistics = ({
  entryFee = '₹150',
  targetAmount = 'Set by Admin',
  drawDate = 'Set by Admin',
  participantCount = 'Live Count',
  className,
}) => {
  const cards = [
    {
      id: 'entry-fee',
      title: 'Entry Fee',
      value: entryFee,
      description: 'Single Ticket Registration',
      icon: Ticket,
      badge: 'AFFORDABLE',
      color: {
        bg: 'bg-[#0F5132]/10',
        text: 'text-[#0F5132]',
        border: 'border-[#0F5132]/25',
        hoverBorder: 'group-hover:border-[#0F5132]',
        glow: 'group-hover:shadow-emerald-glow',
      },
    },
    {
      id: 'target-amount',
      title: 'Target Amount',
      value: targetAmount,
      description: 'Configured Prize Pool Goal',
      icon: Target,
      badge: 'ADMIN POOL',
      color: {
        bg: 'bg-[#D4A017]/15',
        text: 'text-[#D4A017]',
        border: 'border-[#D4A017]/35',
        hoverBorder: 'group-hover:border-[#D4A017]',
        glow: 'group-hover:shadow-gold-glow',
      },
    },
    {
      id: 'draw-date',
      title: 'Draw Date',
      value: drawDate,
      description: 'Official Live Event Schedule',
      icon: Calendar,
      badge: 'SCHEDULED',
      color: {
        bg: 'bg-[#8B1E3F]/10',
        text: 'text-[#8B1E3F]',
        border: 'border-[#8B1E3F]/25',
        hoverBorder: 'group-hover:border-[#8B1E3F]',
        glow: 'group-hover:shadow-md',
      },
    },
    {
      id: 'participants',
      title: 'Participants',
      value: participantCount,
      description: 'Active Staff Registrations',
      icon: Users,
      badge: 'LIVE',
      isLive: true,
      color: {
        bg: 'bg-[#0F5132]/10',
        text: 'text-[#0F5132]',
        border: 'border-[#0F5132]/25',
        hoverBorder: 'group-hover:border-[#0F5132]',
        glow: 'group-hover:shadow-emerald-glow',
      },
    },
  ];

  return (
    <section id="stats" className={cn('w-full py-6', className)}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const IconComponent = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={cn(
                'group relative bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-amber-200/90 shadow-soft transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer',
                card.color.glow
              )}
            >
              {/* Top Row: Icon & Badge */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={cn(
                    'p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110 shadow-xs',
                    card.color.bg,
                    card.color.text,
                    card.color.border
                  )}
                >
                  <IconComponent className="w-6 h-6" />
                </div>

                <div className="flex items-center gap-1.5">
                  {card.isLive && (
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F5132] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0F5132]"></span>
                    </span>
                  )}
                  <span
                    className={cn(
                      'text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border font-heading',
                      card.color.bg,
                      card.color.text,
                      card.color.border
                    )}
                  >
                    {card.badge}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="space-y-1">
                <span className="text-xs font-extrabold uppercase text-slate-500 tracking-wider block font-heading">
                  {card.title}
                </span>

                <h3 className="text-2xl sm:text-3xl font-black text-[#0F5132] tracking-tight font-heading group-hover:text-amber-600 transition-colors">
                  {card.value}
                </h3>

                <p className="text-xs text-slate-500 pt-1 font-sans flex items-center gap-1">
                  <span>{card.description}</span>
                </p>
              </div>

              {/* Bottom Decorative Golden Accent Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4A017]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Statistics;
