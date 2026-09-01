import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { Megaphone, PlusCircle, CheckCircle2, Bell, AlertTriangle, MessageSquare, Send, Users } from 'lucide-react';
import { Modal } from '../components/Modal';

export const NoticeBoardView = () => {
  const { notices, currentUser, publishNotice, rsvpNotice } = useSociety();
  const isAdmin = currentUser?.role === 'admin';

  // State
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Meeting Announcement');
  const [priority, setPriority] = useState('Urgent');
  const [content, setContent] = useState('');
  const [isDoorToDoorReplacement, setIsDoorToDoorReplacement] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Trigger Dispatch Simulated Alert Modal
  const [dispatchedNotice, setDispatchedNotice] = useState(null);

  const handlePublishSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await publishNotice({
        title,
        category,
        priority,
        content,
        isDoorToDoorReplacement
      });
      setIsSubmitting(false);
      setIsPublishModalOpen(false);
      setTitle('');
      setContent('');
      setDispatchedNotice(res.notice);
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
            <Megaphone className="w-7 h-7 text-indigo-600" />
            <span>Society Notice Board & Broadcast Informer</span>
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Replaces manual door-to-door visits with instant meeting broadcasts and digital notice acknowledgements.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={() => setIsPublishModalOpen(true)}
            className="px-5 py-2.5 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm flex items-center space-x-2 transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Broadcast Notice</span>
          </button>
        )}
      </div>

      {/* Door-to-Door Replacement Banner */}
      <div className="p-4 rounded-none bg-indigo-50 border border-indigo-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-none bg-indigo-600 text-white">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-black uppercase tracking-wider text-indigo-900">Digital Door-to-Door Informer System</div>
            <div className="text-xs text-slate-700 font-medium mt-0.5">Meeting notices and urgent announcements automatically dispatch SMS/Email alerts to all 48 flat members.</div>
          </div>
        </div>
      </div>

      {/* Notices Cards Grid */}
      <div className="space-y-5">
        {notices.map(notice => {
          const userFlat = currentUser?.flatNumber || 'A-402';
          const hasAcknowledged = (notice.acknowledgements || []).includes(userFlat);

          return (
            <div key={notice.id} className="bg-white p-6 rounded-none border border-slate-300 space-y-4 shadow-sm">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-black px-3 py-1 rounded-none uppercase tracking-wider ${
                    notice.priority === 'Urgent' ? 'bg-rose-100 text-rose-800 border border-rose-300' :
                    notice.priority === 'High' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                    'bg-indigo-100 text-indigo-800 border border-indigo-300'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-xs font-bold text-slate-500 font-mono">{notice.noticeNo}</span>
                  <span className="text-xs text-indigo-800 font-bold px-2 py-0.5 rounded-none bg-indigo-50 border border-indigo-200">
                    {notice.category}
                  </span>
                </div>

                <div className="text-xs text-slate-500 font-semibold">
                  Posted: <span className="text-slate-900 font-bold">{notice.datePosted}</span> by <span className="text-slate-900 font-bold">{notice.postedBy}</span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-black text-slate-900">{notice.title}</h3>
                <p className="text-sm text-slate-700 mt-2 leading-relaxed font-medium whitespace-pre-line">{notice.content}</p>
              </div>

              {/* Action & RSVP Row */}
              <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                
                <div className="flex items-center space-x-2 text-emerald-700 font-bold">
                  <Users className="w-4 h-4" />
                  <span>RSVP Acknowledged by {notice.rsvpCount} Society Members</span>
                </div>

                <div>
                  {hasAcknowledged ? (
                    <span className="px-3.5 py-1.5 rounded-none bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold flex items-center space-x-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Notice Acknowledged</span>
                    </span>
                  ) : (
                    <button
                      onClick={() => rsvpNotice(notice.id)}
                      className="px-4 py-2 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all shadow-sm flex items-center space-x-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Attendance / Acknowledge Notice</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

      {/* Publish Notice Modal */}
      <Modal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} title="Publish Society Meeting Announcement / Broadcast" maxWidth="max-w-xl">
        <form onSubmit={handlePublishSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Announcement Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Annual General Body Meeting (AGM) 2026 Announcement"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              >
                <option value="Meeting Announcement">Meeting Announcement (Door-to-Door Replacement)</option>
                <option value="Urgent Alert">Urgent Water/Power Alert</option>
                <option value="Maintenance Update">Maintenance & Cleaning Update</option>
                <option value="Festival Event">Festival & Cultural Event</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Priority Level</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent Broadcast</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Notice Content & Details</label>
            <textarea
              rows={5}
              required
              placeholder="Write the full announcement text, agenda points, meeting venue, date & time..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
            ></textarea>
          </div>

          <div className="p-3.5 rounded-none bg-slate-50 border border-slate-300 flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Trigger Digital Door-to-Door SMS/Email Dispatch</span>
            <input
              type="checkbox"
              checked={isDoorToDoorReplacement}
              onChange={(e) => setIsDoorToDoorReplacement(e.target.checked)}
              className="w-4 h-4 accent-indigo-600 rounded-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsPublishModalOpen(false)}
              className="px-4 py-2 rounded-none border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black shadow-sm flex items-center space-x-2"
            >
              {isSubmitting ? <span>Broadcasting...</span> : <span>Publish & Dispatch Broadcast</span>}
            </button>
          </div>
        </form>
      </Modal>

      {/* Simulated Dispatch Popup */}
      <Modal isOpen={Boolean(dispatchedNotice)} onClose={() => setDispatchedNotice(null)} title="Broadcast Dispatched Successfully!" maxWidth="max-w-md">
        {dispatchedNotice && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 mx-auto rounded-none bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center">
              <Send className="w-8 h-8 text-emerald-600" />
            </div>

            <div>
              <h4 className="text-base font-black text-slate-900">{dispatchedNotice.title}</h4>
              <p className="text-xs text-slate-500 font-semibold mt-1">Ref: {dispatchedNotice.noticeNo}</p>
            </div>

            <div className="p-3 rounded-none bg-slate-50 border border-slate-200 text-xs text-slate-800 text-left space-y-1 font-semibold">
              <div className="text-emerald-700 font-black">✔ SMS Broadcast: Sent to 48 Member Mobile Numbers</div>
              <div className="text-emerald-700 font-black">✔ Email Informer: Sent to 48 Member Emails</div>
              <div className="text-slate-600">Replaced manual door-to-door physical visits.</div>
            </div>

            <button
              onClick={() => setDispatchedNotice(null)}
              className="w-full py-2.5 rounded-none bg-indigo-600 text-white text-xs font-black hover:bg-indigo-700 shadow-sm"
            >
              Done
            </button>
          </div>
        )}
      </Modal>

    </div>
  );
};
