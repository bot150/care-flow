import React, { useState } from 'react';
import { 
  Sparkles, 
  UploadCloud, 
  FileCheck2, 
  AlertTriangle, 
  CheckCircle2, 
  Brain, 
  RefreshCw, 
  ShieldAlert, 
  ArrowRight,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AiReportAssistantPreview: React.FC = () => {
  const [analyzingState, setAnalyzingState] = useState<'idle' | 'scanning' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setAnalyzingState('scanning');
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzingState('complete');
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  const resetAnalysis = () => {
    setAnalyzingState('idle');
    setProgress(0);
  };

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Explanation */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-3.5 h-3.5" />
              AI Intelligence Layer
            </span>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              AI Report Assistant
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              CareFlow integrates Gemini models to automatically extract laboratory parameters, highlight abnormal reference ranges, and generate clear plain-language summaries for patients and doctors.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Instant OCR Extraction for PDF & Image Lab Scans</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Flags Low & High Values Against Reference Standards</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                <span>Bilingual Clinical & Patient Explanations</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 flex items-start gap-3 text-amber-900 dark:text-amber-200 text-xs">
              <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong className="font-bold block mb-0.5">Clinical Safety Notice:</strong>
                AI-generated information is provided for informational purposes only and must always be reviewed by a qualified healthcare professional.
              </p>
            </div>

          </div>

          {/* Right Interactive Simulator */}
          <div className="lg:col-span-7">
            <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-400" />
                  <span className="font-bold text-sm text-white">AI Medical Scanner</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                  Gemini Flash Vision
                </span>
              </div>

              <AnimatePresence mode="wait">
                {analyzingState === 'idle' && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={startAnalysis}
                    className="border-2 border-dashed border-slate-800 hover:border-purple-500/60 rounded-2xl p-8 text-center cursor-pointer transition-colors group bg-slate-900/60"
                  >
                    <UploadCloud className="w-12 h-12 text-purple-400 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-sm text-white">
                      Drop CBC Blood Report PDF or Click to Simulate AI Analysis
                    </h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Supports PDF, PNG, JPG (e.g., Complete Blood Count Report)
                    </p>
                    <button
                      type="button"
                      className="mt-5 px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shadow-lg shadow-purple-500/20"
                    >
                      Simulate AI Report Scan →
                    </button>
                  </motion.div>
                )}

                {analyzingState === 'scanning' && (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 text-center"
                  >
                    <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
                      <Brain className="w-8 h-8 text-purple-400" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-base text-white">
                        Analyzing Medical Report... {progress}%
                      </h4>
                      <p className="text-xs text-slate-400">
                        {progress < 30 ? 'Reading document OCR...' : progress < 70 ? 'Extracting clinical values...' : 'Generating summary...'}
                      </p>
                    </div>

                    <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-200"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </motion.div>
                )}

                {analyzingState === 'complete' && (
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-5 h-5 text-emerald-400" />
                        <span className="font-bold">Report Analyzed Successfully ✓</span>
                      </div>
                      <span className="font-semibold text-slate-400">12 Values Identified</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> 3 Values Outside Reference Range
                        </span>
                        <span className="text-[10px] text-slate-400">Sample: CBC Panel</span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-slate-800 flex items-center justify-between border border-slate-700">
                          <div>
                            <span className="font-bold text-white">Hemoglobin (Hb)</span>
                            <span className="text-[11px] text-slate-400 block">Normal: 12.0 – 15.5 g/dL</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                            10.2 g/dL (LOW)
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-800 flex items-center justify-between border border-slate-700">
                          <div>
                            <span className="font-bold text-white">Serum Ferritin</span>
                            <span className="text-[11px] text-slate-400 block">Normal: 15 – 150 ng/mL</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 font-bold border border-rose-500/30">
                            14 ng/mL (LOW)
                          </span>
                        </div>

                        <div className="p-2.5 rounded-xl bg-slate-800 flex items-center justify-between border border-slate-700">
                          <div>
                            <span className="font-bold text-white">Fasting Blood Sugar</span>
                            <span className="text-[11px] text-slate-400 block">Normal: 70 – 99 mg/dL</span>
                          </div>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                            118 mg/dL (HIGH)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        onClick={resetAnalysis}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Re-scan Report
                      </button>
                      
                      <span className="text-[11px] text-purple-400 font-semibold">
                        Summary ready in EMR Profile Pat-1042
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
