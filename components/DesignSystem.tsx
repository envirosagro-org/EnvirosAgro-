
import React from 'react';

// Example of a centralized design system component
export const Button = ({ children, onClick, type = 'primary' }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-2 rounded-md font-semibold text-white bg-${type}-500 hover:bg-${type}-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${type}-500`}
  >
    {children}
  </button>
);

export const Card = ({ children, className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 ${className}`}>
    {children}
  </div>
);

export const Input = ({ ...props }) => (
  <input 
    {...props}
    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);

// You can add more components like Modals, Toasts, etc.
