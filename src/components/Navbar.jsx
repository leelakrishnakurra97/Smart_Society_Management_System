import React from 'react';
import { useSociety } from '../context/SocietyContext';
import { Building2, Sun, Moon, LogOut, ShieldCheck, UserCheck, Bell, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout, switchRoleDemo, darkMode, toggleDarkMode, notices } = useSociety();

  const unreadNoticesCount = notices.length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md px-4 lg:px-8 py-3 transition-colors duration-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Society Name */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-none bg-indigo-600 p-0.5 shadow-sm flex items-center justify-center">
            <div className="w-full h-full bg-indigo-600 rounded-none flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-black text-xl tracking-tight text-slate-900">
                Smart Society
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold hidden sm:block">
              Smart Society Management System • Centralized Platform
            </p>
          </div>
        </div>

        {/* Center/Right Controls */}
        <div className="flex items-center space-x-3 sm:space-x-5">
          
          {/* Quick Demo Role Switcher Button */}
          {currentUser && (
            <div className="hidden md:flex items-center bg-slate-100 rounded-none p-1 border border-slate-200">
              <button
                onClick={() => switchRoleDemo('admin')}
                className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-none transition-all ${
                  currentUser.role === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Switch to Admin role preview"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin View</span>
              </button>

              <button
                onClick={() => switchRoleDemo('resident')}
                className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-none transition-all ${
                  currentUser.role === 'resident'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                }`}
                title="Switch to Resident role preview"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Resident View</span>
              </button>
            </div>
          )}

          {/* User Profile / Logout */}
          {currentUser ? (
            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
              <div className="relative flex items-center space-x-2">
                <div className="text-left">
                  <div className="text-sm font-black text-slate-900 leading-tight">
                    {currentUser.name}
                  </div>
                  <div className="text-[11px] font-bold text-slate-500 flex items-center space-x-1">
                    <span className={`inline-block w-2 h-2 ${currentUser.role === 'admin' ? 'bg-indigo-600' : 'bg-emerald-600'}`}></span>
                    <span className="capitalize">{currentUser.role} • Flat {currentUser.flatNumber || 'A-501'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="p-2 rounded-none bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all text-xs font-bold flex items-center space-x-1"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : null}

        </div>

      </div>
    </header>
  );
};
