import React from 'react';
import { useSociety } from '../context/SocietyContext';
import {
  DollarSign,
  AlertCircle,
  CalendarCheck,
  Megaphone,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  Building,
  CreditCard,
  PlusCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const DashboardView = ({ onOpenPayment, onOpenInvoice }) => {
  const { currentUser, bills, complaints, bookings, notices, flats, setActiveTab } = useSociety();

  const isAdmin = currentUser?.role === 'admin';

  // Metrics Calculations
  const totalBillsCount = bills.length;
  const paidBills = bills.filter(b => b.status === 'PAID');
  const pendingBills = bills.filter(b => b.status === 'PENDING');
  const overdueBills = bills.filter(b => b.status === 'OVERDUE');

  const totalCollected = paidBills.reduce((sum, b) => sum + b.totalAmount, 0);
  const totalPendingDues = [...pendingBills, ...overdueBills].reduce((sum, b) => sum + b.totalAmount, 0);

  const openComplaintsCount = complaints.filter(c => c.status !== 'Resolved').length;
  const pendingBookingsCount = bookings.filter(b => b.status === 'Pending').length;

  // Personal Resident Bills
  const myBills = bills.filter(b => b.flatNumber === currentUser?.flatNumber);
  const myPendingBill = myBills.find(b => b.status === 'PENDING' || b.status === 'OVERDUE');
  const myComplaints = complaints.filter(c => c.flatNumber === currentUser?.flatNumber);
  const myBookings = bookings.filter(b => b.flatNumber === currentUser?.flatNumber);

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-none bg-white border border-slate-300 p-6 lg:p-8 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`text-xs font-black px-3 py-1 rounded-none uppercase tracking-wider ${
                isAdmin ? 'bg-indigo-100 text-indigo-800 border border-indigo-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {isAdmin ? 'Society Secretary Administration' : `Resident Dashboard • Flat ${currentUser?.flatNumber || 'A-402'}`}
              </span>
              <span className="text-xs text-slate-500 font-bold">August 2026</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Welcome back, {currentUser?.name || 'User'}
            </h1>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl font-semibold leading-relaxed">
              {isAdmin
                ? 'Central Executive Portal • Monitor maintenance revenues, process service tickets, authorize facility reservations, and issue digital society notices.'
                : 'Resident Self-Service Portal • Access monthly maintenance statements, submit service requests, reserve society amenities, and stay informed on community updates.'}
            </p>
          </div>

          {/* Quick Primary Action */}
          <div className="shrink-0 flex items-center space-x-3">
            {isAdmin ? (
              <button
                onClick={() => setActiveTab('maintenance')}
                className="px-5 py-3 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Generate Monthly Bills</span>
              </button>
            ) : myPendingBill ? (
              <button
                onClick={() => onOpenPayment(myPendingBill)}
                className="px-5 py-3 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Due Bill (₹{myPendingBill.totalAmount.toLocaleString('en-IN')})</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('bookings')}
                className="px-5 py-3 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Event Hall</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Collection / Pending */}
        <div className="bg-white p-5 rounded-none border border-slate-300 shadow-sm glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
              {isAdmin ? 'Total Dues Pending' : 'Current Due Status'}
            </span>
            <div className="p-2 rounded-none bg-amber-100 text-amber-800 border border-amber-300">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">
              ₹{isAdmin ? totalPendingDues.toLocaleString('en-IN') : (myPendingBill ? myPendingBill.totalAmount.toLocaleString('en-IN') : '0')}
            </div>
            <div className="text-xs text-slate-600 font-bold mt-1 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>{isAdmin ? `${pendingBills.length + overdueBills.length} flats pending` : (myPendingBill ? `Due by ${myPendingBill.dueDate}` : 'All bills paid!')}</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Total Collection */}
        <div className="bg-white p-5 rounded-none border border-slate-300 shadow-sm glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Total Collection</span>
            <div className="p-2 rounded-none bg-emerald-100 text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-emerald-700">
              ₹{totalCollected.toLocaleString('en-IN')}
            </div>
            <div className="text-xs text-slate-600 font-bold mt-1">
              {paidBills.length} out of {totalBillsCount} bills settled
            </div>
          </div>
        </div>

        {/* Metric 3: Complaints Desk */}
        <div className="bg-white p-5 rounded-none border border-slate-300 shadow-sm glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Active Complaints</span>
            <div className="p-2 rounded-none bg-rose-100 text-rose-800 border border-rose-300">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">
              {isAdmin ? openComplaintsCount : myComplaints.filter(c => c.status !== 'Resolved').length}
            </div>
            <div className="text-xs text-slate-600 font-bold mt-1">
              {isAdmin ? 'Require admin response/staff' : 'Pending resolution timeline'}
            </div>
          </div>
        </div>

        {/* Metric 4: Hall Bookings */}
        <div className="bg-white p-5 rounded-none border border-slate-300 shadow-sm glass-card-hover">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-500 uppercase tracking-wider">Hall Bookings</span>
            <div className="p-2 rounded-none bg-cyan-100 text-cyan-800 border border-cyan-300">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">
              {isAdmin ? pendingBookingsCount : myBookings.length}
            </div>
            <div className="text-xs text-slate-600 font-bold mt-1">
              {isAdmin ? 'Pending approvals' : 'Total hall bookings'}
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2-Cols: Recent Billing & Actions */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Bills Status Widget */}
          <div className="bg-white p-6 rounded-none border border-slate-300 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  {isAdmin ? 'Maintenance Collections & Dues Overview' : 'My Flat Maintenance Bills'}
                </h3>
                <p className="text-xs text-slate-500 font-semibold">Automated monthly billing records</p>
              </div>

              <button
                onClick={() => setActiveTab('maintenance')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>View All Bills</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-slate-100 text-slate-600 uppercase font-black text-[10px] border-b border-slate-200">
                    <th className="py-2.5 px-3">Invoice No</th>
                    <th className="py-2.5 px-3">Flat & Resident</th>
                    <th className="py-2.5 px-3">Period</th>
                    <th className="py-2.5 px-3 text-right">Amount</th>
                    <th className="py-2.5 px-3 text-center">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {(isAdmin ? bills.slice(0, 5) : myBills).map(bill => (
                    <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">{bill.invoiceNo}</td>
                      <td className="py-3 px-3 text-slate-800 font-semibold">
                        <div>{bill.residentName}</div>
                        <div className="text-[10px] text-slate-500 font-bold">{bill.flatNumber}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium">{bill.billPeriod}</td>
                      <td className="py-3 px-3 text-right font-black text-indigo-700">
                        ₹{bill.totalAmount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-none text-[10px] font-black uppercase ${
                          bill.status === 'PAID' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          bill.status === 'OVERDUE' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                          'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}>
                          {bill.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-2">
                        {bill.status !== 'PAID' ? (
                          <button
                            onClick={() => onOpenPayment(bill)}
                            className="px-2.5 py-1 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-all shadow-sm"
                          >
                            Pay Now
                          </button>
                        ) : (
                          <button
                            onClick={() => onOpenInvoice(bill)}
                            className="px-2.5 py-1 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-[11px] transition-all"
                          >
                            Receipt
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Hall Bookings / Requests */}
          <div className="bg-white p-6 rounded-none border border-slate-300 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">Society Clubhouse & Hall Bookings</h3>
                <p className="text-xs text-slate-500 font-semibold">Events for birthdays, ring ceremonies & festivals</p>
              </div>

              <button
                onClick={() => setActiveTab('bookings')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1"
              >
                <span>Book Venue</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {bookings.slice(0, 3).map(bk => (
                <div key={bk.id} className="p-3.5 rounded-none bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-black text-slate-900">{bk.eventTitle}</div>
                    <div className="text-xs text-slate-600 mt-0.5 font-medium">
                      {bk.venue} • <span className="text-slate-900 font-bold">{bk.bookingDate}</span> ({bk.timeSlot})
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-none uppercase ${
                      bk.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      bk.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {bk.status}
                    </span>
                    <div className="text-xs text-slate-500 mt-1 font-bold">Flat {bk.flatNumber}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1-Col: Announcements & Door-to-Door Replacement Broadcasts */}
        <div className="space-y-6">
          
          <div className="bg-white p-6 rounded-none border border-slate-300 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Megaphone className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-black text-slate-900">Society Notice Board</h3>
              </div>
              <button
                onClick={() => setActiveTab('notices')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {notices.slice(0, 3).map(not => (
                <div key={not.id} className="p-4 rounded-none bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-none uppercase ${
                      not.priority === 'Urgent' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      'bg-indigo-100 text-indigo-800 border border-indigo-300'
                    }`}>
                      {not.priority}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">{not.datePosted}</span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 leading-snug">{not.title}</h4>
                  <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed font-medium">{not.content}</p>

                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
                    <span>By: {not.postedBy}</span>
                    <span className="text-emerald-700 font-black">RSVP: {not.rsvpCount} Flats</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
