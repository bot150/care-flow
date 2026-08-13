import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Users, 
  Calendar, 
  FlaskConical, 
  Clock, 
  AlertCircle, 
  CheckCircle2, 
  Video, 
  UserCheck, 
  ArrowRight, 
  Sparkles,
  FileText
} from 'lucide-react';
import { PatientEMRView } from './PatientEMRView';

interface DoctorDashboardProps {
  activeSubTab: string;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ activeSubTab }) => {
  const { appointments, labRequests, setSelectedPatientId } = useApp();

  if (activeSubTab === 'emr') {
    return <PatientEMRView />;
  }

  return (
    <div className="space-y-8">
      
      {/* Top Metrics Cards (Section 6 Spec) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Today's Patients</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">14</div>
          <p className="text-[11px] text-teal-600 font-medium mt-1">4 Completed · 10 Remaining</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Upcoming Consultations</span>
            <Calendar className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">3</div>
          <p className="text-[11px] text-blue-600 font-medium mt-1">2 Online · 1 In-Person</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Pending Lab Reports</span>
            <FlaskConical className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">2</div>
          <p className="text-[11px] text-purple-600 font-medium mt-1">CBC & Lipid Ready</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
            <span>Follow-ups Scheduled</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">1</div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Priya Sharma (Hypertension)</p>
        </div>

      </div>

      {/* Grid: Interactive Appointment Timeline & Pending Attention */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Appointment Timeline */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              <span>Today's OPD Schedule Timeline</span>
            </h3>
            <span className="text-xs text-slate-400">Cardiology OPD Room 3</span>
          </div>

          <div className="space-y-3">
            {appointments.map((apt, index) => (
              <div 
                key={apt.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 font-mono text-xs font-bold text-teal-600 dark:text-teal-400 shrink-0">
                    {apt.time}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">{apt.patientName}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        Token {apt.tokenNumber}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{apt.reason}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    apt.type === 'Online Consultation' 
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300' 
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}>
                    {apt.type}
                  </span>

                  <button
                    onClick={() => {
                      setSelectedPatientId('pat-1042');
                      alert(`Opening EMR chart for ${apt.patientName}`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View EMR</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* "Pending Attention" Section (Section 6 Spec) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>Pending Attention</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              3 Items
            </span>
          </div>

          <div className="space-y-3 text-xs">
            
            <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FlaskConical className="w-4 h-4 text-rose-600" />
                <span>2 Lab Reports Need Review</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Ananya Rao's CBC report is ready with 3 flagged values.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>1 Overdue Follow-up</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Kiran Patel missed 2-week post-stent recovery check-in.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-1">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600" />
                <span>3 Consultations Within 1 Hour</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                Token #24, #25, and #26 waiting in OPD queue.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
