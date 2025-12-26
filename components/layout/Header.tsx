
import React from 'react';
import { View, User } from '../../types';
import { Logo } from '../Logo';
import { LayoutDashboard, Minimize2, Maximize2, Coins, LogOut, Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { ThemeToggleButton } from './ThemeToggleButton';

interface HeaderProps {
  scrolled: boolean;
  currentView: View;
  handleNavClick: (view: View) => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
  user: User | null;
  handleLogout: () => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  scrolled,
  currentView,
  handleNavClick,
  toggleFullscreen,
  isFullscreen,
  user,
  handleLogout,
  isMenuOpen,
  setIsMenuOpen
}) => {
  const { totalItems } = useCart();

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out isolate ${scrolled ? 'mt-3 mx-4 md:mx-10 rounded-[2.5rem] bg-white/70 dark:bg-earth-900/80 backdrop-blur-3xl border border-white/40 dark:border-white/5 py-1.5 shadow-xl' : 'bg-white/40 dark:bg-earth-950/40 backdrop-blur-xl border-b border-earth-100/10 py-5'}`}>
      <div className="max-w-[1900px] mx-auto px-8 flex items-center justify-between gap-6">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 cursor-pointer group shrink-0 transition-transform active:scale-95" onClick={() => handleNavClick(View.HOME)}>
            <Logo size={scrolled ? 34 : 42} variant="horizontal" useGradient={true} />
          </div>
          <div className="hidden xl:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.4em] text-earth-400">
             <div className="flex items-center gap-3 bg-earth-50/50 dark:bg-earth-800/40 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></div>
                <span>Pulse: 8.54m(t)</span>
             </div>
             <div className="flex items-center gap-3 bg-earth-50/50 dark:bg-earth-800/40 px-4 py-2 rounded-xl border border-black/5 dark:border-white/5">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>Sync: Global_Ok</span>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
              <button onClick={() => handleNavClick(View.DASHBOARD)} className={`p-2.5 rounded-xl transition-all ${currentView === View.DASHBOARD ? 'bg-agro-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}><LayoutDashboard size={20} /></button>
              <button onClick={() => handleNavClick(View.CART)} className={`p-2.5 rounded-xl transition-all relative ${currentView === View.CART ? 'bg-amber-500 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}>
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white dark:border-earth-900 animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>
              <button onClick={toggleFullscreen} className={`p-2.5 rounded-xl transition-all ${isFullscreen ? 'bg-blue-600 text-white shadow-lg' : 'text-earth-400 hover:bg-earth-50 dark:hover:bg-earth-800'}`}>{isFullscreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}</button>
              <ThemeToggleButton />
          </div>
          <div className="flex items-center gap-2 p-1 bg-white/40 dark:bg-earth-900/50 rounded-2xl border border-white dark:border-white/5 shadow-sm backdrop-blur-md">
            {user ? (
                <div className="flex items-center gap-1.5 px-1.5">
                    <div className="hidden lg:flex items-center gap-3 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 group cursor-default">
                        <Coins size={16} className="text-amber-500" />
                        <span className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest">{user.eacBalance} EAC</span>
                    </div>
                    <button onClick={() => handleNavClick(View.PROFILE)} className="flex items-center gap-3 p-1 rounded-xl hover:bg-white dark:hover:bg-earth-700 transition-all group">
                        <div className="w-8 h-8 rounded-lg overflow-hidden border-2 border-white dark:border-earth-600 shadow-sm">{user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" /> : <div className="w-full h-full bg-agro-100 flex items-center justify-center text-agro-600 font-black text-xs">{user.name.charAt(0)}</div>}</div>
                    </button>
                    <button onClick={handleLogout} className="p-2.5 text-earth-400 hover:text-red-500 hover:bg-white dark:hover:bg-earth-700 rounded-xl transition-all"><LogOut size={20} /></button>
                </div>
            ) : (
                <button onClick={() => handleNavClick(View.SIGN_UP)} className="bg-agro-600 text-white px-7 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.25em] shadow-lg hover:bg-agro-500 active:scale-95 transition-all ml-2">Sync ID</button>
            )}
          </div>
          <button className={`p-3 rounded-2xl transition-all active:scale-90 shadow-xl border-4 border-white dark:border-earth-800 ${isMenuOpen ? 'bg-red-600 text-white border-red-500' : 'bg-agro-900 text-white border-agro-800'}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>{isMenuOpen ? <X size={28} /> : <Menu size={28} />}</button>
        </div>
      </div>
    </header>
  );
};
