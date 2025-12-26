
import React, { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeToggleButton: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className='p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none'
    >
      {theme === 'light' ? <Moon className='w-6 h-6' /> : <Sun className='w-6 h-6' />}
    </button>
  );
};
