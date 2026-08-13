import React, { useState } from 'react';
import { 
  Stethoscope, 
  Building2, 
  FlaskConical, 
  Pill, 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  Calendar, 
  BarChart3, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FeatureExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'clinical' | 'operations' | 'diagnostics' | 'pharmacy' | 'finance'>('clinical');

  const categories = [
    {
      id: 'clinical',
      name: 'Clinical',
      icon: Stethoscope,
      title: 'Clinical Care & Digital EMR',
      description: 'Comprehensive electronic medical record engine with ICD-10 diagnostic coding, allergy alerts, and prescription tracking.',
      features: [
        { name: 'Electronic Medical Records (EMR)', desc: 'Encrypted longitudinal patient chart storing all consultation notes, vitals, and diagnostic histories.' },
        { name: 'Digital E-Prescriptions', desc: 'Direct doctor-to-pharmacy e-prescribing with drug interaction warnings and dosage matrix checks.' },
        { name: 'Comprehensive Medical History', desc: 'Allergies, family medical history, vaccination logs, and chronic disease trackers.' }
      ],
      previewStats: { stat1: '100% Paperless', stat2: '0.2s EMR Query', tag: 'HIPAA Compliant' }
    },
    {
      id: 'operations',
      name: 'Operations',
      icon: Building2,
      title: 'Hospital Queue & OPD Operations',
      description: 'Automated token queue dispatching, doctor room assignment, and OPD capacity planning.',
      features: [
        { name: 'Smart OPD Queue Tokens', desc: 'Real-time SMS/WhatsApp token notifications that minimize waiting room congestion.' },
        { name: 'Appointment Scheduling', desc: 'Multi-doctor calendar sync for online telemedicine or in-person hospital visits.' },
        { name: 'Department & OPD Room Management', desc: 'Real-time room occupancy and doctor duty roster management.' }
      ],
      previewStats: { stat1: '40% Less Wait', stat2: '12 OPD Rooms', tag: 'Live Queue' }
    },
    {
      id: 'diagnostics',
      name: 'Diagnostics',
      icon: FlaskConical,
      title: 'Pathology & AI Report Intelligence',
      description: 'End-to-end laboratory barcoding, analyzer integration, and instant AI report summary generation.',
      features: [
        { name: 'Laboratory Request Workflow', desc: 'Doctor orders flow straight to pathology workstations with specimen barcoding.' },
        { name: 'AI Report Assistant', desc: 'Analyzes blood panels (CBC, HbA1c, Lipid) and highlights out-of-range values automatically.' },
        { name: 'Digital Report Release', desc: 'Cryptographically verified PDF reports delivered directly to patient mobile apps.' }
      ],
      previewStats: { stat1: 'AI OCR Scan', stat2: '12 Parameters', tag: 'Pathology Lab' }
    },
    {
      id: 'pharmacy',
      name: 'Pharmacy',
      icon: Pill,
      title: 'Pharmacy Dispensing & Inventory',
      description: 'Automated drug dispensing, stock replenishment alerts, batch expiry tracking, and auto-billing.',
      features: [
        { name: 'Prescription Fulfillment', desc: 'Pharmacists view OPD prescription orders instantly and confirm dosage dispensing.' },
        { name: 'Medicine Stock Inventory', desc: 'Real-time inventory levels with automated reorder threshold warnings.' },
        { name: 'Expiry & Batch Tracking', desc: 'Prevents expired drug dispensing with strict FEFO (First Expiry, First Out) management.' }
      ],
      previewStats: { stat1: 'FEFO Managed', stat2: '99.8% Accuracy', tag: 'Stock Control' }
    },
    {
      id: 'finance',
      name: 'Finance',
      icon: CreditCard,
      title: 'Unified Billing & Revenue Analytics',
      description: 'Consolidated invoices aggregating consultation fees, lab tests, and pharmacy items into 1-click payment links.',
      features: [
        { name: 'Itemized Unified Invoices', desc: 'Consolidates OPD, pathology, and pharmacy line items into one single invoice.' },
        { name: 'Multi-Channel Payments', desc: 'Accepts UPI QR code payments, credit cards, and insurance claims.' },
        { name: 'Executive Revenue Analytics', desc: 'Real-time department yield, OPD revenue trends, and audit reconciliation.' }
      ],
      previewStats: { stat1: 'Instant UPI', stat2: '$482.9k Revenue', tag: 'Settlement' }
    }
  ];

  const currentCategory = categories.find(c => c.id === activeCategory) || categories[0];

  return (
    <section id="features" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 mb-3">
            <Layers className="w-3.5 h-3.5" />
            Module Explorer
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Integrated Healthcare Capabilities
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
            Click a module category below to explore the core features powering modern healthcare facilities.
          </p>
        </div>

        {/* Category selector grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-28 ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-xl scale-102'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-800 hover:border-slate-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isActive ? 'bg-teal-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">{cat.name}</span>
                  <span className="text-[10px] opacity-70">Module Preview</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Category Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 mb-2 inline-block">
                    {currentCategory.previewStats.tag}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                    {currentCategory.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {currentCategory.description}
                  </p>
                </div>

                <div className="space-y-4">
                  {currentCategory.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                      <CheckCircle2 className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">{feat.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-normal">{feat.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Card Mock */}
              <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-2xl border border-slate-800 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-400 ml-2">
                      CareFlow :: {currentCategory.name.toUpperCase()} ENGINE
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 text-[10px] font-bold border border-teal-500/30">
                    Live Runtime
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Benchmark Metric</span>
                    <div className="text-2xl font-extrabold text-teal-400 mt-1">{currentCategory.previewStats.stat1}</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">System Latency</span>
                    <div className="text-2xl font-extrabold text-emerald-400 mt-1">{currentCategory.previewStats.stat2}</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-800/60 text-teal-200 text-xs leading-relaxed flex items-center justify-between">
                  <span>Explore this module in action inside your role portal.</span>
                  <ArrowRight className="w-4 h-4 text-teal-400 shrink-0" />
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
