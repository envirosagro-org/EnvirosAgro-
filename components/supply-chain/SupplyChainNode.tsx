import React from 'react';
import { motion } from 'framer-motion';

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    button: 'text-blue-600 border-blue-200 hover:bg-blue-50'
  },
  amber: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    button: 'text-amber-600 border-amber-200 hover:bg-amber-50'
  },
  slate: {
    bg: 'bg-slate-50',
    border: 'border-slate-200',
    text: 'text-slate-800',
    button: 'text-slate-600 border-slate-200 hover:bg-slate-50'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    button: 'text-green-600 border-green-200 hover:bg-green-50'
  },
  rose: {
    bg: 'bg-rose-50',
    border: 'border-rose-200',
    text: 'text-rose-800',
    button: 'text-rose-600 border-rose-200 hover:bg-rose-50'
  },
};

export const SupplyChainNode = ({ stage, onNodeClick }) => {
  const Icon = stage.icon;
  const colors = colorClasses[stage.color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      <div className={`bg-white border-2 ${colors.bg} p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all h-full flex flex-col items-center text-center`}>
        <div className={`mb-4 p-4 rounded-full ${colors.bg} ${colors.text}`}>
          <Icon size={24} />
        </div>
        <h3 className="font-bold text-earth-900 mb-2">{stage.title}</h3>
        <div className="text-xs font-bold text-agro-600 uppercase tracking-wide mb-3 bg-earth-50 px-2 py-1 rounded">
          {stage.stats}
        </div>
        <p className="text-earth-600 text-sm leading-relaxed mb-4 flex-grow">
          {stage.description}
        </p>
        <button
          onClick={() => onNodeClick(stage)}
          className={`mt-auto text-xs font-bold ${colors.button} border px-4 py-2 rounded-full transition-colors flex items-center justify-center gap-1 w-full`}
        >
          {stage.modalContent.title.includes("Purchasing") ? "View Strategy" : 
           stage.modalContent.title.includes("Quality") ? "Check Standards" : 
           stage.modalContent.title.includes("Processing") ? "View Methods" : 
           stage.modalContent.title.includes("Logistics") ? "Track Fleet" : "View Network"}
        </button>
      </div>
    </motion.div>
  );
};