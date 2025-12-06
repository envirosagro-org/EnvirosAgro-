
import React from 'react';
import { 
  Users, Factory, Leaf, ShieldPlus, Cpu, ArrowUpRight, AlertCircle, Signal, Loader2
} from 'lucide-react';
import { View } from '../types';

interface DashboardProps {
    onNavigate: (view: View) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 bg-earth-50">
       {/* Header with Status */}
       <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
            <div>
                <h2 className="text-3xl font-bold text-agro-900 mb-2">Impact Dashboard</h2>
                <p className="text-earth-600">Real-time monitoring of network sustainability metrics.</p>
            </div>
            
            {/* System Status Indicator */}
            <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-earth-200 shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                </span>
                <span className="font-bold text-earth-700 text-sm">Live: Waiting for Registrations</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
             <div className="bg-white px-6 py-4 rounded-2xl border border-earth-200 shadow-sm flex items-center justify-between">
                <div>
                    <span className="text-xs text-earth-500 uppercase font-bold block mb-1">Network C(a)</span>
                    <span className="text-2xl font-serif font-bold text-earth-300 flex items-center gap-2">
                        -- <Loader2 size={16} className="animate-spin text-earth-300" />
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs bg-earth-100 text-earth-500 px-2 py-1 rounded font-bold">Calibrating</span>
                </div>
             </div>
             <div className="bg-white px-6 py-4 rounded-2xl border border-earth-200 shadow-sm flex items-center justify-between">
                <div>
                    <span className="text-xs text-earth-500 uppercase font-bold block mb-1">Resilience m(t)</span>
                    <span className="text-2xl font-serif font-bold text-earth-300 flex items-center gap-2">
                        -- <Loader2 size={16} className="animate-spin text-earth-300" />
                    </span>
                </div>
                <div className="text-right">
                    <span className="text-xs bg-earth-100 text-earth-500 px-2 py-1 rounded font-bold">Awaiting Data</span>
                </div>
             </div>
          </div>
        </div>

      {/* Five Thrusts Grid - Waiting State */}
      <div className="grid md:grid-cols-5 gap-4 mb-8">
        {[
            { icon: <Users size={18} />, title: "Social", color: "rose" },
            { icon: <Leaf size={18} />, title: "Environment", color: "green" },
            { icon: <ShieldPlus size={18} />, title: "Health", color: "red" },
            { icon: <Cpu size={18} />, title: "Technical", color: "blue" },
            { icon: <Factory size={18} />, title: "Industrial", color: "slate" }
        ].map((item, idx) => (
            <div key={idx} className={`bg-${item.color}-50 border border-${item.color}-100 p-4 rounded-xl opacity-60 flex flex-col items-center text-center justify-center min-h-[140px]`}>
               <div className={`mb-2 text-${item.color}-700 font-bold`}>
                 {item.icon}
               </div>
               <p className={`text-sm font-bold text-${item.color}-900 mb-1`}>{item.title}</p>
               <span className="text-xs text-earth-400 italic flex items-center gap-1">
                   <Loader2 size={10} className="animate-spin" /> Waiting...
               </span>
            </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Radar Chart Placeholder */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 lg:col-span-1 flex flex-col items-center justify-center text-center">
          <Signal size={48} className="text-earth-200 mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-earth-900 mb-2">Thrust Balance</h3>
          <p className="text-sm text-earth-500">Waiting for initial assessment data...</p>
        </div>

        {/* Resilience Trend Placeholder */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 lg:col-span-2 flex flex-col items-center justify-center text-center">
          <Signal size={48} className="text-earth-200 mb-4 animate-pulse" />
          <h3 className="text-lg font-bold text-earth-900 mb-2">Resilience Growth Stream</h3>
          <p className="text-sm text-earth-500">System listening for time-series inputs from registered nodes.</p>
          <button 
                onClick={() => onNavigate(View.COMMUNITY)}
                className="mt-6 text-agro-600 font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all border border-agro-100 px-4 py-2 rounded-lg hover:bg-agro-50"
            >
                Start Data Stream <ArrowUpRight size={16} />
            </button>
        </div>
      </div>

       {/* Detailed Metrics Row */}
       <div className="grid lg:grid-cols-3 gap-8">
         <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 flex flex-col justify-center text-center">
            <h3 className="text-lg font-bold text-earth-900 mb-2">Input Reduction</h3>
            <p className="text-xs text-earth-400 italic">Listening...</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 lg:col-span-2">
            <h3 className="text-lg font-bold text-earth-900 mb-6 flex items-center gap-2">
                <Signal size={18} className="text-blue-500 animate-pulse" /> Live Network Activity
            </h3>
            <div className="space-y-4">
               {/* Skeleton Loaders for Activity */}
               <div className="flex items-center gap-4 p-4 bg-earth-50 rounded-xl border border-earth-100 animate-pulse">
                   <div className="w-10 h-10 bg-earth-200 rounded-full"></div>
                   <div className="flex-1 space-y-2">
                      <div className="h-3 bg-earth-200 rounded w-1/3"></div>
                      <div className="h-2 bg-earth-200 rounded w-1/2"></div>
                   </div>
               </div>
               <div className="flex items-center gap-4 p-4 bg-earth-50 rounded-xl border border-earth-100 animate-pulse">
                   <div className="w-10 h-10 bg-earth-200 rounded-full"></div>
                   <div className="flex-1 space-y-2">
                      <div className="h-3 bg-earth-200 rounded w-1/4"></div>
                      <div className="h-2 bg-earth-200 rounded w-1/3"></div>
                   </div>
               </div>
            </div>
            <div className="mt-6 text-center text-xs text-earth-400">
                Waiting for new registrations to populate feed...
            </div>
        </div>
       </div>
    </div>
  );
};
