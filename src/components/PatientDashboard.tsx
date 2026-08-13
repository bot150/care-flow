import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  Stethoscope, 
  Activity, 
  Heart, 
  FlaskConical, 
  Pill, 
  FileText, 
  Bell, 
  Clock, 
  Sparkles, 
  Eye, 
  Download, 
  Video, 
  CheckCircle2, 
  Plus,
  AlertCircle
} from 'lucide-react';
import { motion } from 'motion/react';

interface PatientDashboardProps {
  onOpenBookModal: () => void;
  onOpenAiScan: (lab: any) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({ onOpenBookModal, onOpenAiScan }) => {
  const { 
    patientProfile, 
    appointments, 
    labRequests, 
    prescriptions, 
    notifications 
  } = useApp();

  const nextApt = appointments[0] || {
    doctorName: 'Dr. Rahul Rao',
    doctorSpecialty: 'Cardiologist',
    date: 'Today',
    time: '10:30 AM',
    type: 'Online Consultation'
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white shadow-xl">
        <div className="space-y-1">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-white border border-white/20">
            Patient Portal
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Good morning, {patientProfile.name.split(' ')[0]} 👋
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 font-normal">
            Your connected health timeline is up to date. You have 1 consultation scheduled today.
          </p>
        </div>

        <button
          onClick={onOpenBookModal}
          className="px-5 py-3 rounded-2xl bg-white text-teal-800 font-bold text-xs sm:text-sm shadow-lg hover:bg-teal-50 transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Grid: Next Appointment & Health Overview Vitals */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Next Appointment Card (Section 5 Spec) */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Next Appointment</span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300">
              {nextApt.date} · {nextApt.time}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <img
              src={nextApt.doctorAvatar || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"}
              alt={nextApt.doctorName}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-teal-500/20"
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {nextApt.doctorName}
              </h3>
              <p className="text-xs text-teal-600 dark:text-teal-400 font-medium">
                {nextApt.doctorSpecialty}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1">
                <Video className="w-3.5 h-3.5 text-teal-500" />
                <span>{nextApt.type}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => alert(`Connecting to virtual consultation room with ${nextApt.doctorName}...`)}
              className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Join Consultation Room</span>
            </button>
          </div>
        </div>

        {/* Health Overview Metrics */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Health Overview & Vitals</h3>
            <span className="text-[11px] text-slate-400">Last Synced Today 10:42 AM</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Activity className="w-3.5 h-3.5 text-teal-500" />
                <span>Blood Pressure</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">118/76</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Optimal</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                <span>Heart Rate</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">78 <span className="text-xs font-normal">bpm</span></div>
              <span className="text-[10px] text-emerald-600 font-semibold">Normal Resting</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                <span>SpO2</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">99%</div>
              <span className="text-[10px] text-emerald-600 font-semibold">Excellent</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>Blood Group</span>
              </div>
              <div className="text-lg font-extrabold text-slate-900 dark:text-white">O+</div>
              <span className="text-[10px] text-slate-500">Universal Donor</span>
            </div>

          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Known Allergies: <strong>Penicillin (Mild rash), Peanuts</strong></span>
            </div>
            <span className="text-[10px] font-semibold text-amber-600">Verified EMR</span>
          </div>
        </div>

      </div>

      {/* Grid: Interactive Medical Timeline & Recent Lab Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Medical Timeline */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Medical Journey Timeline</span>
            </h3>
            <span className="text-xs text-slate-400">Connected EMR Feed</span>
          </div>

          <div className="relative pl-6 border-l-2 border-teal-500/30 space-y-6">
            {patientProfile.visits.map((visit, idx) => (
              <div key={visit.id} className="relative group">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-teal-600 border-2 border-white dark:border-slate-900 shadow-sm" />
                
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">
                      {visit.date} · {visit.type}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {visit.doctorName}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    Diagnosis: {visit.diagnosis}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {visit.clinicalNotes}
                  </p>

                  {visit.labRequests.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span className="text-[10px] font-semibold text-slate-400">Labs Ordered:</span>
                      {visit.labRequests.map((lab, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                          {lab}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Lab Reports & Prescriptions */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Recent Lab Reports Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-purple-600" />
                <span>Recent Lab Reports</span>
              </h3>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{labRequests.length} Reports</span>
            </div>

            <div className="space-y-3">
              {labRequests.map(lab => (
                <div key={lab.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/80 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900 dark:text-white">{lab.testName}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        lab.status === 'Report Ready' 
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' 
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      }`}>
                        {lab.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">
                      {lab.dateRequested} · Requested by {lab.doctorName}
                    </p>
                  </div>

                  {lab.status === 'Report Ready' && (
                    <button
                      onClick={() => onOpenAiScan(lab)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-[11px] shadow-xs transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>AI Scan</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Recent Prescriptions Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Pill className="w-4 h-4 text-amber-600" />
                <span>Active Prescriptions</span>
              </h3>
              <span className="text-xs text-amber-600 font-semibold">Prescription #892</span>
            </div>

            <div className="space-y-2.5">
              {prescriptions[0]?.medicines.map(m => (
                <div key={m.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{m.name}</div>
                    <p className="text-[10px] text-slate-500">{m.dosage} · {m.frequency} ({m.duration})</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    Qty: {m.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
