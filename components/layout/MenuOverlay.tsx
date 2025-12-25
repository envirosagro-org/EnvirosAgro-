import React from 'react';
import { View } from '../../types';
import { Logo } from '../Logo';
import { X } from 'lucide-react';
import { MENU_SECTIONS } from './NavigationConstants';

interface MenuOverlayProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  handleNavClick: (view: View) => void;
  currentView: View;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  handleNavClick,
  currentView
}) => {
  if (!isMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] bg-white/95 dark:bg-earth-950/95 backdrop-blur-[60px] animate-in fade-in duration-500 overflow-y-auto">
       <div className="p-8 pb-32 max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10">
             <Logo size={48} variant="horizontal" useGradient={true} />
             <button onClick={() => setIsMenuOpen(false)} className="p-4 bg-agro-900 text-white rounded-full shadow-2xl transition-all border-4 border-white/20"><X size={32} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10 items-start">
             {MENU_SECTIONS.map((section) => (
                <section key={section.id} className="space-y-8 group/sec">
                   <h3 className="text-[11px] font-black uppercase tracking(0.5em] text-earth-400 flex items-center gap-4 pb-4 border-b border-earth-100 dark:border-white/5">{section.icon} {section.label}</h3>
                   <div className="grid gap-3">
                      {section.items.map(item => (
                        <button key={item.id} onClick={() => handleNavClick(item.id)} className={`flex items-start gap-5 p-4 rounded-[1.5rem] text-left transition-all border border-transparent group relative overflow-hidden ${currentView === item.id ? 'bg-agro-600 text-white shadow-xl' : 'hover:bg-agro-500/5 dark:hover:bg-white/5 hover:border-agro-500/10'}`}>
                           <div className={`p-3 rounded-2xl shadow-sm shrink-0 ${currentView === item.id ? 'bg-white text-agro-600' : 'bg-white dark:bg-earth-800 text-earth-400 group-hover:text-agro-600 shadow-inner'}`}>{item.icon}</div>
                           <div>
                              <span className={`text-[11px] font-black uppercase tracking-widest mb-1.5 block ${currentView === item.id ? 'text-white' : 'text-earth-800 dark:text-earth-100'}`}>{item.label}</span>
                              <p className={`text-[9px] font-medium leading-relaxed opacity-60 ${currentView === item.id ? 'text-white' : 'text-earth-400'}`}>{item.desc}</p>
                           </div>
                        </button>
                      ))}
                   </div>
                </section>
             ))}
          </div>
       </div>
    </div>
  );
};
