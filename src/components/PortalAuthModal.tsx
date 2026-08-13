import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  X, 
  User, 
  Stethoscope, 
  Calendar, 
  FlaskConical, 
  Pill, 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowLeft, 
  CheckCircle2, 
  Zap, 
  Building2, 
  Phone, 
  Sparkles, 
  ArrowRight,
  ShieldAlert,
  Loader2,
  RefreshCw,
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PortalAuthModalProps {
  isOpen: boolean;
  initialRole?: UserRole;
  onClose: () => void;
}

export const PortalAuthModal: React.FC<PortalAuthModalProps> = ({
  isOpen,
  initialRole = 'patient',
  onClose
}) => {
  const { loginUser, registerUser, addToast, setSelectedPortalRole, setRole } = useApp();

  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [viewMode, setViewMode] = useState<'login' | 'register' | 'forgot' | 'mismatch'>('login');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Registration Specific Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [specialization, setSpecialization] = useState('Cardiology');
  const [qualifications, setQualifications] = useState('MD, DM Cardiology');
  const [experience, setExperience] = useState('8 Years');
  const [hospitalBranch, setHospitalBranch] = useState('CareFlow Central Hospital');

  // UI / Interactive States
  const [formError, setFormError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessState, setIsSuccessState] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);
  const [mismatchAccountRole, setMismatchAccountRole] = useState<UserRole>('patient');

  // Reset state on initial role change or open
  useEffect(() => {
    if (initialRole && initialRole !== 'landing') {
      setSelectedRole(initialRole);
      setSelectedPortalRole(initialRole);
    }
    setViewMode('login');
    setFormError(null);
    setIsLoading(false);
    setIsSuccessState(false);
    setShowSkeleton(false);
  }, [initialRole, isOpen]);

  if (!isOpen) return null;

  const roleMeta: Record<UserRole, {
    title: string;
    roleName: string;
    tagline: string;
    icon: React.ElementType;
    badge: string;
    accentColor: string;
    demoEmail: string;
    demoName: string;
  }> = {
    landing: {
      title: 'CareFlow Platform Access',
      roleName: 'Public User',
      tagline: 'Select your role to access your healthcare portal.',
      icon: Sparkles,
      badge: 'Unified Access',
      accentColor: 'bg-teal-500',
      demoEmail: 'patient@careflow.demo',
      demoName: 'Ananya Rao'
    },
    patient: {
      title: 'PATIENT PORTAL',
      roleName: 'Patient',
      tagline: 'Your healthcare journey, all in one secure place.',
      icon: User,
      badge: 'Personal Health Account',
      accentColor: 'bg-blue-500',
      demoEmail: 'patient@careflow.demo',
      demoName: 'Ananya Rao'
    },
    doctor: {
      title: 'DOCTOR PORTAL',
      roleName: 'Doctor',
      tagline: 'Clinical OPD, patient charts, e-prescriptions and EMR.',
      icon: Stethoscope,
      badge: 'Clinical OPD & EMR',
      accentColor: 'bg-teal-500',
      demoEmail: 'doctor@careflow.demo',
      demoName: 'Dr. Rahul Rao'
    },
    receptionist: {
      title: 'RECEPTION PORTAL',
      roleName: 'Receptionist',
      tagline: 'Front desk check-in, token queue and appointments.',
      icon: Calendar,
      badge: 'Front Desk Operations',
      accentColor: 'bg-indigo-500',
      demoEmail: 'reception@careflow.demo',
      demoName: 'Suma Patel'
    },
    lab: {
      title: 'LABORATORY PORTAL',
      roleName: 'Laboratory Staff',
      tagline: 'Diagnostics, sample tracking and AI report analysis.',
      icon: FlaskConical,
      badge: 'Pathology & Diagnostics',
      accentColor: 'bg-purple-500',
      demoEmail: 'lab@careflow.demo',
      demoName: 'Rohan Shah'
    },
    pharmacist: {
      title: 'PHARMACY PORTAL',
      roleName: 'Pharmacist',
      tagline: 'Prescription fulfillment, inventory and medicine stock.',
      icon: Pill,
      badge: 'Medicine Fulfillment',
      accentColor: 'bg-amber-500',
      demoEmail: 'pharmacy@careflow.demo',
      demoName: 'Meera Nair'
    },
    billing: {
      title: 'BILLING PORTAL',
      roleName: 'Billing Desk',
      tagline: 'Patient invoices, payment counter and revenue settlement.',
      icon: ShieldCheck,
      badge: 'Financial Services',
      accentColor: 'bg-cyan-500',
      demoEmail: 'billing@careflow.demo',
      demoName: 'Vikram Mehta'
    },
    admin: {
      title: 'ADMIN PORTAL',
      roleName: 'Hospital Admin',
      tagline: 'Hospital capacity, department stats and audit logs.',
      icon: ShieldCheck,
      badge: 'Executive Command Center',
      accentColor: 'bg-rose-500',
      demoEmail: 'admin@careflow.demo',
      demoName: 'Hospital Administrator'
    }
  };

  const currentMeta = roleMeta[selectedRole] || roleMeta.patient;
  const CurrentIcon = currentMeta.icon;

  // Handle Quick Prefill Helper for judges
  const handleAutoFillDemo = (targetRoleToFill: UserRole) => {
    const meta = roleMeta[targetRoleToFill];
    setEmail(meta.demoEmail);
    setPassword('demo123');
    setFormError(null);
  };

  // Form Validation & Submit Logic
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // 1. Email validation
    if (!email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setFormError('Please enter a valid email address.');
      return;
    }

    // 2. Password validation
    if (!password) {
      setFormError('Please enter your password.');
      return;
    }

    // Begin Loading interaction
    setIsLoading(true);

    setTimeout(() => {
      // Execute role-authenticated login check
      const result = loginUser(email, password, selectedRole);

      if (result.isRoleMismatch && result.actualRole) {
        setIsLoading(false);
        setMismatchAccountRole(result.actualRole);
        setViewMode('mismatch');
        return;
      }

      if (!result.success) {
        setIsLoading(false);
        setFormError(result.error || 'Email or password is incorrect.');
        return;
      }

      // Login Successful! Show Success Badge -> Skeleton -> Open Dashboard
      setIsLoading(false);
      setIsSuccessState(true);

      setTimeout(() => {
        setIsSuccessState(false);
        setShowSkeleton(true);

        setTimeout(() => {
          setShowSkeleton(false);
          onClose();
        }, 800);
      }, 700);

    }, 800);
  };

  // Registration Submit
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    if (!email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }
    if (!password) {
      setFormError('Please enter a password.');
      return;
    }
    if (password !== confirmPassword) {
      setFormError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = registerUser({
        name: fullName,
        email,
        password,
        role: selectedRole,
        phone,
        specialization: selectedRole === 'doctor' ? specialization : undefined,
        qualifications: selectedRole === 'doctor' ? qualifications : undefined,
        experience: selectedRole === 'doctor' ? experience : undefined,
        hospitalBranch: selectedRole === 'doctor' ? hospitalBranch : undefined
      });

      setIsLoading(false);

      if (!result.success) {
        setFormError(result.error || 'Registration failed.');
        return;
      }

      addToast('Registration Complete', result.message || 'Account created successfully!', 'success');
      setViewMode('login');
      setPassword('');
      setConfirmPassword('');
    }, 800);
  };

  // Forgot Password Submit
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setFormError('Please enter your email address.');
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccessState(true);
      setTimeout(() => {
        setIsSuccessState(false);
        setViewMode('login');
        addToast('Reset Link Sent', 'Check your email inbox for password reset instructions.', 'info');
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 lg:grid-cols-12 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Role Identity Context */}
        <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-white font-bold text-base">
                  ┼
                </div>
                <span className="font-bold text-lg tracking-tight">CareFlow</span>
              </div>

              {/* ← Change Portal Button (REQUIREMENT #2 & #3) */}
              <button
                onClick={() => {
                  onClose();
                  const portalSection = document.getElementById('portals');
                  if (portalSection) portalSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Change Portal</span>
              </button>
            </div>

            {/* Selected Role Card Header */}
            <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl ${currentMeta.accentColor} text-white flex items-center justify-center shadow-md shrink-0`}>
                  <CurrentIcon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400">
                    {currentMeta.badge}
                  </span>
                  <h3 className="text-xl font-extrabold text-white">
                    {currentMeta.title}
                  </h3>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                {currentMeta.tagline}
              </p>
            </div>

            {/* Quick Switch Portals list */}
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                Switch Target Portal
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { r: 'patient', name: 'Patient' },
                  { r: 'doctor', name: 'Doctor' },
                  { r: 'receptionist', name: 'Reception' },
                  { r: 'lab', name: 'Laboratory' },
                  { r: 'pharmacist', name: 'Pharmacy' },
                  { r: 'admin', name: 'Admin' }
                ].map(item => (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => {
                      setSelectedRole(item.r as UserRole);
                      setSelectedPortalRole(item.r as UserRole);
                      setViewMode('login');
                      setFormError(null);
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between border ${
                      selectedRole === item.r
                        ? 'bg-teal-500 text-white border-teal-400 shadow-sm'
                        : 'bg-slate-800/50 text-slate-300 border-slate-700/60 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <span>{item.name}</span>
                    {selectedRole === item.r && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Autofill Demo Credentials Helper Box (REQUIREMENT #24) */}
            <div className="p-3.5 rounded-xl bg-slate-800/70 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-300" />
                  Quick Fill Demo Credentials
                </span>
              </div>
              <p className="text-[11px] text-slate-300">
                Auto-fill matching credentials for 1-click testing:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleAutoFillDemo(selectedRole)}
                  className="px-2.5 py-1 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-500/40 text-[10px] font-bold transition-colors"
                >
                  Fill {selectedRole.toUpperCase()} Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoFillDemo('patient')}
                  className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-[10px] font-semibold transition-colors"
                >
                  Fill Patient (Ananya)
                </button>
                <button
                  type="button"
                  onClick={() => handleAutoFillDemo('doctor')}
                  className="px-2.5 py-1 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-[10px] font-semibold transition-colors"
                >
                  Fill Doctor (Dr. Rao)
                </button>
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 text-[10px] text-slate-400 flex items-center justify-between">
            <span>CareFlow Auth Gate v3.8</span>
            <span>256-Bit TLS Encrypted</span>
          </div>

        </div>

        {/* Right Side: Dynamic Auth Form & Verification Views */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between min-h-[460px]">
          
          {/* Skeleton Loader Transition */}
          {showSkeleton ? (
            <div className="space-y-6 animate-pulse my-auto p-4">
              <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded-xl w-3/4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-lg w-1/2" />
              <div className="space-y-3 pt-4">
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
                <div className="h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
              </div>
            </div>
          ) : viewMode === 'mismatch' ? (
            /* ===================================================
               5. ROLE MISMATCH SCREEN (CRITICAL REQUIREMENT #5)
               =================================================== */
            <div className="my-auto space-y-6 text-center py-6">
              <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto shadow-lg">
                <ShieldAlert className="w-8 h-8 animate-bounce" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  Role Mismatch Detected
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  ROLE MISMATCH
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  This account is registered as a <span className="font-bold text-rose-600 dark:text-rose-400 capitalize">{mismatchAccountRole}</span>.
                  Please select the <span className="font-bold text-rose-600 dark:text-rose-400 capitalize">{mismatchAccountRole} Portal</span> to continue.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole(mismatchAccountRole);
                    setSelectedPortalRole(mismatchAccountRole);
                    setViewMode('login');
                    setFormError(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Return to {mismatchAccountRole.toUpperCase()} Portal</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    const portalSection = document.getElementById('portals');
                    if (portalSection) portalSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-700 hover:bg-slate-200 transition-all"
                >
                  <span>Change Portal</span>
                </button>
              </div>
            </div>
          ) : viewMode === 'forgot' ? (
            /* ===================================================
               7. FORGOT PASSWORD SCREEN (REQUIREMENT #7)
               =================================================== */
            <div>
              <div className="mb-6">
                <button
                  onClick={() => setViewMode('login')}
                  className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 mb-3"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Reset your password
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter the email address associated with your CareFlow account.
                </p>
              </div>

              {isSuccessState ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h4 className="font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                    Reset link sent ✓
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    Check your email for instructions to reset your password.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Registered Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending reset link...</span>
                      </>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </form>
              )}
            </div>
          ) : (
            /* ===================================================
               3 & 6. LOGIN / REGISTER FORM SCREEN
               =================================================== */
            <div>
              {/* Form Header Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                    {viewMode === 'login' ? `Welcome back 👋` : `Create ${currentMeta.roleName} Account`}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {viewMode === 'login' 
                      ? `Sign in to continue to your ${currentMeta.title} account.`
                      : `Fill details to register as a ${currentMeta.roleName}.`
                    }
                  </p>
                </div>

                <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('login');
                      setFormError(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'login'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('register');
                      setFormError(null);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      viewMode === 'register'
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-900'
                    }`}
                  >
                    Register
                  </button>
                </div>
              </div>

              {/* Form Error Banner */}
              {formError && (
                <div className="mb-4 p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Success Badge */}
              {isSuccessState && (
                <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Authentication successful ✓ Loading dashboard...</span>
                </div>
              )}

              {/* Main Form */}
              <form onSubmit={viewMode === 'login' ? handleLoginSubmit : handleRegisterSubmit} className="space-y-3.5">
                
                {/* Registration Fields */}
                {viewMode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={selectedRole === 'doctor' ? 'Dr. Rahul Rao' : 'Ananya Rao'}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                      </div>

                      {selectedRole === 'patient' && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          />
                        </div>
                      )}

                      {selectedRole === 'doctor' && (
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Specialization
                          </label>
                          <select
                            value={specialization}
                            onChange={(e) => setSpecialization(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <option value="Cardiology">Cardiology</option>
                            <option value="Neurology">Neurology</option>
                            <option value="Orthopedics">Orthopedics</option>
                            <option value="General OPD">General OPD</option>
                            <option value="Pediatrics">Pediatrics</option>
                          </select>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    {viewMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => {
                          setViewMode('forgot');
                          setFormError(null);
                        }}
                        className="text-[11px] font-medium text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (formError) setFormError(null);
                      }}
                      className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                {/* Confirm Password if Register */}
                {viewMode === 'register' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" />
                      <input
                        type="password"
                        required
                        placeholder="••••••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                )}

                {/* Remember Me Checkbox */}
                {viewMode === 'login' && (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Remember me
                    </label>
                  </div>
                )}

                {/* Submit Button (REQUIREMENT #4) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 font-bold text-xs transition-colors flex items-center justify-center gap-2 mt-3 shadow-md"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-teal-500" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>
                        {viewMode === 'login' ? `Sign In` : `Create ${currentMeta.roleName} Account`}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

              {/* Social / Google Auth Option */}
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative px-3 bg-white dark:bg-slate-900 text-[11px] text-slate-400 font-medium uppercase tracking-wider">
                  OR
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  handleAutoFillDemo(selectedRole);
                  addToast('Google Identity', `Pre-filled Google OAuth token for ${currentMeta.roleName}`, 'info');
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="text-center mt-3">
                <p className="text-xs text-slate-500">
                  {viewMode === 'login' ? (
                    <>
                      Don't have an account?{' '}
                      <button
                        onClick={() => {
                          setViewMode('register');
                          setFormError(null);
                        }}
                        className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        Create {currentMeta.roleName} Account
                      </button>
                    </>
                  ) : (
                    <>
                      Already registered?{' '}
                      <button
                        onClick={() => {
                          setViewMode('login');
                          setFormError(null);
                        }}
                        className="font-bold text-teal-600 dark:text-teal-400 hover:underline"
                      >
                        Sign In
                      </button>
                    </>
                  )}
                </p>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
