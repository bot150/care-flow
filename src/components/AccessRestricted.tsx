import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';

interface AccessRestrictedProps {
  requiredRole?: string;
}

export const AccessRestricted: React.FC<AccessRestrictedProps> = ({ requiredRole }) => {
  const { currentUser, role, setRole, logoutUser } = useApp();

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
        
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center mx-auto shadow-lg">
          <ShieldAlert className="w-8 h-8 animate-bounce" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
            Access Restricted
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            ACCESS RESTRICTED
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            You don't have permission to access this portal.
          </p>
          {currentUser && (
            <p className="text-xs text-slate-400 pt-1 font-medium">
              Logged in as <span className="font-bold text-slate-700 dark:text-slate-200">{currentUser.name}</span> ({currentUser.role.toUpperCase()}).
            </p>
          )}
        </div>

        <div className="pt-2 space-y-2.5">
          {currentUser ? (
            <button
              onClick={() => setRole(currentUser.role)}
              className="w-full py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to My Dashboard ({currentUser.role.toUpperCase()})</span>
            </button>
          ) : (
            <button
              onClick={() => setRole('landing')}
              className="w-full py-3 px-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to CareFlow Homepage</span>
            </button>
          )}

          <button
            onClick={logoutUser}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-all"
          >
            Sign Out & Switch Account
          </button>
        </div>

      </div>
    </div>
  );
};
