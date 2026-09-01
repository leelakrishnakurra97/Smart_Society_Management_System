import React, { useState } from 'react';
import { Modal } from './Modal';
import { useSociety } from '../context/SocietyContext';
import { CreditCard, QrCode, Building, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

export const PaymentModal = ({ isOpen, onClose, bill }) => {
  const { checkoutPayment } = useSociety();
  const [paymentMode, setPaymentMode] = useState('UPI'); // UPI, CARD, NETBANKING
  const [provider, setProvider] = useState('Google Pay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!bill) return null;

  const handlePaySubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const payload = {
        billId: bill.id,
        paymentMode,
        provider: paymentMode === 'UPI' ? provider : paymentMode === 'CARD' ? 'Visa / MasterCard' : 'NetBanking HDFC',
        txnRef: `TXN${Date.now().toString().slice(-8)}`
      };

      await checkoutPayment(payload);
      setIsProcessing(false);
      onClose();
    } catch (err) {
      setIsProcessing(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Pay Maintenance Bill - ${bill.billPeriod}`} maxWidth="max-w-xl">
      <div className="space-y-6">
        
        {/* Bill Summary Banner */}
        <div className="p-4 rounded-none bg-indigo-50 border border-indigo-200 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Invoice No</div>
            <div className="text-sm font-black text-slate-900">{bill.invoiceNo}</div>
            <div className="text-xs text-slate-600 mt-1">Flat: <span className="text-slate-900 font-bold">{bill.flatNumber}</span></div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Payable</div>
            <div className="text-2xl font-black text-indigo-700">₹{bill.totalAmount.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Payment Method Tabs */}
        <div>
          <label className="block text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => { setPaymentMode('UPI'); setProvider('Google Pay'); }}
              className={`p-3.5 rounded-none border flex flex-col items-center justify-center text-center transition-all ${
                paymentMode === 'UPI'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <QrCode className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">Instant UPI</span>
            </button>

            <button
              type="button"
              onClick={() => { setPaymentMode('CARD'); setProvider('Credit/Debit Card'); }}
              className={`p-3.5 rounded-none border flex flex-col items-center justify-center text-center transition-all ${
                paymentMode === 'CARD'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <CreditCard className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">Credit/Debit Card</span>
            </button>

            <button
              type="button"
              onClick={() => { setPaymentMode('NETBANKING'); setProvider('HDFC / SBI Bank'); }}
              className={`p-3.5 rounded-none border flex flex-col items-center justify-center text-center transition-all ${
                paymentMode === 'NETBANKING'
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Building className="w-6 h-6 mb-1" />
              <span className="text-xs font-bold">NetBanking</span>
            </button>
          </div>
        </div>

        {/* Dynamic Mode Form */}
        <form onSubmit={handlePaySubmit} className="space-y-4">
          
          {paymentMode === 'UPI' && (
            <div className="p-4 rounded-none bg-slate-50 border border-slate-200 space-y-4 text-center">
              <div className="text-xs text-slate-700 font-bold">Scan QR Code or Select UPI App</div>
              
              {/* Simulated UPI QR Code */}
              <div className="w-36 h-36 mx-auto bg-white p-2.5 rounded-none border border-slate-300 shadow-sm flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=smartsociety.hsg@icici%26pn=SmartSociety%26am=${bill.totalAmount}%26cu=INR`}
                  alt="UPI QR Code"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex justify-center space-x-3 text-xs font-bold">
                {['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI'].map(app => (
                  <button
                    type="button"
                    key={app}
                    onClick={() => setProvider(app)}
                    className={`px-3 py-1.5 rounded-none border transition-all ${
                      provider === app ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>
          )}

          {paymentMode === 'CARD' && (
            <div className="space-y-3 p-4 rounded-none bg-slate-50 border border-slate-200">
              <div>
                <label className="block text-xs text-slate-600 font-bold mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 8912 3456 7890"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-slate-600 font-bold mb-1">Card Holder Name</label>
                  <input
                    type="text"
                    placeholder="Priya Patel"
                    required
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-600 font-bold mb-1">Expiry / CVV</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="08/29"
                      required
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-1/2 px-3 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm text-center focus:outline-none focus:border-indigo-600"
                    />
                    <input
                      type="password"
                      placeholder="891"
                      required
                      maxLength={3}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-1/2 px-3 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm text-center focus:outline-none focus:border-indigo-600"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {paymentMode === 'NETBANKING' && (
            <div className="p-4 rounded-none bg-slate-50 border border-slate-200 space-y-3">
              <label className="block text-xs text-slate-600 font-bold mb-1">Choose Bank Gateway</label>
              <select
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              >
                <option value="HDFC Bank Gateway">HDFC Bank Internet Banking</option>
                <option value="ICICI Bank Corporate">ICICI Bank NetBanking</option>
                <option value="State Bank of India">State Bank of India (SBI)</option>
                <option value="Axis Bank Portal">Axis Bank Retail Portal</option>
              </select>
            </div>
          )}

          <div className="flex items-center space-x-2 text-xs text-slate-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>256-bit SSL Encrypted Secure Gateway Simulation</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-none border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Processing Payment...</span>
              ) : (
                <>
                  <span>Pay ₹{bill.totalAmount.toLocaleString('en-IN')} Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </Modal>
  );
};
