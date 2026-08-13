import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, Clock, Video, UserCheck, Stethoscope, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({ isOpen, onClose }) => {
  const { bookAppointment } = useApp();

  const [doctor, setDoctor] = useState<string>('Dr. Rahul Rao (Cardiologist)');
  const [date, setDate] = useState<string>('Today');
  const [time, setTime] = useState<string>('10:30 AM');
  const [type, setType] = useState<'Online Consultation' | 'In-Person Consultation'>('Online Consultation');
  const [reason, setReason] = useState<string>('Routine health evaluation & symptom review');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment(doctor, date, time, type, reason);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden"
      >
        
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-200 dark:border-teal-800">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                Book an Appointment
              </h3>
              <p className="text-xs text-slate-500">CareFlow Instant OPD Scheduling</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-10 space-y-3">
            <CheckCircle2 className="w-16 h-16 mx-auto text-emerald-500 animate-bounce" />
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              Appointment Scheduled!
            </h4>
            <p className="text-xs text-slate-500">
              Your token has been generated and pushed to the Smart OPD Queue.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Select Doctor */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Practitioner
              </label>
              <select
                value={doctor}
                onChange={e => setDoctor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="Dr. Rahul Rao (Cardiologist)">Dr. Rahul Rao — Cardiologist (Room 3)</option>
                <option value="Dr. Priya Nair (Neurologist)">Dr. Priya Nair — Neurologist (Room 5)</option>
                <option value="Dr. Amit Shah (General Physician)">Dr. Amit Shah — General Medicine (Room 1)</option>
              </select>
            </div>

            {/* Date & Time Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Date
                </label>
                <select
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="Today">Today (Aug 13)</option>
                  <option value="Tomorrow">Tomorrow (Aug 14)</option>
                  <option value="Aug 15, 2026">Aug 15, 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Time Slot
                </label>
                <select
                  value={time}
                  onChange={e => setTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="10:30 AM">10:30 AM</option>
                  <option value="11:15 AM">11:15 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:30 PM">04:30 PM</option>
                </select>
              </div>
            </div>

            {/* Consultation Type Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Consultation Mode
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setType('Online Consultation')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    type === 'Online Consultation'
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Video className="w-4 h-4 text-teal-600" />
                  <span className="text-xs">Online Video Call</span>
                </button>

                <button
                  type="button"
                  onClick={() => setType('In-Person Consultation')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    type === 'In-Person Consultation'
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-teal-600" />
                  <span className="text-xs">In-Person OPD</span>
                </button>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Chief Complaint / Reason
              </label>
              <textarea
                rows={2}
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="Briefly describe your symptoms or reason for visit..."
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 transition-all"
              >
                Confirm Appointment & Generate Token
              </button>
            </div>

          </form>
        )}

      </motion.div>
    </div>
  );
};
