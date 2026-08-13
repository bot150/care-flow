import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Receipt, 
  CheckCircle2, 
  CreditCard, 
  Building2, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  FileText,
  Download,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const BillingDashboard: React.FC = () => {
  const { invoices, payInvoice } = useApp();
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>('inv-901');
  const [paymentMethod, setPaymentMethod] = useState<'Online Payment' | 'Insurance Claim' | 'Hospital Desk Cash'>('Online Payment');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const activeInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || invoices[0];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payInvoice(activeInvoice.id);
      setIsProcessing(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Revenue & Patient Financial Services
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Itemized Hospital Billing & Claims
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Unified billing engine pooling consultation fees, lab diagnostic tests, and pharmacy SKUs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-emerald-500/10 text-emerald-300 px-4 py-2 rounded-2xl border border-emerald-500/30">
          <Receipt className="w-4 h-4 text-emerald-400" />
          <span>{invoices.length} Total Invoices</span>
        </div>
      </div>

      {/* Main Billing Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Invoice Selector & List */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Patient Invoices</h3>
            <span className="text-xs text-slate-400">All Departments</span>
          </div>

          <div className="space-y-3">
            {invoices.map(inv => {
              const isSelected = inv.id === activeInvoice.id;
              return (
                <button
                  key={inv.id}
                  onClick={() => setSelectedInvoiceId(inv.id)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{inv.invoiceNo}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {inv.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                    {inv.patientName} ({inv.department})
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="text-slate-400">{inv.date}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                      ₹{inv.totalAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Itemized Statement View (Section 12 Spec) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* Statement Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase tracking-widest">
                ITEMIZED HOSPITAL STATEMENT
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                {activeInvoice.invoiceNo}
              </h3>
              <p className="text-xs text-slate-500">
                Patient: <strong>{activeInvoice.patientName}</strong> · Date: {activeInvoice.date}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                activeInvoice.status === 'Paid'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
              }`}>
                {activeInvoice.status}
              </span>
            </div>
          </div>

          {/* Itemized Breakdown Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Itemized Line Items
            </h4>

            <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
              {activeInvoice.items.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{item.description}</span>
                    <p className="text-[10px] text-slate-400">Category: {item.category}</p>
                  </div>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                    ₹{item.amount.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Statement Total */}
          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Total Outstanding Balance
            </span>
            <span className="font-mono text-2xl font-black text-teal-400">
              ₹{activeInvoice.totalAmount.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Payment Method Selector (Section 12 Spec) */}
          {activeInvoice.status === 'Pending' && (
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Payment Channel
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Online Payment')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'Online Payment'
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-teal-600" />
                  <span className="text-xs">Online UPI / Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Insurance Claim')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'Insurance Claim'
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span className="text-xs">TPA Insurance</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('Hospital Desk Cash')}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    paymentMethod === 'Hospital Desk Cash'
                      ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-200 font-semibold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-teal-600" />
                  <span className="text-xs">Hospital Desk Cash</span>
                </button>
              </div>

              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-lg shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{isProcessing ? 'Processing Payment...' : `Settle & Pay ₹${activeInvoice.totalAmount.toLocaleString('en-IN')}`}</span>
              </button>
            </div>
          )}

          {activeInvoice.status === 'Paid' && (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <span>Invoice settled via {activeInvoice.paymentMethod || 'Online Payment'} ✓</span>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-[11px]">
                Download PDF Receipt
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
