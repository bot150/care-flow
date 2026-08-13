import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Stethoscope, 
  User, 
  Calendar, 
  FileText, 
  FlaskConical, 
  Pill, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const DoctorPortalPreview: React.FC = () => {
  const { setRole } = useApp();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>('pat-1042');

  const patientsList = [
    {
      id: 'pat-1042',
      name: 'Ananya Rao',
      age: 28,
      gender: 'Female',
      bloodGroup: 'O+',
      time: '10:30 AM',
      type: 'Online Consultation',
      chiefComplaint: 'Chest tightness, mild dyspnea upon exertion.',
      vitals: 'BP: 118/76 mmHg · HR: 78 bpm · SpO2: 99%',
      labStatus: 'CBC Blood Report Ready (Mild Anemia)',
      prescription: 'Ferrous Ascorbate 100mg + Amoxicillin 500mg'
    },
    {
      id: 'pat-1043',
      name: 'Rahul Kumar',
      age: 45,
      gender: 'Male',
      bloodGroup: 'B+',
      time: '11:15 AM',
      type: 'In-Person OPD',
      chiefComplaint: 'Follow-up for Hypertension & High Cholesterol.',
      vitals: 'BP: 138/88 mmHg · HR: 82 bpm · SpO2: 98%',
      labStatus: 'Lipid Profile Pending',
      prescription: 'Amlodipine 5mg + Atorvastatin 10mg'
    },
    {
      id: 'pat-1044',
      name: 'Priya Sharma',
      age: 34,
      gender: 'Female',
      bloodGroup: 'A+',
      time: '12:00 PM',
      type: 'Online Consultation',
      chiefComplaint: 'Migraine with aura for 3 days.',
      vitals: 'BP: 112/70 mmHg · HR: 72 bpm · SpO2: 99%',
      labStatus: 'No active labs',
      prescription: 'Sumatriptan 50mg PRN'
    }
  ];

  const selectedPatient = patientsList.find(p => p.id === selectedPatientId);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-3">
            <Stethoscope className="w-3.5 h-3.5" />
            Clinical OPD Live Preview
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Doctor Clinical Workspace
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
            Click any patient in today’s consultation list below to inspect their medical record, lab orders, and prescriptions.
          </p>
        </div>

        {/* Doctor Dashboard Widget Preview */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
          
          {/* Header Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/20">
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase">Today's Patients</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">18 Scheduled</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Upcoming Consults</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">7 Waiting</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase">Pending Lab Reports</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">4 Reports</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase">OPD Room Status</span>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">Room 3 Active</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Patient List */}
            <div className="lg:col-span-5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-1 block">
                Today's Appointments Queue
              </span>

              {patientsList.map((patient) => {
                const isSelected = selectedPatientId === patient.id;
                return (
                  <button
                    key={patient.id}
                    onClick={() => setSelectedPatientId(patient.id)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-teal-500/10 dark:bg-teal-950/40 border-teal-500 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center ${
                        isSelected ? 'bg-teal-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}>
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white block">
                          {patient.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {patient.age} Yrs · {patient.gender} · {patient.bloodGroup}
                        </span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-bold text-teal-600 dark:text-teal-400 block">{patient.time}</span>
                      <span className="text-[10px] text-slate-400">{patient.type}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Patient Record Drawer */}
            <div className="lg:col-span-7">
              {selectedPatient ? (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-teal-500 text-white font-bold flex items-center justify-center text-sm">
                        {selectedPatient.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                          {selectedPatient.name}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Age: {selectedPatient.age} · Blood: {selectedPatient.bloodGroup} · ID: #{selectedPatient.id}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setRole('doctor')}
                      className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <span>Open Full EMR</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Chief Complaint</span>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{selectedPatient.chiefComplaint}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Patient Vitals Intake</span>
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400">{selectedPatient.vitals}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Lab & Pathology Status</span>
                      <p className="font-semibold text-purple-600 dark:text-purple-400">{selectedPatient.labStatus}</p>
                    </div>

                    <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Active Prescription</span>
                      <p className="font-semibold text-amber-600 dark:text-amber-400">{selectedPatient.prescription}</p>
                    </div>
                  </div>

                </div>
              ) : null}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
