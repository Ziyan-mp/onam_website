import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Trophy, 
  Ticket, 
  FileText, 
  Settings, 
  Sparkles, 
  LogOut, 
  Menu, 
  Search, 
  Bell, 
  ShieldCheck, 
  GraduationCap,
  ChevronRight
} from 'lucide-react';
import { cn } from '../utils/cn';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Professional SaaS Admin Dashboard Layout
 */
export const AdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = React.useContext(AuthContext);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Manage Draws', href: '/admin/draws', icon: Trophy },
    { label: 'Tickets & Staff', href: '/admin/tickets', icon: Ticket },
    { label: 'Reports & Analytics', href: '/admin/reports', icon: FileText },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const sidebarContent = (
    <div className="h-full flex flex-col justify-between p-6 text-[#FFF9F0]">
      <div className="space-y-8">
        {/* Brand Header */}
        <Link to="/admin" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#D4A017] to-[#E5B83B] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#0A3722] rounded-[14px] flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#D4A017]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-black tracking-tight text-white uppercase font-heading">
                PONNONAM ADMIN
              </span>
            </div>
          </div>
        </Link>

        {/* Navigation Items */}
        <nav className="space-y-2 text-xs font-bold font-heading">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileSidebarOpen(false)}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-200 group',
                  isActive
                    ? 'bg-[#D4A017] text-[#0F5132] font-black shadow-md'
                    : 'text-amber-100/80 hover:bg-[#167448] hover:text-white'
                )}
              >
                <div className="flex items-center gap-3">
                  <IconComp className={cn('w-4 h-4 transition-transform group-hover:scale-110', isActive ? 'text-[#0F5132]' : 'text-[#D4A017]')} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-[#0F5132]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Admin Session & Sign Out */}
      <div className="pt-6 border-t border-[#167448] space-y-4">
        <div className="p-3.5 rounded-2xl bg-[#0A3722] border border-[#D4A017]/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#D4A017] text-[#0F5132] font-black flex items-center justify-center font-heading text-sm">
            AD
          </div>
          <div className="overflow-hidden text-xs">
            <span className="font-extrabold text-white block truncate font-heading">{user?.username === 'admin' ? 'Secretariat Admin' : user?.username}</span>
            <span className="text-[10px] text-amber-200/70 block truncate font-sans">admin@college.edu.in</span>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/admin/login');
          }}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-extrabold text-red-300 hover:bg-red-500/15 transition-colors font-heading border border-red-500/20"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFF9F0] text-slate-800 flex font-sans">
      {/* Desktop Dark Green Sidebar */}
      <aside className="w-64 bg-[#0F5132] border-r border-[#D4A017]/30 hidden lg:block shrink-0 shadow-lg">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 bottom-0 left-0 w-72 bg-[#0F5132] z-50 lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content & Top Header Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation Bar */}
        <header className="h-20 bg-white border-b border-amber-200/80 px-4 sm:px-8 flex items-center justify-between shadow-xs sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-[#FFF9F0] hover:text-[#0F5132]"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Quick Search Bar */}
            <div className="relative hidden sm:block w-64 md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search staff ID, ticket code..."
                className="w-full bg-[#FFF9F0] border border-amber-200/80 rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0F5132] focus:ring-2 focus:ring-[#0F5132]/20 shadow-xs"
              />
            </div>
          </div>

          {/* Top Right Status & Notification Pills */}
          <div className="flex items-center gap-3">


            {/* Notification Bell Badge */}
            <button className="p-2.5 rounded-2xl bg-[#FFF9F0] border border-amber-200 text-slate-700 hover:text-[#0F5132] relative shadow-xs">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#8B1E3F] rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        {/* Light Content Area Slot */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto bg-[#FFF9F0]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
