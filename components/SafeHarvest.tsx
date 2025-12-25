import React, { useState, useRef } from 'react';
import { 
  ShieldAlert, Map, AlertTriangle, Bug, Droplets, Thermometer, 
  ChevronRight, Bell, Phone, CheckCircle2, X, Globe, ShieldCheck, 
  MapPin, Zap, Clock, ListChecks, Share2, ArrowLeft, Microscope, Search
} from 'lucide-react';
import { View } from '../types';
import { SafeHarvestHeader } from './safeharvest/SafeHarvestHeader';
import { ActiveAlerts } from './safeharvest/ActiveAlerts';
import { HealthStats } from './safeharvest/HealthStats';

const ALERTS = [
  {
    id: 1,
    title: "Fall Armyworm Outbreak",
    region: "Global Monitoring Zones",
    level: "Critical",
    type: "Pest",
    date: "2 hours ago",
    desc: "Global monitoring systems report widespread Fall Armyworm activity. Immediate international collaboration and surveillance are recommended.",
    action: "Implement integrated pest management (IPM) strategies, including biological controls and sustainable practices.",
    icon: <Bug size={24} />,
    color: "bg-red-50 border-red-200 text-red-800",
    fullReport: "Satellite telemetry from Sentinel-Sync indicates a 40% increase in larval canopy damage across the Central cluster. Weather conditions (humid/warm) are currently accelerating the life cycle. Failure to treat within 48 hours could result in a 60% yield loss for late-stage crops.",
    coordinates: "0.45S, 36.9E",
    protocol: ["Field Scouting", "Pheromone Trap Setup", "Biological Agent Deployment"]
  },
  {
    id: 2,
    title: "Coffee Berry Disease (CBD)",
    region: "Global Coffee Belts",
    level: "High",
    type: "Fungal",
    date: "Today, 08:00 AM",
    desc: "Reports indicate increased Coffee Berry Disease incidence in high-altitude coffee-growing regions worldwide. Proactive measures are crucial.",
    action: "Apply preventative fungicides and enhance cultural practices to mitigate spread.",
    icon: <Droplets size={24} />,
    color: "bg-orange-50 border-orange-200 text-orange-800",
    fullReport: "In-situ moisture sensors (TA Thrust) are reporting 90% leaf wetness for sustained 6-hour intervals. This creates the optimal window for fungal germination. Farmers in altitudes above 1,600m are at maximum risk. Precision pruning is the first line of defense to increase airflow.",
    coordinates: "0.58S, 37.1E",
    protocol: ["Canopy Pruning", "Humidity Level Log", "Fungicide Rotation"]
  },
  {
    id: 3,
    title: "Heat Stress Warning",
    region: "Vulnerable Global Agricultural Regions",
    level: "Moderate",
    type: "Weather",
    date: "Yesterday",
    desc: "Rising global temperatures are increasing heat stress risks in vulnerable agricultural areas. Adaptive management is essential.",
    action: "Ensure adequate water supply and provide shade for crops and livestock.",
    icon: <Thermometer size={24} />,
    color: "bg-yellow-50 border-yellow-200 text-yellow-800",
    fullReport: "Regional m(t) indices predict a localized heat dome over the semi-arid pastures for the next 72 hours. Evapotranspiration rates are high. Soil moisture In(val) is dropping to critical levels (12%). Strategic water reserves must be managed for livestock priority.",
    coordinates: "1.12S, 38.2E",
    protocol: ["Livestock Shading", "Hydration Schedule", "Mulching Exposed Soil"]
  }
];

interface SafeHarvestProps {
  onNavigate?: (view: View) => void;
}

export const SafeHarvest: React.FC<SafeHarvestProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'ALERTS' | 'MAP'>('ALERTS');
  const [selectedAlert, setSelectedAlert] = useState<typeof ALERTS[0] | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleViewAlert = (alert: typeof ALERTS[0]) => {
    setIsVerifying(true);
    setTimeout(() => {
        setIsVerifying(false);
        setSelectedAlert(alert);
    }, 1200);
  };

  const renderAlertDetail = (alert: typeof ALERTS[0]) => (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
        <button 
            onClick={() => setSelectedAlert(null)}
            className="mb-6 flex items-center gap-2 text-earth-500 hover:text-red-600 font-black text-[9px] uppercase tracking-[0.2em] transition-all group"
        >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Feed
        </button>

        <div className="bg-white dark:bg-earth-900 rounded-[2rem] shadow-xl border border-earth-100 dark:border-earth-800 overflow-hidden mb-10">
            <div className={`p-8 ${alert.color.split(' ')[0]} dark:bg-red-950/20 border-b border-earth-100 dark:border-earth-800 relative`}>
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    {React.cloneElement(alert.icon as React.ReactElement<any>, { size: 140 })}
                </div>
                
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-white dark:bg-earth-800 rounded-2xl shadow-lg text-red-600">
                            {alert.icon}
                        </div>
                        <div>
                            <span className="bg-red-600 text-white px-2.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest mb-2 inline-block">Active {alert.type} Threat</span>
                            <h2 className="text-3xl font-serif font-bold text-earth-900 dark:text-white leading-tight">{alert.title}</h2>
                        </div>
                    </div>
                    <div className="flex flex-col md:items-end text-[10px] font-bold text-earth-500">
                        <span className="flex items-center gap-2 uppercase tracking-widest"><MapPin size={14} className="text-red-500" /> {alert.region}</span>
                        <span className="flex items-center gap-2 uppercase tracking-widest mt-1"><Clock size={14} /> {alert.date}</span>
                    </div>
                </div>
            </div>

            <div className="p-8 md:p-12">
                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7">
                        <section className="mb-10">
                            <h4 className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] mb-4">Diagnostic Intelligence</h4>
                            <p className="text-lg text-earth-700 dark:text-earth-300 leading-relaxed font-medium">
                                {alert.fullReport}
                            </p>
                        </section>

                        <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-2xl border border-earth-100 dark:border-earth-700">
                            <h4 className="text-[9px] font-black text-red-600 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                                <ListChecks size={16} /> Emergency Response Protocol
                            </h4>
                            <div className="space-y-3">
                                {alert.protocol.map((step, i) => (
                                    <div key={i} className="flex items-center gap-3 bg-white dark:bg-earth-900 p-3 rounded-xl border border-earth-100 dark:border-earth-800 shadow-sm">
                                        <div className="w-6 h-6 bg-red-100 dark:bg-red-900/30 text-red-600 rounded flex items-center justify-center font-black text-[10px]">{i+1}</div>
                                        <span className="text-sm font-bold text-earth-800 dark:text-earth-200">{step}</span>
                                        <CheckCircle2 size={16} className="ml-auto text-earth-200" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent"></div>
                            <div className="relative z-10">
                                <h4 className="text-[9px] font-black text-red-400 uppercase tracking-[0.3em] mb-4">Target Vector Coordinates</h4>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-6 flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <Globe size={18} className="text-red-400" />
                                        <span className="font-mono text-lg tracking-widest">{alert.coordinates}</span>
                                    </div>
                                </div>
                                <div className="aspect-video rounded-xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
                                    <MapPin size={32} className="text-red-600 animate-bounce relative z-10" />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-lg text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98]">
                                <Zap size={18} /> Specialized Response
                            </button>
                            <button className="w-full bg-white dark:bg-earth-800 border-2 border-red-100 dark:border-red-900/50 text-red-700 dark:text-red-400 font-black py-4 rounded-xl transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-[0.98]">
                                <Share2 size={18} /> Broadcast Neighbors
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 relative">
      {isVerifying && (
          <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-xl animate-in fade-in duration-300">
              <div className="relative">
                  <div className="w-24 h-24 rounded-full border-[6px] border-red-500/20 border-t-red-500 animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                      <ShieldAlert size={36} className="text-red-500 animate-pulse" />
                  </div>
              </div>
              <h4 className="text-white font-serif text-2xl font-bold mt-8 tracking-tight">Syncing Threat Node</h4>
          </div>
      )}

      {selectedAlert ? renderAlertDetail(selectedAlert) : (
        <>
            <SafeHarvestHeader onSmsClick={() => {}} onHotlineClick={() => {}} />

            <div className="flex gap-2 mb-8 border-b border-earth-200 dark:border-earth-800 pb-1 overflow-x-auto no-scrollbar">
                <button 
                    onClick={() => setActiveTab('ALERTS')}
                    className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-t-xl transition-all flex items-center gap-2 relative top-[1px] whitespace-nowrap ${activeTab === 'ALERTS' ? 'bg-white dark:bg-earth-900 text-red-700 dark:text-red-400 border-x border-t border-earth-200 dark:border-earth-800 shadow-sm' : 'text-earth-400 hover:text-red-600'}`}
                >
                    <AlertTriangle size={16} /> Active Alerts <span className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 px-1.5 py-0.5 rounded-full text-[8px] font-black">{ALERTS.length}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('MAP')}
                    className={`px-6 py-3 font-black text-[10px] uppercase tracking-widest rounded-t-xl transition-all flex items-center gap-2 relative top-[1px] whitespace-nowrap ${activeTab === 'MAP' ? 'bg-white dark:bg-earth-900 text-red-700 dark:text-red-400 border-x border-t border-earth-200 dark:border-earth-800 shadow-sm' : 'text-earth-400 hover:text-red-600'}`}
                >
                    <Map size={16} /> Risk Telemetry
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    {activeTab === 'ALERTS' ? (
                        <ActiveAlerts alerts={ALERTS} onViewAlert={handleViewAlert} />
                    ) : (
                        <div className="bg-white dark:bg-earth-900 rounded-[2rem] p-4 border border-earth-100 dark:border-earth-800 shadow-sm h-[500px] relative overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200" className="w-full h-full object-cover rounded-2xl opacity-90" alt="Map" />
                            <div className="absolute top-1/2 left-1/3 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-xl border-2 border-white animate-bounce">Critical Zone</div>
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <HealthStats />

                    <div className="bg-white dark:bg-earth-900 p-8 rounded-[2rem] border border-earth-100 dark:border-earth-800 shadow-sm text-center group">
                        <div className="w-16 h-16 bg-red-50 dark:bg-red-950/30 rounded-2xl flex items-center justify-center mx-auto mb-6 text-red-600 shadow-inner group-hover:scale-105 transition-transform duration-500">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="font-bold text-xl text-earth-900 dark:text-white mb-2">Spot a Threat?</h3>
                        <p className="text-earth-500 dark:text-earth-400 text-xs mb-8 leading-relaxed font-medium">
                            Early detection is key. Report unusual biological activity now.
                        </p>
                        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-3.5 rounded-xl transition-all shadow-md text-[9px] uppercase tracking-widest">
                            Submit Field Report
                        </button>
                    </div>

                    <div className="bg-agro-950 p-8 rounded-[2rem] text-white shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-5 transition-transform duration-1000 group-hover:rotate-12"><ShieldCheck size={120} /></div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2 relative z-10"><ShieldCheck size={20} className="text-agro-400" /> Protection</h3>
                        <p className="text-agro-200 text-xs mb-6 leading-relaxed relative z-10">All nodes are synchronized with global biological defense protocols.</p>
                        <button onClick={() => onNavigate?.(View.SUSTAINABILITY_FRAMEWORK)} className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black py-3 rounded-xl text-[8px] uppercase tracking-widest relative z-10">Learn More</button>
                    </div>
                </div>
            </div>
        </>
      )}
    </div>
  );
};
