import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import { PageLoader } from '../components/Loader';

// Lazy Loaded Public Pages (Route Code Splitting)
const HomePage = lazy(() => import('../pages/HomePage'));
const DrawsPage = lazy(() => import('../pages/DrawsPage'));
const PrizesPage = lazy(() => import('../pages/PrizesPage'));
const TicketCheckoutPage = lazy(() => import('../pages/TicketCheckoutPage'));
const PaymentSuccessPage = lazy(() => import('../pages/PaymentSuccessPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Lazy Loaded Admin Views & Login
const AdminLogin = lazy(() => import('../admin/AdminLogin'));
const AdminDashboard = lazy(() => import('../admin/AdminDashboard'));
const ManageDraws = lazy(() => import('../admin/ManageDraws'));
const ManageTickets = lazy(() => import('../admin/ManageTickets'));
const AdminReports = lazy(() => import('../admin/AdminReports'));
const AdminSettings = lazy(() => import('../admin/AdminSettings'));

/**
 * Optimized React Router DOM Shell with Lazy Loading & Route Code Splitting
 */
export const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader message="Loading Secretariat Portal..." />}>
      <Routes>
        {/* Public Event Portal Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="draws" element={<DrawsPage />} />
          <Route path="prizes" element={<PrizesPage />} />
          <Route path="checkout" element={<TicketCheckoutPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>

        {/* Standalone Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Panel Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="draws" element={<ManageDraws />} />
          <Route path="tickets" element={<ManageTickets />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        {/* 404 Catch All */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
