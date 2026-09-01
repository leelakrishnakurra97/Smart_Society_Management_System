import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { Building2, ShieldCheck, UserCheck, Lock, Mail, Phone, User, Key, ArrowRight } from 'lucide-react';

export const AuthView = () => {
  const { login, register } = useSociety();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [flatNumber, setFlatNumber] = useState('');
  const [role, setRole] = useState('resident');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (isRegisterMode) {
        await register({
          username,
          password,
          name,
          email,
          phone,
          flatNumber,
          role
        });
      } else {
        await login(username, password);
      }
    } catch (err) {
      // Error handles in toast
    } finally {
      setIsSubmitting(false);
    }
  };

  const quickDemoLogin = async (demoUsername) => {
    setIsSubmitting(true);
    try {
      await login(demoUsername, '123');
    } catch (err) {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans relative">
      <div className="w-full max-w-md bg-white p-8 rounded-none border border-slate-300 shadow-xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Branding */}
        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 mx-auto bg-indigo-600 rounded-none flex items-center justify-center shadow-sm">
            <Building2 className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-2xl font-black tracking-tight text-slate-900">Smart Society Portal</h2>
          <p className="text-xs text-slate-600 font-semibold">
            {isRegisterMode ? 'Create your society member portal account' : 'Sign in to access your role-based dashboard'}
          </p>
        </div>

        {/* Demo Quick Logins */}
        {!isRegisterMode && (
          <div className="mb-6 p-3.5 rounded-none bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-500 text-center">
              One-Click Demo Account Logins
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => quickDemoLogin('admin')}
                className="p-2.5 rounded-none bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
              >
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                <span>Admin Secretary</span>
              </button>

              <button
                type="button"
                onClick={() => quickDemoLogin('priya')}
                className="p-2.5 rounded-none bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold flex items-center justify-center space-x-1.5 transition-all"
              >
                <UserCheck className="w-4 h-4 text-emerald-600" />
                <span>Resident Priya</span>
              </button>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {isRegisterMode && (
            <>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Priya Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="priya@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Flat Number</label>
                  <input
                    type="text"
                    required
                    placeholder="A-402"
                    value={flatNumber}
                    onChange={(e) => setFlatNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Select Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
                >
                  <option value="resident">Resident Member</option>
                  <option value="admin">Society Admin / Committee</option>
                </select>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Username</label>
            <input
              type="text"
              required
              placeholder="e.g. admin or priya"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-sm flex items-center justify-center space-x-2 transition-all mt-6"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>{isRegisterMode ? 'Register Account' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        {/* Toggle Mode */}
        <div className="mt-6 pt-4 border-t border-slate-200 text-center">
          <button
            onClick={() => setIsRegisterMode(!isRegisterMode)}
            className="text-xs text-slate-600 hover:text-indigo-600 font-bold"
          >
            {isRegisterMode ? 'Already registered? Sign in here' : "Don't have an account? Register here"}
          </button>
        </div>

      </div>
    </div>
  );
};
