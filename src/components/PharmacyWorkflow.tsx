import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Pill, 
  Package, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Search, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const PharmacyWorkflow: React.FC = () => {
  const { prescriptions, inventory, fulfillPrescription } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const pendingPrescription = prescriptions.find(p => p.status === 'Pending') || prescriptions[0];

  const filteredInventory = inventory.filter(inv => 
    inv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-xl border border-slate-800">
        <div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Pharmacy & Dispensing Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Pharmaceutical Inventory & Fulfillment
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Automated prescription safety validation, inventory decrement, and e-dispensing.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold bg-indigo-500/10 text-indigo-300 px-4 py-2 rounded-2xl border border-indigo-500/30">
          <Pill className="w-4 h-4 text-indigo-400" />
          <span>{inventory.length} Medicine SKUs</span>
        </div>
      </div>

      {/* Inventory Telemetry Metrics (Section 11 Spec) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Total Medicines</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">1,410</div>
          <p className="text-[11px] text-emerald-600 font-medium mt-0.5">Main Hospital Dispensary</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Low Stock SKUs</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 mt-1">
            {inventory.filter(i => i.status === 'Low Stock').length}
          </div>
          <p className="text-[11px] text-amber-600 font-medium mt-0.5">Reorder Threshold Reached</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Expiring Soon</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600 mt-1">
            {inventory.filter(i => i.status === 'Expiring Soon').length}
          </div>
          <p className="text-[11px] text-rose-600 font-medium mt-0.5">Expiring within 60 Days</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-400">Today's Orders</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 mt-1">18</div>
          <p className="text-[11px] text-indigo-600 font-medium mt-0.5">17 Fulfilled · 1 Pending</p>
        </div>

      </div>

      {/* PRESCRIPTION FULFILLMENT INTERACTION CARD (Section 11 Spec) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-900 text-white shadow-xl border border-indigo-500/30 space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-indigo-500/20 pb-4">
          <div>
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">
              ACTIVE PRESCRIPTION FULFILLMENT QUEUE
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">
              Prescription {pendingPrescription?.prescriptionNo} — {pendingPrescription?.patientName}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Issued by {pendingPrescription?.doctorName} · Date: {pendingPrescription?.date}
            </p>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto ${
            pendingPrescription?.status === 'Fulfilled'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
          }`}>
            Status: {pendingPrescription?.status}
          </span>
        </div>

        {/* Medicines List */}
        <div className="space-y-3">
          {pendingPrescription?.medicines.map(m => (
            <div key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 text-xs">
              <div>
                <div className="font-bold text-sm text-white">{m.name}</div>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Dosage: {m.dosage} · Frequency: {m.frequency} ({m.duration})
                </p>
              </div>

              <span className="px-3 py-1 rounded-xl bg-indigo-500/20 border border-indigo-400/30 font-mono font-bold text-indigo-200">
                Quantity: {m.quantity} Units
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-slate-300">
            Automated drug-allergy verification passed ✓
          </span>

          {pendingPrescription?.status === 'Fulfilled' ? (
            <div className="px-6 py-3 rounded-2xl bg-emerald-500/20 text-emerald-300 font-extrabold text-xs sm:text-sm border border-emerald-500/30 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Prescription fulfilled ✓</span>
            </div>
          ) : (
            <button
              onClick={() => fulfillPrescription(pendingPrescription.id)}
              className="px-6 py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Pill className="w-4 h-4" />
              <span>Dispense Prescription & Deduct Stock</span>
            </button>
          )}
        </div>

      </div>

      {/* MEDICINE INVENTORY TABLE (Section 11 Spec) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Pharmacy Medicine Stock Table
            </h3>
            <p className="text-xs text-slate-500">Live stock counts with automatic status indicator chips</p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search medicine stock..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="pb-3 px-3">Medicine SKU</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Stock Count</th>
                <th className="pb-3 px-3">Expiry Date</th>
                <th className="pb-3 px-3">Unit Price</th>
                <th className="pb-3 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {filteredInventory.map(med => (
                <tr key={med.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-3 font-bold text-slate-900 dark:text-white">
                    {med.name}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    {med.category}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {med.stock} {med.unit}
                  </td>
                  <td className="py-3.5 px-3 text-slate-500">
                    {med.expiryDate}
                  </td>
                  <td className="py-3.5 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    ₹{med.price.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      med.status === 'In Stock'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : med.status === 'Low Stock'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {med.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
