import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Stethoscope, 
  FileText, 
  FlaskConical, 
  FileCheck2, 
  Pill, 
  Building2, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Sparkles 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractivePatientJourney: React.FC = () => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);

  const journeyNodes = [
    {
      id: 'appointment',
      title: '01. Appointment',
      subtitle: 'Digital Scheduling',
      icon: CalendarCheck,
      status: 'Confirmed',
      timestamp: 'Today · 10:30 AM',
      role: 'Patient & Reception',
      info: 'Ananya Rao booked an Online Consultation with Dr. Rahul Rao (Cardiologist) for routine chest evaluation.',
      nextAction: 'Join Virtual Room or Proceed to OPD Room 3',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'consultation',
      title: '02. Consultation',
      subtitle: 'Clinical OPD',
      icon: Stethoscope,
      status: 'Completed',
      timestamp: 'Today · 10:42 AM',
      role: 'Attending Doctor',
      info: 'Dr. Rao evaluated vitals (BP 118/76 mmHg, HR 78 bpm). Patient reported mild exertion dyspnea. Initial diagnosis: Sinus Tachycardia.',
      nextAction: 'Order Hematology & Lipid Panels in EMR',
      color: 'from-teal-500 to-emerald-600'
    },
    {
      id: 'medical-record',
      title: '03. Medical Record',
      subtitle: 'EMR Digital Chart',
      icon: FileText,
      status: 'Updated',
      timestamp: 'Today · 10:45 AM',
      role: 'Doctor & EMR System',
      info: 'Consultation notes, clinical observations, and ICD diagnostic codes securely committed to encrypted EMR profile #Pat-1042.',
      nextAction: 'Auto-transmit lab orders to Pathology Lab',
      color: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'lab-test',
      title: '04. Lab Test',
      subtitle: 'Sample Collection',
      icon: FlaskConical,
      status: 'Sample Processed',
      timestamp: 'Today · 11:00 AM',
      role: 'Laboratory Staff',
      info: 'Phlebotomist collected EDTA whole blood sample. Automated barcoding and chain-of-custody tracking initiated for CBC analysis.',
      nextAction: 'Automated Analyzer Scan & AI Validation',
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: 'report',
      title: '05. Digital Report',
      subtitle: 'AI Analysis & Release',
      icon: FileCheck2,
      status: 'Report Ready',
      timestamp: 'Today · 11:15 AM',
      role: 'Lab Tech & AI Assistant',
      info: 'CBC analyzed: 12 parameters verified. Hemoglobin 11.8 g/dL (mild anemia detected). Digital report cryptographically signed and released to patient.',
      nextAction: 'Generate E-Prescription for Iron Therapy',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      id: 'prescription',
      title: '06. Prescription',
      subtitle: 'E-Prescription',
      icon: Pill,
      status: 'Issued',
      timestamp: 'Today · 11:18 AM',
      role: 'Doctor',
      info: 'Dr. Rao issued Prescription #892: Amoxicillin 500mg, Paracetamol 650mg, and Ferrous Ascorbate 100mg for 30 days.',
      nextAction: 'Auto-route order to In-House Pharmacy',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 'pharmacy',
      title: '07. Pharmacy',
      subtitle: 'Dispensing Workflow',
      icon: Building2,
      status: 'Dispensed',
      timestamp: 'Today · 11:30 AM',
      role: 'Pharmacist',
      info: 'Pharmacist verified drug interactions, reserved stock items, and completed automated dispensing. Inventory counts auto-decremented.',
      nextAction: 'Generate Consolidated Billing Invoice',
      color: 'from-rose-500 to-pink-600'
    },
    {
      id: 'billing',
      title: '08. Billing & Receipt',
      subtitle: 'Unified Invoice',
      icon: CreditCard,
      status: 'Settled (UPI)',
      timestamp: 'Today · 11:35 AM',
      role: 'Billing Counter',
      info: 'Itemized invoice #CF-10482 generated (Consultation ₹500 + Lab ₹300 + Pharmacy ₹450 = ₹1300 total). Paid instantly via UPI.',
      nextAction: 'Schedule 4-Week Follow-up Notification',
      color: 'from-indigo-500 to-purple-600'
    }
  ];

  const activeNode = journeyNodes[selectedNodeIndex];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl my-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Signature Connected Architecture
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Interactive Connected Patient Journey
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Click any step to inspect the real-time status, role permissions, and system triggers across CareFlow.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
          <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Real-time End-to-End Latency: &lt; 45 mins</span>
        </div>
      </div>

      {/* Horizontal Steps Scrollable Node Bar */}
      <div className="overflow-x-auto pb-4 mb-8 scrollbar-thin">
        <div className="flex items-center gap-3 min-w-[760px] px-2">
          {journeyNodes.map((node, index) => {
            const Icon = node.icon;
            const isSelected = selectedNodeIndex === index;
            const isPast = index < selectedNodeIndex;

            return (
              <React.Fragment key={node.id}>
                <button
                  onClick={() => setSelectedNodeIndex(index)}
                  className={`group relative flex flex-col items-center p-3.5 rounded-2xl border transition-all duration-200 text-center shrink-0 w-32 ${
                    isSelected
                      ? 'bg-gradient-to-b from-teal-500/10 to-teal-600/5 dark:from-teal-950/40 dark:to-teal-900/20 border-teal-500 shadow-md shadow-teal-500/10 scale-105'
                      : isPast
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 mb-2 ${
                      isSelected
                        ? `bg-gradient-to-tr ${node.color} text-white shadow-md`
                        : isPast
                        ? 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-900 dark:text-white line-clamp-1">
                    {node.title.split('. ')[1]}
                  </span>
                  <span className="text-[9px] text-slate-400 font-medium mt-0.5">
                    {node.subtitle}
                  </span>

                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 w-2 h-2 rounded-full bg-teal-500"
                    />
                  )}
                </button>

                {index < journeyNodes.length - 1 && (
                  <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${
                    index < selectedNodeIndex ? 'text-teal-500' : 'text-slate-300 dark:text-slate-700'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Selected Node Detailed Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNode.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
          className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-teal-50/20 dark:from-slate-800/60 dark:to-teal-950/20 border border-slate-200/80 dark:border-slate-700/80"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Left Box: Node Meta */}
            <div className="space-y-4 lg:border-r border-slate-200 dark:border-slate-700 lg:pr-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${activeNode.color} text-white flex items-center justify-center shadow-md`}>
                  {React.createElement(activeNode.icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeNode.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {activeNode.subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500">Node Status:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {activeNode.status}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500">Timestamp:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {activeNode.timestamp}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-slate-500">Responsible Role:</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    {activeNode.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Box: Info & Next Action */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Workflow Details & Data Synchronization
                </h5>
                <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                  {activeNode.info}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-900 dark:text-teal-100">
                <div className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
                  <span className="text-xs font-semibold">
                    Automated System Trigger: <span className="font-normal">{activeNode.nextAction}</span>
                  </span>
                </div>
                <button
                  onClick={() => setSelectedNodeIndex((selectedNodeIndex + 1) % journeyNodes.length)}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shrink-0 self-end sm:self-auto"
                >
                  Inspect Next Node →
                </button>
              </div>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};
