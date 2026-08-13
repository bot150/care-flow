import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle2, FlaskConical, Pill, Calendar, ShieldCheck, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const LiveNotificationTicker: React.FC = () => {
  const notifications = [
    {
      id: 1,
      title: 'New Laboratory Report Ready',
      message: 'CBC blood analysis for Ananya Rao verified by AI & Lab Tech.',
      icon: FlaskConical,
      color: 'bg-purple-500',
      time: 'Just now'
    },
    {
      id: 2,
      title: 'Appointment Confirmed',
      message: 'Dr. Rahul Rao (Cardiology) · OPD Room 3 at 10:30 AM.',
      icon: Calendar,
      color: 'bg-blue-500',
      time: '1 min ago'
    },
    {
      id: 3,
      title: 'Prescription Fulfilled',
      message: 'Central Pharmacy dispensed Amoxicillin 500mg & Ferrous Ascorbate.',
      icon: Pill,
      color: 'bg-amber-500',
      time: '3 mins ago'
    },
    {
      id: 4,
      title: 'Payment Invoice Settled',
      message: 'Invoice #CF-10482 paid ₹1,300 via UPI instant settlement.',
      icon: CheckCircle2,
      color: 'bg-emerald-500',
      time: '5 mins ago'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false); // Default to off unless toggled or dismissed
  const [isStopped, setIsStopped] = useState(true); // Stopped by default so it doesn't disturb user

  useEffect(() => {
    if (isStopped) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
      setIsVisible(true);
    }, 8000);

    return () => clearInterval(timer);
  }, [isStopped, notifications.length]);

  if (isStopped || !isVisible) return null;

  const current = notifications[currentIndex];
  const Icon = current.icon;

  return (
    <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full pointer-events-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900/95 text-white backdrop-blur-lg border border-slate-800 rounded-2xl p-4 shadow-2xl flex items-start gap-3.5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-teal-500" />
          
          <div className={`w-9 h-9 rounded-xl ${current.color} text-white flex items-center justify-center shrink-0 shadow-md mt-0.5`}>
            <Icon className="w-4 h-4" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                <Bell className="w-3 h-3" /> Live CareFlow Event
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{current.time}</span>
            </div>
            <h4 className="text-xs font-bold text-white mt-0.5 truncate">
              {current.title}
            </h4>
            <p className="text-[11px] text-slate-300 leading-snug mt-1">
              {current.message}
            </p>
          </div>

          <button
            onClick={() => {
              setIsVisible(false);
              setIsStopped(true);
            }}
            className="text-slate-500 hover:text-white p-1 rounded-lg transition-colors"
            title="Stop notifications"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
