import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { View } from '../../types';

const modalColorClasses = {
  blue: { bg: 'bg-blue-900/60', contentBg: 'bg-blue-50', border: 'border-blue-100', title: 'text-blue-900', icon: 'text-blue-600', close: 'text-blue-400 hover:text-blue-700', button: 'bg-blue-600 hover:bg-blue-700' },
  amber: { bg: 'bg-amber-900/60', contentBg: 'bg-amber-50', border: 'border-amber-100', title: 'text-amber-900', icon: 'text-amber-600', close: 'text-amber-400 hover:text-amber-700', button: 'bg-amber-600 hover:bg-amber-700' },
  slate: { bg: 'bg-slate-900/60', contentBg: 'bg-slate-50', border: 'border-slate-100', title: 'text-slate-900', icon: 'text-slate-600', close: 'text-slate-400 hover:text-slate-700', button: 'bg-slate-800 hover:bg-slate-700' },
  green: { bg: 'bg-green-900/60', contentBg: 'bg-green-50', border: 'border-green-100', title: 'text-green-900', icon: 'text-green-600', close: 'text-green-400 hover:text-green-700', button: 'bg-green-600 hover:bg-green-700' },
  rose: { bg: 'bg-rose-900/60', contentBg: 'bg-rose-50', border: 'border-rose-100', title: 'text-rose-900', icon: 'text-rose-600', close: 'text-rose-400 hover:text-rose-700', button: 'bg-rose-600 hover:bg-rose-700' },
};

export const SupplyChainModal = ({ stage, onClose, onNavigate }) => {
  if (!stage) return null;

  const colors = modalColorClasses[stage.color];
  const StageIcon = stage.icon;
  const content = stage.modalContent;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${colors.bg} backdrop-blur-sm`}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`${colors.contentBg} p-6 border-b ${colors.border} flex justify-between items-center`}>
            <h3 className={`font-bold text-xl ${colors.title} flex items-center gap-2`}>
              <StageIcon className={colors.icon} /> {content.title}
            </h3>
            <button onClick={onClose} className={colors.close}>
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-6">
            {content.isMap ? (
              <>
                <div className={`aspect-video ${colors.contentBg.replace('50','100')} rounded-xl mb-6 flex items-center justify-center`}>
                  <p className={`${colors.icon} font-bold`}>{`[Live ${stage.color === 'green' ? 'Fleet' : 'Distribution'} Map]`}</p>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  {content.stats.map(stat => (
                    <div key={stat.label}><p className={`font-bold text-2xl ${colors.icon}`}>{stat.value}</p><p className="text-xs text-earth-600">{stat.label}</p></div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid gap-4">
                {content.features.map((feature, i) => {
                  const FeatureIcon = feature.icon;
                  return (
                    <div key={i} className="flex gap-4 p-4 rounded-xl border border-earth-100 bg-white">
                      <div className={`bg-gray-100 text-gray-600 p-3 rounded-lg h-fit`}><FeatureIcon size={20}/></div>
                      <div><h4 className="font-bold text-earth-900 mb-1">{feature.title}</h4><p className="text-xs text-earth-600">{feature.desc}</p></div>
                    </div>
                  )
                })}
              </div>
            )}
            <div className={`${colors.contentBg} p-4 rounded-xl border ${colors.border} text-center`}>
                <button onClick={() => onNavigate(View[content.cta.view])} className={`w-full ${colors.button} text-white font-bold py-2 rounded-lg text-sm transition-colors`}>{content.cta.label}</button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};