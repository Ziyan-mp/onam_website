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
import { formatCurrency } from '../utils/formatters';
import { cn } from '../utils/cn';
import { getReports } from '../services/adminApi';
import { useDraw } from '../hooks/useDraw';

/**
 * Modern SaaS Admin Reports & Analytics Dashboard Component
 */
export const AdminReports = ({ className }) => {
  const { lastDrawTime } = useDraw();
  const [stats, setStats] = React.useState({
    totalCollection: 0,
    totalParticipants: 0,
    targetAmount: 150000,
  });
  const [departmentData, setDepartmentData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await getReports();
        if (response.success) {
          setStats(response.stats);

          // Map backend data to UI colors
          const colorMap = ['bg-[#0F5132]', 'bg-[#167448]', 'bg-[#D4A017]', 'bg-[#8B1E3F]'];
          const mappedData = response.departmentData.map((dept, index) => ({
            name: dept.name,
            count: dept.count,
            percentage: dept.percentage,
            color: colorMap[index % colorMap.length]
          }));
          setDepartmentData(mappedData);
        }
      } catch (error) {
        console.error("Failed to fetch reports", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReports();
  }, [lastDrawTime]);

  const progressPercentage = stats.targetAmount > 0 ? (stats.totalCollection / stats.targetAmount) * 100 : 0;

  const handleExportPDF = () => {
    toast.success('Generating official Secretariat PDF report...');
    setTimeout(() => {
      window.print();
    }, 800);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-[#0F5132] font-bold">Loading reports...</div>;
  }

  return (
    <div className={cn('space-y-8 max-w-7xl mx-auto', className)}>
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-soft">
        <div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Total Collection</span>
            <Coins className="w-5 h-5 text-[#0F5132]" />
          </div>
          <h3 className="text-3xl font-black text-[#0F5132] font-heading">{formatCurrency(stats.totalCollection)}</h3>
          <span className="text-xs text-slate-500 font-sans">From {stats.totalParticipants} Paid Tickets</span>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-heading">Total Participants</span>
            <Users className="w-5 h-5 text-[#D4A017]" />
          </div>
          <h3 className="text-3xl font-black text-slate-800 font-heading">{stats.totalParticipants} Staff</h3>
          <span className="text-xs text-slate-500 font-sans">Across 6 College Depts</span>
        </motion.div>
      </div>



      {/* Participants Per Department Visual Chart */}
      <div className="grid grid-cols-1 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/90 shadow-soft space-y-6"
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
            <span className="text-xs font-bold text-slate-500 font-heading">{stats.totalParticipants} Staff</span>
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
                    style={{ width: `${dept.percentage}%` }}
                  />
                </div>
              </div>
            ))}
            {departmentData.length === 0 && (
              <div className="py-4 text-center text-slate-500 font-sans text-xs">
                No department distribution data available yet.
              </div>
            )}
          </div>
        </motion.div>
      </div>


    </div>
  );
};

export default AdminReports;
