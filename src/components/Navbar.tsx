import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { 
  Activity, 
  Bell, 
  Sun, 
  Moon, 
  ChevronDown, 
  User, 
  Stethoscope, 
  ClipboardList, 
  FlaskConical, 
  Pill, 
  CreditCard, 
  BarChart3, 
  Globe, 
  Check, 
  ShieldCheck,
  CalendarPlus,
  Search,
  Command,
  ArrowRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBookModal: () => void;
  onOpenPortalAuth: (role?: UserRole) => void;
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBookModal,
  onOpenPortalAuth,
  onOpenCommandPalette
}) => {
  const { 
    role, 
    setRole, 
    currentUser,
    logoutUser,
    isDark, 
    toggleDarkMode, 
    notifications, 
    markNotificationsRead 
  } = useApp();

  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleConfigs: { id: UserRole; label: string; icon: React.FC<{ className?: string }>; badgeColor: string }[] = [
    { id: 'landing', label: 'Public Home', icon: Globe, badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
    { id: 'patient', label: 'Patient Portal', icon: User, badgeColor: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300' },
    { id: 'doctor', label: 'Doctor Portal', icon: Stethoscope, badgeColor: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300' },
    { id: 'receptionist', label: 'Reception & Queue', icon: ClipboardList, badgeColor: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300' },
    { id: 'lab', label: 'Laboratory Staff', icon: FlaskConical, badgeColor: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300' },
    { id: 'pharmacist', label: 'Pharmacy & Inventory', icon: Pill, badgeColor: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
    { id: 'billing', label: 'Billing & Accounts', icon: CreditCard, badgeColor: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-950/60 dark:text-cyan-300' },
    { id: 'admin', label: 'Admin Operations', icon: BarChart3, badgeColor: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300' }
  ];

  const currentRoleObj = roleConfigs.find(r => r.id === role) || roleConfigs[0];
  const CurrentIcon = currentRoleObj.icon;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setRole('landing')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">CareFlow</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                <ShieldCheck className="w-3 h-3" />
                OS
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
              Healthcare, connected.
            </p>
          </div>
        </div>

        {/* Home Navigation Links (visible when on Landing) */}
        {role === 'landing' && (
          <nav className="hidden lg:flex items-center gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
            <a href="#how-it-works" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              How it works
            </a>
            <a href="#features" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Features
            </a>
            <a href="#security" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Security
            </a>
            <a href="#portals" className="hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
              Portals
            </a>
          </nav>
        )}

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Command Palette trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 text-xs font-semibold hover:border-teal-500 transition-colors"
            title="Search (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[9px] font-mono">
              ⌘K
            </kbd>
          </button>

          {/* User Profile Chip / Role Selector */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="w-6 h-6 rounded-lg bg-teal-500 text-white font-bold text-xs flex items-center justify-center">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="text-left leading-tight">
                  <span className="block text-xs font-bold text-slate-900 dark:text-white truncate max-w-[120px]">
                    {currentUser.name}
                  </span>
                  <span className="block text-[10px] text-teal-600 dark:text-teal-400 font-semibold uppercase">
                    {currentUser.role}
                  </span>
                </div>
              </div>

              {/* Role Switcher Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowRoleMenu(!showRoleMenu)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${currentRoleObj.badgeColor} border-slate-200 dark:border-slate-800 shadow-xs hover:border-teal-500`}
                >
                  <CurrentIcon className="w-4 h-4" />
                  <span className="hidden md:inline font-semibold">{currentRoleObj.label}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showRoleMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showRoleMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowRoleMenu(false)} />
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 z-50 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl"
                      >
                        <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Active User: {currentUser.name}
                          </p>
                        </div>
                        <div className="max-h-72 overflow-y-auto py-1">
                          {roleConfigs.map(item => {
                            const ItemIcon = item.icon;
                            const isSelected = role === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  setRole(item.id);
                                  setShowRoleMenu(false);
                                }}
                                className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                                  isSelected 
                                    ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold' 
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <ItemIcon className="w-4 h-4 text-slate-500" />
                                  <span>{item.label}</span>
                                </div>
                                {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                              </button>
                            );
                          })}
                        </div>
                        <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                          <button
                            onClick={() => {
                              setShowRoleMenu(false);
                              logoutUser();
                            }}
                            className="w-full py-2 px-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-100 flex items-center justify-center gap-2"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out ({currentUser.name})</span>
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Sign Out Action Button */}
              <button
                onClick={logoutUser}
                className="p-2 rounded-xl text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : role === 'landing' ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onOpenPortalAuth('patient')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-teal-600 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onOpenPortalAuth('patient')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-md shadow-teal-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            /* Role Switcher Menu for Portal Views when not logged in */
            <div className="relative">
              <button
                onClick={() => setShowRoleMenu(!showRoleMenu)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-medium transition-all ${currentRoleObj.badgeColor} border-slate-200 dark:border-slate-800 shadow-xs hover:border-teal-500 dark:hover:border-teal-500`}
              >
                <CurrentIcon className="w-4 h-4" />
                <span className="hidden md:inline font-semibold">{currentRoleObj.label}</span>
                <span className="md:hidden font-semibold">{currentRoleObj.label.split(' ')[0]}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showRoleMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showRoleMenu && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowRoleMenu(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-64 z-50 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                          Switch Persona / Portal
                        </p>
                      </div>
                      <div className="max-h-72 overflow-y-auto py-1">
                        {roleConfigs.map(item => {
                          const ItemIcon = item.icon;
                          const isSelected = role === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setRole(item.id);
                                setShowRoleMenu(false);
                              }}
                              className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm flex items-center justify-between transition-colors ${
                                isSelected 
                                  ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold' 
                                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                <ItemIcon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                                <span>{item.label}</span>
                              </div>
                              {isSelected && <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            <AnimatePresence>
              {showNotifMenu && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifMenu(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-80 sm:w-96 z-50 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <span className="font-semibold text-sm text-slate-900 dark:text-white">Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markNotificationsRead}
                          className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-medium"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-xs text-slate-500">
                          No new notifications
                        </div>
                      ) : (
                        notifications.map(n => (
                          <div 
                            key={n.id} 
                            className={`p-3.5 transition-colors ${!n.read ? 'bg-teal-50/30 dark:bg-teal-950/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="text-xs font-semibold text-slate-900 dark:text-white">
                                {n.title}
                              </h4>
                              <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                              {n.message}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

        </div>

      </div>
    </header>
  );
};
