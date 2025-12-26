import React from 'react';
import { Phone, Mail, ShieldAlert } from 'lucide-react';

interface SafeHarvestHeaderProps {
  onSmsClick: () => void;
  onHotlineClick: () => void;
}

export const SafeHarvestHeader: React.FC<SafeHarvestHeaderProps> = ({ onSmsClick, onHotlineClick }) => {
  return (
    <div className="bg-red-800/10 dark:bg-red-950/20 border-2 border-red-500/30 rounded-[2.5rem] p-8 md:p-12 mb-10 text-center relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-48 h-48 border-[20px] border-red-500/10 rounded-full opacity-50"></div>
        <div className="absolute -bottom-16 -right-10 w-56 h-56 border-[24px] border-red-500/10 rounded-full opacity-50"></div>
        
        <div className="relative z-10">
            <div className="inline-block bg-red-600 p-5 rounded-3xl mb-6 shadow-lg">
                <ShieldAlert size={40} className="text-white" strokeWidth={2.5} />
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-black text-earth-900 dark:text-white uppercase tracking-wider mb-4">Safe Harvest</h1>
            <p className="text-base md:text-lg text-earth-600 dark:text-red-200/80 max-w-3xl mx-auto leading-relaxed">
                Global alert system for biological threats. Access real-time data, report incidents, and protect your yields.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
                <button 
                    onClick={onHotlineClick}
                    className="bg-white dark:bg-earth-800/80 border border-earth-200 dark:border-transparent shadow-sm px-6 py-3 rounded-full flex items-center gap-3 hover:bg-red-50 transition-all text-earth-800 dark:text-white"
                >
                    <Phone size={16} className="text-red-500" />
                    EMERGENCY HOTLINE
                </button>
                <button 
                    onClick={onSmsClick}
                    className="bg-white dark:bg-earth-800/80 border border-earth-200 dark:border-transparent shadow-sm px-6 py-3 rounded-full flex items-center gap-3 hover:bg-red-50 transition-all text-earth-800 dark:text-white"
                >
                    <Mail size={16} className="text-red-500" />
                    SUBMIT VIA SMS
                </button>
            </div>
        </div>
    </div>
  );
};