import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Search, 
  X, 
  User, 
  Stethoscope, 
  Calendar, 
  FileText, 
  FlaskConical, 
  Pill, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Command
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBookModal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  isOpen, 
  onClose,
  onOpenBookModal 
}) => {
  const { setRole, appointments, labRequests, prescriptions, invoices } = useApp();
  const [query, setQuery] = useState('');

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else setQuery('');
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePortalSwitch = (targetRole: UserRole) => {
    setRole(targetRole);
    onClose();
  };

  // Mock patient search list
  const patients = [
    { id: 'pat-1042', name: 'Ananya Rao', age: 28, gender: 'Female', condition: 'Sinus Tachycardia' },
    { id: 'pat-1043', name: 'Rahul Kumar', age: 45, gender: 'Male', condition: 'Hypertension' },
    { id: 'pat-1044', name: 'Priya Sharma', age: 34, gender: 'Female', condition: 'Routine OPD Checkup' },
    { id: 'pat-1045', name: 'Amit Patel', age: 52, gender: 'Male', condition: 'Type 2 Diabetes' }
  ];

  // Doctors list
  const doctors = [
    { id: 'doc-1', name: 'Dr. Rahul Rao', spec: 'Cardiology', room: 'OPD Room 3' },
    { id: 'doc-2', name: 'Dr. Priya Sharma', spec: 'Neurology', room: 'OPD Room 7' },
    { id: 'doc-3', name: 'Dr. Vikram Seth', spec: 'Orthopedics', room: 'OPD Room 12' }
  ];

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.condition.toLowerCase().includes(query.toLowerCase()));
  const filteredDoctors = doctors.filter(d => d.name.toLowerCase().includes(query.toLowerCase()) || d.spec.toLowerCase().includes(query.toLowerCase()));
  const filteredAppointments = appointments.filter(a => a.patientName.toLowerCase().includes(query.toLowerCase()) || a.doctorName.toLowerCase().includes(query.toLowerCase()));
  const filteredLabs = labRequests.filter(l => l.testName.toLowerCase().includes(query.toLowerCase()) || l.patientName.toLowerCase().includes(query.toLowerCase()));
  const filteredPrescriptions = prescriptions.filter(p => p.patientName.toLowerCase().includes(query.toLowerCase()) || p.prescriptionNo.toLowerCase().includes(query.toLowerCase()));
  const filteredInvoices = invoices.filter(i => i.patientName.toLowerCase().includes(query.toLowerCase()) || i.invoiceNo.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-md transition-opacity">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[80vh]">
        
        {/* Search Header Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search patients, doctors, appointments, lab reports, prescriptions, or switch portals..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm font-medium text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-200 dark:bg-slate-800 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 divide-y divide-slate-100 dark:divide-slate-800/60">
          
          {/* Quick Actions / Portal Switcher */}
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2 block">
              Quick Switch Portal
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { role: 'patient', name: 'Patient Portal', icon: User, color: 'text-blue-500' },
                { role: 'doctor', name: 'Doctor Portal', icon: Stethoscope, color: 'text-teal-500' },
                { role: 'receptionist', name: 'Reception Queue', icon: Calendar, color: 'text-indigo-500' },
                { role: 'lab', name: 'Laboratory', icon: FlaskConical, color: 'text-purple-500' },
                { role: 'pharmacist', name: 'Pharmacy', icon: Pill, color: 'text-amber-500' },
                { role: 'admin', name: 'Hospital Admin', icon: ShieldCheck, color: 'text-rose-500' }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.role}
                    onClick={() => handlePortalSwitch(item.role as UserRole)}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 bg-slate-50 dark:bg-slate-800/40 hover:bg-teal-500/10 transition-all text-left group"
                  >
                    <Icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-teal-600 dark:group-hover:text-teal-300">
                      {item.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Patients */}
          {filteredPatients.length > 0 && (
            <div className="pt-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2 block">
                Patients ({filteredPatients.length})
              </span>
              <div className="space-y-1">
                {filteredPatients.map(p => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setRole('patient');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-teal-500/10 text-teal-600 font-bold text-xs flex items-center justify-center">
                        {p.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-teal-500">
                          {p.name}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {p.age} Yrs · {p.gender} · {p.condition}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open EMR <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Doctors */}
          {filteredDoctors.length > 0 && (
            <div className="pt-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2 block">
                Doctors & Specialists
              </span>
              <div className="space-y-1">
                {filteredDoctors.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setRole('doctor');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs flex items-center justify-center">
                        <Stethoscope className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-500">
                          {d.name}
                        </span>
                        <p className="text-[11px] text-slate-400">
                          {d.spec} · {d.room}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Open Doctor Portal <ArrowRight className="w-3 h-3" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Appointments */}
          {filteredAppointments.length > 0 && (
            <div className="pt-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2 block">
                Appointments
              </span>
              <div className="space-y-1">
                {filteredAppointments.slice(0, 3).map(a => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{a.patientName}</span>
                      <p className="text-[11px] text-slate-400">{a.doctorName} · {a.time} ({a.type})</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-600">
                      {a.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lab Reports */}
          {filteredLabs.length > 0 && (
            <div className="pt-4">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2 block">
                Laboratory Requests
              </span>
              <div className="space-y-1">
                {filteredLabs.slice(0, 3).map(l => (
                  <button
                    key={l.id}
                    onClick={() => {
                      setRole('lab');
                      onClose();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors text-left"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{l.testName}</span>
                      <p className="text-[11px] text-slate-400">Patient: {l.patientName} · Doc: {l.doctorName}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-purple-500/10 text-purple-600">
                      {l.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer info */}
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Command className="w-3.5 h-3.5" /> CareFlow Unified Search
          </span>
          <button 
            onClick={onOpenBookModal} 
            className="text-teal-600 dark:text-teal-400 font-semibold hover:underline"
          >
            + Book New Appointment
          </button>
        </div>

      </div>
    </div>
  );
};
