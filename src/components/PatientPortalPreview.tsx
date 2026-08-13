import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Calendar, 
  FlaskConical, 
  Pill, 
  CreditCard, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  FileCheck2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const PatientPortalPreview: React.FC = () => {
  const { setRole } = useApp();
  const [activeAccordion, setActiveAccordion] = useState<'appointment' | 'lab' | 'prescription' | 'bill'>('appointment');

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
            <User className="w-3.5 h-3.5" />
            Patient Self-Service Preview
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Patient Personal Health Space
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
            Click any section below to see how patients access appointments, reports, e-prescriptions, and billing in 1 click.
          </p>
        </div>

        {/* Patient Interactive Cards */}
        <div className="max-w-4xl mx-auto space-y-4">
          
          {/* Card 1: Appointments */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'appointment' ? null as any : 'appointment')}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Upcoming Appointments</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Dr. Rahul Rao (Cardiology) · 10:30 AM Today</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                  Confirmed
                </span>
                {activeAccordion === 'appointment' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            <AnimatePresence>
              {activeAccordion === 'appointment' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-3"
                >
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Doctor Specialty</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Dr. Rahul Rao (Cardiology)</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Token & Room</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">Token #A-14 · OPD Room 3</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Consultation Mode</span>
                      <span className="font-bold text-teal-600 dark:text-teal-400">Online Telehealth</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setRole('patient')} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                      Manage Appointments in Patient Portal →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card 2: Lab Reports */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'lab' ? null as any : 'lab')}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Laboratory Reports</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Complete Blood Count (CBC) · 12 Parameters Analyzed</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-500/10 text-purple-600 border border-purple-500/20">
                  READY ✓
                </span>
                {activeAccordion === 'lab' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            <AnimatePresence>
              {activeAccordion === 'lab' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-3"
                >
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 space-y-2 text-xs">
                    <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                      <span>Hemoglobin: 10.2 g/dL (Mild Anemia)</span>
                      <span className="text-rose-500 font-bold">Low</span>
                    </div>
                    <p className="text-slate-500">AI Assistant Summary: Mild iron deficiency anemia detected. Dr. Rao has prescribed oral iron supplementation.</p>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setRole('patient')} className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1">
                      View Digital Report PDF →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card 3: Prescription */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'prescription' ? null as any : 'prescription')}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">E-Prescription #892</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">3 Medicines · Prescribed by Dr. Rahul Rao</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-600 border border-amber-500/20">
                  FULFILLED
                </span>
                {activeAccordion === 'prescription' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            <AnimatePresence>
              {activeAccordion === 'prescription' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-3"
                >
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>1. Ferrous Ascorbate 100mg</span>
                      <span className="text-slate-500">1-0-1 After Meals (30 Days)</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>2. Amoxicillin 500mg</span>
                      <span className="text-slate-500">1-0-1 After Meals (5 Days)</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setRole('patient')} className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
                      Track Pharmacy Order →
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Card 4: Bill */}
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 overflow-hidden shadow-sm transition-all">
            <button
              onClick={() => setActiveAccordion(activeAccordion === 'bill' ? null as any : 'bill')}
              className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-100/50 dark:hover:bg-slate-900/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center font-bold">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">Master Invoice #CF-10482</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Total: ₹1,300 (Consultation + Lab + Pharmacy)</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-teal-500/10 text-teal-600 border border-teal-500/20">
                  PAID ✓ (UPI)
                </span>
                {activeAccordion === 'bill' ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
            </button>

            <AnimatePresence>
              {activeAccordion === 'bill' && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-3"
                >
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-xs space-y-1">
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Cardiology OPD Consultation</span>
                      <span>₹500</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>CBC Laboratory Panel</span>
                      <span>₹300</span>
                    </div>
                    <div className="flex justify-between text-slate-600 dark:text-slate-400">
                      <span>Pharmacy Medicines Dispensed</span>
                      <span>₹450</span>
                    </div>
                    <div className="flex justify-between font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-100 dark:border-slate-800">
                      <span>Total Amount Settled</span>
                      <span>₹1,300</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
};
