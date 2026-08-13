import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Activity, 
  Calendar, 
  FileText, 
  FlaskConical, 
  Pill, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Bell, 
  User, 
  Stethoscope, 
  ChevronRight,
  TrendingUp,
  Zap,
  Lock,
  Sparkles,
  CreditCard,
  Building2,
  Clock,
  HeartPulse
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { InteractivePatientJourney } from './InteractivePatientJourney';
import { InteractiveHowItWorks } from './InteractiveHowItWorks';
import { FeatureExplorer } from './FeatureExplorer';
import { AiReportAssistantPreview } from './AiReportAssistantPreview';
import { InteractiveSecuritySection } from './InteractiveSecuritySection';
import { DoctorPortalPreview } from './DoctorPortalPreview';
import { PatientPortalPreview } from './PatientPortalPreview';

interface LandingPageProps {
  onOpenBookModal: () => void;
  onOpenPortalAuth: (role?: UserRole) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ 
  onOpenBookModal,
  onOpenPortalAuth
}) => {
  const { setRole, addToast } = useApp();

  // Hero interactive preview widget active tab
  const [heroWidgetState, setHeroWidgetState] = useState<'appointment' | 'lab' | 'rx' | 'bill'>('lab');
  const [selectedPortalCard, setSelectedPortalCard] = useState<UserRole>('patient');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                <Sparkles className="w-3.5 h-3.5 text-teal-500" />
                <span>Next-Gen Connected Healthcare Platform</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Healthcare, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-500 bg-clip-text text-transparent">
                  connected.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                One secure platform connecting patients, doctors, laboratories, pharmacies and hospital operations.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onOpenPortalAuth('patient')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-sm shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#portals"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm border border-slate-200 dark:border-slate-800 transition-all flex items-center justify-center gap-2"
                >
                  <span>Explore Portals</span>
                </a>
              </div>

              {/* Trust highlights */}
              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 dark:text-slate-400 font-medium border-t border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>HIPAA & NABH Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>6 Role-Based Portals</span>
                </div>
              </div>
            </div>

            {/* Hero Right: Interactive Live Healthcare Dashboard Preview */}
            <div className="lg:col-span-6">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="absolute -top-12 -right-12 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative bg-slate-900 text-white rounded-3xl p-6 shadow-2xl border border-slate-800 space-y-5 overflow-hidden">
                  
                  {/* Mock Window Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold text-slate-400 ml-2">CareFlow Live System</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-teal-400 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                  </div>

                  {/* Greeting */}
                  <div className="flex items-center justify-between bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient Profile Pat-1042</span>
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        Good morning, Ananya 👋
                      </h3>
                      <p className="text-xs text-slate-400">All medical workflows synchronized in real-time.</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-xl bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                      Active
                    </span>
                  </div>

                  {/* Next Appointment Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-800/90 border border-slate-700 space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                      <span>Next OPD Appointment</span>
                      <span className="text-teal-400">10:30 AM Today</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">Dr. Rahul Rao</h4>
                          <p className="text-xs text-slate-400">Cardiology · OPD Room 3</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Confirmed
                      </span>
                    </div>
                  </div>

                  {/* Interactive Status Badges Ticker */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
                      Connected Workflow Live Statuses
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => {
                          setHeroWidgetState('lab');
                          addToast('Lab Status Verified', 'CBC Blood Report is READY ✓', 'success');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          heroWidgetState === 'lab'
                            ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 font-bold block">Lab Report</span>
                        <span className="text-xs font-bold text-purple-400">READY ✓</span>
                      </button>

                      <button
                        onClick={() => {
                          setHeroWidgetState('rx');
                          addToast('Prescription Fulfilled', 'Central Pharmacy dispensed medicines', 'info');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          heroWidgetState === 'rx'
                            ? 'bg-amber-950/60 border-amber-500 text-amber-200'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 font-bold block">Prescription</span>
                        <span className="text-xs font-bold text-amber-400">FULFILLED</span>
                      </button>

                      <button
                        onClick={() => {
                          setHeroWidgetState('bill');
                          addToast('Invoice Paid', 'Invoice #CF-10482 settled via UPI', 'success');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          heroWidgetState === 'bill'
                            ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 font-bold block">Payment</span>
                        <span className="text-xs font-bold text-emerald-400">PAID ✓</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
                    <span>⚡ Bypasses manual paperwork with 1-click role portals</span>
                    <button onClick={() => onOpenPortalAuth('patient')} className="text-teal-400 font-bold hover:underline">
                      Test Live →
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* 2. CHOOSE YOUR CAREFLOW PORTAL SECTION (THE MOST IMPORTANT SECTION) */}
      <section id="portals" className="py-20 sm:py-28 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 mb-3">
              <User className="w-3.5 h-3.5" />
              Role-Based Access Control
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Choose your CareFlow portal
            </h2>
            <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 mt-3">
              Select a portal card to view details, then click continue to authenticate with your credentials.
            </p>
          </div>

          {/* 6 Interactive Large Portal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {[
              {
                id: 'patient',
                title: 'PATIENT',
                badge: 'Self-Service',
                desc: 'Manage appointments, medical records, lab reports, prescriptions and bills.',
                icon: User,
                color: 'blue',
                ringColor: 'ring-blue-500 border-blue-500 bg-blue-50/30 dark:bg-blue-950/20',
                textColor: 'text-blue-600 dark:text-blue-400',
                iconBg: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
                btnBg: 'bg-blue-600 hover:bg-blue-700'
              },
              {
                id: 'doctor',
                title: 'DOCTOR',
                badge: 'Clinical OPD',
                desc: 'Manage consultations, patients, digital medical records, and e-prescriptions.',
                icon: Stethoscope,
                color: 'teal',
                ringColor: 'ring-teal-500 border-teal-500 bg-teal-50/30 dark:bg-teal-950/20',
                textColor: 'text-teal-600 dark:text-teal-400',
                iconBg: 'bg-teal-500/10 text-teal-600 dark:text-teal-400',
                btnBg: 'bg-teal-600 hover:bg-teal-700'
              },
              {
                id: 'receptionist',
                title: 'RECEPTIONIST',
                badge: 'Front Desk',
                desc: 'Manage patient check-in, OPD queue tokens, appointments, and room allocation.',
                icon: Calendar,
                color: 'indigo',
                ringColor: 'ring-indigo-500 border-indigo-500 bg-indigo-50/30 dark:bg-indigo-950/20',
                textColor: 'text-indigo-600 dark:text-indigo-400',
                iconBg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
                btnBg: 'bg-indigo-600 hover:bg-indigo-700'
              },
              {
                id: 'lab',
                title: 'LABORATORY',
                badge: 'Diagnostics',
                desc: 'Manage test requests, sample collection, AI report assistant, and lab releases.',
                icon: FlaskConical,
                color: 'purple',
                ringColor: 'ring-purple-500 border-purple-500 bg-purple-50/30 dark:bg-purple-950/20',
                textColor: 'text-purple-600 dark:text-purple-400',
                iconBg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
                btnBg: 'bg-purple-600 hover:bg-purple-700'
              },
              {
                id: 'pharmacist',
                title: 'PHARMACIST',
                badge: 'Pharmacy',
                desc: 'Manage prescription fulfillment, stock inventory, and medicine dispensing.',
                icon: Pill,
                color: 'amber',
                ringColor: 'ring-amber-500 border-amber-500 bg-amber-50/30 dark:bg-amber-950/20',
                textColor: 'text-amber-600 dark:text-amber-400',
                iconBg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                btnBg: 'bg-amber-600 hover:bg-amber-700'
              },
              {
                id: 'admin',
                title: 'HOSPITAL ADMIN',
                badge: 'Operations',
                desc: 'Manage hospital capacity, analytics, staff performance, and security audit logs.',
                icon: ShieldCheck,
                color: 'rose',
                ringColor: 'ring-rose-500 border-rose-500 bg-rose-50/30 dark:bg-rose-950/20',
                textColor: 'text-rose-600 dark:text-rose-400',
                iconBg: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                btnBg: 'bg-rose-600 hover:bg-rose-700'
              }
            ].map(p => {
              const IconComp = p.icon;
              const isSelected = selectedPortalCard === p.id;
              return (
                <div 
                  key={p.id}
                  onClick={() => setSelectedPortalCard(p.id as UserRole)}
                  className={`group relative p-8 rounded-3xl transition-all duration-300 cursor-pointer flex flex-col justify-between border-2 ${
                    isSelected 
                      ? `${p.ringColor} ring-2 shadow-2xl scale-[1.02]` 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200/80 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`w-14 h-14 rounded-2xl ${p.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-md`}>
                        <IconComp className="w-7 h-7" />
                      </div>
                      {isSelected && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-teal-500 text-white shadow-xs animate-pulse">
                          Selected
                        </span>
                      )}
                    </div>

                    <div>
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider ${p.textColor}`}>
                        {p.badge}
                      </span>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">
                        {p.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {p.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-slate-800/80">
                    {isSelected ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPortalAuth(p.id as UserRole);
                        }}
                        className={`w-full py-3 px-4 rounded-2xl ${p.btnBg} text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 group-hover:scale-105`}
                      >
                        <span>Continue to {p.title} Portal</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className={`flex items-center justify-between text-xs font-bold ${p.textColor}`}>
                        <span>Select {p.title} Portal</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      </section>


      {/* 3. INTERACTIVE PATIENT JOURNEY SECTION */}
      <InteractivePatientJourney />


      {/* 4. HOW CAREFLOW WORKS SECTION */}
      <section id="how-it-works">
        <InteractiveHowItWorks />
      </section>


      {/* 5. FEATURE EXPLORER SECTION */}
      <FeatureExplorer />


      {/* 6. AI REPORT ASSISTANT PREVIEW */}
      <AiReportAssistantPreview />


      {/* 7. DOCTOR & PATIENT INTERACTIVE PREVIEWS */}
      <DoctorPortalPreview />
      <PatientPortalPreview />


      {/* 8. INTERACTIVE SECURITY SECTION */}
      <InteractiveSecuritySection />


      {/* 9. ANALYTICS & TRUST STATS */}
      <section className="py-16 sm:py-20 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">42 / 45</div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Active Doctors On Duty</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-teal-600 dark:text-teal-400">108 / 122</div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Bed Capacity Occupied</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">1,420</div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">Digital EMR Charts Created</p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">99.99%</div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">System Uptime SLA</p>
            </div>

          </div>
        </div>
      </section>


      {/* 10. FINAL CTA BANNER */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6 relative z-10">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            CareFlow Integrated Healthcare OS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Ready to connect your healthcare facility?
          </h2>
          <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Choose your portal role or launch a live instant demo session to experience connected healthcare.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenPortalAuth('patient')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-teal-500/20 transition-all hover:scale-105 inline-flex items-center gap-2"
            >
              <span>Choose Your CareFlow Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>


      {/* 11. FOOTER */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <div className="w-7 h-7 rounded-lg bg-teal-500 flex items-center justify-center text-white text-xs">
                ┼
              </div>
              <span>CareFlow</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Connected healthcare platform unifying patients, OPD doctors, diagnostics, pharmacy dispensing, and hospital operations.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Role Portals</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onOpenPortalAuth('patient')} className="hover:text-white">Patient Portal</button></li>
              <li><button onClick={() => onOpenPortalAuth('doctor')} className="hover:text-white">Doctor Portal</button></li>
              <li><button onClick={() => onOpenPortalAuth('receptionist')} className="hover:text-white">Reception Queue</button></li>
              <li><button onClick={() => onOpenPortalAuth('lab')} className="hover:text-white">Laboratory Station</button></li>
              <li><button onClick={() => onOpenPortalAuth('pharmacist')} className="hover:text-white">Pharmacy Fulfillment</button></li>
              <li><button onClick={() => onOpenPortalAuth('admin')} className="hover:text-white">Admin Operations</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Core Modules</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white">Electronic Medical Records (EMR)</a></li>
              <li><a href="#how-it-works" className="hover:text-white">Smart OPD Queue Tokens</a></li>
              <li><a href="#how-it-works" className="hover:text-white">AI Report Assistant</a></li>
              <li><a href="#features" className="hover:text-white">E-Prescribing & Pharmacy Inventory</a></li>
              <li><a href="#security" className="hover:text-white">Unified Consolidated Billing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3">Compliance & Security</h4>
            <p className="leading-relaxed mb-3">
              Protected Health Information (PHI) encrypted with AES-256 and audited under HIPAA Title II.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-teal-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>HIPAA & NABH Certified</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} CareFlow Healthcare Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
            <a href="#security" className="hover:text-slate-300">Security Specs</a>
          </div>
        </div>
      </footer>

    </div>
  );
};
