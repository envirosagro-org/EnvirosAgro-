
import React, { useState, useRef, useEffect } from 'react';
import { View } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION_STRUCTURE } from './layout/NavigationConstants';
import { ThemeToggleButton } from './layout/ThemeToggleButton';

interface NavbarProps {
  onNavigate: (view: View) => void;
  currentView: View;
}

const SubMenu = ({ items, onNavigate, closeMenu }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className='absolute left-0 mt-2 w-56 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg'
  >
    <ul className='py-1'>
      {items.map((item, index) => (
        <li key={index}>
          <button
            onClick={() => { onNavigate(item.view); closeMenu(); }}
            className='flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <item.icon className='w-4 h-4 mr-3' />
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
    <nav className='bg-white dark:bg-gray-900 shadow-md w-full top-0 z-50' ref={menuRef}>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          <div className='flex-shrink-0'>
            <span className='text-2xl font-bold text-gray-800 dark:text-white'>EnvirosAgro</span>
          </div>
          <div className='hidden md:block'>
            <ul className='ml-10 flex items-baseline space-x-4'>
              {NAVIGATION_STRUCTURE.map((item) => (
                <li key={item.label} className='relative'>
                  <button
                    onClick={() => handleItemClick(item)}
                    className='flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none'
                  >
                    <item.icon className='w-5 h-5 mr-2' />
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
          <div className='flex items-center'>
            <ThemeToggleButton />
            <div className='md:hidden ml-2'>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className='inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
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
            className='md:hidden bg-white dark:bg-gray-900'
          >
            <ul className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
              {NAVIGATION_STRUCTURE.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => handleItemClick(item)}
                    className='w-full text-left flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none'
                  >
                    <item.icon className='w-5 h-5 mr-2' />
                    <span>{item.label}</span>
                  </button>
                  <AnimatePresence>
                    {openMenu === item.label && item.subItems && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className='pl-4'
                      >
                         <ul className='py-1'>
                          {item.subItems.map((subItem, index) => (
                            <li key={index}>
                              <button
                                onClick={() => { onNavigate(subItem.view); closeMobileMenu(); }}
                                className='flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                              >
                                <subItem.icon className='w-4 h-4 mr-3' />
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
