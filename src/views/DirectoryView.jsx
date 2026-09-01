import React, { useState } from 'react';
import { useSociety } from '../context/SocietyContext';
import { Users, Phone, Building, Search, PlusCircle, ShieldCheck } from 'lucide-react';
import { initialData } from '../data/initialData';
import { Modal } from '../components/Modal';

export const DirectoryView = () => {
  const { flats, currentUser } = useSociety();
  const isAdmin = currentUser?.role === 'admin';
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBlock, setFilterBlock] = useState('ALL');

  const filteredFlats = flats.filter(f => {
    const matchesBlock = filterBlock === 'ALL' || f.block === filterBlock;
    const matchesSearch = f.flatNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          f.phone.includes(searchTerm);
    return matchesBlock && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center space-x-3">
            <Users className="w-7 h-7 text-indigo-600" />
            <span>Society Member & Flat Directory</span>
          </h1>
          <p className="text-sm text-slate-600 font-semibold mt-1">
            Complete flat owner & tenant records, carpet area details, and essential emergency contacts.
          </p>
        </div>
      </div>

      {/* Emergency Phone Contacts Banner */}
      <div className="p-5 rounded-none bg-white border border-slate-300 shadow-sm space-y-3">
        <div className="text-xs font-black text-slate-500 uppercase tracking-wider">Emergency & Utility Contacts</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {initialData.emergencyContacts.map((contact, idx) => (
            <div key={idx} className="p-3 rounded-none bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="text-xs font-black text-slate-900">{contact.title}</div>
                <div className="text-[11px] text-slate-600 font-medium">{contact.name} ({contact.available})</div>
              </div>
              <a
                href={`tel:${contact.phone}`}
                className="p-2 rounded-none bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-300 text-xs font-bold flex items-center space-x-1"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-mono">{contact.phone}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Block Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-none bg-white border border-slate-300 shadow-sm">
        <div className="w-full sm:w-80">
          <input
            type="text"
            placeholder="Search flat number, owner name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3.5 py-2 rounded-none bg-white border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-indigo-600 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center space-x-2">
          {['ALL', 'Block A', 'Block B', 'Block C', 'Block D'].map(b => (
            <button
              key={b}
              onClick={() => setFilterBlock(b)}
              className={`px-3 py-1.5 rounded-none text-xs font-black transition-all ${
                filterBlock === b
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Flats Directory Table */}
      <div className="bg-white rounded-none border border-slate-300 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-100 text-slate-600 uppercase font-black text-[10px] border-b border-slate-200">
                <th className="py-3.5 px-4">Flat Number</th>
                <th className="py-3.5 px-4">Block / Wing</th>
                <th className="py-3.5 px-4">Resident Name</th>
                <th className="py-3.5 px-4">Flat Type</th>
                <th className="py-3.5 px-4 text-right">Sq. Ft. Area</th>
                <th className="py-3.5 px-4">Resident Type</th>
                <th className="py-3.5 px-4">Contact Phone</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredFlats.map(flat => (
                <tr key={flat.flatNumber} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-black text-indigo-700 text-sm">{flat.flatNumber}</td>
                  <td className="py-3.5 px-4 text-slate-800 font-bold">{flat.block}</td>
                  <td className="py-3.5 px-4 text-slate-900 font-black">{flat.ownerName}</td>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">{flat.flatType}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-800">{flat.sqft} sqft</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-none text-[10px] font-bold ${
                      flat.residentType === 'Owner' ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {flat.residentType}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-700 font-semibold">{flat.phone}</td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`px-2.5 py-0.5 rounded-none text-[10px] font-black uppercase ${
                      flat.status === 'Occupied' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {flat.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
