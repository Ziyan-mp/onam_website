import React from 'react';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Timeline } from '../components/Timeline';
import { RegistrationForm } from '../components/RegistrationForm';
import { PrizeCard } from '../components/PrizeCard';
import { WinnerShowcase } from '../components/WinnerShowcase';
import { TicketVerification } from '../components/TicketVerification';
import { EventCard } from '../components/EventCard';
import { FAQ } from '../components/FAQ';

/**
 * HomePage Component
 */
export const HomePage = () => {
  return (
    <div className="space-y-12 pb-16">
      {/* Premium Hero Section with Integrated Statistic Cards */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* About Section explaining Lucky Draw & 4 Icon Cards */}
        <About />

        {/* 6-Step How It Works Timeline Flow */}
        <Timeline />

        {/* Professional Registration & Razorpay Checkout Section */}
        <RegistrationForm />
        
        {/* Featured Premium Prizes Section */}
        <section id="prizes" className="space-y-10 py-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#D4A017] uppercase tracking-widest font-heading px-4 py-1.5 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 inline-block">
              EXCLUSIVE STAFF BUMPER REWARDS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] font-heading">
              Thiruvonam Bumper Prizes
            </h2>
            <p className="text-slate-600 text-sm font-sans">
              Participate for ₹150 and stand a chance to win grand gold sovereigns, cash rewards, and luxury hampers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PrizeCard
              rank={1}
              title="Grand Thiruvonam Bumper"
              subtitle="1st Bumper Winner"
              amount={50000}
              ribbonText="GRAND BUMPER"
              isFeatured
              perks={[
                '1 Sovereign Gold Coin (8 Grams 916 BIS)',
                '₹50,000 Instant Cash Transfer',
                'Luxury Royal Festive Onam Hamper',
                'Official Winner Trophy & Certificate',
              ]}
            />

            <PrizeCard
              rank={2}
              title="Second Prize Sovereign"
              subtitle="2nd Prize Winner"
              amount={25000}
              ribbonText="2ND BUMPER"
              perks={[
                'Half Sovereign Gold Coin (4 Grams 916 BIS)',
                '₹25,000 Cash Reward Transfer',
                'Executive Festival Hamper Box',
                'Commemorative Silver Plaque',
              ]}
            />

            <PrizeCard
              rank={3}
              title="Third Prize Reward"
              subtitle="3rd Prize Winner"
              amount={15000}
              ribbonText="3RD BUMPER"
              perks={[
                '₹15,000 Instant Cash Reward',
                'Traditional Kerala Festive Hamper',
                'Official Winner Certificate',
                'Special Onam Gift Coupon',
              ]}
            />
          </div>
        </section>

        {/* Winner Showcase Section with Flower Petal Confetti */}
        <WinnerShowcase />

        {/* QR Code Ticket Verification Section */}
        <TicketVerification />

        {/* Event Schedule & Rules */}
        <section id="event-info">
          <EventCard />
        </section>

        {/* FAQ Accordion Section */}
        <section id="faq" className="max-w-3xl mx-auto space-y-8 py-6">
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-[#D4A017] uppercase tracking-widest font-heading px-4 py-1 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 inline-block">
              HELP & INFORMATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0F5132] font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-600 font-sans">
              Everything you need to know about participation, payment, digital tickets, and draw verification.
            </p>
          </div>
          <FAQ />
        </section>
      </div>
    </div>
  );
};

export default HomePage;
