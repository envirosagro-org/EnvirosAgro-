import React, { useState } from 'react';
import { ShieldAlert, Map, AlertTriangle, Bug, Droplets, Thermometer, ChevronRight, Bell, Phone, CheckCircle2, XCircle } from 'lucide-react';

const ALERTS = [
  {
    id: 1,
    title: "Fall Armyworm Outbreak",
    region: "Central & Eastern Zones",
    level: "Critical",
    type: "Pest",
    date: "2 hours ago",
    desc: "High larval density detected in maize fields. Immediate scouting recommended.",
    action: "Apply neem-based bio-pesticides or approved IPM controls immediately.",
    icon: <Bug size={24} />,
    color: "bg-red-50 border-red-200 text-red-800"
  },
  {
    id: 2,
    title: "Coffee Berry Disease (CBD)",
    region: "High Altitude Areas",
    level: "High",
    type: "Fungal",
    date: "Today, 08:00 AM",
    desc: "Cold, wet conditions favoring Colletotrichum kahawae spread.",
    action: "Ensure proper canopy aeration and apply copper-based fungicides if threshold exceeded.",
    icon: <Droplets size={24} />,
    color: "bg-orange-50 border-orange-200 text-orange-800"
  },
  {
    id: 3,
    title: "Heat Stress Warning",
    region: "Lowland Pastures",
    level: "Moderate",
    type: "Weather",
    date: "Yesterday",
    desc: "Temperatures expected to exceed 35°C. Livestock at risk of dehydration.",
    action: "Increase water availability and provide shade for all grazing animals.",
    icon: <Thermometer size={24} />,
    color: "bg-yellow-50 border-yellow-200 text-yellow-800"
  }
];

export const SafeHarvest: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ALERTS' | 'MAP'>('ALERTS');

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      
      {/* Header */}
      <div className="bg-red-900 rounded-3xl p-10 text-white mb-10 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-10 transform scale-150">
            <ShieldAlert size={200} />
         </div>
         <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
               <div className="flex items-center gap-2 text-red-300 font-bold uppercase tracking-wider text-xs mb-3">
                  <ShieldAlert size={16} /> Health Agriculture System
               </div>
               <h2 className="text-4xl font-serif font-bold mb-4">SafeHarvest Alerts</h2>
               <p className="text-red-100 text-lg max-w-2xl leading-relaxed">
                  Real-time monitoring of biological threats, food safety risks, and environmental hazards protecting crops and consumers.
               </p>
            </div>
            <div className="flex gap-3">
               <button className="bg-white text-red-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-red-50 transition-colors shadow-lg">
                  <Bell size={18} /> Subscribe to SMS
               </button>
               <button className="bg-red-800 text-white border border-red-700 px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-red-700 transition-colors">
                  <Phone size={18} /> Emergency Hotline
               </button>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-earth-200 pb-1">
         <button 
            onClick={() => setActiveTab('ALERTS')}
            className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 ${activeTab === 'ALERTS' ? 'bg-white text-red-700 border-x border-t border-earth-200' : 'text-earth-500 hover:text-red-600'}`}
         >
            <AlertTriangle size={18} /> Active Alerts <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs">3</span>
         </button>
         <button 
            onClick={() => setActiveTab('MAP')}
            className={`px-6 py-3 font-bold text-sm rounded-t-xl transition-all flex items-center gap-2 ${activeTab === 'MAP' ? 'bg-white text-red-700 border-x border-t border-earth-200' : 'text-earth-500 hover:text-red-600'}`}
         >
            <Map size={18} /> Risk Map
         </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
         
         {/* Main Content Area */}
         <div className="lg:col-span-2">
            {activeTab === 'ALERTS' ? (
               <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                  {ALERTS.map((alert) => (
                     <div key={alert.id} className={`rounded-2xl p-6 border-l-4 shadow-sm ${alert.color} bg-white`}>
                        <div className="flex justify-between items-start mb-4">
                           <div className="flex gap-4">
                              <div className={`p-3 rounded-xl h-fit bg-white/50 border border-white/50 shadow-sm ${alert.color.split(' ')[2]}`}>
                                 {alert.icon}
                              </div>
                              <div>
                                 <div className="flex items-center gap-2 mb-1">
                                    <h3 className="font-bold text-lg text-earth-900">{alert.title}</h3>
                                    {alert.level === 'Critical' && (
                                       <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase animate-pulse">Critical</span>
                                    )}
                                 </div>
                                 <p className="text-xs text-earth-500 font-bold uppercase tracking-wide flex items-center gap-2">
                                    {alert.region} • {alert.date}
                                 </p>
                              </div>
                           </div>
                           <button className="text-earth-400 hover:text-earth-600">
                              <ChevronRight />
                           </button>
                        </div>
                        
                        <p className="text-earth-700 mb-4 text-sm leading-relaxed border-b border-black/5 pb-4">
                           {alert.desc}
                        </p>
                        
                        <div className="bg-white/60 p-4 rounded-xl">
                           <h4 className="text-xs font-bold uppercase tracking-wider text-earth-900 mb-2 flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-green-600" /> Recommended Action
                           </h4>
                           <p className="text-sm font-medium text-earth-800">
                              {alert.action}
                           </p>
                        </div>
                     </div>
                  ))}
               </div>
            ) : (
               <div className="bg-white rounded-3xl p-4 border border-earth-200 shadow-sm h-[600px] relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500">
                  {/* Placeholder Map Visual */}
                  <img 
                     src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop&q=80" 
                     className="w-full h-full object-cover rounded-2xl opacity-80"
                     alt="Risk Map"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent pointer-events-none"></div>
                  
                  {/* Map Overlays (Simulated) */}
                  <div className="absolute top-1/2 left-1/3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white animate-bounce flex items-center gap-1">
                     <Bug size={12} /> Pest Zone
                  </div>
                  <div className="absolute top-1/3 right-1/4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg border-2 border-white flex items-center gap-1">
                     <Droplets size={12} /> Fungal Risk
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 bg-white/95 p-6 rounded-2xl border border-earth-200 shadow-lg">
                     <h4 className="font-bold text-earth-900 mb-2">Regional Status: Central Province</h4>
                     <div className="flex items-center gap-2 text-sm text-earth-600 mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div> High Alert Level
                     </div>
                     <div className="w-full bg-earth-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-600 w-[85%] h-full"></div>
                     </div>
                     <div className="flex justify-between text-[10px] text-earth-400 mt-1 uppercase font-bold">
                        <span>Safe</span>
                        <span>Caution</span>
                        <span>Critical</span>
                     </div>
                  </div>
               </div>
            )}
         </div>

         {/* Sidebar: Report & Prevention */}
         <div className="space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-earth-200 shadow-sm text-center">
               <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
                  <AlertTriangle size={32} />
               </div>
               <h3 className="font-bold text-lg text-earth-900 mb-2">Spot a Threat?</h3>
               <p className="text-earth-500 text-sm mb-6">
                  Early detection saves crops. Report unusual symptoms or pests immediately to the network.
               </p>
               <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors shadow-md">
                  Submit Field Report
               </button>
            </div>

            <div className="bg-green-50 p-6 rounded-3xl border border-green-100">
               <h3 className="font-bold text-lg text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-green-600" /> Prevention Tips
               </h3>
               <ul className="space-y-4">
                  <li className="flex gap-3 items-start text-sm text-green-800">
                     <span className="font-bold text-green-600 mt-0.5">1.</span>
                     <span>Rotate crops to break pest life cycles (e.g., Maize → Beans).</span>
                  </li>
                  <li className="flex gap-3 items-start text-sm text-green-800">
                     <span className="font-bold text-green-600 mt-0.5">2.</span>
                     <span>Maintain field hygiene; remove infected plant debris promptly.</span>
                  </li>
                  <li className="flex gap-3 items-start text-sm text-green-800">
                     <span className="font-bold text-green-600 mt-0.5">3.</span>
                     <span>Use certified disease-free seeds from approved suppliers.</span>
                  </li>
               </ul>
            </div>

            <div className="p-6 rounded-3xl border border-red-100 bg-red-50/50">
               <h3 className="font-bold text-lg text-red-900 mb-4 flex items-center gap-2">
                  <XCircle size={20} className="text-red-500" /> Banned Inputs
               </h3>
               <p className="text-xs text-red-800 mb-3">
                  The following chemicals have been flagged for high toxicity levels this season:
               </p>
               <div className="flex flex-wrap gap-2">
                  <span className="bg-white text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-200">Carbofuran</span>
                  <span className="bg-white text-red-600 text-xs font-bold px-2 py-1 rounded border border-red-200">Paraquat</span>
               </div>
            </div>
         </div>

      </div>
    </div>
  );
};