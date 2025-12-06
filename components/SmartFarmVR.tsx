import React, { useState } from 'react';
import { Gamepad2, Glasses, CheckCircle, Lock, Play, RotateCcw, Info, Battery, Wifi, MousePointer2, Box } from 'lucide-react';

const VR_MODULES = [
  {
    id: 1,
    title: "Tractor Safety Inspection",
    category: "Machinery",
    level: "Beginner",
    duration: "15 min",
    progress: 100,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 2,
    title: "Drone Flight Patterns",
    category: "Precision Ag",
    level: "Intermediate",
    duration: "25 min",
    progress: 45,
    status: "In Progress",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 3,
    title: "Greenhouse Climate Control",
    category: "Infrastructure",
    level: "Advanced",
    duration: "30 min",
    progress: 0,
    status: "Locked",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: 4,
    title: "Soil Sampling VR",
    category: "Agronomy",
    level: "Beginner",
    duration: "20 min",
    progress: 0,
    status: "Locked",
    image: "https://images.unsplash.com/photo-1615811361269-669f44efd998?w=800&auto=format&fit=crop&q=60"
  }
];

export const SmartFarmVR: React.FC = () => {
  const [activeModule, setActiveModule] = useState(VR_MODULES[1]);
  const [isSimulating, setIsSimulating] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
        <div>
           <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider text-xs mb-2">
              <Glasses size={16} /> Immersive Learning
           </div>
           <h2 className="text-4xl font-serif font-bold text-agro-900 mb-2">SmartFarm VR</h2>
           <p className="text-earth-600 max-w-xl">
             Train on expensive machinery and complex scenarios in a risk-free virtual environment. Compatible with VR headsets or standard browsers.
           </p>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-white px-4 py-2 rounded-xl border border-earth-200 shadow-sm flex flex-col items-center">
              <span className="text-2xl font-bold text-agro-600">1</span>
              <span className="text-[10px] text-earth-500 uppercase font-bold">Completed</span>
           </div>
           <div className="bg-white px-4 py-2 rounded-xl border border-earth-200 shadow-sm flex flex-col items-center">
              <span className="text-2xl font-bold text-blue-600">2.5h</span>
              <span className="text-[10px] text-earth-500 uppercase font-bold">Training Time</span>
           </div>
        </div>
      </div>

      {/* Main VR Viewer / Simulation Area */}
      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative mb-12 border-4 border-slate-800 aspect-video group">
         
         {/* Simulation Content (Image Placeholder) */}
         <img 
            src={activeModule.image} 
            className={`w-full h-full object-cover transition-all duration-1000 ${isSimulating ? 'scale-110' : 'opacity-60'}`}
            alt="Simulation" 
         />
         
         {/* HUD Overlay */}
         <div className="absolute inset-0 pointer-events-none p-6 flex flex-col justify-between">
            {/* Top Bar HUD */}
            <div className="flex justify-between items-start">
               <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/10 flex gap-4 text-xs font-mono">
                  <span className="flex items-center gap-2"><Wifi size={14} className="text-green-400" /> Connected</span>
                  <span className="flex items-center gap-2"><Battery size={14} className="text-green-400" /> 98%</span>
               </div>
               <div className="bg-black/40 backdrop-blur-md text-white px-4 py-2 rounded-lg border border-white/10 text-xs font-mono">
                  Module: {activeModule.title}
               </div>
            </div>

            {/* Center Interface */}
            {!isSimulating && (
               <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                  <div className="text-center">
                     <button 
                        onClick={() => setIsSimulating(true)}
                        className="group/btn relative inline-flex items-center justify-center p-0.5 mb-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-blue-500 to-green-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 scale-125 transition-transform hover:scale-150"
                     >
                        <span className="relative px-8 py-4 transition-all ease-in duration-75 bg-slate-900 rounded-full group-hover/btn:bg-opacity-0 flex items-center gap-3">
                           <Gamepad2 size={24} /> Enter Simulation
                        </span>
                     </button>
                     <p className="text-slate-400 text-sm mt-4 font-mono">Press to Initialize VR Environment</p>
                  </div>
               </div>
            )}

            {/* Bottom HUD */}
            {isSimulating && (
               <div className="bg-black/60 backdrop-blur-md rounded-xl p-4 border border-white/10 w-full max-w-2xl mx-auto pointer-events-auto animate-in slide-in-from-bottom-10">
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-white font-bold text-sm">Objective: Calibrate Sensors</span>
                     <span className="text-blue-400 font-mono text-xs">Step 2 of 5</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                     <div className="bg-blue-500 h-2 rounded-full" style={{width: '40%'}}></div>
                  </div>
                  <div className="flex justify-center gap-4">
                     <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                        <RotateCcw size={14} className="inline mr-1" /> Reset
                     </button>
                     <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors">
                        <Info size={14} className="inline mr-1" /> Help
                     </button>
                     <button 
                        onClick={() => setIsSimulating(false)}
                        className="bg-red-500/20 hover:bg-red-500/40 text-red-300 px-4 py-2 rounded-lg text-xs font-bold transition-colors border border-red-500/30"
                     >
                        Exit
                     </button>
                  </div>
               </div>
            )}
         </div>
      </div>

      {/* Modules Grid */}
      <h3 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-2">
         <Box className="text-agro-600" /> Training Library
      </h3>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
         {VR_MODULES.map((module) => (
            <div 
               key={module.id} 
               onClick={() => module.status !== 'Locked' && setActiveModule(module)}
               className={`bg-white p-4 rounded-2xl shadow-sm border transition-all cursor-pointer group ${
                  activeModule.id === module.id 
                  ? 'border-blue-500 ring-2 ring-blue-100' 
                  : 'border-earth-100 hover:shadow-lg hover:border-blue-200'
               } ${module.status === 'Locked' ? 'opacity-75 grayscale' : ''}`}
            >
               <div className="relative h-32 rounded-xl overflow-hidden mb-4">
                  <img src={module.image} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                     {module.status === 'Completed' && <div className="bg-green-500 text-white p-1 rounded-full"><CheckCircle size={14} /></div>}
                     {module.status === 'Locked' && <div className="bg-slate-800 text-white p-1 rounded-full"><Lock size={14} /></div>}
                  </div>
                  {activeModule.id === module.id && (
                     <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                        <MousePointer2 className="text-white drop-shadow-lg" size={24} />
                     </div>
                  )}
               </div>
               
               <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-earth-900 text-sm leading-tight">{module.title}</h4>
               </div>
               
               <div className="flex gap-2 text-[10px] font-bold uppercase tracking-wider text-earth-500 mb-3">
                  <span className="bg-earth-100 px-1.5 py-0.5 rounded">{module.level}</span>
                  <span className="bg-earth-100 px-1.5 py-0.5 rounded">{module.duration}</span>
               </div>

               <div className="w-full bg-earth-100 rounded-full h-1.5">
                  <div 
                     className={`h-1.5 rounded-full ${module.status === 'Completed' ? 'bg-green-500' : 'bg-blue-500'}`} 
                     style={{width: `${module.progress}%`}}
                  ></div>
               </div>
            </div>
         ))}
      </div>

    </div>
  );
};