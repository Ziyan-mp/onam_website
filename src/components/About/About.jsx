import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, QrCode, Shuffle, Trophy, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * About Section Component with Animated Icon Cards
 */
export const About = ({ className }) => {
  const cards = [
    {
      id: 'razorpay',
      title: 'Secure Razorpay Payment',
      description: '100% encrypted & instant checkout supporting UPI, GPay, PhonePe, NetBanking, and Cards with instant digital receipts.',
      icon: CreditCard,
      badge: 'ENCRYPTED',
      color: {
        bg: 'bg-[#0F5132]/10',
        text: 'text-[#0F5132]',
        border: 'border-[#0F5132]/20',
      },
    },
    {
      id: 'digital-ticket',
      title: 'Digital Ticket',
      description: 'Instant SMS & Email delivery containing your unique ticket code, QR code verification stub, and official transaction proof.',
      icon: QrCode,
      badge: 'INSTANT QR',
      color: {
        bg: 'bg-[#D4A017]/15',
        text: 'text-[#D4A017]',
        border: 'border-[#D4A017]/35',
      },
    },
    {
      id: 'random-winner',
      title: 'Random Winner',
      description: 'Certified automated Random Number Generator (RNG) algorithm executed live during the draw for 100% un-biased transparency.',
      icon: Shuffle,
      badge: 'LIVE RNG',
      color: {
        bg: 'bg-[#8B1E3F]/10',
        text: 'text-[#8B1E3F]',
        border: 'border-[#8B1E3F]/25',
      },
    },
    {
      id: 'premium-prizes',
      title: 'Premium Prizes',
      description: 'Guaranteed ₹1,00,000+ grand bumper pool including cash rewards, gold sovereigns, and festive Onam gift hampers.',
      icon: Trophy,
      badge: '100+ WINNERS',
      color: {
        bg: 'bg-[#0F5132]/10',
        text: 'text-[#0F5132]',
        border: 'border-[#0F5132]/20',
      },
    },
  ];

  return (
    <section id="about" className={cn('py-20 md:py-28 relative bg-[#FFF9F0] overflow-hidden', className)}>
      {/* Background Decorative Accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#0F5132]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        {/* Section Header & Description */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading"
          >
            <ShieldCheck className="w-4 h-4 text-[#D4A017]" />
            <span>TRANSPARENT & EXCLUSIVE STAFF EVENT</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight leading-tight font-heading"
          >
            About Onam Lucky Draw 2026
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans"
          >
            Organized exclusively for college teachers and staff members to celebrate Thiruvonam with joy! Experience a modern, digital, and completely transparent lucky draw backed by instant verification and automated prize allocation.
          </motion.p>
        </div>

        {/* Four Animated Icon Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card, idx) => {
            const IconComp = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.12, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white rounded-3xl p-7 border border-amber-200/90 shadow-soft flex flex-col justify-between overflow-hidden hover:border-[#D4A017]/70 hover:shadow-soft-lg transition-all duration-300"
              >
                {/* Top Badge & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn('p-3.5 rounded-2xl border transition-transform duration-300 group-hover:scale-110 shadow-xs', card.color.bg, card.color.text, card.color.border)}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className={cn('text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border font-heading', card.color.bg, card.color.text, card.color.border)}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 font-heading group-hover:text-[#0F5132] transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
                    {card.description}
                  </p>
                </div>

                {/* Card Footer Checkmark Accent */}
                <div className="pt-6 mt-6 border-t border-amber-100/80 flex items-center gap-2 text-[11px] font-bold text-[#0F5132] font-heading">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A017]" />
                  <span>Verified Feature</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
