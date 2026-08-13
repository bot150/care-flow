import React, { useState } from 'react';
import { 
  User, 
  Stethoscope, 
  FlaskConical, 
  Pill, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Activity, 
  TrendingUp, 
  Users, 
  Building2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractiveHowItWorks: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patient' | 'doctor' | 'lab' | 'pharmacist' | 'admin'>('patient');

  const tabContents = {
    patient: {
      title: 'Patient Connected Experience',
      desc: 'Patients get a single unified health timeline for appointments, EMR records, lab results, e-prescriptions, and mobile payments.',
      widgets: [
        { label: 'Upcoming Appointment', value: 'Dr. Rahul Rao · 10:30 AM', sub: 'Cardiology OPD Room 3', status: 'Confirmed', statusColor: 'bg-emerald-500/10 text-emerald-600' },
        { label: 'Medical Timeline', value: '3 Consultations Recorded', sub: 'Latest: Sinus Tachycardia Evaluation', status: 'Updated', statusColor: 'bg-blue-500/10 text-blue-600' },
        { label: 'Lab Reports', value: 'CBC Blood Test', sub: '12 Parameters Analyzed', status: 'READY ✓', statusColor: 'bg-purple-500/10 text-purple-600' },
        { label: 'Prescription', value: 'Rx #892 (3 Medicines)', sub: 'Amoxicillin, Paracetamol, Ferrous Ascorbate', status: 'FULFILLED', statusColor: 'bg-amber-500/10 text-amber-600' },
        { label: 'Consolidated Bill', value: 'Invoice #CF-10482 ($1,300)', sub: 'Consultation + Lab + Pharmacy', status: 'PAID ✓', statusColor: 'bg-teal-500/10 text-teal-600' }
      ]
    },
    doctor: {
      title: 'Doctor Clinical Workspace',
      desc: 'Doctors access real-time patient queue, historical EMR timelines, instant lab orders, and voice-assisted digital prescription tools.',
      widgets: [
        { label: "Today's Patient Queue", value: '18 Patients Scheduled', sub: '7 Completed · 1 In Progress · 10 Waiting', status: 'Active OPD', statusColor: 'bg-teal-500/10 text-teal-600' },
        { label: 'Pending Lab Reviews', value: '4 Reports Awaiting Approval', sub: '1 Urgent CBC flagged by AI', status: 'Attention', statusColor: 'bg-rose-500/10 text-rose-600' },
        { label: 'Patient EMR Lookup', value: 'Pat-1042: Ananya Rao', sub: 'Allergies: Penicillin · BP 118/76', status: 'Verified', statusColor: 'bg-blue-500/10 text-blue-600' },
        { label: 'Digital Rx Generator', value: 'ICD-10 Diagnostic Codes', sub: 'Auto-checks drug interaction matrix', status: 'Active', statusColor: 'bg-emerald-500/10 text-emerald-600' }
      ]
    },
    lab: {
      title: 'Laboratory & Pathology Station',
      desc: 'Phlebotomists and pathologists track sample barcodes from collection to analyzer scan with AI report summary validation.',
      widgets: [
        { label: 'Pending Sample Tests', value: '12 Samples in Pipeline', sub: '6 EDTA Blood · 4 Urine · 2 Swab', status: 'Processing', statusColor: 'bg-purple-500/10 text-purple-600' },
        { label: 'Chain of Custody', value: 'Barcode #LAB-9921 Collected', sub: 'Scanned at 11:00 AM by Tech Rohan', status: 'Sample Collected', statusColor: 'bg-blue-500/10 text-blue-600' },
        { label: 'AI Analyzer Assistant', value: '12 Parameters Extracted', sub: '3 Values outside reference range', status: 'Scan Complete', statusColor: 'bg-amber-500/10 text-amber-600' },
        { label: 'Digital Sign-off', value: 'Dr. Pathologist Verification', sub: 'Cryptographic signature attached', status: 'Released', statusColor: 'bg-emerald-500/10 text-emerald-600' }
      ]
    },
    pharmacist: {
      title: 'Pharmacy Dispensing Portal',
      desc: 'Pharmacists receive e-prescriptions directly from OPD rooms, verify dosage, auto-decrement stock inventory, and issue medicines.',
      widgets: [
        { label: 'Active Prescription Queue', value: '8 Orders Pending Fulfillment', sub: 'Rx #892 (Ananya Rao)', status: 'In Queue', statusColor: 'bg-amber-500/10 text-amber-600' },
        { label: 'Safety Interaction Guard', value: 'Zero Drug Conflicts', sub: 'Checked against patient allergy profile', status: 'Safe ✓', statusColor: 'bg-emerald-500/10 text-emerald-600' },
        { label: 'Real-time Stock Inventory', value: 'Amoxicillin 500mg: 420 Units', sub: 'Reorder threshold: 50 units', status: 'In Stock', statusColor: 'bg-teal-500/10 text-teal-600' },
        { label: 'Auto Billing Sync', value: 'Itemized Rx Amount: $450', sub: 'Directly linked to master invoice', status: 'Synced', statusColor: 'bg-blue-500/10 text-blue-600' }
      ]
    },
    admin: {
      title: 'Hospital Operations Command Center',
      desc: 'Execs and administrators monitor OPD room throughput, bed occupancy, revenue streams, staff schedules, and HIPAA security logs.',
      widgets: [
        { label: 'Monthly Revenue Stream', value: '$482,900 Collected', sub: '+14.2% increase vs previous month', status: 'Growing', statusColor: 'bg-emerald-500/10 text-emerald-600' },
        { label: 'Hospital Bed Occupancy', value: '88% Capacity (108/122 Beds)', sub: '14 ICU & Ward beds available', status: 'Monitored', statusColor: 'bg-blue-500/10 text-blue-600' },
        { label: 'Active Staff On Duty', value: '42 Doctors · 88 Nurses', sub: '12 OPD consultation rooms operating', status: 'Operational', statusColor: 'bg-teal-500/10 text-teal-600' },
        { label: 'HIPAA Audit Trail', value: 'Immutable Event Logger', sub: '0 Security violations · 1,420 EMR accesses', status: 'Secured ✓', statusColor: 'bg-purple-500/10 text-purple-600' }
      ]
    }
  };

  const currentData = tabContents[activeTab];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Product Portal Showcase
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How CareFlow Works Across Roles
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
            Switch tabs to inspect how each healthcare stakeholder experiences the platform in real-time.
          </p>
        </div>

        {/* Role Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {[
            { id: 'patient', name: 'Patient', icon: User },
            { id: 'doctor', name: 'Doctor', icon: Stethoscope },
            { id: 'lab', name: 'Laboratory', icon: FlaskConical },
            { id: 'pharmacist', name: 'Pharmacy', icon: Pill },
            { id: 'admin', name: 'Hospital Admin', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Interface Preview Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="p-6 sm:p-10 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Description */}
              <div className="lg:col-span-5 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                  Role Portal Mechanics
                </span>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {currentData.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentData.desc}
                </p>
                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-teal-500" />
                    <span>Synchronized with Central PostgreSQL & EMR Engine</span>
                  </div>
                </div>
              </div>

              {/* Right Mock UI Cards */}
              <div className="lg:col-span-7 space-y-3">
                {currentData.widgets.map((widget, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4 transition-transform hover:-translate-y-0.5"
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {widget.label}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                        {widget.value}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {widget.sub}
                      </p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold shrink-0 ${widget.statusColor}`}>
                      {widget.status}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
