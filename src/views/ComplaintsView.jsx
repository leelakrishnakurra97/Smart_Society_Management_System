import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { AlertCircle, PlusCircle, CheckCircle2, Clock, Wrench, Shield, MessageSquare } from 'lucide-react';

export const ComplaintsView = () => {
  const { complaints, currentUser, submitComplaint, updateComplaint } = useSociety();
  const isAdmin = currentUser?.role === 'admin';

  // Filters & State
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Plumbing');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Admin Resolution Modal State
  const [updateStatus, setUpdateStatus] = useState('In Progress');
  const [assignedStaff, setAssignedStaff] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const filteredComplaints = complaints.filter(c => {
    const matchesCat = filterCategory === 'ALL' || c.category === filterCategory;
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesCat && matchesStatus;
  });

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitComplaint({ title, category, priority, description });
      setIsSubmitting(false);
      setIsLogModalOpen(false);
      setTitle('');
      setDescription('');
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  const handleAdminUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    setIsSubmitting(true);
    try {
      await updateComplaint(selectedComplaint.id, {
        status: updateStatus,
        assignedStaff,
        adminNotes
      });
      setIsSubmitting(false);
      setSelectedComplaint(null);
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
            <AlertCircle className="w-7 h-7 text-rose-600" />
            <span>Online Complaint Desk & Maintenance Tickets</span>
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Log maintenance complaints, assign technical staff, and track resolution timeline.
          </p>
        </div>

        <button
          onClick={() => setIsLogModalOpen(true)}
          className="px-5 py-2.5 rounded-none bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Log New Complaint Ticket</span>
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-none bg-white border border-slate-300 shadow-sm">
        
        {/* Category Selector */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full sm:w-auto">
          <span className="text-xs font-black text-slate-500 uppercase tracking-wider mr-1">Category:</span>
          {['ALL', 'Plumbing', 'Electrical', 'Elevator', 'Security', 'Sanitation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-none text-xs font-black transition-all ${
                filterCategory === cat
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter */}
        <div className="flex items-center space-x-2">
          {['ALL', 'Pending', 'In Progress', 'Resolved'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-none text-xs font-black transition-all ${
                filterStatus === st
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

      </div>

      {/* Complaint Tickets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredComplaints.length === 0 ? (
          <div className="md:col-span-2 bg-white p-12 text-center text-slate-500 font-bold rounded-none border border-slate-300 shadow-sm">
            No complaint tickets found matching your selected filters.
          </div>
        ) : (
          filteredComplaints.map(ticket => (
            <div key={ticket.id} className="bg-white p-5 rounded-none border border-slate-300 shadow-sm flex flex-col justify-between space-y-4 glass-card-hover">
              
              <div className="space-y-3">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-xs text-rose-700">{ticket.ticketNo}</span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-none uppercase ${
                      ticket.priority === 'High' || ticket.priority === 'Urgent' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                      ticket.priority === 'Medium' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-slate-100 text-slate-700 border border-slate-300'
                    }`}>
                      {ticket.priority} Priority
                    </span>
                  </div>

                  <span className={`px-2.5 py-1 rounded-none text-[10px] font-black uppercase ${
                    ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    ticket.status === 'In Progress' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    'bg-slate-100 text-slate-800 border border-slate-300'
                  }`}>
                    {ticket.status}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="text-base font-black text-slate-900">{ticket.title}</h3>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed font-medium">{ticket.description}</p>
                </div>

                {/* Resident & Staff Meta */}
                <div className="p-3 rounded-none bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600 font-semibold">
                    <span>Category: <strong className="text-slate-900">{ticket.category}</strong></span>
                    <span>Filed By: <strong className="text-slate-900">{ticket.residentName} (Flat {ticket.flatNumber})</strong></span>
                  </div>
                  {ticket.assignedStaff && (
                    <div className="text-indigo-800 font-bold flex items-center space-x-1.5">
                      <Wrench className="w-3.5 h-3.5" />
                      <span>Assigned Staff: {ticket.assignedStaff}</span>
                    </div>
                  )}
                  {ticket.adminNotes && (
                    <div className="text-slate-800 italic pt-1 border-t border-slate-200 font-semibold">
                      "Secretary Remark: {ticket.adminNotes}"
                    </div>
                  )}
                </div>

                {/* Timeline History */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-black uppercase tracking-wider text-slate-500">Resolution History Log</div>
                  {ticket.history.map((h, i) => (
                    <div key={i} className="text-[11px] text-slate-600 flex items-center space-x-2 font-medium">
                      <span className="w-1.5 h-1.5 bg-indigo-600"></span>
                      <span className="text-slate-500 font-bold">{h.date}:</span>
                      <span className="text-slate-800">{h.note}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action for Admin */}
              {isAdmin && (
                <div className="pt-3 border-t border-slate-200">
                  <button
                    onClick={() => {
                      setSelectedComplaint(ticket);
                      setUpdateStatus(ticket.status);
                      setAssignedStaff(ticket.assignedStaff || '');
                      setAdminNotes(ticket.adminNotes || '');
                    }}
                    className="w-full py-2 rounded-none bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs border border-slate-300 transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <Wrench className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Manage & Resolve Complaint</span>
                  </button>
                </div>
              )}

            </div>
          ))
        )}
      </div>

      {/* Log Ticket Modal */}
      <Modal isOpen={isLogModalOpen} onClose={() => setIsLogModalOpen(false)} title="Register Online Complaint Ticket" maxWidth="max-w-xl">
        <form onSubmit={handleLogSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Issue Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Balcony Seepage / Elevator Noise / Water Leakage"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
              >
                <option value="Plumbing">Plumbing & Water Supply</option>
                <option value="Electrical">Electrical & Lighting</option>
                <option value="Elevator">Elevator / Lift Maintenance</option>
                <option value="Security">Security & Gate Entry</option>
                <option value="Sanitation">Sanitation & Garbage Disposal</option>
                <option value="Noise">Noise & Disturbance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent / Emergency</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Detailed Problem Description</label>
            <textarea
              rows={4}
              required
              placeholder="Describe the issue, location, and preferred inspection time..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-rose-600"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsLogModalOpen(false)}
              className="px-4 py-2 rounded-none border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-none bg-rose-600 hover:bg-rose-700 text-white text-sm font-black shadow-sm"
            >
              {isSubmitting ? <span>Submitting...</span> : <span>Submit Complaint Ticket</span>}
            </button>
          </div>
        </form>
      </Modal>

      {/* Admin Complaint Management Modal */}
      <Modal isOpen={Boolean(selectedComplaint)} onClose={() => setSelectedComplaint(null)} title={`Manage Ticket ${selectedComplaint?.ticketNo}`} maxWidth="max-w-xl">
        {selectedComplaint && (
          <form onSubmit={handleAdminUpdateSubmit} className="space-y-4">
            <div className="p-3 rounded-none bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="font-black text-slate-900">{selectedComplaint.title}</div>
              <div className="text-slate-600 font-medium">Filed by {selectedComplaint.residentName} (Flat {selectedComplaint.flatNumber})</div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Update Ticket Status</label>
              <select
                value={updateStatus}
                onChange={(e) => setUpdateStatus(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Assigned Technician / Staff Name</label>
              <input
                type="text"
                placeholder="e.g. Otis Engineer Ramesh / Society Plumber Mahesh"
                value={assignedStaff}
                onChange={(e) => setAssignedStaff(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Secretary Resolution Remarks</label>
              <textarea
                rows={3}
                placeholder="Add official progress update or resolution note..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 rounded-none border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black shadow-sm"
              >
                {isSubmitting ? <span>Updating...</span> : <span>Save Status & Remarks</span>}
              </button>
            </div>
          </form>
        )}
      </Modal>

    </div>
  );
};
