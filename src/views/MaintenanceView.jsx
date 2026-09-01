import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { Calculator, PlusCircle, Filter, DollarSign, FileText, CheckCircle2, Clock, AlertTriangle, Settings, ArrowRight } from 'lucide-react';
import { Modal } from '../components/Modal';

export const MaintenanceView = ({ onOpenPayment, onOpenInvoice }) => {
  const { currentUser, bills, maintenanceConfig, generateMaintenanceBills } = useSociety();
  const isAdmin = currentUser?.role === 'admin';

  // Filters & State
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  // Generate Bill Form State
  const [billPeriod, setBillPeriod] = useState('September 2026');
  const [dueDate, setDueDate] = useState('2026-09-15');
  const [debitNoteCharge, setDebitNoteCharge] = useState('');
  const [debitNoteReason, setDebitNoteReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered Bills
  const filteredBills = bills.filter(b => {
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    const matchesSearch = b.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleGenerateSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await generateMaintenanceBills({
        billPeriod,
        dueDate,
        debitNoteCharge: Number(debitNoteCharge) || 0,
        debitNoteReason
      });
      setIsSubmitting(false);
      setIsGenerateModalOpen(false);
      setDebitNoteCharge('');
      setDebitNoteReason('');
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
            <Calculator className="w-7 h-7 text-indigo-600" />
            <span>Automated Monthly Maintenance & Billing</span>
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Calculate maintenance charges by sq. ft. area, fixed utilities, and generate special debit notes.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsGenerateModalOpen(true)}
            className="px-5 py-2.5 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Generate Period Bills / Debit Notes</span>
          </button>
        )}
      </div>

      {/* Maintenance Rate Formula Overview Banner */}
      <div className="p-5 rounded-none bg-white border border-slate-300 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center shadow-sm">
        <div className="p-3 rounded-none bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Area Charge</div>
          <div className="text-sm font-black text-indigo-700 mt-0.5">₹{maintenanceConfig.sqftRate}/sqft</div>
        </div>
        <div className="p-3 rounded-none bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Water Charge</div>
          <div className="text-sm font-black text-slate-800 mt-0.5">₹{maintenanceConfig.fixedWaterCharge}</div>
        </div>
        <div className="p-3 rounded-none bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Elevator AMC</div>
          <div className="text-sm font-black text-slate-800 mt-0.5">₹{maintenanceConfig.elevatorCharge}</div>
        </div>
        <div className="p-3 rounded-none bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Security</div>
          <div className="text-sm font-black text-slate-800 mt-0.5">₹{maintenanceConfig.securityCharge}</div>
        </div>
        <div className="p-3 rounded-none bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Parking</div>
          <div className="text-sm font-black text-slate-800 mt-0.5">₹{maintenanceConfig.parkingCharge}</div>
        </div>
        <div className="p-3 rounded-none bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-500 font-black uppercase tracking-wider">Late Penalty</div>
          <div className="text-sm font-black text-rose-600 mt-0.5">₹{maintenanceConfig.lateFeeAmount}</div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-none bg-white border border-slate-300 shadow-sm">
        
        {/* Search */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by Flat, Resident, Invoice..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 placeholder-slate-400"
          />
        </div>

        {/* Status Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'PENDING', 'OVERDUE', 'PAID'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3.5 py-1.5 rounded-none text-xs font-black transition-all ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {/* Bills Ledger Table */}
      <div className="bg-white rounded-none border border-slate-300 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase font-black text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-4">Invoice No</th>
                <th className="py-3.5 px-4">Flat Number</th>
                <th className="py-3.5 px-4">Resident Name</th>
                <th className="py-3.5 px-4">Period</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4 text-right">Sq. Ft. Charge</th>
                <th className="py-3.5 px-4 text-right">Debit Note</th>
                <th className="py-3.5 px-4 text-right">Total Amount</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredBills.length === 0 ? (
                <tr>
                  <td colSpan="10" className="py-12 text-center text-slate-500 font-bold">
                    No maintenance bills found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredBills.map(bill => (
                  <tr key={bill.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-indigo-700">{bill.invoiceNo}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">{bill.flatNumber}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{bill.residentName}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{bill.billPeriod}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-semibold">{bill.dueDate}</td>
                    <td className="py-3.5 px-4 text-right text-slate-800 font-bold">
                      ₹{bill.sqftCharge.toLocaleString('en-IN')} <span className="text-[10px] text-slate-500 font-normal">({bill.sqft} sqft)</span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {bill.debitNoteCharge > 0 ? (
                        <span className="text-amber-800 font-black">₹{bill.debitNoteCharge}</span>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-indigo-700 text-sm">
                      ₹{bill.totalAmount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-none text-[10px] font-black tracking-wider ${
                        bill.status === 'PAID' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        bill.status === 'OVERDUE' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {bill.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-2">
                      {bill.status !== 'PAID' ? (
                        <button
                          onClick={() => onOpenPayment(bill)}
                          className="px-3 py-1.5 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          Pay Bill
                        </button>
                      ) : (
                        <button
                          onClick={() => onOpenInvoice(bill)}
                          className="px-3 py-1.5 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs transition-all"
                        >
                          Invoice
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Bill Generator Modal */}
      <Modal isOpen={isGenerateModalOpen} onClose={() => setIsGenerateModalOpen(false)} title="Calculate & Generate Monthly Maintenance Bills" maxWidth="max-w-xl">
        <form onSubmit={handleGenerateSubmit} className="space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Billing Period</label>
              <input
                type="text"
                required
                value={billPeriod}
                onChange={(e) => setBillPeriod(e.target.value)}
                placeholder="e.g. September 2026"
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Payment Due Date</label>
              <input
                type="date"
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="p-4 rounded-none bg-amber-50 border border-amber-200 space-y-3">
            <div className="text-xs font-black text-amber-900 uppercase tracking-wider">Optional Debit Note / Special Purpose Charge</div>
            <div>
              <label className="block text-xs text-slate-700 font-bold mb-1">Debit Amount (₹ per flat)</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={debitNoteCharge}
                onChange={(e) => setDebitNoteCharge(e.target.value)}
                className="w-full px-3.5 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-700 font-bold mb-1">Debit Note Purpose / Description</label>
              <input
                type="text"
                placeholder="e.g. Elevator Overhaul & Festival Celebration Fund"
                value={debitNoteReason}
                onChange={(e) => setDebitNoteReason(e.target.value)}
                className="w-full px-3.5 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsGenerateModalOpen(false)}
              className="px-4 py-2 rounded-none border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black shadow-sm flex items-center space-x-2"
            >
              {isSubmitting ? <span>Calculating...</span> : <span>Generate Bills Across All Flats</span>}
            </button>
          </div>

        </form>
      </Modal>

    </div>
  );
};
