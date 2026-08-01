import React, { useRef } from "react";
import { motion } from 'framer-motion';
import { GraduationCap, QrCode, Sparkles, ShieldCheck, Download, Printer } from 'lucide-react';
import { Button } from '../Button';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
/**
 * Ultra-Luxury Onam Festival Horizontal Boarding Pass Ticket Component
 */
export const Ticket = ({
  ticketNumber = '8942',
  participantName = 'Prof. Ananthakrishnan Nair',
  department = 'Computer Science & Engineering',
  phoneNumber = '81579 56164',
  paymentId = 'PAY-RZP-89420',
  amount = 150,
  drawDate = '2026-08-28T17:00:00+05:30',
  status = 'CONFIRMED',
  className,
}) => {
  const ticketRef = useRef(null);
  const handlePrint = () => {
    window.print();
  };

  const formattedTicketCode = ticketNumber;

  return (
    <div className={cn('w-full max-w-5xl mx-auto space-y-6', className)}>
      {/* Horizontal Scroll Wrapper for Mobile/Tablet to guarantee Landscape Boarding Pass aspect ratio */}
      <div className="w-full overflow-x-auto pb-4 pt-1 scrollbar-thin">
        {/* Main Boarding Pass Card Frame - Fixed 2.4:1 Aspect Ratio Landscape Shell */}
        <motion.div
          ref={ticketRef}
          id="ticket"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          whileHover={{ y: -3 }}
          className="relative min-w-[880px] max-w-[960px] mx-auto bg-[#FFF9F0] dark:bg-[#062617] rounded-[24px] border-2 border-[#D4A017] shadow-soft-lg overflow-hidden text-slate-800 dark:text-amber-100 flex flex-col select-none"
        >
          {/* Subtle Onam Pookkalam & Nilavilakku Watermark SVG (5-8% Opacity) */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.08] flex items-center justify-center overflow-hidden">
            <svg width="960" height="420" viewBox="0 0 500 220" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="250" cy="110" r="110" stroke="#0F5132" strokeWidth="4" strokeDasharray="6 6" />
              <circle cx="250" cy="110" r="85" stroke="#D4A017" strokeWidth="3" />
              <circle cx="250" cy="110" r="55" stroke="#8B1E3F" strokeWidth="3" />
              <path d="M250 10 L265 60 L315 60 L275 90 L290 140 L250 110 L210 140 L225 90 L185 60 L235 60 Z" fill="#D4A017" />
            </svg>
          </div>

          {/* Tiny Corner Gold Sparkle Accents */}
          <div className="absolute top-2.5 left-2.5 pointer-events-none text-[#D4A017]/60">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="absolute top-2.5 right-2.5 pointer-events-none text-[#D4A017]/60">
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* ---------------------------------------------------- */}
          {/* 1. DARK KERALA GREEN HEADER BAR                      */}
          {/* ---------------------------------------------------- */}
          <div className="bg-[#0F5132] text-white px-6 py-3.5 border-b-2 border-[#D4A017] flex items-center justify-between gap-4 relative z-10">
            {/* Left: College Logo & Branding */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4A017] to-[#E5B83B] p-0.5 shadow-md shrink-0">
                <div className="w-full h-full bg-[#0F5132] rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-[#D4A017]" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-black text-[#D4A017] font-heading tracking-tight leading-tight">
                  PONNONAM 2026
                </h3>
                <span className="text-[11px] font-bold text-amber-100/90 uppercase tracking-widest block font-heading">
                  Department of EC
                </span>
              </div>
            </div>

            {/* Right: Badges */}
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#D4A017] text-[#0F5132] font-heading shadow-xs">
                OFFICIAL
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0A3722] text-[#FFF9F0] border border-emerald-400/40 flex items-center gap-1 font-heading">
                <ShieldCheck className="w-3 h-3 text-[#D4A017]" /> VERIFIED
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#8B1E3F] text-white font-heading shadow-xs">
                PAID ₹{amount}
              </span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* 2. HORIZONTAL BODY (LEFT 75% | SEPARATOR | RIGHT 25%) */}
          {/* ---------------------------------------------------- */}
          <div className="relative z-10 flex flex-row min-h-[290px]">
            {/* Top & Bottom Circular Notch Cut-outs */}
            <div className="absolute left-[75%] -top-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FFF9F0] dark:bg-[#062617] border-2 border-[#D4A017] z-30" />
            <div className="absolute left-[75%] -bottom-3.5 -translate-x-1/2 w-7 h-7 rounded-full bg-[#FFF9F0] dark:bg-[#062617] border-2 border-[#D4A017] z-30" />

            {/* LEFT SECTION (75% Width) */}
            <div className="w-[75%] p-6 space-y-4 flex flex-col justify-between">
              {/* Ticket Code & Fee Banner */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-[#0F5132]/40 border border-amber-200/90 dark:border-[#D4A017]/30 shadow-xs">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-amber-200/70 tracking-widest block font-heading">
                    BOARDING PASS TICKET NO
                  </span>
                  <span className="text-2xl font-black text-[#0F5132] dark:text-[#D4A017] font-mono tracking-wider whitespace-nowrap">
                    {formattedTicketCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-amber-200/70 tracking-widest block font-heading">
                    ENTRY FEE
                  </span>
                  <span className="text-xl font-black text-[#0F5132] dark:text-[#D4A017] font-heading">
                    {formatCurrency(amount)}
                  </span>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-3 gap-3 text-xs font-sans">
                {/* Participant Name */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0F5132]/30 border border-amber-200/70 dark:border-[#D4A017]/25 col-span-2">
                  <span className="text-slate-500 dark:text-amber-200/70 text-[10px] font-extrabold uppercase tracking-wider block font-heading">
                    PARTICIPANT / TICKET HOLDER
                  </span>
                  <span className="text-sm font-extrabold text-slate-800 dark:text-white mt-0.5 block truncate font-sans">
                    {participantName}
                  </span>
                </div>

                {/* Department */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0F5132]/30 border border-amber-200/70 dark:border-[#D4A017]/25 col-span-1">
                  <span className="text-slate-500 dark:text-amber-200/70 text-[10px] font-extrabold uppercase tracking-wider block font-heading">
                    DEPARTMENT
                  </span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-amber-100 mt-0.5 block truncate font-sans">
                    {department}
                  </span>
                </div>

                {/* Phone Number */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0F5132]/30 border border-amber-200/70 dark:border-[#D4A017]/25">
                  <span className="text-slate-500 dark:text-amber-200/70 text-[10px] font-extrabold uppercase tracking-wider block font-heading">
                    PHONE NO
                  </span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-amber-100 mt-0.5 block font-mono whitespace-nowrap">
                    {phoneNumber}
                  </span>
                </div>

                {/* Draw Date & Time */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0F5132]/30 border border-amber-200/70 dark:border-[#D4A017]/25">
                  <span className="text-slate-500 dark:text-amber-200/70 text-[10px] font-extrabold uppercase tracking-wider block font-heading">
                    DRAW DATE & TIME
                  </span>
                  <span className="text-xs font-extrabold text-[#8B1E3F] dark:text-amber-300 mt-0.5 block whitespace-nowrap">
                    {formatDate(drawDate)}
                  </span>
                </div>

                {/* Payment ID */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0F5132]/30 border border-amber-200/70 dark:border-[#D4A017]/25">
                  <span className="text-slate-500 dark:text-amber-200/70 text-[10px] font-extrabold uppercase tracking-wider block font-heading">
                    PAYMENT ID
                  </span>
                  <span className="text-xs font-extrabold text-slate-800 dark:text-amber-100 mt-0.5 block font-mono truncate">
                    {paymentId}
                  </span>
                </div>
              </div>

              {/* Full Width Barcode at Bottom of Left Section */}
              <div className="flex flex-col items-center justify-center space-y-1 pt-1">
                <div className="h-10 w-full flex items-center justify-between px-3 bg-white dark:bg-slate-900 rounded-lg py-1 border border-slate-200 dark:border-slate-700 shadow-xs">
                  {Array.from({ length: 68 }).map((_, i) => (
                    <div
                      key={i}
                      className="bg-slate-900 dark:bg-amber-100 h-full rounded-xs"
                      style={{ width: `${(i % 5 === 0 ? 3.5 : i % 3 === 0 ? 2.5 : i % 2 === 0 ? 1.5 : 2)}px` }}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between w-full text-[9px] font-mono font-bold text-slate-600 dark:text-amber-200 tracking-wider">
                  <span>* {formattedTicketCode} *</span>
                  <span>Official Onam Lucky Draw • College of Engineering Vadakara</span>
                </div>
              </div>
            </div>

            {/* VERTICAL DASHED PERFORATION LINE SEPARATOR */}
            <div className="w-px border-r-2 border-dashed border-[#D4A017]/60 relative z-20" />

            {/* RIGHT SECTION (25% Width Stub Area) */}
            <div className="w-[25%] bg-[#FFF9F0] dark:bg-[#0A3722] p-5 flex flex-col items-center justify-between text-center space-y-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-[#0F5132] dark:text-[#D4A017] tracking-widest font-heading block">
                  BOARDING PASS STUB
                </span>
                <span className="text-[11px] font-bold text-slate-600 dark:text-amber-200/80 block font-heading">
                  SCAN FOR VERIFICATION
                </span>
              </div>

              {/* Large QR Code Container */}
              <div className="p-3 bg-white rounded-2xl border-2 border-[#D4A017]/50 shadow-xs flex flex-col items-center justify-center">
                <QrCode className="w-28 h-28 text-[#0F5132]" />
              </div>

              {/* Stub Holder & Verification Info */}
              <div className="space-y-1 w-full pt-2 border-t border-amber-200/80 dark:border-[#D4A017]/30 text-xs font-sans">
                <span className="text-[10px] text-slate-500 dark:text-amber-200/60 font-semibold uppercase block font-heading">
                  TICKET HOLDER
                </span>
                <span className="font-extrabold text-slate-800 dark:text-white block truncate">{participantName}</span>
                <span className="text-[10px] font-mono font-bold text-[#0F5132] dark:text-[#D4A017] block">
                  {formattedTicketCode}
                </span>
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#0F5132]/10 dark:bg-[#0F5132] text-[#0F5132] dark:text-[#D4A017]">
                    VERIFIED
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-[#D4A017] text-[#0F5132]">
                    PAID
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Action Buttons Below Ticket */}
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
