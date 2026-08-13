import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FlaskConical, 
  FileCheck2, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Upload, 
  ArrowRight, 
  AlertTriangle,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';
import { LabRequestItem } from '../types';

interface LabWorkflowProps {
  onOpenAiScan: (lab: LabRequestItem) => void;
}

export const LabWorkflow: React.FC<LabWorkflowProps> = ({ onOpenAiScan }) => {
  const { labRequests, updateLabStatus } = useApp();
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const handleSimulateUpload = (lab: LabRequestItem) => {
    setUploadingId(lab.id);
    setUploadProgress(10);

    const interval = setInterval(() => {
      setUploadProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setUploadingId(null);
            updateLabStatus(lab.id, 'Report Ready', `${lab.testName.replace(/\s+/g, '_')}_Verified.pdf`);
          }, 300);
          return 100;
        }
        return p + 30;
      });
    }, 200);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            Pathology & Diagnostics Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Laboratory Testing & Digital PDF Signing
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Requested → Sample Collected → Testing → Report Ready pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-purple-500/10 text-purple-300 px-4 py-2 rounded-2xl border border-purple-500/30">
          <FlaskConical className="w-4 h-4 text-purple-400" />
          <span>{labRequests.length} Active Lab Orders</span>
        </div>
      </div>

      {/* Visual Pipeline Bar */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-xs text-slate-400 uppercase tracking-wider">
          Standard Laboratory Workflow Pipeline
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 font-bold text-blue-700 dark:text-blue-300">
            1. Requested
          </div>
          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 font-bold text-amber-700 dark:text-amber-300">
            2. Sample Collected
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 font-bold text-purple-700 dark:text-purple-300">
            3. Testing
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 font-bold text-emerald-700 dark:text-emerald-300">
            4. Report Ready
          </div>
        </div>
      </div>

      {/* Lab Request Orders Cards */}
      <div className="space-y-4">
        {labRequests.map(lab => {
          const isUploading = uploadingId === lab.id;

          return (
            <div 
              key={lab.id}
              className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold shrink-0">
                    <FlaskConical className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-900 dark:text-white">{lab.testName}</h3>
                      {lab.urgent && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                          STAT / Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Patient: <strong>{lab.patientName}</strong> ({lab.patientAge}y) · Ordered by {lab.doctorName}
                    </p>
                  </div>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto ${
                  lab.status === 'Report Ready'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                    : lab.status === 'Testing'
                    ? 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300'
                    : lab.status === 'Sample Collected'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  {lab.status}
                </span>
              </div>

              {/* Uploading Progress Bar Simulation */}
              {isUploading && (
                <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900/50 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-purple-800 dark:text-purple-200">
                    <span>Uploading digital pathology report...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-600 h-full transition-all duration-150" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              {/* Controls Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                <div className="text-slate-500">
                  Sample Type: <strong className="text-slate-700 dark:text-slate-300">{lab.sampleType}</strong> · Requested: {lab.dateRequested}
                </div>

                <div className="flex items-center gap-2">
                  {lab.status === 'Requested' && (
                    <button
                      onClick={() => updateLabStatus(lab.id, 'Sample Collected')}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold shadow-xs"
                    >
                      Mark Sample Collected
                    </button>
                  )}

                  {lab.status === 'Sample Collected' && (
                    <button
                      onClick={() => updateLabStatus(lab.id, 'Testing')}
                      className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow-xs"
                    >
                      Move to Testing
                    </button>
                  )}

                  {lab.status === 'Testing' && !isUploading && (
                    <button
                      onClick={() => handleSimulateUpload(lab)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-xs flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Report PDF & Release</span>
                    </button>
                  )}

                  {lab.status === 'Report Ready' && (
                    <button
                      onClick={() => onOpenAiScan(lab)}
                      className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold shadow-xs flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Run AI Report Assistant</span>
                    </button>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
