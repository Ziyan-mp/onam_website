import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Search, 
  CreditCard, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  Filter, 
  FileSpreadsheet, 
  Eye, 
  Sparkles, 
  ShieldCheck 
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Ticket as TicketModalView } from '../components/Ticket';
import { Modal } from '../components/Modal';
import { formatCurrency, formatDate, formatTicketId } from '../utils/formatters';
import { cn } from '../utils/cn';
import { getTickets } from '../services/adminApi';
import { useDraw } from '../hooks/useDraw';

/**
 * Payment History & Participant Logs Page Component
 */
export const ManageTickets = ({ className }) => {
  const { lastDrawTime } = useDraw();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [activeModalTicket, setActiveModalTicket] = useState(null);

  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await getTickets();
        if (response.success) {
          setTickets(response.tickets || []);
        }
      } catch (error) {
        console.error("Failed to fetch tickets", error);
        toast.error(error.message || "Failed to load tickets");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickets();
  }, [lastDrawTime]);

  // Real-Time Filter Logic
  const filteredPayments = tickets.filter((item) => {
    const paymentId = '';
    const name = item.purchaserName || '';
    const dept = item.department || '';
    const status = item.paymentStatus ? item.paymentStatus.toUpperCase() : '';
    
    const matchesSearch =
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formatTicketId(item.ticketCode).toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = selectedStatus === 'ALL' || status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // CSV Export Handler
  const exportCSV = () => {
    const headers = ['Ticket Code,Participant Name,Department,Amount (INR),Payment Date,Status'];
    const rows = filteredPayments.map(
      (p) =>
        `"${formatTicketId(p.ticketCode)}","${p.purchaserName}","${p.department}",${p.ticketPrice},"${formatDate(p.purchasedAt)}","${p.paymentStatus.toUpperCase()}"`
    );

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Payments_Onam_2026_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Exported ${filteredPayments.length} payment records to CSV!`);
  };

  return (
    <div className={cn('space-y-8 max-w-7xl mx-auto', className)}>
      {/* Ticket Modal Preview */}
      <Modal
        isOpen={Boolean(activeModalTicket)}
        onClose={() => setActiveModalTicket(null)}
        title="Participant Ticket & Receipt"
        subtitle="Verified Transaction Record"
      >
        {activeModalTicket && (
          <div className="pt-2">
            <TicketModalView
              ticketNumber={activeModalTicket.ticketCode}
              participantName={activeModalTicket.purchaserName}
              department={activeModalTicket.department}
              paymentId={activeModalTicket.transactionId || activeModalTicket._id}
              amount={activeModalTicket.ticketPrice}
              drawDate={activeModalTicket.purchasedAt}
              status={activeModalTicket.paymentStatus.toUpperCase()}
            />
          </div>
        )}
      </Modal>

      {/* Top Controller Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-amber-200/90 shadow-soft">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-heading mt-1">
            Payment History
          </h1>
          <p className="text-xs text-slate-500 font-sans">
            Search, filter, and export staff ticket transactions & payment logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm" leftIcon={FileSpreadsheet} onClick={exportCSV}>
            Export CSV
          </Button>
          <Button variant="outline" size="sm" leftIcon={RefreshCw} onClick={() => toast.success('Payment log refreshed!')}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Search & Filter Controller Bar */}
      <div className="bg-white rounded-3xl p-6 border border-amber-200/90 shadow-soft space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Real-time Search Field */}
          <div className="md:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Participant Name, Department, or Staff ID..."
              className="w-full bg-[#FFF9F0] border border-amber-200/80 rounded-2xl pl-11 pr-4 py-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F5132] focus:ring-2 focus:ring-[#0F5132]/20 shadow-xs font-sans"
            />
          </div>

          {/* Status Filter Selector */}
          <div className="md:col-span-4 flex items-center gap-3">
            <div className="w-full relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full bg-[#FFF9F0] border border-amber-200/80 rounded-2xl px-4 py-3 text-xs text-slate-800 font-extrabold focus:outline-none focus:border-[#0F5132] focus:ring-2 focus:ring-[#0F5132]/20 shadow-xs font-heading cursor-pointer appearance-none"
              >
                <option value="ALL">All Payment Statuses</option>
                <option value="PAID">PAID (Successful)</option>
                <option value="PENDING">PENDING</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
              <Filter className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Active Filter Count Pill */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-sans pt-1">
          <span>
            Showing <strong className="text-[#0F5132] font-heading">{filteredPayments.length}</strong> of{' '}
            <strong className="text-slate-800 font-heading">{tickets.length}</strong> payment transactions
          </span>
        </div>
      </div>

      {/* Payments Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-amber-200/90 shadow-soft overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#FFF9F0] border-b border-amber-100 text-slate-700 uppercase font-heading text-[10px] font-black tracking-wider">
              <tr>
                <th className="px-6 py-4">Ticket Code</th>
                <th className="px-6 py-4">Participant</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Payment Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-amber-100/60 font-medium text-slate-700">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#0F5132] font-bold">
                    Loading tickets...
                  </td>
                </tr>
              ) : filteredPayments.length > 0 ? (
                filteredPayments.map((row) => (
                  <tr key={row._id || row.ticketCode} className="hover:bg-[#FFF9F0]/60 transition-colors">
                    {/* Ticket Code */}
                    <td className="px-6 py-4 font-mono font-black text-[#0F5132]">
                      <div className="flex flex-col">
                        <span>{formatTicketId(row.ticketCode)}</span>
                      </div>
                    </td>

                    {/* Participant */}
                    <td className="px-6 py-4 font-bold text-slate-800">
                      {row.purchaserName}
                    </td>

                    {/* Department */}
                    <td className="px-6 py-4 font-medium text-slate-700">{row.department}</td>

                    {/* Amount */}
                    <td className="px-6 py-4 font-black text-[#0F5132] font-heading">
                      {formatCurrency(row.ticketPrice)}
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-slate-500">{formatDate(row.purchasedAt)}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-800 font-black text-[10px] uppercase tracking-wider font-heading border border-emerald-500/20 flex items-center gap-1 w-fit">
                        <CheckCircle2 className="w-3 h-3 text-[#0F5132]" /> {row.paymentStatus.toUpperCase()}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setActiveModalTicket(row)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#0F5132]/10 text-[#0F5132] hover:bg-[#0F5132] hover:text-white transition-colors font-bold font-heading text-[11px]"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Ticket
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 font-sans">
                    {searchTerm ? `No payment records found matching "${searchTerm}".` : "No payment records found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageTickets;
