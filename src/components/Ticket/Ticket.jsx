import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, QrCode, Sparkles, CheckCircle2, ShieldCheck, Download, Printer, Coins, Calendar, Building2, IdCard, User } from 'lucide-react';
import { Button } from '../Button';
import { formatTicketId, formatDate, formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Ultra-Premium Digital Boarding Pass Ticket Component
 */
export const Ticket = ({
  ticketNumber = '8942',
  participantName = 'Prof. Ananthakrishnan Nair',
  department = 'Computer Science & Engineering',
  paymentId = 'PAY-RZP-89420',
  amount = 150,
  drawDate = '2026-08-28T17:00:00+05:30',
  className,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedTicketCode = formatTicketId(ticketNumber);

  return (
    <div className={cn('w-full max-w-4xl mx-auto space-y-6', className)}>
      {/* Boarding Pass Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        whileHover={{ y: -4 }}
        className="relative bg-white rounded-[2.5rem] border-2 border-[#D4A017] shadow-soft-lg overflow-hidden text-slate-800 flex flex-col md:flex-row cursor-pointer"
      >
        {/* Pookkalam Background Watermark SVG */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-center overflow-hidden">
          <svg width="600" height="600" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="90" stroke="#0F5132" strokeWidth="4" strokeDasharray="6 6" />
            <circle cx="100" cy="100" r="70" stroke="#D4A017" strokeWidth="3" />
            <circle cx="100" cy="100" r="50" stroke="#8B1E3F" strokeWidth="3" />
            <path d="M100 10 L115 50 L155 50 L125 75 L135 115 L100 90 L65 115 L75 75 L45 50 L85 50 Z" fill="#D4A017" />
          </svg>
        </div>

        {/* Left & Right Perforated Circle Notch Cutouts */}
        <div className="hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFF9F0] border-2 border-[#D4A017] z-20" />
        <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#FFF9F0] border-2 border-[#D4A017] z-20" />

        {/* Left Main Boarding Pass Body (70% Width) */}
        <div className="flex-1 p-6 sm:p-8 space-y-6 relative z-10">
          {/* Top Header Row: College Logo Crest & Event Title */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-200/80 pb-5">
            <div className="flex items-center gap-3">
              {/* College Logo Crest */}
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#0F5132] via-[#167448] to-[#D4A017] p-0.5 shadow-md">
                <div className="w-full h-full bg-[#FFF9F0] rounded-[14px] flex items-center justify-center relative">
                  <GraduationCap className="w-6 h-6 text-[#0F5132]" />
                  <Sparkles className="w-3 h-3 text-[#D4A017] absolute top-1 right-1 animate-pulse" />
                </div>
              </div>
              <div>
                <span className="text-xs font-black uppercase text-slate-500 tracking-widest block font-heading">
                  COLLEGE OF ENGINEERING VADAKARA
                </span>
                <h3 className="text-lg sm:text-xl font-black text-[#0F5132] font-heading leading-tight">
                  Onam Lucky Draw 2026
                </h3>
              </div>
            </div>

            {/* Badges: Verified & Paid */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0F5132]/10 text-[#0F5132] border border-[#0F5132]/30 flex items-center gap-1 font-heading">
                <ShieldCheck className="w-3.5 h-3.5" /> VERIFIED BADGE
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D4A017] text-[#0F5132] font-heading shadow-xs">
                PAID ₹{amount}
              </span>
            </div>
          </div>

          {/* Ticket Code Highlight Banner */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-[#FFF9F0] border border-[#D4A017]/40 shadow-xs">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block font-heading">
                BOARDING PASS TICKET NO
              </span>
              <span className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading tracking-widest">
                {formattedTicketCode}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider block font-heading">
                DRAW DATE
              </span>
              <span className="text-xs font-black text-[#8B1E3F] font-heading">
                {formatDate(drawDate)}
              </span>
            </div>
          </div>

          {/* Grid 5 Passenger Info Details */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-sans">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                PASSENGER / HOLDER
              </span>
              <span className="font-extrabold text-slate-800 mt-0.5 block truncate">{participantName}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                DEPARTMENT
              </span>
              <span className="font-extrabold text-slate-800 mt-0.5 block truncate">{department}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                PAYMENT ID
              </span>
              <span className="font-extrabold text-slate-800 mt-0.5 block font-mono truncate">{paymentId}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                ENTRY FEE
              </span>
              <span className="font-extrabold text-[#0F5132] mt-0.5 block">{formatCurrency(amount)}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                EVENT STATUS
              </span>
              <span className="font-extrabold text-[#0F5132] mt-0.5 block">CONFIRMED</span>
            </div>
          </div>

          {/* Bottom Barcode */}
          <div className="pt-2 flex flex-col items-center justify-center border-t border-slate-200">
            {/* SVG Barcode Graphic */}
            <div className="h-10 w-full max-w-sm flex items-center justify-between px-2 bg-slate-100 rounded-lg py-1 border border-slate-200">
              {Array.from({ length: 48 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate-900 h-full rounded-xs"
                  style={{ width: `${(i % 3 === 0 ? 3 : i % 2 === 0 ? 1.5 : 2)}px` }}
                />
              ))}
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-bold tracking-widest mt-1">
              * {formattedTicketCode} *
            </span>
          </div>
        </div>

        {/* Vertical Dashed Perforation Divider */}
        <div className="hidden md:block w-px border-r-2 border-dashed border-[#D4A017]/60 relative z-20" />

        {/* Right Stub Area (30% Width) */}
        <div className="w-full md:w-72 bg-[#FFF9F0] p-6 sm:p-8 flex flex-col items-center justify-between text-center relative z-10 border-t-2 md:border-t-0 border-dashed border-[#D4A017]/50 space-y-4">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-[#0F5132] tracking-widest font-heading block">
              BOARDING PASS STUB
            </span>
            <span className="text-xs font-bold text-slate-600 block font-heading">
              SCAN QR TO VERIFY
            </span>
          </div>

          {/* QR Code Graphic Box */}
          <div className="p-4 bg-white rounded-2xl border-2 border-[#D4A017]/40 shadow-sm flex flex-col items-center justify-center">
            <QrCode className="w-28 h-28 text-[#0F5132]" />
            <span className="text-[9px] font-mono text-slate-500 font-bold tracking-wider mt-2">
              SECURE QR STUB
            </span>
          </div>

          <div className="space-y-1 w-full pt-2 border-t border-amber-200/80 text-xs font-sans">
            <span className="text-[10px] text-slate-500 font-semibold uppercase block font-heading">
              TICKET HOLDER
            </span>
            <span className="font-extrabold text-slate-800 block truncate">{participantName}</span>
            <span className="text-[10px] font-mono font-bold text-[#0F5132] block">{formattedTicketCode}</span>
          </div>
        </div>
      </motion.div>

      {/* Buttons Row: Download PDF & Print */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button
          variant="primary"
          size="md"
          leftIcon={Download}
          onClick={handlePrint}
          className="w-full sm:w-auto shadow-md"
        >
          Download PDF Ticket
        </Button>
        <Button
          variant="secondary"
          size="md"
          leftIcon={Printer}
          onClick={handlePrint}
          className="w-full sm:w-auto shadow-md"
        >
          Print Ticket
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
