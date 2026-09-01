import React, { useState } from 'react';
import { SocietyProvider, useSociety } from './context/SocietyContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { PaymentModal } from './components/PaymentModal';
import { InvoiceModal } from './components/InvoiceModal';
import { AuthView } from './views/AuthView';
import { HomePage } from './views/HomePage';
import { DashboardView } from './views/DashboardView';
import { MaintenanceView } from './views/MaintenanceView';
import { PaymentsView } from './views/PaymentsView';
import { ComplaintsView } from './views/ComplaintsView';
import { HallBookingView } from './views/HallBookingView';
import { NoticeBoardView } from './views/NoticeBoardView';
import { DirectoryView } from './views/DirectoryView';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const MainLayout = () => {
  const { currentUser, authLoading, activeTab, notification } = useSociety();
  const [showHome, setShowHome] = useState(true);

  // Modals state
  const [selectedPaymentBill, setSelectedPaymentBill] = useState(null);
  const [selectedInvoiceBill, setSelectedInvoiceBill] = useState(null);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center space-y-4 text-slate-800 font-sans">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-none animate-spin"></div>
        <p className="text-sm font-bold tracking-wide text-slate-700">Connecting to Smart Society API Server...</p>
      </div>
    );
  }

  // Show HomePage if not logged in and user hasn't clicked "Get Started" yet
  if (!currentUser && showHome) {
    return <HomePage onGetStarted={() => setShowHome(false)} />;
  }

  if (!currentUser) {
    return <AuthView />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Toast Notification Container */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className={`px-4 py-3 rounded-none shadow-xl border flex items-center space-x-3 text-xs font-bold ${
            notification.type === 'error'
              ? 'bg-rose-50 text-rose-900 border-rose-400 shadow-rose-100'
              : 'bg-emerald-50 text-emerald-950 border-emerald-500 shadow-emerald-100'
          }`}>
            {notification.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
            <span>{notification.message}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar />

      {/* Body Area */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto">
        
        {/* Left Sidebar Menu */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardView
              onOpenPayment={(bill) => setSelectedPaymentBill(bill)}
              onOpenInvoice={(bill) => setSelectedInvoiceBill(bill)}
            />
          )}

          {activeTab === 'maintenance' && (
            <MaintenanceView
              onOpenPayment={(bill) => setSelectedPaymentBill(bill)}
              onOpenInvoice={(bill) => setSelectedInvoiceBill(bill)}
            />
          )}

          {activeTab === 'payments' && (
            <PaymentsView
              onOpenInvoice={(bill) => setSelectedInvoiceBill(bill)}
            />
          )}

          {activeTab === 'complaints' && <ComplaintsView />}

          {activeTab === 'bookings' && <HallBookingView />}

          {activeTab === 'notices' && <NoticeBoardView />}

          {activeTab === 'directory' && <DirectoryView />}
        </main>

      </div>

      {/* Interactive Payment Checkout Modal */}
      <PaymentModal
        isOpen={Boolean(selectedPaymentBill)}
        onClose={() => setSelectedPaymentBill(null)}
        bill={selectedPaymentBill}
      />

      {/* Printable Invoice Receipt Modal */}
      <InvoiceModal
        isOpen={Boolean(selectedInvoiceBill)}
        onClose={() => setSelectedInvoiceBill(null)}
        bill={selectedInvoiceBill}
      />

    </div>
  );
};

export default function App() {
  return (
    <SocietyProvider>
      <MainLayout />
    </SocietyProvider>
  );
}
