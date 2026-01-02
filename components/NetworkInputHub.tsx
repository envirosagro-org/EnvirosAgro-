import React from 'react';
import { 
  ChevronDownIcon,
  PlusCircleIcon,
  BookOpenIcon,
  ChartPieIcon,
  UserGroupIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { User, View } from '../types';
import { services, thrusts } from './data';

interface NetworkInputHubProps {
  user: User;
  onNavigate: (view: View, params?: any) => void;
  onLogout: () => void;
}

const NetworkInputHub: React.FC<NetworkInputHubProps> = ({ user, onNavigate, onLogout }) => {

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  const renderServiceCard = (service: any) => (
    <div 
      key={service.name}
      className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={() => onNavigate(service.view)}
    >
      <service.icon className="w-12 h-12 text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold">{service.name}</h3>
      <p className="text-sm text-gray-600 mt-2">{service.description}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/logo.png" alt="Streamline Logo" className="h-10 w-auto"/>
            <h1 className="text-2xl font-bold text-gray-800 ml-4">Streamline</h1>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600 mr-4">Welcome, {user.name}</span>
            <button 
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900">Your Network Input Hub</h2>
          <p className="mt-4 text-lg text-gray-600">Unlock the power of our interconnected network. Access services, explore thrusts, and contribute to a resilient future.</p>
        </div>
        
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-3xl font-bold text-gray-800">Core Services</h3>
             <button 
                onClick={() => onNavigate(View.AI_CHAT)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
              >
                AI Chat
              </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map(renderServiceCard)}
          </div>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Strategic Thrusts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {thrusts.map(thrust => (
              <div key={thrust.name} className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow duration-300">
                <h4 className="text-xl font-bold text-gray-900 mb-4">{thrust.name}</h4>
                <p className="text-gray-600 mb-6">{thrust.description}</p>
                <button 
                  onClick={() => onNavigate(thrust.view)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                >
                  Explore {thrust.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default NetworkInputHub;