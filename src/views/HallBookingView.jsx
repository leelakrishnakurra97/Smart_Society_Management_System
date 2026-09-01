import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { CalendarCheck, PlusCircle, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldCheck, MapPin, Building } from 'lucide-react';
import { Modal } from '../components/Modal';

export const HallBookingView = () => {
  const { bookings, currentUser, submitHallBooking, updateBookingStatus } = useSociety();
  const isAdmin = currentUser?.role === 'admin';

  // State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState('Main Clubhouse Community Hall');
  const [eventType, setEventType] = useState('Birthday Party');
  const [eventTitle, setEventTitle] = useState('');
  const [bookingDate, setBookingDate] = useState('2026-08-28');
  const [timeSlot, setTimeSlot] = useState('Evening (4:00 PM - 10:00 PM)');
  const [guestCount, setGuestCount] = useState(60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Approval Modal
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [adminRemarks, setAdminRemarks] = useState('');

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await submitHallBooking({
        venue: selectedVenue,
        eventType,
        eventTitle,
        bookingDate,
        timeSlot,
        guestCount: Number(guestCount)
      });
      setIsSubmitting(false);
      setIsBookModalOpen(false);
      setEventTitle('');
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage(err.message);
    }
  };

  const handleAdminDecision = async (status) => {
    if (!selectedBooking) return;
    setIsSubmitting(true);
    try {
      await updateBookingStatus(selectedBooking.id, {
        status,
        adminRemarks
      });
      setIsSubmitting(false);
      setSelectedBooking(null);
      setAdminRemarks('');
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
            <CalendarCheck className="w-7 h-7 text-cyan-600" />
            <span>Society Hall & Venue Booking Portal</span>
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Reserve Society Clubhouse, Terrace Event Deck, or Party Lawn for Birthdays, Ring Ceremonies & Festivals.
          </p>
        </div>

        <button
          onClick={() => { setIsBookModalOpen(true); setErrorMessage(''); }}
          className="px-5 py-2.5 rounded-none bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Book Venue Slot</span>
        </button>
      </div>

      {/* Venues Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="bg-white p-5 rounded-none border border-slate-300 shadow-sm space-y-3 glass-card-hover">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-none bg-indigo-100 text-indigo-800 border border-indigo-200">
              <Building className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-none border border-indigo-200">
              ₹3,500 / Slot
            </span>
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Main Clubhouse Hall</h3>
            <p className="text-xs text-slate-600 font-semibold mt-1">AC Hall with sound system, stage & banquet chairs. Capacity: 120 Guests.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-none border border-slate-300 shadow-sm space-y-3 glass-card-hover">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-none bg-cyan-100 text-cyan-800 border border-cyan-200">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-cyan-900 bg-cyan-50 px-2.5 py-0.5 rounded-none border border-cyan-200">
              ₹5,000 / Slot
            </span>
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Terrace Event Deck</h3>
            <p className="text-xs text-slate-600 font-semibold mt-1">Open-air rooftop venue with ambient evening lighting. Capacity: 150 Guests.</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-none border border-slate-300 shadow-sm space-y-3 glass-card-hover">
          <div className="flex justify-between items-start">
            <div className="p-2.5 rounded-none bg-emerald-100 text-emerald-800 border border-emerald-200">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded-none border border-emerald-200">
              ₹4,500 / Slot
            </span>
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900">Main Lawn & Gazebo</h3>
            <p className="text-xs text-slate-600 font-semibold mt-1">Lush green garden area for festival gatherings & outdoor events. Capacity: 200 Guests.</p>
          </div>
        </div>

      </div>

      {/* Bookings Ledger */}
      <div className="bg-white rounded-none border border-slate-300 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 font-black text-slate-900 text-sm bg-slate-50">
          Venue Booking Schedule & Approval Ledger
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase font-black text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Event Title & Type</th>
                <th className="py-3.5 px-4">Venue</th>
                <th className="py-3.5 px-4">Reserved Date & Slot</th>
                <th className="py-3.5 px-4">Flat & Resident</th>
                <th className="py-3.5 px-4 text-right">Fee</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                {isAdmin && <th className="py-3.5 px-4 text-right">Admin Action</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-12 text-center text-slate-500 font-bold">
                    No hall bookings requested yet.
                  </td>
                </tr>
              ) : (
                bookings.map(bk => (
                  <tr key={bk.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-cyan-700">{bk.bookingRef}</td>
                    <td className="py-3.5 px-4 text-slate-900 font-black">
                      <div>{bk.eventTitle}</div>
                      <div className="text-[10px] text-cyan-700 font-bold">{bk.eventType}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">{bk.venue}</td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      <div className="font-bold text-slate-900">{bk.bookingDate}</div>
                      <div className="text-[10px] text-slate-500 font-bold">{bk.timeSlot}</div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-800 font-semibold">
                      <div>{bk.residentName}</div>
                      <div className="text-[10px] text-slate-500 font-bold">Flat {bk.flatNumber}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-black text-cyan-800">
                      ₹{bk.totalFee.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-none text-[10px] font-black uppercase ${
                        bk.status === 'Approved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                        bk.status === 'Rejected' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                        'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {bk.status}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="py-3.5 px-4 text-right">
                        {bk.status === 'Pending' ? (
                          <button
                            onClick={() => setSelectedBooking(bk)}
                            className="px-3 py-1.5 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm"
                          >
                            Review & Approve
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate-500 italic font-semibold">Decision Recorded</span>
                        )}
                      </td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Book Venue Modal */}
      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="Reserve Society Hall / Amenity" maxWidth="max-w-xl">
        <form onSubmit={handleBookSubmit} className="space-y-4">
          
          {errorMessage && (
            <div className="p-3 rounded-none bg-rose-50 border border-rose-300 text-rose-900 text-xs font-bold flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Event Title / Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Aarav's 5th Birthday Party / Rohan & Sneha Ring Ceremony"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Select Venue</label>
              <select
                value={selectedVenue}
                onChange={(e) => setSelectedVenue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
              >
                <option value="Main Clubhouse Community Hall">Main Clubhouse Hall (₹3,500)</option>
                <option value="Terrace Event Deck">Terrace Event Deck (₹5,000)</option>
                <option value="Main Lawn & Gazebo">Main Lawn & Gazebo (₹4,500)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
              >
                <option value="Birthday Party">Birthday Party</option>
                <option value="Ring Ceremony">Ring Ceremony / Engagement</option>
                <option value="Festival Celebration">Festival Celebration</option>
                <option value="Society Meeting">Society Meeting</option>
                <option value="Anniversary">Anniversary Party</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Booking Date</label>
              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
              >
                <option value="Morning (9:00 AM - 2:00 PM)">Morning (9:00 AM - 2:00 PM)</option>
                <option value="Evening (4:00 PM - 10:00 PM)">Evening (4:00 PM - 10:00 PM)</option>
                <option value="Full Day (9:00 AM - 10:00 PM)">Full Day (9:00 AM - 10:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Estimated Guest Count</label>
            <input
              type="number"
              min="10"
              max="250"
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-cyan-600"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsBookModalOpen(false)}
              className="px-4 py-2 rounded-none border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-none bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-black shadow-sm"
            >
              {isSubmitting ? <span>Checking Slot...</span> : <span>Submit Reservation Request</span>}
            </button>
          </div>
        </form>
      </Modal>

      {/* Admin Approval Decision Modal */}
      <Modal isOpen={Boolean(selectedBooking)} onClose={() => setSelectedBooking(null)} title={`Review Booking #${selectedBooking?.bookingRef}`} maxWidth="max-w-xl">
        {selectedBooking && (
          <div className="space-y-4">
            <div className="p-4 rounded-none bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="font-black text-sm text-slate-900">{selectedBooking.eventTitle}</div>
              <div className="text-slate-700 font-semibold">Venue: <strong className="text-cyan-700">{selectedBooking.venue}</strong></div>
              <div className="text-slate-700 font-semibold">Date & Slot: <strong>{selectedBooking.bookingDate}</strong> ({selectedBooking.timeSlot})</div>
              <div className="text-slate-600">Requested by: {selectedBooking.residentName} (Flat {selectedBooking.flatNumber})</div>
              <div className="text-slate-600">Guests: {selectedBooking.guestCount} • Total Fee: ₹{selectedBooking.totalFee.toLocaleString('en-IN')}</div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Secretary Remarks / Guidelines</label>
              <textarea
                rows={3}
                placeholder="e.g. Approved. Please ensure music volume is lowered by 9:30 PM..."
                value={adminRemarks}
                onChange={(e) => setAdminRemarks(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => handleAdminDecision('Rejected')}
                disabled={isSubmitting}
                className="px-4 py-2.5 rounded-none bg-rose-50 text-rose-800 border border-rose-300 text-sm font-bold hover:bg-rose-100"
              >
                Reject Request
              </button>
              <button
                type="button"
                onClick={() => handleAdminDecision('Approved')}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-black shadow-sm"
              >
                Approve Venue Booking
              </button>
            </div>
          </div>
        )}
      </Modal>

    </div>
  );
};
