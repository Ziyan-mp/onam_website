import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { Timeline } from '../components/Timeline';
import { RegistrationForm } from '../components/RegistrationForm';
import { PrizeCard } from '../components/PrizeCard';
import { WinnerShowcase } from '../components/WinnerShowcase';
import { useSettings } from '../context/SettingsContext';

/**
 * HomePage Component
 */
export const HomePage = () => {
  const location = useLocation();
  const { settings } = useSettings();

  useEffect(() => {
    if (location.hash) {
      const timeout = setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  return (
    <div className="space-y-12 pb-16">
      {/* Premium Hero Section with Integrated Statistic Cards */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* 6-Step How It Works Timeline Flow */}
        <Timeline />

        {/* Professional Registration & Checkout Section */}
        <RegistrationForm />

        {/* Featured Premium Prizes Section */}
        <section id="prizes" className="space-y-10 py-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-black text-[#D4A017] uppercase tracking-widest font-heading px-4 py-1.5 rounded-full bg-[#D4A017]/10 border border-[#D4A017]/30 inline-block">
              EXCLUSIVE STAFF BUMPER REWARDS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] font-heading">
              {settings?.eventName ? `${settings.eventName} Prizes` : 'Bumper Prizes'}
            </h2>
            <p className="text-slate-600 text-sm font-sans">
              Participate for ₹{settings?.entryFee || 150} and stand a chance to win exciting prizes!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PrizeCard
              rank={1}
              title="Grand Bumper"
              subtitle="1st Bumper Winner"
              ribbonText="GRAND BUMPER"
              isFeatured
              perks={[
                '🏆 Smart Watch',
              ]}
            />

            <PrizeCard
              rank={2}
              title="Second Prize"
              subtitle="2nd Prize Winner"
              ribbonText="2ND BUMPER"
              perks={[
                '🔊 Bluetooth Speaker',
              ]}
            />

            <PrizeCard
              rank={3}
              title="Third Prize"
              subtitle="3rd Prize Winner"
              ribbonText="3RD BUMPER"
              perks={[
                '👘 Onakkodi',
              ]}
            />
          </div>
        </section>

        {/* Thiruvonam Grand Winner Showcase Section with Flower Petal Confetti */}
        <WinnerShowcase />
      </div>
    </div>
  );
};

export default HomePage;
