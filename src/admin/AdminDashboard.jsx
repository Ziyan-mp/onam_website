import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Coins, 
  Users, 
  Target, 
  Calendar, 
  ArrowUpRight, 
  Play, 
  Download, 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Ticket 
} from 'lucide-react';
import { Button } from '../components/Button';
import { ProgressBar } from '../components/ProgressBar';
import { formatCurrency, formatDate, formatTicketId } from '../utils/formatters';
import { getDashboardStats } from '../services/adminApi';
import { useSettings } from '../context/SettingsContext';
import { useDraw } from '../hooks/useDraw';

/**
 * Custom Animated Counter Component
 */
const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="font-black font-heading"
    >
      {prefix}{value}{suffix}
    </motion.span>
  );
};

/**
 * Admin Dashboard Component with 4 Statistic Cards, Collection Progress & Recent Payments
 */
export const AdminDashboard = () => {
  const { settings } = useSettings();
  const { lastDrawTime } = useDraw();
  const [stats, setStats] = useState({
    totalCollection: 0,
    participantsCount: 0,
    targetAmount: 150000,
    targetDate: new Date().toISOString()
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      try {
        const response = await getDashboardStats();
        if (response.success && isMounted) {
          setStats(response.stats);
          setRecentPayments(response.recentPayments || []);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    
    // Initial fetch
    fetchStats();
    
    // Set up polling interval (every 5 seconds) to automatically refresh the dashboard
    const interval = setInterval(fetchStats, 5000);
    
    // Cleanup on unmount
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [lastDrawTime]);

  // Only default to stats.targetAmount if settings targetAmount is truly undefined
  const targetAmount = settings?.targetAmount !== undefined ? settings.targetAmount : stats.targetAmount;
  const remainingAmount = Math.max(0, targetAmount - stats.totalCollection);
  const progressPercentage = targetAmount > 0 ? (stats.totalCollection / targetAmount) * 100 : 0;
  
  // Calculate days remaining
  const today = new Date();
  const targetDate = new Date(stats.targetDate);
  const diffTime = targetDate - today;
  const daysRemaining = diffTime > 0 ? Math.ceil(diffTime / (1000 * 60 * 60 * 24)) : 0;

  const dashboardCards = [
    {
      id: 'total-collection',
      title: 'Total Collection',
      value: formatCurrency(stats.totalCollection),
      subtitle: `From ${stats.participantsCount} Paid Tickets`,
      icon: Coins,
      badge: '+18.4% THIS WEEK',
      color: {
        bg: 'bg-[#0F5132]/10',
        text: 'text-[#0F5132]',
        border: 'border-[#0F5132]/20',
      },
    },
    {
      id: 'participants',
      title: 'Participants',
      value: `${stats.participantsCount} Staff`,
      subtitle: 'Verified Teachers & Staff',
      icon: Users,
      badge: 'LIVE COUNT',
      isLive: true,
      color: {
        bg: 'bg-[#D4A017]/15',
        text: 'text-[#D4A017]',
        border: 'border-[#D4A017]/35',
      },
    },
    {
      id: 'remaining-amount',
      title: 'Remaining Amount',
      value: formatCurrency(remainingAmount),
      subtitle: `To Reach ${formatCurrency(targetAmount)} Goal`,
      icon: Target,
      badge: 'GOAL TARGET',
      color: {
        bg: 'bg-[#8B1E3F]/10',
        text: 'text-[#8B1E3F]',
        border: 'border-[#8B1E3F]/25',
      },
    },
    {
      id: 'days-remaining',
      title: 'Days Remaining',
      value: `${daysRemaining} Days`,
      subtitle: `Until ${settings?.eventName || 'Draw'}`,
      icon: Calendar,
      badge: formatDate(stats.targetDate),
      color: {
        bg: 'bg-[#0F5132]/10',
        text: 'text-[#0F5132]',
        border: 'border-[#0F5132]/20',
      },
    },
  ];

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-[#0F5132] font-bold">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Dashboard Top Controller Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading mt-1">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Real-time ticket monitoring and automated lucky draw control system.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={Download} onClick={() => window.print()}>
            Export Logs
          </Button>
          <a href="/admin/draws">
            <Button variant="primary" size="sm" leftIcon={Play}>
              Launch Winner Draw
            </Button>
          </a>
        </div>
      </div>

      {/* 4 Responsive Statistic Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardCards.map((card, idx) => {
          const IconComp = card.icon;
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft flex flex-col justify-between space-y-4 hover:border-[#D4A017]/60 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl border ${card.color.bg} ${card.color.text} ${card.color.border}`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5">
                  {card.isLive && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0F5132] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0F5132]"></span>
                    </span>
                  )}
                  <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border font-heading ${card.color.bg} ${card.color.text} ${card.color.border}`}>
                    {card.badge}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-slate-500 block uppercase tracking-wider font-heading">
                  {card.title}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading mt-1">
                  <AnimatedCounter value={card.value} />
                </h3>
                <span className="text-xs text-slate-500 font-sans mt-0.5 block">{card.subtitle}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Collection Progress Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#D4A017]/40 shadow-soft space-y-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#0F5132]/10 text-[#0F5132]">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-800 font-heading">Collection Progress</h3>
              <p className="text-xs text-slate-500 font-sans">Target Revenue vs Current Ticket Sales</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-heading">
            <div className="text-right">
              <span className="text-slate-500 block font-semibold">Collected</span>
              <span className="text-lg font-black text-[#0F5132]">{formatCurrency(stats.totalCollection)}</span>
            </div>
            <div className="text-right border-l border-amber-200/80 pl-4">
              <span className="text-slate-500 block font-semibold">Target Goal</span>
              <span className="text-lg font-black text-slate-800">{formatCurrency(targetAmount)}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar Component */}
        <ProgressBar
          progress={progressPercentage}
          label={`₹${settings?.entryFee || 150} Staff Ticket Pool Collection Progress`}
          valueText={`${formatCurrency(stats.totalCollection)} / ${formatCurrency(targetAmount)} (${progressPercentage.toFixed(1)}%)`}
          barClassName="bg-gradient-to-r from-[#0F5132] via-[#167448] to-[#D4A017]"
        />
      </motion.div>

      {/* Recent Payments Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-white rounded-3xl border border-amber-200/90 shadow-soft overflow-hidden space-y-0"
      >
        <div className="p-6 border-b border-amber-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-800 font-heading">Recent Payments</h3>
            <p className="text-xs text-slate-500 font-sans">Live incoming staff ticket transaction log</p>
          </div>
          <a href="/admin/tickets" className="text-xs font-bold text-[#0F5132] hover:text-amber-600 font-heading flex items-center gap-1">
            View All Transactions <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FFF9F0] border-b border-amber-100 text-slate-700 uppercase font-heading text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-6 py-4">Ticket Code</th>
                <th className="px-6 py-4">Participant Name</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Payment Time</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100/60 font-medium text-slate-700">
              {recentPayments.length > 0 ? (
                recentPayments.map((row) => (
                  <tr key={row._id || row.ticketCode} className="hover:bg-[#FFF9F0]/60 transition-colors">
                    <td className="px-6 py-4 font-black font-heading text-[#0F5132]">
                      {formatTicketId(row.ticketCode)}
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{row.purchaserName}</td>
                    <td className="px-6 py-4">{row.department}</td>
                    <td className="px-6 py-4 font-mono text-slate-500">{row.razorpayPaymentId}</td>
                    <td className="px-6 py-4 text-slate-500">{formatDate(row.purchasedAt)}</td>
                    <td className="px-6 py-4 font-extrabold text-[#0F5132]">{formatCurrency(row.ticketPrice)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 font-black text-[10px] uppercase tracking-wider font-heading border border-emerald-500/20 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-[#0F5132]" /> {row.paymentStatus.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-slate-500">No recent payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
