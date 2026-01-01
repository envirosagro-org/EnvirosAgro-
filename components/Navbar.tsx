
import React, { useState, useRef, useEffect } from 'react';
import { View } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_STRUCTURE } from './layout/NavigationConstants';
import { ThemeToggleButton } from './layout/ThemeToggleButton';
import { LogIn } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: View) => void;
  currentView: View;
}

const SubMenu = ({ items, onNavigate, closeMenu }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className='absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl'
  >
    <ul className='py-2'>
      {items.map((item, index) => (
        <li key={index}>
          <button
            onClick={() => { onNavigate(item.view); closeMenu(); }}
            className='flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors'
          >
            <item.icon className='w-4 h-4 mr-3 text-gray-400 group-hover:text-agro-600' />
            <span>{item.label}</span>
          </button>
        </li>
      ))}
    </ul>
  </motion.div>
);

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMenuToggle = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  const handleItemClick = (item) => {
    if (item.subItems) {
      handleMenuToggle(item.label);
    } else {
      onNavigate(item.view);
      closeMobileMenu();
    }
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenMenu(null);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMenu(null);
  }

  return (
    <nav className='bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 w-full sticky top-0 z-50 transition-all' ref={menuRef}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <div className='flex-shrink-0 flex items-center gap-2 group cursor-pointer' onClick={() => onNavigate(View.HOME)}>
            <div className='bg-agro-600 p-2 rounded-xl text-white shadow-lg shadow-agro-600/20 group-hover:scale-110 transition-transform'>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C10.9 14.19 12 15 15 15"/></svg>
            </div>
            <span className='text-2xl font-black text-gray-900 dark:text-white tracking-tighter'>EnvirosAgro</span>
          </div>
          
          <div className='hidden xl:block'>
            <ul className='flex items-center space-x-1'>
              {NAVIGATION_STRUCTURE.map((item) => (
                <li key={item.label} className='relative'>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`flex items-center text-gray-600 dark:text-gray-400 hover:text-agro-700 dark:hover:text-agro-400 px-4 py-2 rounded-xl text-sm font-bold transition-all ${currentView === item.view ? 'text-agro-600 bg-agro-50 dark:bg-agro-900/20' : ''}`}
                  >
                    <span>{item.label}</span>
                  </button>
                  <AnimatePresence>
                    {openMenu === item.label && item.subItems && (
                      <SubMenu items={item.subItems} onNavigate={onNavigate} closeMenu={() => setOpenMenu(null)} />
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </div>

          <div className='flex items-center gap-4'>
            <ThemeToggleButton />
            <button 
                onClick={() => onNavigate(View.SIGN_UP)}
                className='hidden sm:flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-900/10 dark:shadow-white/5'
            >
                <LogIn size={16} /> Sign Up
            </button>
            <div className='xl:hidden'>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors'
              >
                <span className='sr-only'>Open main menu</span>
                <svg className='h-6 w-6' stroke='currentColor' fill='none' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='xl:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-white/5 overflow-hidden'
          >
            <ul className='px-4 pt-4 pb-8 space-y-2'>
              {NAVIGATION_STRUCTURE.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className={`w-full text-left flex items-center justify-between text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 px-4 py-3 rounded-xl text-sm font-bold transition-all ${currentView === item.view ? 'bg-agro-50 text-agro-600 dark:bg-agro-900/20' : ''}`}
                  >
                    <div className='flex items-center gap-3'>
                        <item.icon className='w-5 h-5 text-gray-400' />
                        <span>{item.label}</span>
                    </div>
                    {item.subItems && (
                        <svg className={`w-4 h-4 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    )}
                  </button>
                  <AnimatePresence>
                    {openMenu === item.label && item.subItems && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className='overflow-hidden'
                      >
                         <ul className='py-2 pl-8 space-y-1'>
                          {item.subItems.map((subItem, index) => (
                            <li key={index}>
                              <button
                                onClick={() => { onNavigate(subItem.view); closeMobileMenu(); }}
                                className='flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-500 dark:text-gray-400 hover:text-agro-600 dark:hover:text-agro-400 transition-colors font-medium'
                              >
                                <subItem.icon className='w-4 h-4 mr-3 opacity-50' />
                                <span>{subItem.label}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
              <li className='pt-4'>
                <button 
                    onClick={() => { onNavigate(View.SIGN_UP); closeMobileMenu(); }}
                    className='w-full bg-agro-600 text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-3'
                >
                    <LogIn size={18} /> Sign Up for ESIN
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
