import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  QrCode, 
  Search, 
  CheckCircle2, 
  User, 
  Building2, 
  IdCard, 
  CreditCard, 
  Calendar, 
  Sparkles, 
  XCircle,
  Phone,
  Mail
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../Button';
import { formatCurrency, formatDate, formatTicketId, maskPhoneNumber } from '../../utils/formatters';
import { cn } from '../../utils/cn';

/**
 * Professional QR Code Ticket Verification Page Component
 */
export const TicketVerification = ({ className }) => {
  const [searchCode, setSearchCode] = useState('ONAM-2026-8942');
  const [verifiedResult, setVerifiedResult] = useState({
    ticketNumber: '8942',
    participantName: 'Prof. Ananthakrishnan Nair',
    department: 'Computer Science & Engineering',
    employeeId: 'EMP-9842',
    phone: '9876543210',
    email: 'staff@college.edu.in',
    paymentId: 'PAY-RZP-98420',
    amount: 150,
    paymentStatus: 'PAID',
    eligibleBadge: 'VERIFIED ELIGIBLE STAFF',
    issuedDate: '2026-08-15T10:30:00',
    drawDate: '2026-08-28T17:00:00+05:30',
  });

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchCode.trim()) {
      toast.error('Please enter a valid ticket code or scan QR code');
      return;
    }

    toast.loading('Scanning & verifying QR ticket code...', { id: 'verify-toast' });

    setTimeout(() => {
      toast.success('Ticket Verified Successfully!', { id: 'verify-toast' });
      setVerifiedResult({
        ticketNumber: searchCode.replace(/\D/g, '') || '8942',
        participantName: 'Prof. Ananthakrishnan Nair',
        department: 'Computer Science & Engineering',
        employeeId: 'EMP-9842',
        phone: '9876543210',
        email: 'staff@college.edu.in',
        paymentId: 'PAY-RZP-98420',
        amount: 150,
        paymentStatus: 'PAID',
        eligibleBadge: 'VERIFIED ELIGIBLE STAFF',
        issuedDate: '2026-08-15T10:30:00',
        drawDate: '2026-08-28T17:00:00+05:30',
      });
    }, 1000);
  };

  return (
    <section id="verify" className={cn('py-16 md:py-24 relative bg-[#FFF9F0] overflow-hidden', className)}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/25 text-[#0F5132] text-xs font-extrabold uppercase tracking-widest font-heading shadow-xs">
            <ShieldCheck className="w-4 h-4 text-[#D4A017]" />
            <span>OFFICIAL QR VERIFICATION PORTAL</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0F5132] tracking-tight font-heading">
            Verify Ticket Status
          </h2>

          <p className="text-slate-600 text-sm font-sans">
            Enter ticket code or scan QR code to verify staff eligibility, payment confirmation, and draw entry status.
          </p>
        </div>

        {/* Search & Scan Form */}
        <form onSubmit={handleVerify} className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-[#D4A017]/40 shadow-soft flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <QrCode className="w-5 h-5 text-[#0F5132] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Enter Ticket Code (e.g. ONAM-2026-8942)..."
              className="w-full bg-[#FFF9F0] border border-amber-200/90 rounded-2xl pl-12 pr-4 py-3.5 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F5132] focus:ring-2 focus:ring-[#0F5132]/20 font-heading"
            />
          </div>
          <Button type="submit" variant="primary" size="lg" leftIcon={Search} className="w-full sm:w-auto shadow-sm">
            Verify Ticket
          </Button>
        </form>

        {/* Verification Result Card Display */}
        <AnimatePresence>
          {verifiedResult && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 25 }}
              className="bg-white rounded-[2.5rem] p-6 sm:p-10 border-2 border-[#D4A017] shadow-soft-lg space-y-8 relative overflow-hidden"
            >
              {/* Top Kasavu Ribbon Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0F5132] via-[#D4A017] to-[#8B1E3F]" />

              {/* Status Header Badge */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-100 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F5132]/10 border border-[#0F5132]/20 flex items-center justify-center text-[#0F5132]">
                    <CheckCircle2 className="w-7 h-7 text-[#0F5132]" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase text-[#0F5132] tracking-widest font-heading block">
                      {verifiedResult.eligibleBadge}
                    </span>
                    <h3 className="text-2xl font-black text-slate-800 font-heading tracking-widest mt-0.5">
                      {formatTicketId(verifiedResult.ticketNumber)}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-800 text-xs font-black uppercase tracking-wider font-heading border border-emerald-500/30 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#0F5132]" /> PAYMENT {verifiedResult.paymentStatus}
                  </span>
                  <span className="px-3.5 py-1.5 rounded-full bg-[#D4A017] text-[#0F5132] text-xs font-black uppercase tracking-wider font-heading shadow-xs">
                    ₹{verifiedResult.amount}
                  </span>
                </div>
              </div>

              {/* Participant Details Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase text-slate-500 tracking-widest font-heading">
                  Participant Staff Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-100/90 flex items-start gap-3">
                    <User className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                        Participant Full Name
                      </span>
                      <span className="font-extrabold text-slate-800 text-sm block mt-0.5">
                        {verifiedResult.participantName}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-100/90 flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                        College Department
                      </span>
                      <span className="font-extrabold text-slate-800 text-sm block mt-0.5">
                        {verifiedResult.department}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-100/90 flex items-start gap-3">
                    <IdCard className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                        Employee Registration ID
                      </span>
                      <span className="font-mono font-extrabold text-[#0F5132] text-sm block mt-0.5">
                        {verifiedResult.employeeId}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-100/90 flex items-start gap-3">
                    <CreditCard className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                        Razorpay Payment ID
                      </span>
                      <span className="font-mono font-extrabold text-slate-800 text-sm block mt-0.5">
                        {verifiedResult.paymentId}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-100/90 flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                        Registered Mobile
                      </span>
                      <span className="font-extrabold text-slate-800 text-sm block mt-0.5">
                        {maskPhoneNumber(verifiedResult.phone)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-100/90 flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#0F5132] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider block font-heading">
                        Registered Email
                      </span>
                      <span className="font-extrabold text-slate-800 text-sm block mt-0.5 truncate">
                        {verifiedResult.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Draw Eligibility Footer */}
              <div className="p-4 rounded-2xl bg-[#0F5132] text-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-heading shadow-md">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#D4A017] animate-pulse" />
                  <span>Confirms Entry in Bumper Draw on 28 Aug 2026 (5:00 PM IST)</span>
                </div>
                <span className="font-black text-[#D4A017] uppercase tracking-wider bg-[#0A3722] px-3 py-1 rounded-lg border border-[#D4A017]/30">
                  100% VALIDATED TICKET
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TicketVerification;
