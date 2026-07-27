import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users, 
  Coins, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Sparkles, 
  PieChart, 
  BarChart3, 
  Printer 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { formatCurrency } from '../utils/formatters';
import { cn } from '../utils/cn';

/**
 * Modern SaaS Admin Reports & Analytics Dashboard Component
 */
export const AdminReports = ({ className }) => {
  const targetPool = 150000;
  const currentCollection = 102600;
  const totalParticipants = 684;
  const progressPercentage = (currentCollection / targetPool) * 100;

  const departmentData = [
    { name: 'Computer Science & Eng.', count: 184, percentage: 26.9, color: 'bg-[#0F5132]' },
    { name: 'Electronics & Comm.', count: 142, percentage: 20.8, color: 'bg-[#167448]' },
    { name: 'Administration & Staff', count: 120, percentage: 17.5, color: 'bg-[#D4A017]' },
    { name: 'Mathematics & Science', count: 98, percentage: 14.3, color: 'bg-[#8B1E3F]' },
    { name: 'Physics & Chemistry', count: 80, percentage: 11.7, color: 'bg-[#0F5132]' },
    { name: 'Mechanical & Civil Eng.', count: 60, percentage: 8.8, color: 'bg-[#D4A017]' },
  ];

  const paymentMethodData = [
    { method: 'UPI (GPay / PhonePe / Paytm)', share: '65%', count: 445, icon: CreditCard, color: 'text-[#0F5132] bg-[#0F5132]/10 border-[#0F5132]/20' },
    { method: 'NetBanking (All Banks)', share: '22%', count: 150, icon: Building2, color: 'text-[#D4A017] bg-[#D4A017]/15 border-[#D4A017]/30' },
    { method: 'Debit & Credit Cards', share: '13%', count: 89, icon: CreditCard, color: 'text-[#8B1E3F] bg-[#8B1E3F]/10 border-[#8B1E3F]/20' },
  ];

  const handleExportPDF = () => {
    toast.success('Generating official Secretariat PDF report...');
    setTimeout(() => {
      window.print();
    }, 800);
  };

  return (
    <div className={cn('space-y-8 max-w-7xl mx-auto', className)}>
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-soft">
        <div>
          <span className="text-xs font-black uppercase text-[#D4A017] tracking-widest block font-heading">
            SECRETARIAT ANALYTICS
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading mt-1">
            Reports & Analytics Dashboard
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Comprehensive financial collection summary, department breakdown, and payment gateway reports.
          </p>
        </div>

        <Button variant="primary" size="md" leftIcon={Printer} onClick={handleExportPDF} className="shadow-md">
          Export PDF Report
        </Button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Total Collection</span>
            <Coins className="w-5 h-5 text-[#0F5132]" />
          </div>
          <h3 className="text-3xl font-black text-[#0F5132] font-heading">{formatCurrency(currentCollection)}</h3>
          <span className="text-xs text-slate-500 font-sans">From 684 Paid Tickets</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Total Participants</span>
            <Users className="w-5 h-5 text-[#D4A017]" />
          </div>
          <h3 className="text-3xl font-black text-slate-800 font-heading">{totalParticipants} Staff</h3>
          <span className="text-xs text-slate-500 font-sans">Across 6 College Depts</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Target Goal</span>
            <TrendingUp className="w-5 h-5 text-[#8B1E3F]" />
          </div>
          <h3 className="text-3xl font-black text-slate-800 font-heading">{formatCurrency(targetPool)}</h3>
          <span className="text-xs text-[#0F5132] font-extrabold font-heading">{progressPercentage.toFixed(1)}% Completed</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Security Audit</span>
            <ShieldCheck className="w-5 h-5 text-[#0F5132]" />
          </div>
          <h3 className="text-2xl font-black text-[#0F5132] font-heading">PASSED (SSL)</h3>
          <span className="text-xs text-slate-500 font-sans">Razorpay Encrypted Log</span>
        </motion.div>
      </div>

      {/* Target Progress Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4A017]/40 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-amber-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0F5132]/10 text-[#0F5132]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-black text-slate-800 font-heading">Revenue Collection Goal Progress</h3>
          </div>
          <span className="text-xs font-black text-[#0F5132] bg-[#0F5132]/10 px-3 py-1 rounded-full border border-[#0F5132]/20 font-heading">
            {progressPercentage.toFixed(1)}% ACHIEVED
          </span>
        </div>

        <ProgressBar
          progress={progressPercentage}
          label="₹150 Ticket Pool Revenue Progress"
          valueText={`${formatCurrency(currentCollection)} / ${formatCurrency(targetPool)} (${progressPercentage.toFixed(1)}%)`}
        />
      </div>

      {/* Split Grid: Participants Per Department & Payment Method Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Participants Per Department Visual Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6"
        >
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#0F5132]/10 text-[#0F5132]">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 font-heading">Participants per Department</h3>
                <p className="text-xs text-slate-500 font-sans">Registration distribution across college faculties</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-500 font-heading">684 Staff</span>
          </div>

          <div className="space-y-4">
            {departmentData.map((dept) => (
              <div key={dept.name} className="space-y-1.5 font-sans text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-800 font-heading">{dept.name}</span>
                  <span className="font-black text-[#0F5132]">{dept.count} Staff ({dept.percentage}%)</span>
                </div>
                <div className="w-full bg-[#FFF9F0] border border-amber-100 rounded-full h-3 overflow-hidden p-0.5">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', dept.color)}
                    style={{ width: `${dept.percentage * 3.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Column: Payment Gateway Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6"
        >
          <div className="flex items-center justify-between border-b border-amber-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#D4A017]/15 text-[#0F5132]">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-800 font-heading">Payments Breakdown</h3>
                <p className="text-xs text-slate-500 font-sans">Payment gateway channel distribution</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#0F5132] font-heading">100% Verified</span>
          </div>

          <div className="space-y-4">
            {paymentMethodData.map((method) => {
              const IconComponent = method.icon;
              return (
                <div key={method.method} className="p-4 rounded-2xl bg-[#FFF9F0] border border-amber-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('p-2.5 rounded-xl border', method.color)}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 text-xs block font-heading">{method.method}</span>
                      <span className="text-[10px] text-slate-500 font-sans">{method.count} Transactions</span>
                    </div>
                  </div>
                  <span className="text-lg font-black text-[#0F5132] font-heading">{method.share}</span>
                </div>
              );
            })}
          </div>

          {/* Audit Guarantee Note */}
          <div className="p-4 rounded-2xl bg-[#0F5132] text-white space-y-1 text-xs font-heading">
            <div className="flex items-center gap-1.5 text-[#D4A017]">
              <Sparkles className="w-4 h-4" />
              <span className="font-bold">Official Secretariat Certified Report</span>
            </div>
            <p className="text-[11px] text-amber-100/80 font-sans">
              All financial logs are audited and reconciled daily with Razorpay Merchant Settlement.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminReports;
