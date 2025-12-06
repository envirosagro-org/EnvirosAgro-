import React, { useState } from 'react';
import { View, User } from '../types';
import { NAV_ITEMS } from './Navigations';
import { Sprout, Menu, X, UserCircle, LogOut, ChevronDown, MessageSquareText } from 'lucide-react';

interface HeaderProps {
  user: User | null;
  currentView: View;
  onNavClick: (view: View) => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, currentView, onNavClick, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (view: View) => {
    onNavClick(view);
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-earth-100" onMouseLeave={() => setActiveDropdown(null)}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick(View.HOME)}>
          <div className="bg-agro-600 text-white p-2 rounded-lg">
            <Sprout size={24} />
          </div>
          <span className="text-xl font-serif font-bold text-agro-900 tracking-tight">EnvirosAgro</span>
        </div>

        <div className="hidden lg:flex items-center space-x-1">
          {NAV_ITEMS.main.map((item) => {
            if (item.isDropdown && item.dropdownItems) {
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setActiveDropdown(item.label)}>
                  <button className="px-4 py-2 rounded-full text-sm font-medium text-earth-600 hover:text-agro-600 flex items-center gap-1">
                    {item.label} <ChevronDown size={14} />
                  </button>
                  {activeDropdown === item.label && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-xl shadow-xl border border-earth-100 py-2 animate-in fade-in slide-in-from-top-2">
                      {item.dropdownItems.map((dItem) => {
                        if (dItem.isDivider) return <div key={Math.random()} className="border-t border-earth-100 my-1 mx-2"></div>;
                        const Icon = dItem.icon;
                        return (
                          <button key={dItem.label} onClick={() => handleNavClick(dItem.view as View)} className="w-full text-left px-4 py-2 text-sm text-earth-600 hover:bg-earth-50 hover:text-agro-600 flex items-center gap-2">
                            {Icon && <Icon size={16} />} {dItem.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.view as View)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${currentView === item.view ? 'bg-agro-50 text-agro-700' : 'text-earth-600 hover:text-agro-600'}`}
                >
                  {Icon && <Icon size={18} />} {item.label}
                </button>
              );
            }
          })}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-earth-200">
              <button onClick={() => handleNavClick(View.PROFILE)} className="flex items-center gap-2 hover:bg-earth-50 px-3 py-1.5 rounded-xl transition-all">
                <div className="w-8 h-8 bg-earth-100 rounded-full flex items-center justify-center text-earth-600 overflow-hidden">
                  {user.avatar ? <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" /> : <UserCircle size={20} />}
                </div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-sm font-bold text-earth-900">{user.name}</span>
                  <span className="text-[10px] uppercase tracking-wider text-agro-600 font-bold">{user.role}</span>
                </div>
              </button>
              <button onClick={onLogout} className="text-earth-400 hover:text-red-500 transition-colors p-2" title="Sign Out">
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button onClick={() => handleNavClick(View.SIGN_UP)} className="bg-agro-600 hover:bg-agro-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-agro-200 transition-all flex items-center gap-2">
              Sign In
            </button>
          )}
        </div>

        <button className="lg:hidden p-2 text-earth-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-earth-100 py-4 px-6 absolute w-full shadow-lg h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            <button onClick={() => handleNavClick(View.HOME)} className="px-4 py-3 rounded-xl text-left font-medium text-earth-600 hover:bg-earth-50">Home</button>
            {NAV_ITEMS.mobile.map((section) => (
              <div key={section.section}>
                <div className="px-4 py-2 text-xs font-bold text-earth-400 uppercase tracking-wider mt-2">{section.section}</div>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  return (
                  <button key={item.label} onClick={() => handleNavClick(item.view)} className="px-4 py-2 rounded-xl text-left font-medium text-earth-600 hover:bg-earth-50 flex gap-2">
                    <Icon size={18} /> {item.label}
                  </button>
                )})}
              </div>
            ))}
            <button onClick={() => handleNavClick(View.AI_ADVISOR)} className="mt-4 px-4 py-3 rounded-xl text-left font-bold text-agro-700 bg-agro-50 flex gap-2">
                <MessageSquareText size={18}/> AI Advisor
            </button>
            <div className="border-t border-earth-100 my-4 pt-4">
              {user ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 px-4" onClick={() => handleNavClick(View.PROFILE)}>
                    <div className="bg-earth-100 p-1.5 rounded-full text-earth-600 w-10 h-10 flex items-center justify-center overflow-hidden">
                      {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <UserCircle size={24} />}
                    </div>
                    <div>
                      <div className="font-bold text-earth-900">{user.name}</div>
                      <div className="text-xs text-agro-600 font-bold uppercase">{user.role}</div>
                    </div>
                  </div>
                  <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="px-4 py-3 rounded-xl text-left font-medium text-red-600 hover:bg-red-50 flex items-center gap-3">
                    <LogOut size={20} /> Sign Out
                  </button>
                </div>
              ) : (
                <button onClick={() => handleNavClick(View.SIGN_UP)} className="w-full bg-agro-600 text-white px-4 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                  Sign In / Sign Up
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};