import React from 'react';
import { customerData } from './data';
import { View } from '../types';

interface CustomerProps {
  onNavigate: (view: View) => void;
}

export const Customer: React.FC<CustomerProps> = ({ onNavigate }) => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">Customer Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {customerData.map((customer) => (
          <div key={customer.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">{customer.name}</h2>
            <p className="text-gray-600 mb-2">{customer.email}</p>
            <p className="text-gray-600 mb-4">{customer.phone}</p>
            <div className="flex justify-between items-center">
              <span className={`px-3 py-1 rounded-full text-sm ${customer.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                {customer.status}
              </span>
              <button 
                className="text-blue-500 hover:underline"
                onClick={() => onNavigate(View.CUSTOMER_DETAIL)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
