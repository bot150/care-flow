import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, 
  Calendar, 
  UserCheck, 
  FileText, 
  FlaskConical, 
  Pill, 
  Receipt, 
  Bell, 
  User, 
  Stethoscope, 
  CalendarDays, 
  Ticket, 
  Building2, 
  Package, 
  AlertTriangle, 
  ShieldAlert, 
  TrendingUp, 
  Users, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenBookModal: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onOpenBookModal }) => {
  const { role, setRole } = useApp();

  if (role === 'landing') return null;

  const getNavItems = () => {
    switch (role) {
      case 'patient':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'doctors', label: 'Find Doctors', icon: Stethoscope },
          { id: 'records', label: 'Medical Records', icon: FileText },
          { id: 'labs', label: 'Lab Reports', icon: FlaskConical },
          { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
          { id: 'bills', label: 'Bills & Invoices', icon: Receipt },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'profile', label: 'My Health Profile', icon: User }
        ];

      case 'doctor':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { id: 'appointments', label: 'Appointments', icon: Calendar },
          { id: 'emr', label: 'Patient EMR & Chart', icon: UserCheck },
          { id: 'records', label: 'Medical History', icon: FileText },
          { id: 'prescriptions', label: 'Issue Prescriptions', icon: Pill },
          { id: 'labs', label: 'Order Lab Tests', icon: FlaskConical },
          { id: 'calendar', label: 'OPD Schedule', icon: CalendarDays },
          { id: 'audit', label: 'Security Audit Log', icon: ShieldAlert }
        ];

      case 'receptionist':
        return [
          { id: 'queue', label: 'Smart Hospital Queue', icon: Ticket },
          { id: 'appointments', label: 'OPD Appointments', icon: Calendar },
          { id: 'checkin', label: 'Patient Check-In', icon: UserCheck },
          { id: 'rooms', label: 'Doctor Availability', icon: Building2 },
          { id: 'audit', label: 'Audit Activity', icon: ShieldAlert }
        ];

      case 'lab':
        return [
          { id: 'workflow', label: 'Lab Requests Pipeline', icon: FlaskConical },
          { id: 'samples', label: 'Sample Collection', icon: FileText },
          { id: 'ai-scanner', label: 'AI Report Assistant', icon: Sparkles },
          { id: 'audit', label: 'Security Audit Log', icon: ShieldAlert }
        ];

      case 'pharmacist':
        return [
          { id: 'fulfill', label: 'Prescription Fulfillment', icon: Pill },
          { id: 'inventory', label: 'Medicine Inventory', icon: Package },
          { id: 'alerts', label: 'Stock Alerts', icon: AlertTriangle },
          { id: 'audit', label: 'Audit Activity', icon: ShieldAlert }
        ];

      case 'billing':
        return [
          { id: 'invoices', label: 'Patient Invoices', icon: Receipt },
          { id: 'payments', label: 'Payment Counter', icon: Receipt },
          { id: 'audit', label: 'Security Audit Log', icon: ShieldAlert }
        ];

      case 'admin':
        return [
          { id: 'analytics', label: 'Operations Analytics', icon: TrendingUp },
          { id: 'doctors', label: 'Doctor & Department Performance', icon: Users },
          { id: 'beds', label: 'Hospital Infrastructure', icon: Building2 },
          { id: 'inventory', label: 'Pharmacy & Lab Stats', icon: Package },
          { id: 'audit', label: 'System Audit Logs', icon: ShieldAlert }
        ];

      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <aside className="w-full lg:w-64 bg-slate-50/80 dark:bg-slate-900/50 border-r border-slate-200/80 dark:border-slate-800 p-4 flex flex-col justify-between shrink-0 transition-colors">
      <div className="space-y-6">
        
        {/* Role Header */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 shadow-xs">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Active Workspace
          </p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white capitalize mt-0.5">
            {role} Portal
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            CareFlow Connected OS
          </p>
        </div>

        {/* Nav Items List */}
        <nav className="space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-teal-600 text-white font-semibold shadow-sm shadow-teal-600/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Patient Action Quick Card */}
      {role === 'patient' && (
        <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/15">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4" />
            <h4 className="font-bold text-xs uppercase tracking-wider">CareFlow Direct</h4>
          </div>
          <p className="text-xs opacity-90 leading-relaxed mb-3">
            Book an instant consultation or sync your latest lab reports digitally.
          </p>
          <button
            onClick={onOpenBookModal}
            className="w-full py-2 px-3 rounded-xl bg-white text-teal-800 font-semibold text-xs shadow-xs hover:bg-teal-50 transition-colors"
          >
            Book Appointment
          </button>
        </div>
      )}
    </aside>
  );
};
