import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

/**
 * Main Public Layout Wrapper Shell for Onam Lucky Draw 2026
 */
export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-500 selection:text-slate-950">
      {/* Persistent Event Navbar */}
      <Navbar />

      {/* Main Page Content Slot */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Persistent Event Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
