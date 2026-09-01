import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div
        className={`relative w-full ${maxWidth} bg-white rounded-none shadow-2xl border border-slate-300 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 my-8`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-100">
          <h3 className="text-lg font-black text-slate-900 flex items-center space-x-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-none text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto text-slate-900">
          {children}
        </div>
      </div>
    </div>
  );
};
