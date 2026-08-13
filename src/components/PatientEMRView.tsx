import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Activity, 
  FileText, 
  FlaskConical, 
  Pill, 
  AlertTriangle, 
  Syringe, 
  Clock, 
  Plus, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Stethoscope,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PatientEMRView: React.FC = () => {
  const { 
    patientProfile, 
    addMedicalVisitNote, 
    setActiveLabForAiScan, 
    labRequests, 
    prescriptions 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Overview' | 'History' | 'Visits' | 'Prescriptions' | 'Labs' | 'Allergies' | 'Vaccinations'>('Overview');
  const [expandedVisitId, setExpandedVisitId] = useState<string>('vis-101');

  // New Note Form State
  const [showNewVisitModal, setShowNewVisitModal] = useState<boolean>(false);
  const [chiefComplaint, setChiefComplaint] = useState<string>('Chest discomfort after exercise & fatigue');
  const [diagnosis, setDiagnosis] = useState<string>('Sinus Tachycardia, Mild Anemia');
  const [notes, setNotes] = useState<string>('Patient advised hydration and ferrous ascorbate supplementation. Re-check in 4 weeks.');
  const [selectedLabs, setSelectedLabs] = useState<string[]>(['Complete Blood Count (CBC)']);

  const handleSaveVisit = (e: React.FormEvent) => {
    e.preventDefault();
    addMedicalVisitNote(chiefComplaint, diagnosis, notes, selectedLabs, []);
    setShowNewVisitModal(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Patient Header Banner (Section 7 Spec) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-xl shrink-0">
            AR
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight">{patientProfile.name}</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                Patient ID: {patientProfile.id}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 mt-1">
              <span>Age: <strong>{patientProfile.age} years</strong></span>
              <span>Gender: <strong>{patientProfile.gender}</strong></span>
              <span>Blood Group: <strong className="text-rose-400">{patientProfile.bloodGroup}</strong></span>
              <span>Phone: <strong>{patientProfile.phone}</strong></span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowNewVisitModal(true)}
          className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Record OPD Consultation Note</span>
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {(['Overview', 'History', 'Visits', 'Prescriptions', 'Labs', 'Allergies', 'Vaccinations'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 ${
              activeTab === tab
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Display */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Expandable Medical Timeline */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Expandable Clinical Visit Timeline</span>
              </h3>
              <span className="text-xs text-slate-400">{patientProfile.visits.length} Encounters Recorded</span>
            </div>

            <div className="space-y-4">
              {patientProfile.visits.map(visit => {
                const isExpanded = expandedVisitId === visit.id;
                return (
                  <div key={visit.id} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all">
                    <button
                      onClick={() => setExpandedVisitId(isExpanded ? '' : visit.id)}
                      className="w-full p-4 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between gap-4 text-left"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{visit.date}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                            {visit.type}
                          </span>
                        </div>
                        <p className="text-xs text-teal-600 dark:text-teal-400 font-semibold mt-0.5">
                          Diagnosis: {visit.diagnosis}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-xs text-slate-500 hidden sm:inline">{visit.doctorName}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-white dark:bg-slate-900 space-y-4 border-t border-slate-100 dark:border-slate-800"
                        >
                          <div>
                            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Chief Complaint</h5>
                            <p className="text-xs text-slate-800 dark:text-slate-200">{visit.chiefComplaint}</p>
                          </div>

                          <div>
                            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">Clinical Assessment & Notes</h5>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700">
                              {visit.clinicalNotes}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                            <div><span className="text-slate-400">BP:</span> <strong>{visit.vitals.bloodPressure}</strong></div>
                            <div><span className="text-slate-400">Heart Rate:</span> <strong>{visit.vitals.heartRate} bpm</strong></div>
                            <div><span className="text-slate-400">SpO2:</span> <strong>{visit.vitals.spO2}%</strong></div>
                            <div><span className="text-slate-400">Weight:</span> <strong>{visit.vitals.weightKg} kg</strong></div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Allergies, Vaccinations & Active Prescriptions */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Allergies & Conditions */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" />
                <span>Allergies & Risk Factors</span>
              </h3>

              <div className="space-y-2">
                {patientProfile.allergies.map((allergy, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 text-xs text-rose-800 dark:text-rose-200 font-semibold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>{allergy}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Chronic Conditions</h4>
                <div className="flex flex-wrap gap-1.5">
                  {patientProfile.chronicConditions.map((cond, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {cond}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Vaccinations */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Syringe className="w-4 h-4 text-teal-600" />
                <span>Immunization Record</span>
              </h3>

              <div className="space-y-2">
                {patientProfile.vaccinations.map((vac, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{vac.name}</div>
                      <span className="text-[10px] text-slate-400">{vac.date}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {vac.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Record Visit Modal */}
      {showNewVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">Record OPD Consultation Note</h3>
              <button onClick={() => setShowNewVisitModal(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveVisit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Chief Complaint</label>
                <input
                  type="text"
                  value={chiefComplaint}
                  onChange={e => setChiefComplaint(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Clinical Diagnosis</label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={e => setDiagnosis(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300">Detailed Treatment Plan & Notes</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewVisitModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 text-white font-semibold shadow-xs"
                >
                  Save & Commit to EMR
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};
