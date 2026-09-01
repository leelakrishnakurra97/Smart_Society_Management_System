import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { CreditCard, CheckCircle2, FileText, Download, ShieldCheck, Search, Filter } from 'lucide-react';

export const PaymentsView = ({ onOpenInvoice }) => {
  const { payments, bills, currentUser } = useSociety();
  const [searchTerm, setSearchTerm] = useState('');

  const isAdmin = currentUser?.role === 'admin';

  const filteredPayments = payments.filter(p => {
    return p.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.residentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           p.txnRef.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalCollectedAmount = payments.reduce((sum, p) => sum + p.amountPaid, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
            <CreditCard className="w-7 h-7 text-emerald-600" />
            <span>Society Payment Ledger & History</span>
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Audit payment transactions, download official tax receipts, and track collection history.
          </p>
        </div>

        {/* Total Ledger Collection Stat */}
        <div className="p-4 rounded-none bg-emerald-50 border border-emerald-300 flex items-center space-x-4 self-start sm:self-auto shadow-sm">
          <div className="p-2.5 rounded-none bg-emerald-600 text-white">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-emerald-900">Total Verified Collections</div>
            <div className="text-xl font-black text-emerald-700">₹{totalCollectedAmount.toLocaleString('en-IN')}</div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-none bg-white border border-slate-300 shadow-sm flex items-center justify-between">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Filter by Flat, Resident, Receipt or Txn ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-emerald-600 placeholder-slate-400"
          />
        </div>
        <div className="text-xs text-slate-600 font-bold hidden sm:block">
          Showing {filteredPayments.length} verified payment entries
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-none border border-slate-300 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase font-black text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-4">Receipt No</th>
                <th className="py-3.5 px-4">Invoice Ref</th>
                <th className="py-3.5 px-4">Flat Number</th>
                <th className="py-3.5 px-4">Resident Name</th>
                <th className="py-3.5 px-4">Payment Date</th>
                <th className="py-3.5 px-4">Payment Mode</th>
                <th className="py-3.5 px-4">Transaction Ref</th>
                <th className="py-3.5 px-4 text-right">Amount Paid</th>
                <th className="py-3.5 px-4 text-right">Receipt Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-12 text-center text-slate-500 font-bold">
                    No payment transaction records found matching your search.
                  </td>
                </tr>
              ) : (
                filteredPayments.map(pay => {
                  const billObj = bills.find(b => b.id === pay.billId) || {
                    id: pay.billId,
                    invoiceNo: pay.invoiceNo,
                    flatNumber: pay.flatNumber,
                    residentName: pay.residentName,
                    billPeriod: 'Period Record',
                    issueDate: pay.paymentDate,
                    dueDate: pay.paymentDate,
                    sqft: 1250,
                    sqftCharge: pay.amountPaid - 1650,
                    waterCharge: 400,
                    elevatorCharge: 350,
                    securityCharge: 600,
                    parkingCharge: 300,
                    debitNoteCharge: 0,
                    lateFee: 0,
                    totalAmount: pay.amountPaid,
                    status: 'PAID',
                    paidDate: pay.paymentDate,
                    paymentMethod: pay.paymentMode,
                    transactionId: pay.txnRef
                  };

                  return (
                    <tr key={pay.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-emerald-700">{pay.receiptNo}</td>
                      <td className="py-3.5 px-4 text-slate-800 font-semibold">{pay.invoiceNo}</td>
                      <td className="py-3.5 px-4 font-black text-slate-900">{pay.flatNumber}</td>
                      <td className="py-3.5 px-4 text-slate-800 font-semibold">{pay.residentName}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-medium">{pay.paymentDate}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-none bg-slate-100 border border-slate-300 text-slate-800 text-[10px] font-bold">
                          {pay.paymentMode} ({pay.provider || 'Gateway'})
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">{pay.txnRef}</td>
                      <td className="py-3.5 px-4 text-right font-black text-emerald-700 text-sm">
                        ₹{pay.amountPaid.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onOpenInvoice(billObj)}
                          className="px-3 py-1 rounded-none bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-300 font-bold text-xs transition-all flex items-center space-x-1.5 ml-auto"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>View Receipt</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
