import React, { useRef, useState } from "react";
import { motion } from 'framer-motion';
import { Sparkles, Download, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '../Button';
import { formatCurrency } from '../../utils/formatters';
import { cn } from '../../utils/cn';
import { jsPDF } from "jspdf";
import { toPng } from 'html-to-image';
import toast from 'react-hot-toast';

/**
 * Onam Festival Lucky Draw Ticket Component (Compact One-Page PDF Design)
 */
export const Ticket = ({
  ticketNumber = '8942',
  participantName = 'Prof. Ananthakrishnan Nair',
  department = 'Computer Science & Engineering',
  phoneNumber = '81579 56164',
  paymentId = 'PAY-RZP-89420',
  amount = 150,
  className,
}) => {
  const ticketRef = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    try {
      setIsDownloading(true);

      const imagePromise = toPng(ticketRef.current, {
        pixelRatio: 2,
        backgroundColor: '#ffffff'
      });

      // Add a safety timeout in case it hangs
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("PDF generation timed out. Please try again.")), 8000)
      );

      const imgData = await Promise.race([imagePromise, timeoutPromise]);

      const { offsetWidth, offsetHeight } = ticketRef.current;

      // Create a PDF with exactly the dimensions of the rendered ticket element
      const pdf = new jsPDF({
        orientation: offsetWidth > offsetHeight ? 'landscape' : 'portrait',
        unit: 'px',
        format: [offsetWidth, offsetHeight]
      });

      // Fit to exactly one page
      pdf.addImage(imgData, 'PNG', 0, 0, offsetWidth, offsetHeight);

      // Download the single-page PDF
      pdf.save(`Onam_Lucky_Draw_Ticket_${ticketNumber}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      toast.error(error.message || "Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={cn('w-full flex flex-col items-center justify-center gap-6 py-4', className)}>
      {/* The Ticket Element (Target for PDF Generation) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px]"
      >
        <div
          ref={ticketRef}
          className="relative w-full bg-[#FFF9F0] dark:bg-[#062617] rounded-3xl border-2 border-[#D4A017] shadow-lg flex flex-col select-none overflow-hidden"
        >
          {/* Decorative Inner Border */}
          <div className="absolute inset-1 border border-[#D4A017]/30 rounded-[22px] pointer-events-none z-0" />

          {/* ---------------------------------------------------- */}
          {/* 1. HEADER - Kerala Green with Image Background */}
          {/* ---------------------------------------------------- */}
          <div
            className="relative px-6 py-10 text-center border-b-2 border-[#D4A017] z-10 flex flex-col items-center justify-center overflow-hidden min-h-[220px]"
            style={{
              backgroundImage: "url('/new_ticket_bg.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Overlay to ensure text readability */}
            <div className="absolute inset-0 bg-[#0F5132]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            <div className="flex items-center gap-2 mb-2 relative z-10 bg-black/30 px-3 py-1 rounded-full border border-amber-200/20 shadow-md">
              <TicketIcon className="w-4 h-4 text-[#D4A017]" />
              <span className="text-[#D4A017] text-[10px] font-black uppercase tracking-[0.2em] font-heading">
                Official Lucky Draw
              </span>
              <TicketIcon className="w-4 h-4 text-[#D4A017]" />
            </div>

            <h3 className="text-4xl font-black text-white font-heading tracking-tight relative z-10 mt-2 shadow-black shadow-lg">
              PONNONAM 2026
            </h3>
            <p className="text-amber-200/90 text-xs font-semibold tracking-wider relative z-10 mt-1 font-sans shadow-black shadow-sm">
              College of Engineering Vadakara
            </p>
          </div>

          {/* ---------------------------------------------------- */}
          {/* 2. BODY - Ticket Details */}
          {/* ---------------------------------------------------- */}
          <div className="p-6 flex flex-col items-center text-center relative z-10">
            {/* Sparkles Decoration */}
            <Sparkles className="absolute top-5 left-5 w-5 h-5 text-[#D4A017]/40" />
            <Sparkles className="absolute top-5 right-5 w-5 h-5 text-[#D4A017]/40" />

            {/* Prominent Ticket Code Area */}
            <div className="w-full bg-white dark:bg-[#0F5132]/30 rounded-2xl py-4 px-3 border border-amber-200 dark:border-[#D4A017]/30 shadow-sm flex flex-col items-center justify-center mb-6">
              <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-amber-200/70 tracking-widest block font-heading mb-1">
                LUCKY DRAW TICKET NO.
              </span>
              <span className="text-4xl font-black text-[#0F5132] dark:text-[#D4A017] font-mono tracking-widest shadow-sm">
                {ticketNumber}
              </span>
            </div>

            {/* User & Participant Info Grid */}
            <div className="w-full space-y-5 text-left mb-6 px-1">
              <div className="bg-[#0F5132]/5 dark:bg-black/20 p-3 rounded-xl border border-amber-200/50">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-amber-200/70 tracking-widest block font-heading mb-0.5">
                  Ticket Holder
                </span>
                <span className="font-bold text-slate-800 dark:text-amber-50 text-base font-sans">
                  {participantName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#0F5132]/5 dark:bg-black/20 p-3 rounded-xl border border-amber-200/50">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-amber-200/70 tracking-widest block font-heading mb-0.5">
                    Department
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-amber-100 text-xs font-sans truncate block">
                    {department}
                  </span>
                </div>
                <div className="bg-[#0F5132]/5 dark:bg-black/20 p-3 rounded-xl border border-amber-200/50">
                  <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-amber-200/70 tracking-widest block font-heading mb-0.5">
                    Phone
                  </span>
                  <span className="font-mono font-bold text-slate-700 dark:text-amber-100 text-xs">
                    {phoneNumber}
                  </span>
                </div>
              </div>
            </div>

            {/* Custom Perforated Divider */}
            <div className="w-[115%] -mx-[7.5%] border-t-[2px] border-dashed border-[#D4A017]/40 relative my-2">
              <div className="absolute -left-3 -top-3.5 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-r-2 border-[#D4A017]/40 z-20" />
              <div className="absolute -right-3 -top-3.5 w-7 h-7 rounded-full bg-white dark:bg-slate-900 border-l-2 border-[#D4A017]/40 z-20" />
            </div>

            {/* ---------------------------------------------------- */}
            {/* 3. FOOTER - Transaction Information */}
            {/* ---------------------------------------------------- */}
            <div className="w-full flex justify-end items-center text-left pt-6 pb-2 px-1">
              <div className="text-right">
                <span className="text-[9px] font-extrabold uppercase text-slate-500 dark:text-amber-200/70 tracking-widest block font-heading mb-0.5">
                  Amount Paid
                </span>
                <span className="font-black text-[#0F5132] dark:text-[#D4A017] text-sm">
                  {formatCurrency(amount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons (Not included in PDF) */}
      <div className="w-full max-w-[420px] mt-2">
        <Button
          variant="primary"
          size="lg"
          leftIcon={Download}
          onClick={handleDownload}
          isLoading={isDownloading}
          className="w-full shadow-lg"
        >
          {isDownloading ? 'Generating PDF...' : 'Download Ticket'}
        </Button>
      </div>
    </div>
  );
};

export default Ticket;
