import React from 'react';
import { Sparkles, MapPin, Phone, Mail, Heart, Share2, Globe, Send, MessageCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Elegant Minimal Onam Theme Footer Component
 * Sections: Quick Links, Contact, Social Media, Copyright
 * Display: Happy Onam, ഓണാശംസകൾ
 */
export const Footer = ({ className }) => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Register & Pay', href: '#register' },
  ];

  const socialLinks = [
    { label: 'Share', icon: Share2, href: '#' },
    { label: 'Website', icon: Globe, href: '#' },
    { label: 'WhatsApp', icon: MessageCircle, href: '#' },
    { label: 'Telegram', icon: Send, href: '#' },
  ];

  return (
    <footer className={cn('bg-[#0F5132] text-[#FFF9F0] relative overflow-hidden text-sm', className)}>
      {/* Top Kasavu Gold Decorative Ribbon */}
      <div className="h-1.5 bg-gradient-to-r from-[#E5B83B] via-[#D4A017] to-[#A67C0E] w-full" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-12">
        {/* Prominent Festive Greeting Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-[#0A3722] border border-[#D4A017]/35 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017]">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#D4A017] font-heading block">
                FESTIVAL GREETINGS
              </span>
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-black text-white font-heading">Happy Onam</span>
                <span className="text-2xl sm:text-3xl font-black text-[#D4A017] font-heading">ഓണാശംസകൾ</span>
              </div>
            </div>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-full bg-[#D4A017] text-[#0F5132] font-heading">
            THIRUVONAM 2026
          </span>
        </div>

        {/* 4 Column Minimal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pt-4">
          {/* Col 1: Brand & Festive Message */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#D4A017] to-[#E5B83B] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#0F5132] rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-[#D4A017]" />
                </div>
              </div>
              <span className="text-lg font-black text-white uppercase tracking-tight font-heading">
                ONAM DRAW 2026
              </span>
            </div>
            <p className="text-xs text-amber-100/75 leading-relaxed font-sans max-w-xs">
              Official Teachers & Staff Thiruvonam Lucky Draw. Celebrating togetherness with transparent digital prize distribution.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#D4A017] uppercase tracking-widest font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-amber-100/80">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:text-[#D4A017] transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#D4A017] uppercase tracking-widest font-heading">
              Contact Us
            </h4>
            <ul className="space-y-3 text-xs font-sans text-amber-100/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4A017] shrink-0 mt-0.5" />
                <span>DEPARTMENT OF EC</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>8157956164</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4A017] shrink-0" />
                <span>support@onamluckydraw2026.com</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Social Media */}
          <div className="space-y-4">
            <h4 className="text-xs font-black text-[#D4A017] uppercase tracking-widest font-heading">
              Social Media
            </h4>
            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((item) => {
                const SocialIcon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="p-3 rounded-2xl bg-[#0A3722] border border-[#D4A017]/30 text-[#D4A017] hover:bg-[#D4A017] hover:text-[#0F5132] transition-colors shadow-xs"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p className="text-[11px] text-amber-200/60 font-sans pt-1">
              Follow our official channels for live draw announcements.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 border-t border-[#167448] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200/70 font-sans">
          <p>© 2026 Onam Lucky Draw Secretariat. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-[#8B1E3F] fill-[#8B1E3F] inline" /> for DEPARTMENT OF EC PONNONAM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
