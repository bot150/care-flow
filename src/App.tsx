import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { UserRole } from './types';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { PatientDashboard } from './components/PatientDashboard';
import { DoctorDashboard } from './components/DoctorDashboard';
import { PatientEMRView } from './components/PatientEMRView';
import { QueueManagement } from './components/QueueManagement';
import { LabWorkflow } from './components/LabWorkflow';
import { PharmacyWorkflow } from './components/PharmacyWorkflow';
import { BillingDashboard } from './components/BillingDashboard';
import { BookAppointmentModal } from './components/BookAppointmentModal';
import { AIReportAssistantModal } from './components/AIReportAssistantModal';
import { PortalAuthModal } from './components/PortalAuthModal';
import { CommandPalette } from './components/CommandPalette';
import { LiveNotificationTicker } from './components/LiveNotificationTicker';
import { LabRequestItem } from './types';
import { ShieldCheck, TrendingUp, Users, Building2, Package, ShieldAlert } from 'lucide-react';

import { AccessRestricted } from './components/AccessRestricted';

const MainAppContent: React.FC = () => {
  const { role, currentUser, activeLabForAiScan, setActiveLabForAiScan, auditLogs } = useApp();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  
  // Modal states
  const [isBookModalOpen, setIsBookModalOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('patient');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);

  // Global keyboard shortcut for Command Palette (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Sync default tab on role switch
  React.useEffect(() => {
    if (role === 'receptionist') setActiveTab('queue');
    else if (role === 'lab') setActiveTab('workflow');
    else if (role === 'pharmacist') setActiveTab('fulfill');
    else if (role === 'billing') setActiveTab('invoices');
    else if (role === 'admin') setActiveTab('analytics');
    else setActiveTab('dashboard');
  }, [role]);

  const handleOpenAiScan = (labItem: LabRequestItem) => {
    setActiveLabForAiScan(labItem);
  };

  const handleOpenPortalAuth = (targetRole?: UserRole) => {
    if (targetRole && targetRole !== 'landing') {
      setAuthModalRole(targetRole);
    }
    setIsAuthModalOpen(true);
  };

  const renderActiveView = () => {
    if (role === 'landing') {
      return (
        <LandingPage 
          onOpenBookModal={() => setIsBookModalOpen(true)} 
          onOpenPortalAuth={handleOpenPortalAuth}
        />
      );
    }

    // Protection check: If user authenticated but switched to unauthorized role
    if (currentUser && currentUser.role !== role) {
      return <AccessRestricted requiredRole={role} />;
    }

    if (role === 'patient') {
      if (activeTab === 'records' || activeTab === 'doctors') {
        return <PatientEMRView />;
      }
      return (
        <PatientDashboard 
          onOpenBookModal={() => setIsBookModalOpen(true)} 
          onOpenAiScan={handleOpenAiScan} 
        />
      );
    }

    if (role === 'doctor') {
      return <DoctorDashboard activeSubTab={activeTab} />;
    }

    if (role === 'receptionist') {
      return <QueueManagement />;
    }

    if (role === 'lab') {
      return <LabWorkflow onOpenAiScan={handleOpenAiScan} />;
    }

    if (role === 'pharmacist') {
      return <PharmacyWorkflow />;
    }

    if (role === 'billing') {
      return <BillingDashboard />;
    }

    if (role === 'admin') {
      return (
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
            <div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Hospital Administration & Analytics
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Hospital Operations Center
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time capacity, revenue trends, staff metrics, and HIPAA audit trails.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4" />
                System Status: Nominal
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Monthly OPD Revenue</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">$482,900</div>
              <p className="text-xs text-emerald-600 font-medium mt-1">+14.2% vs last month</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Active Doctors</span>
                <Users className="w-4 h-4 text-teal-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">42 / 45</div>
              <p className="text-xs text-slate-500 font-medium mt-1">12 OPD rooms active</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Bed Occupancy</span>
                <Building2 className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">88%</div>
              <p className="text-xs text-amber-600 font-medium mt-1">14 beds available</p>
            </div>

            <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                <span>Pharmacy Stock Level</span>
                <Package className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">96.4%</div>
              <p className="text-xs text-slate-500 font-medium mt-1">2 low stock alerts</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">System Security & HIPAA Audit Trail</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium">Encrypted Immutable Log</span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {auditLogs.map(log => (
                <div key={log.id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border ${log.badgeColor}`}>
                      {log.role}
                    </span>
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">{log.action}</span>
                      <p className="text-slate-500">{log.details}</p>
                    </div>
                  </div>
                  <span className="text-slate-400 shrink-0 font-medium">{log.timeAgo} ({log.timestamp})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors antialiased">
      <Navbar 
        onOpenBookModal={() => setIsBookModalOpen(true)}
        onOpenPortalAuth={handleOpenPortalAuth}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {role === 'landing' ? (
        <div className="flex-1">
          {renderActiveView()}
        </div>
      ) : (
        <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            onOpenBookModal={() => setIsBookModalOpen(true)} 
          />
          <main className="flex-1 min-w-0">
            {renderActiveView()}
          </main>
        </div>
      )}

      {/* Live Event Ticker in bottom right corner */}
      <LiveNotificationTicker />

      {/* Modals & Overlays */}
      <BookAppointmentModal 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />

      <AIReportAssistantModal 
        labItem={activeLabForAiScan} 
        onClose={() => setActiveLabForAiScan(null)} 
      />

      <PortalAuthModal
        isOpen={isAuthModalOpen}
        initialRole={authModalRole}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
