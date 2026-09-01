import React from 'react';
import { useSociety } from '../context/SocietyContext';
import {
  LayoutDashboard,
  Calculator,
  CreditCard,
  AlertCircle,
  CalendarCheck,
  Megaphone,
  Users,
  Building,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const Sidebar = () => {
  const { activeTab, setActiveTab, currentUser, complaints, bills, bookings, notices } = useSociety();

  // Metric counts for badges
  const pendingBillsCount = bills.filter(b => b.status === 'PENDING' || b.status === 'OVERDUE').length;
  const activeComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      color: 'indigo'
    },
    {
      id: 'maintenance',
      label: 'Maintenance & Billing',
      icon: Calculator,
      badge: pendingBillsCount > 0 ? `${pendingBillsCount} Due` : null,
      badgeColor: 'amber',
      color: 'indigo'
    },
    {
      id: 'payments',
      label: 'Payment Ledger',
      icon: CreditCard,
      badge: null,
      color: 'emerald'
    },
    {
      id: 'complaints',
      label: 'Complaints Desk',
      icon: AlertCircle,
      badge: activeComplaintsCount > 0 ? activeComplaintsCount : null,
      badgeColor: 'rose',
      color: 'rose'
    },
    {
      id: 'bookings',
      label: 'Hall & Event Booking',
      icon: CalendarCheck,
      badge: pendingBookingsCount > 0 && currentUser?.role === 'admin' ? `${pendingBookingsCount} Req` : null,
      badgeColor: 'cyan',
      color: 'cyan'
    },
    {
      id: 'notices',
      label: 'Notice Board & Messaging',
      icon: Megaphone,
      badge: notices.length > 0 ? notices.length : null,
      badgeColor: 'indigo',
      color: 'indigo'
    },
    {
      id: 'directory',
      label: 'Member & Flat Directory',
      icon: Users,
      badge: null,
      color: 'indigo'
    }
  ];

  return (
    <aside className="w-full lg:w-64 shrink-0 bg-white lg:min-h-[calc(100vh-65px)] border-r border-slate-200 p-4 font-sans shadow-sm">
      
      {/* Role Indicator Banner */}
      <div className="mb-6 p-3.5 rounded-none bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Context</span>
          <span className={`text-[10px] font-black px-2 py-0.5 rounded-none uppercase tracking-wider ${
            currentUser?.role === 'admin'
              ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
              : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
          }`}>
            {currentUser?.role || 'Guest'}
          </span>
        </div>
        <div className="mt-2 text-sm font-black text-slate-900 flex items-center space-x-2">
          {currentUser?.role === 'admin' ? (
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
          ) : (
            <Building className="w-4 h-4 text-emerald-600 shrink-0" />
          )}
          <span className="truncate">{currentUser?.role === 'admin' ? 'Secretary Office' : `Flat ${currentUser?.flatNumber || 'A-402'}`}</span>
        </div>
      </div>

      {/* Navigation Menu Links */}
      <div className="space-y-1.5">
        <div className="px-3 pb-2 text-[11px] font-black uppercase tracking-wider text-slate-400">
          Core Modules
        </div>

        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-none font-bold text-sm transition-all duration-150 group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-600'
                }`} />
                <span>{item.label}</span>
              </div>

              {item.badge ? (
                <span className={`text-[11px] font-black px-2 py-0.5 rounded-none ${
                  item.badgeColor === 'amber' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  item.badgeColor === 'rose' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                  item.badgeColor === 'cyan' ? 'bg-cyan-100 text-cyan-800 border border-cyan-300' :
                  'bg-indigo-100 text-indigo-800 border border-indigo-300'
                }`}>
                  {item.badge}
                </span>
              ) : (
                <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isActive ? 'opacity-100 text-white' : 'text-slate-400'}`} />
              )}
            </button>
          );
        })}
      </div>

    </aside>
  );
};
