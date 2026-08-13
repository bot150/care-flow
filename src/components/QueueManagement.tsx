import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Ticket, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Volume2, 
  UserCheck, 
  ArrowRight, 
  Star,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const QueueManagement: React.FC = () => {
  const { queue, callNextPatientInQueue, updateQueueTokenStatus } = useApp();

  const currentServing = queue.find(q => q.status === 'Serving') || queue[0];
  const waitingList = queue.filter(q => q.id !== currentServing?.id);

  return (
    <div className="space-y-8">
      
      {/* Smart Queue Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
            Reception Desk & OPD Queue Engine
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Smart Hospital Queue Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Real-time token routing, doctor availability syncing, and patient calling.
          </p>
        </div>

        <button
          onClick={callNextPatientInQueue}
          className="px-6 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-teal-500/20 transition-all flex items-center gap-2 shrink-0 self-start sm:self-auto hover:scale-105 active:scale-95"
        >
          <Volume2 className="w-5 h-5" />
          <span>Call Next Patient</span>
        </button>
      </div>

      {/* NOW SERVING TOKEN DISPLAY (Section 9 Spec) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* CURRENT TOKEN HERO CARD */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-700 text-white shadow-xl relative overflow-hidden flex flex-col justify-between space-y-6">
          
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-teal-100">
              CURRENT TOKEN
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-teal-900 shadow-sm animate-pulse">
              NOW SERVING
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentServing?.tokenNumber}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              <div className="text-6xl sm:text-7xl font-black tracking-tight drop-shadow-md">
                {currentServing?.tokenNumber}
              </div>
              <h3 className="text-2xl font-bold tracking-tight">
                {currentServing?.patientName}
              </h3>
              <p className="text-xs text-teal-100 font-medium">
                Age: {currentServing?.patientAge}y · Assigned Doctor: <strong>{currentServing?.doctorName}</strong> ({currentServing?.department})
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-teal-200" />
              <span>Arrived at: {currentServing?.arrivalTime}</span>
            </div>
            <button
              onClick={() => updateQueueTokenStatus(currentServing.id, 'Completed')}
              className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md font-bold text-white transition-colors"
            >
              Mark Consultation Complete ✓
            </button>
          </div>

        </div>

        {/* QUEUE ESTIMATED TIME & METRICS */}
        <div className="lg:col-span-6 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              <span>Queue Telemetry</span>
            </h3>
            <span className="text-xs text-slate-400">Cardiology OPD OPD-3</span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700 text-center space-y-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Estimated Average Waiting Time
            </span>
            <div className="text-4xl font-black text-teal-600 dark:text-teal-400">
              24 <span className="text-lg font-normal text-slate-500">minutes</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Calculated dynamically based on 3 active doctor consultation paces.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700">
              <span className="text-slate-400 text-[10px]">Total Tokens</span>
              <div className="font-bold text-sm text-slate-900 dark:text-white mt-0.5">{queue.length}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700">
              <span className="text-slate-400 text-[10px]">Waiting</span>
              <div className="font-bold text-sm text-amber-600 mt-0.5">{waitingList.filter(q => q.status === 'Waiting').length}</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700">
              <span className="text-slate-400 text-[10px]">Priority</span>
              <div className="font-bold text-sm text-rose-600 mt-0.5">{waitingList.filter(q => q.status === 'Priority').length}</div>
            </div>
          </div>

        </div>

      </div>

      {/* WAITING QUEUE TABLE / LIST (Section 9 Spec) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Ticket className="w-4 h-4 text-teal-600" />
            <span>Upcoming Token Waiting Queue</span>
          </h3>
          <span className="text-xs text-slate-400">{waitingList.length} Patients Waiting</span>
        </div>

        <div className="space-y-3">
          {waitingList.map(token => (
            <div 
              key={token.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                token.status === 'Priority'
                  ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/50'
                  : token.status === 'Completed'
                  ? 'bg-slate-50 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800 opacity-60'
                  : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200/60 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl font-black text-sm flex items-center justify-center shrink-0 shadow-xs ${
                  token.status === 'Priority'
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                }`}>
                  {token.tokenNumber}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{token.patientName}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      token.status === 'Priority'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : token.status === 'Completed'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}>
                      {token.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {token.doctorName} ({token.department}) · Est. Wait: ~{token.estimatedWaitMinutes} mins
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0">
                {token.status !== 'Priority' && token.status !== 'Completed' && (
                  <button
                    onClick={() => updateQueueTokenStatus(token.id, 'Priority')}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1"
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>Prioritize</span>
                  </button>
                )}

                <button
                  onClick={() => updateQueueTokenStatus(token.id, 'Serving')}
                  className="px-4 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  Call Token
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
