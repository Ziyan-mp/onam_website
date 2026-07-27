import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Download, Eye, Home, Sparkles, QrCode, Lock, ShieldCheck, Ticket as TicketIcon } from 'lucide-react';
import { Button } from '../Button';
import { Ticket } from '../Ticket';
import { formatCurrency, formatDate, formatTicketId } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Premium Payment Successful Component
 */
export const PaymentSuccess = ({
  transactionId = 'TXN-ONAM-2026-89420',
  amount = 150,
  paymentDate = new Date().toISOString(),
  participantName = 'Prof. Ananthakrishnan Nair',
  ticketNumber = '8942',
  onDownload,
  onViewTicket,
  className,
}) => {
  return (
    <div className={cn('min-h-[80vh] flex flex-col items-center justify-center py-16 px-4 sm:px-6 relative bg-[#FFF9F0] overflow-hidden', className)}>
      {/* Ambient Glow Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] h-[32rem] bg-[#0F5132]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-[#D4A017]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-2xl w-full relative z-10 space-y-8 text-center">
        {/* Large Success Checkmark Badge */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
          className="relative inline-flex items-center justify-center"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#0F5132] to-[#167448] p-1 shadow-soft-lg shadow-[#0F5132]/30 flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center border-2 border-[#D4A017]">
              <CheckCircle2 className="w-14 h-14 text-[#0F5132]" />
            </div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-1 -right-1 p-2 rounded-full bg-[#D4A017] text-[#0F5132] shadow-sm"
          >
            <Sparkles className="w-5 h-5 fill-[#0F5132]" />
          </motion.div>
        </motion.div>

        {/* Header Titles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-2"
        >
          <span className="text-xs font-black uppercase tracking-widest text-[#0F5132] bg-[#0F5132]/10 px-4 py-1.5 rounded-full border border-[#0F5132]/20 font-heading">
            TRANSACTION CONFIRMED
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading">
            Payment Successful
          </h1>
          <p className="text-slate-600 text-sm font-sans max-w-md mx-auto">
            Thank you! Your registration for Onam Lucky Draw 2026 is confirmed.
          </p>
        </motion.div>

        {/* Transaction Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4A017]/40 shadow-soft-lg text-left space-y-5"
        >
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <span className="text-xs font-bold uppercase text-slate-500 font-heading">Payment Details</span>
            <span className="px-3 py-1 rounded-full bg-[#0F5132]/10 text-[#0F5132] text-xs font-black uppercase tracking-wider font-heading border border-[#0F5132]/20">
              PAID VIA RAZORPAY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-amber-100">
              <span className="text-slate-500 block font-semibold">Amount Paid</span>
              <span className="text-2xl font-black text-[#0F5132] font-heading mt-0.5 block">
                {formatCurrency(amount)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-amber-100">
              <span className="text-slate-500 block font-semibold">Transaction ID</span>
              <span className="text-sm font-black text-slate-800 font-mono mt-1 block">
                {transactionId}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-amber-100">
              <span className="text-slate-500 block font-semibold">Payment Date</span>
              <span className="text-xs font-bold text-slate-800 font-sans mt-1 block">
                {formatDate(paymentDate)}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-amber-100">
              <span className="text-slate-500 block font-semibold">Participant Name</span>
              <span className="text-xs font-bold text-slate-800 font-heading mt-1 block truncate">
                {participantName}
              </span>
            </div>
          </div>

          {/* Ticket Preview Component Integration */}
          <div className="pt-2">
            <Ticket
              ticketNumber={ticketNumber}
              participantName={participantName}
              purchaseDate={paymentDate}
              price={amount}
              status="VALID"
            />
          </div>
        </motion.div>

        {/* Action Buttons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Button
            variant="primary"
            size="lg"
            leftIcon={Download}
            onClick={onDownload || (() => window.print())}
            className="w-full sm:w-auto shadow-md"
          >
            Download Ticket
          </Button>

          <Button
            variant="secondary"
            size="lg"
            leftIcon={Eye}
            onClick={onViewTicket || (() => alert(`Viewing ticket code: ${formatTicketId(ticketNumber)}`))}
            className="w-full sm:w-auto shadow-md"
          >
            View Ticket
          </Button>

          <a href="/" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" leftIcon={Home} className="w-full sm:w-auto">
              Home
            </Button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
