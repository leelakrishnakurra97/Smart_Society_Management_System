import React from 'react';
import { Modal } from './Modal';
import { Printer, Download, CheckCircle, Building2, ShieldCheck } from 'lucide-react';

export const InvoiceModal = ({ isOpen, onClose, bill }) => {
  if (!bill) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Maintenance Invoice Receipt - ${bill.invoiceNo}`} maxWidth="max-w-3xl">
      <div className="space-y-6">

        {/* Action Toolbar (Hidden when printing) */}
        <div className="no-print flex items-center justify-between p-3 rounded-none bg-slate-100 border border-slate-300">
          <div className="text-xs font-bold text-slate-700">
            Official Maintenance Tax Invoice & Payment Proof
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center space-x-2 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF Receipt</span>
          </button>
        </div>

        {/* Printable Receipt Container */}
        <div id="printable-invoice" className="p-8 rounded-none bg-white border border-slate-300 text-slate-900 font-sans space-y-6 shadow-sm">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center space-x-2">
                <Building2 className="w-6 h-6 text-indigo-600" />
                <span className="text-xl font-black tracking-tight text-slate-900">Smart Society Residency & Heights</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-sm font-semibold">
                Plot 42, Sector 18, Palm Beach Road, Navi Mumbai - 400706<br />
                Reg No: HSG/NMB/2021/8492 • Email: secretary@smartsociety.org
              </p>
            </div>

            <div className="text-right">
              <span className={`inline-block px-3 py-1 rounded-none text-xs font-black tracking-wider uppercase ${
                bill.status === 'PAID' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                bill.status === 'OVERDUE' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                'bg-amber-100 text-amber-800 border border-amber-300'
              }`}>
                {bill.status}
              </span>
              <div className="text-sm font-black text-slate-800 mt-2">{bill.invoiceNo}</div>
              <div className="text-xs text-slate-500 font-semibold">Issue Date: {bill.issueDate}</div>
              <div className="text-xs text-slate-500 font-semibold">Due Date: {bill.dueDate}</div>
            </div>
          </div>

          {/* Resident & Billing Meta Grid */}
          <div className="grid grid-cols-2 gap-6 p-4 rounded-none bg-slate-50 border border-slate-200 text-xs">
            <div>
              <div className="text-slate-500 uppercase font-black text-[10px] tracking-wider mb-1">Billed To Resident</div>
              <div className="text-sm font-black text-slate-900">{bill.residentName}</div>
              <div className="text-slate-700 font-semibold">Flat Number: <span className="font-black text-indigo-700">{bill.flatNumber}</span></div>
              <div className="text-slate-500 font-semibold">Carpet Area: {bill.sqft} Sq. Ft.</div>
            </div>

            <div className="text-right">
              <div className="text-slate-500 uppercase font-black text-[10px] tracking-wider mb-1">Bill Period Details</div>
              <div className="text-sm font-black text-indigo-700">{bill.billPeriod}</div>
              {bill.status === 'PAID' && (
                <>
                  <div className="text-slate-700 font-semibold">Paid On: <span className="font-bold">{bill.paidDate}</span></div>
                  <div className="text-slate-500 font-semibold">Method: {bill.paymentMethod || 'Online'}</div>
                  <div className="text-slate-500 font-mono">Ref: {bill.transactionId}</div>
                </>
              )}
            </div>
          </div>

          {/* Itemized Charges Table */}
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-300 text-slate-600 uppercase font-black text-[10px] bg-slate-100">
                <th className="py-2.5 px-3">Description / Charge Particulars</th>
                <th className="py-2.5 px-3 text-right">Calculation Basis</th>
                <th className="py-2.5 px-3 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-800">
              <tr>
                <td className="py-2.5 px-3 font-semibold">Base Maintenance Charge</td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-semibold">{bill.sqft} sqft @ ₹2.50/sqft</td>
                <td className="py-2.5 px-3 text-right font-bold">₹{bill.sqftCharge.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Water Supply & Storage Charge</td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-semibold">Fixed Monthly Flat Rate</td>
                <td className="py-2.5 px-3 text-right font-bold">₹{bill.waterCharge.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Elevator AMC & Power Operating Fund</td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-semibold">Fixed Monthly Flat Rate</td>
                <td className="py-2.5 px-3 text-right font-bold">₹{bill.elevatorCharge.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Security Guard Personnel & CCTV</td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-semibold">24/7 Gate Protection</td>
                <td className="py-2.5 px-3 text-right font-bold">₹{bill.securityCharge.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold">Covered Parking Bay Maintenance</td>
                <td className="py-2.5 px-3 text-right text-slate-500 font-semibold">Allocated Parking Bay</td>
                <td className="py-2.5 px-3 text-right font-bold">₹{bill.parkingCharge.toLocaleString('en-IN')}</td>
              </tr>
              {bill.debitNoteCharge > 0 && (
                <tr className="bg-amber-50">
                  <td className="py-2.5 px-3 font-bold text-amber-900">
                    Special Debit Note: {bill.debitNoteReason || 'Society Special Fund'}
                  </td>
                  <td className="py-2.5 px-3 text-right text-amber-800 font-semibold">Approved Debit Note</td>
                  <td className="py-2.5 px-3 text-right font-black text-amber-900">₹{bill.debitNoteCharge.toLocaleString('en-IN')}</td>
                </tr>
              )}
              {bill.lateFee > 0 && (
                <tr className="bg-rose-50">
                  <td className="py-2.5 px-3 font-bold text-rose-900">Late Payment Administrative Fee</td>
                  <td className="py-2.5 px-3 text-right text-rose-800 font-semibold">Post Due Date Penalty</td>
                  <td className="py-2.5 px-3 text-right font-black text-rose-900">₹{bill.lateFee.toLocaleString('en-IN')}</td>
                </tr>
              )}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-300 text-sm font-black bg-slate-50">
                <td colSpan="2" className="py-3 px-3 text-right text-slate-800 uppercase tracking-wider text-xs">Total Bill Amount Payable</td>
                <td className="py-3 px-3 text-right text-indigo-700 text-base font-black">₹{bill.totalAmount.toLocaleString('en-IN')}</td>
              </tr>
            </tfoot>
          </table>

          {/* Footer & Digital Seal */}
          <div className="flex justify-between items-end pt-4 border-t border-slate-200 text-xs text-slate-500">
            <div className="space-y-1">
              <div className="flex items-center space-x-1.5 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Digitally Verified & System Generated Invoice</span>
              </div>
              <p className="text-[11px] text-slate-500 max-w-sm font-semibold">
                Computer-generated maintenance voucher. No manual signature required under Smart Society Bylaws Clause 14B.
              </p>
            </div>

            <div className="text-center font-bold">
              <div className="w-24 h-12 border border-slate-300 rounded-none flex items-center justify-center mb-1 text-[10px] text-slate-400 uppercase tracking-widest bg-slate-50">
                OFFICIAL SEAL
              </div>
              <div className="text-slate-800 text-[11px] font-black">Society Treasurer</div>
            </div>
          </div>

        </div>

      </div>
    </Modal>
  );
};
