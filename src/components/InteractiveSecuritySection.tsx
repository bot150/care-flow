import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Key, 
  UserCheck, 
  FileCheck2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const InteractiveSecuritySection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<number>(2); // Default Role Verification

  const securityPipeline = [
    {
      id: 'patient',
      stage: '01',
      title: 'Patient Request',
      icon: Lock,
      badge: 'Client TLS 1.3',
      short: 'Encrypted payload sent over TLS 1.3 channel.',
      explanation: 'All browser and mobile traffic to CareFlow is strictly enforced with TLS 1.3 encryption and HSTS headers to prevent eavesdropping and MITM attacks.'
    },
    {
      id: 'authentication',
      stage: '02',
      title: 'Authentication',
      icon: Key,
      badge: 'JWT Bearer Token',
      short: 'Cryptographic JWT session token issued.',
      explanation: 'Stateless session tokens signed with RS256 algorithms. Supports OAuth2, password hashing via bcrypt, and short-lived token expiration with refresh rotation.'
    },
    {
      id: 'role-verification',
      stage: '03',
      title: 'Role Verification',
      icon: UserCheck,
      badge: 'RBAC Access Guard',
      short: 'CareFlow validates user role permissions.',
      explanation: 'CareFlow ensures users only access functionality appropriate to their role. A pharmacist cannot view full clinical doctor notes, and a patient cannot alter medical prescriptions.'
    },
    {
      id: 'permission-check',
      stage: '04',
      title: 'Permission Check',
      icon: ShieldCheck,
      badge: 'Row-Level EMR Isolation',
      short: 'Database query restricted to patient scope.',
      explanation: 'Sensitive medical records are protected by strict row-level security and mandatory patient-doctor authorization checks prior to data retrieval.'
    },
    {
      id: 'authorized-data',
      stage: '05',
      title: 'Authorized Data',
      icon: FileCheck2,
      badge: 'Immutable Audit Logged',
      short: 'Decrypted data served & event logged.',
      explanation: 'Every read, write, or export operation triggers an immutable HIPAA audit trail entry capturing user ID, IP address, timestamp, and accessed resource.'
    }
  ];

  const currentNode = securityPipeline[selectedNode];

  return (
    <section id="security" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            Enterprise Security Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Healthcare Data Deserves a Higher Standard.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            Click any stage in the security pipeline below to inspect our zero-trust role verification and HIPAA audit model.
          </p>
        </div>

        {/* Security Pipeline Stages (Horizontal Clickable Pipeline) */}
        <div className="overflow-x-auto pb-4 mb-10 scrollbar-thin">
          <div className="flex items-center justify-between min-w-[800px] px-2 gap-3">
            {securityPipeline.map((node, index) => {
              const Icon = node.icon;
              const isSelected = selectedNode === index;

              return (
                <React.Fragment key={node.id}>
                  <button
                    onClick={() => setSelectedNode(index)}
                    className={`flex-1 p-4 rounded-2xl border transition-all text-left relative group ${
                      isSelected
                        ? 'bg-gradient-to-b from-teal-500/20 to-slate-800 border-teal-500 shadow-xl shadow-teal-500/10 scale-105'
                        : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isSelected ? 'bg-teal-500 text-white' : 'bg-slate-700 text-slate-300'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-extrabold text-slate-400">{node.stage}</span>
                    </div>

                    <h4 className="text-xs font-bold text-white group-hover:text-teal-300 transition-colors">
                      {node.title}
                    </h4>
                    <span className="text-[10px] text-teal-400 font-medium block mt-1">
                      {node.badge}
                    </span>

                    {isSelected && (
                      <motion.div
                        layoutId="activeSecurityIndicator"
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-teal-400"
                      />
                    )}
                  </button>

                  {index < securityPipeline.length - 1 && (
                    <ArrowRight className={`w-4 h-4 shrink-0 transition-colors ${
                      index < selectedNode ? 'text-teal-400' : 'text-slate-700'
                    }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Node Details Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentNode.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    Stage {currentNode.stage} Verification
                  </span>
                  <span className="text-xs font-semibold text-slate-400">
                    Protocol: {currentNode.badge}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {currentNode.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed bg-slate-900/80 p-4 rounded-2xl border border-slate-700/60">
                  {currentNode.explanation}
                </p>
              </div>

              {/* Compliance Badges */}
              <div className="lg:col-span-4 space-y-3 lg:border-l border-slate-700 lg:pl-8">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                  Compliance Certifications
                </span>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">HIPAA Title II Compliant</span>
                    <p className="text-[10px] text-slate-400">Protected Health Information (PHI)</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">NABH Digital Standard</span>
                    <p className="text-[10px] text-slate-400">National Accreditation Board</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-700 flex items-center gap-3 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">AES-256 Storage Encryption</span>
                    <p className="text-[10px] text-slate-400">At-rest & In-transit</p>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
