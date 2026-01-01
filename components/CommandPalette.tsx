
import React, { useState, useEffect } from 'react';
import { NAVIGATION_STRUCTURE } from './layout/NavigationConstants';
import { View } from '../types';
import { useStateValue } from '../context/StateContext';

const CommandPalette = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [{ currentView }] = useStateValue();

  const allCommands = NAVIGATION_STRUCTURE.flatMap(category =>
    category.subItems ? category.subItems.map(item => ({ ...item, category: category.name })) : []
  );

  const filteredCommands = allCommands.filter(command =>
    command.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = (view: View) => {
    onNavigate(view);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        setIsOpen(!isOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-lg mx-4">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search for commands..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          {filteredCommands.map(command => (
            <div 
              key={command.view}
              onClick={() => handleNavigate(command.view)}
              className="cursor-pointer p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
            >
              {command.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
