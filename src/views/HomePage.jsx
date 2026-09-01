import React, { useState, useEffect } from 'react';
import {
  Building2, ShieldCheck, UserCheck, Calculator, CreditCard, AlertCircle,
  CalendarCheck, Megaphone, Users, ArrowRight, CheckCircle2,
  Zap, Lock, BarChart3, ChevronRight,
  Building, Bell, FileText, Clock
} from 'lucide-react';

export const HomePage = ({ onGetStarted }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  // Auto-rotate feature highlight
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 6);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { value: '48+', label: 'Flats Managed', icon: Building },
    { value: '100%', label: 'Digital Records', icon: FileText },
    { value: '0', label: 'Door-to-Door Visits', icon: Bell },
    { value: '24/7', label: 'Portal Access', icon: Clock },
  ];

  const features = [
    {
      icon: Calculator,
      title: 'Automated Maintenance Billing',
      description: 'Auto-calculate monthly bills per sq. ft. area, water, elevator, security, and parking charges. Generate bulk invoices with one click.',
      color: 'indigo',
      tags: ['Sq. Ft. Rate Calculator', 'Debit Notes', 'Bulk Generation']
    },
    {
      icon: CreditCard,
      title: 'Online Payment Portal',
      description: 'Pay maintenance dues via UPI, Credit Card, or NetBanking. Instantly download official tax invoice receipts.',
      color: 'emerald',
      tags: ['UPI / QR Code', 'Credit Card', 'Tax Invoice']
    },
    {
      icon: AlertCircle,
      title: 'Complaint Desk & Ticket System',
      description: 'Log maintenance complaints online. Admin assigns staff, tracks progress, and posts official resolution notes with complete history timeline.',
      color: 'rose',
      tags: ['Plumbing', 'Electrical', 'Elevator', 'Security']
    },
    {
      icon: CalendarCheck,
      title: 'Hall & Venue Booking',
      description: 'Reserve Society Clubhouse, Terrace Deck or Lawn for Birthday Parties, Ring Ceremonies & Festivals. Real-time conflict prevention.',
      color: 'cyan',
      tags: ['Birthday Party', 'Ring Ceremony', 'Festival', 'Meeting']
    },
    {
      icon: Megaphone,
      title: 'Digital Notice Board',
      description: 'Instantly broadcast society meeting notices, water/power outage alerts, and event announcements — replacing door-to-door visits.',
      color: 'amber',
      tags: ['Meeting Broadcasts', 'SMS Alerts', 'RSVP Tracking']
    },
    {
      icon: Users,
      title: 'Member & Flat Directory',
      description: 'Complete digital flat directory with owner/tenant details, emergency contacts, utility helplines, and flat area data.',
      color: 'purple',
      tags: ['Block Directory', 'Emergency Contacts', 'Quick Dial']
    },
  ];

  const howItWorks = [
    {
      step: '01',
      title: 'Login to Your Portal',
      desc: 'Admin or Resident signs in with secure role-based access.',
      icon: Lock,
    },
    {
      step: '02',
      title: 'Manage Your Dashboard',
      desc: 'View bills, complaints, bookings, and society notices on your personalized dashboard.',
      icon: BarChart3,
    },
    {
      step: '03',
      title: 'Pay, Book, Report',
      desc: 'Pay maintenance, file complaints, book halls, and acknowledge notices in one platform.',
      icon: Zap,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden">

      {/* --- HEADER / NAVBAR --- */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-none bg-indigo-600 p-0.5 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black tracking-tight text-slate-900">
              Smart Society
            </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-bold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-indigo-600 transition-colors">How It Works</a>
            <a href="#roles" className="hover:text-indigo-600 transition-colors">Roles</a>
          </nav>

          {/* CTA */}
          <button
            onClick={onGetStarted}
            className="flex items-center space-x-2 px-4 py-2 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-black shadow-sm transition-all"
          >
            <span>Open Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          {/* Title Label */}
          <p className="text-xs font-black uppercase tracking-[0.2em] text-indigo-700">
            Smart Society Management System
          </p>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-slate-900">
            NextGen Society Management & Operations
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-semibold">
            Say goodbye to paper registers, door-to-door visits, and manual billing. Smart Society Management System is a centralized digital platform for residential societies with automated billing, complaint tracking, hall booking, and instant broadcast announcements.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="group w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-sm transition-all"
            >
              <span>Get Started — Open Portal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-none bg-slate-100 border border-slate-300 text-slate-800 font-bold text-base hover:bg-slate-200 transition-all"
            >
              <ShieldCheck className="w-5 h-5 text-indigo-600" />
              <span>Admin Demo Login</span>
            </button>
          </div>

          {/* Quick Stats Row */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-2xl mx-auto">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="flex flex-col items-center space-y-1 p-3 bg-slate-50 border border-slate-200 rounded-none">
                  <div className="flex items-center space-x-1.5 text-indigo-600">
                    <Icon className="w-4 h-4" />
                    <span className="text-2xl font-black text-slate-900">{stat.value}</span>
                  </div>
                  <span className="text-xs text-slate-600 font-bold">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID SECTION --- */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative border-b border-slate-200">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700 border border-indigo-300 px-3 py-1 rounded-none bg-indigo-50">
              Core Modules
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Everything Your Society Needs
            </h2>
            <p className="text-base text-slate-600 font-semibold max-w-xl mx-auto">
              6 powerful modules built in 8 Agile sprints, each replacing a manual, paper-based process with a faster digital alternative.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveFeature(idx)}
                  className={`p-6 rounded-none border transition-all duration-200 cursor-pointer bg-white ${
                    activeFeature === idx
                      ? 'border-indigo-600 shadow-md ring-1 ring-indigo-600'
                      : 'border-slate-300 shadow-sm hover:border-indigo-400'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-none bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-indigo-700" />
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900 mb-2">{feat.title}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed font-medium">{feat.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {feat.tags.map((tag, ti) => (
                        <span key={ti} className="text-[10px] font-bold px-2 py-0.5 rounded-none bg-slate-100 text-slate-700 border border-slate-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700 border border-indigo-300 px-3 py-1 rounded-none bg-indigo-50">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Simple. Fast. Automated.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-slate-50 p-6 border border-slate-300 rounded-none text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-none bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">{step.title}</h3>
                    <p className="text-sm text-slate-600 mt-2 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- USER ROLES SECTION --- */}
      <section id="roles" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-4 mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-indigo-700 border border-indigo-300 px-3 py-1 rounded-none bg-indigo-50">
              Role-Based Access
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Designed for Everyone
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Admin Role Card */}
            <div className="p-8 rounded-none bg-white border border-indigo-300 shadow-sm space-y-5">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-none bg-indigo-100 text-indigo-800 border border-indigo-300">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Society Admin</h3>
                  <p className="text-xs text-indigo-700 font-bold">Secretary / Treasurer / Committee Member</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {[
                  'Generate automated monthly maintenance bills',
                  'Track all pending dues & collections',
                  'Manage complaint tickets & assign staff',
                  'Approve or reject hall booking requests',
                  'Broadcast society meeting notices (replaces door-to-door)',
                  'View full society financial reports',
                  'Manage flat & resident directory',
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onGetStarted}
                className="w-full py-3 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-sm flex items-center justify-center space-x-2 transition-all"
              >
                <span>Login as Admin</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Resident Role Card */}
            <div className="p-8 rounded-none bg-white border border-emerald-300 shadow-sm space-y-5">
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-none bg-emerald-100 text-emerald-800 border border-emerald-300">
                  <UserCheck className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">Society Resident</h3>
                  <p className="text-xs text-emerald-700 font-bold">Flat Owner or Tenant</p>
                </div>
              </div>

              <ul className="space-y-2.5">
                {[
                  'View and pay monthly maintenance bills',
                  'Download official tax invoice receipts',
                  'File complaints online (Plumbing, Electrical, Elevator, etc.)',
                  'Track complaint status & resolution timeline',
                  'Book society hall for events & functions',
                  'Receive & acknowledge meeting announcements',
                  'View emergency contacts & flat directory',
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-2.5 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onGetStarted}
                className="w-full py-3 rounded-none bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-sm flex items-center justify-center space-x-2 transition-all"
              >
                <span>Login as Resident</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PROBLEM VS SOLUTION SECTION --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Why Smart Society?</h2>
            <p className="text-slate-600 mt-2 text-base font-semibold">The old way vs. the smarter way.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Old Way */}
            <div className="p-6 rounded-none bg-rose-50 border border-rose-200 space-y-4">
              <div className="flex items-center space-x-2 text-rose-800 text-sm font-black uppercase tracking-wider">
                <span>Traditional Manual System</span>
              </div>
              {[
                'Paper registers for billing and payments',
                'Secretary visits door-to-door for meeting notices',
                'Phone calls to check hall availability',
                'Manual ledger for tracking complaints',
                'No access to records if authority is absent',
                'Tedious and time-consuming processes',
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm text-slate-700 font-medium">
                  <span className="mt-1 w-4 h-4 bg-rose-200 text-rose-800 text-[10px] font-black flex items-center justify-center shrink-0">✕</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* New Way */}
            <div className="p-6 rounded-none bg-emerald-50 border border-emerald-200 space-y-4">
              <div className="flex items-center space-x-2 text-emerald-800 text-sm font-black uppercase tracking-wider">
                <span>Smart Society Digital Platform</span>
              </div>
              {[
                'Automated monthly maintenance calculation & bills',
                'Instant digital broadcast to all 48 residents',
                'Real-time hall availability checker & conflict prevention',
                'Online complaint tickets with status timeline',
                'Any member can access their records 24/7',
                'Fast, efficient, and transparent operations',
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3 text-sm text-slate-800 font-semibold">
                  <span className="mt-1 w-4 h-4 bg-emerald-200 text-emerald-800 text-[10px] font-black flex items-center justify-center shrink-0">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-none bg-white border border-slate-300 shadow-sm space-y-6">
            <div className="w-16 h-16 mx-auto rounded-none bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                Ready to Digitize Your Society?
              </h2>
              <p className="mt-3 text-slate-600 text-base max-w-lg mx-auto font-medium">
                Access the Smart Society portal now. Use the demo accounts to explore the Admin Secretary dashboard or the Resident portal.
              </p>
            </div>

            {/* Demo Credentials Pill Row */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 text-xs">
              <div className="px-4 py-2 rounded-none bg-indigo-50 border border-indigo-200 text-indigo-900 font-bold">
                <span className="text-indigo-700 font-black">Admin Login:</span> admin / 123
              </div>
              <div className="px-4 py-2 rounded-none bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                <span className="text-emerald-700 font-black">Resident Login:</span> priya / 123
              </div>
            </div>

            <button
              onClick={onGetStarted}
              className="inline-flex items-center space-x-2 px-10 py-3.5 rounded-none bg-indigo-600 hover:bg-indigo-700 text-white font-black text-base shadow-sm transition-all"
            >
              <span>Enter Society Portal</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-200 bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-indigo-600" />
            <span className="font-black text-slate-900">Smart Society</span>
            <span className="text-xs text-slate-500 font-semibold">Society Management System v1.0</span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-500 font-semibold">
            <span>Built with Agile Model (8 Sprints)</span>
            <span>•</span>
            <span>React 18 + Node.js + Relational SQL</span>
            <span>•</span>
            <span>JWT Authentication</span>
          </div>
        </div>
      </footer>

    </div>
  );
};
