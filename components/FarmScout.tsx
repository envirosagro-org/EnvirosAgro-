import React, { useState, useMemo } from 'react';
import { 
  Grid3X3, Droplets, Thermometer, Sun, Sprout, Wind, Info, Zap, 
  AlertCircle, Brain, X, Loader2, ArrowLeft, ChevronRight, Activity, 
  Satellite, Search, BarChart3, Database, ShieldCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { generateScoutReport, analyzeSatelliteScan } from '../services/gemini';
import { View } from '../types';

const FIELD_SIZE = 5; // 5x5 grid

interface TileData {
  id: string;
  moisture: number;
  ph: number;
  nitrogen: number;
  health: number;
}

interface FarmScoutProps {
  onNavigate?: (view: View) => void;
}

const FarmScout: React.FC<FarmScoutProps> = ({ onNavigate }) => {
  const [selectedTile, setSelectedTile] = useState<string | null>('tile-0-2');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScanningSatellite, setIsScanningSatellite] = useState(false);
  const [scoutReport, setScoutReport] = useState<string | null>(null);
  const [satelliteReport, setSatelliteReport] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSatelliteModal, setShowSatelliteModal] = useState(false);
  
  const fieldData = useMemo(() => {
    const data: Record<string, TileData> = {};
    for (let r = 0; r < FIELD_SIZE; r++) {
      for (let c = 0; c < FIELD_SIZE; c++) {
        const id = `tile-${r}-${c}`;
        data[id] = {
          id,
          moisture: id === 'tile-0-2' ? 66 : Math.floor(Math.random() * 40) + 30,
          ph: id === 'tile-0-2' ? 6.8 : parseFloat((Math.random() * 2 + 5.5).toFixed(1)),
          nitrogen: id === 'tile-0-2' ? 120 : Math.floor(Math.random() * 50) + 100,
          health: Math.floor(Math.random() * 10) + 90, // High health as per screenshot
        };
      }
    }
    return data;
  }, []);

  const activeData = selectedTile ? fieldData[selectedTile] : null;

  const mockTrendData = [
    { time: '00:00', val: 62 },
    { time: '04:00', val: 65 },
    { time: '08:00', val: 63 },
    { time: '12:00', val: 61 },
    { time: '16:00', val: 64 },
    { time: '20:00', val: 66 },
  ];

  const handleGenerateReport = async () => {
    if (!activeData) return;
    setIsGenerating(true);
    setShowReportModal(true);
    try {
        const report = await generateScoutReport(activeData);
        setScoutReport(report);
    } catch (err) {
        console.error(err);
        setScoutReport("Failed to generate report telemetry. Please check sensor connectivity.");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSatelliteScan = async () => {
    setIsScanningSatellite(true);
    setShowSatelliteModal(true);
    try {
        const report = await analyzeSatelliteScan("Field Block A-12");
        setSatelliteReport(report);
    } catch (err) {
        console.error(err);
        setSatelliteReport("Satellite downlink failed. Atmospheric interference or invalid API permissions.");
    } finally {
        setIsScanningSatellite(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 bg-earth-50 dark:bg-earth-950 min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-4 mb-8 border-b border-earth-200 dark:border-earth-800 pb-4">
        <button 
          onClick={() => onNavigate?.(View.HOME)}
          className="flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Home
        </button>
        <div className="h-4 w-px bg-earth-200 dark:bg-earth-800"></div>
        <span className="text-[10px] font-black text-agro-600 uppercase tracking-widest">
          Current: Farm Scout
        </span>
      </div>

      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-agro-900 dark:text-white flex items-center gap-3 mb-2">
          <Grid3X3 className="text-agro-600" size={32} /> AI Field Scout
        </h1>
        <p className="text-earth-500 dark:text-earth-400 font-medium">
          Live sensor telemetry visualization across your designated agricultural plots.
        </p>
      </div>

      {/* Main Grid View */}
      <div className="bg-white dark:bg-earth-900 p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 mb-8">
         <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-earth-800 dark:text-white">Field Block A-12</h3>
            <div className="flex items-center gap-2 text-[10px] font-bold text-agro-600 bg-agro-50 dark:bg-agro-900/30 px-3 py-1 rounded-full">
              <div className="w-1.5 h-1.5 bg-agro-500 rounded-full animate-pulse"></div> Sensors Online
            </div>
         </div>
         
         <div className="grid grid-cols-5 gap-3 md:gap-4 aspect-square max-w-lg mx-auto">
            {(Object.values(fieldData) as TileData[]).map((tile) => (
              <button
                key={tile.id}
                onClick={() => setSelectedTile(tile.id)}
                className={`relative rounded-xl transition-all ${
                  selectedTile === tile.id 
                  ? 'ring-4 ring-white dark:ring-earth-800 shadow-xl z-10 scale-105 outline outline-2 outline-agro-500' 
                  : 'hover:opacity-80'
                }`}
                style={{
                  backgroundColor: '#22c55e' // Matching screenshot tile green
                }}
              >
              </button>
            ))}
         </div>
         
         <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl">
               <div className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-1">Avg Moisture</div>
               <div className="font-bold text-blue-600 text-xl">54.2%</div>
            </div>
            <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl">
               <div className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-1">Avg Health</div>
               <div className="font-bold text-agro-600 text-xl">92.1%</div>
            </div>
            <div className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl">
               <div className="text-[10px] font-black text-earth-400 uppercase tracking-widest mb-1">Alerts</div>
               <div className="font-bold text-red-500 text-xl">2 Zones</div>
            </div>
         </div>
      </div>

      {/* Zone Details */}
      {activeData && (
        <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] shadow-sm border border-earth-100 dark:border-earth-800 mb-10 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-earth-800 dark:text-white flex items-center gap-3">
                <Info className="text-agro-600" size={24} /> Zone Detail: {activeData.id.replace('tile-', '')}
              </h3>
              <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg">
                <Brain size={20} />
              </div>
          </div>
          
          <div className="space-y-8">
             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl border border-blue-100 dark:border-blue-800 transition-colors group-hover:bg-blue-100">
                     <Droplets size={22}/>
                   </div>
                   <span className="font-bold text-earth-700 dark:text-earth-300">Soil Moisture</span>
                </div>
                <span className="font-black text-2xl text-earth-900 dark:text-white">{activeData.moisture}%</span>
             </div>

             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-green-50 dark:bg-agro-900/30 text-green-600 rounded-xl border border-green-100 dark:border-agro-800 transition-colors group-hover:bg-green-100">
                     <Sprout size={22}/>
                   </div>
                   <span className="font-bold text-earth-700 dark:text-earth-300">Nitrogen Level</span>
                </div>
                <span className="font-black text-2xl text-earth-900 dark:text-white">{activeData.nitrogen} ppm</span>
             </div>

             <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                   <div className="p-2.5 bg-amber-50 dark:bg-agro-900/30 text-amber-600 rounded-xl border border-amber-100 dark:border-agro-800 transition-colors group-hover:bg-amber-100">
                     <Sun size={22}/>
                   </div>
                   <span className="font-bold text-earth-700 dark:text-earth-300">Acidity (pH)</span>
                </div>
                <span className="font-black text-2xl text-earth-900 dark:text-white">{activeData.ph}</span>
             </div>

             <div className="pt-10 border-t border-earth-100 dark:border-earth-800 relative">
                <h4 className="text-[10px] font-black uppercase text-earth-400 mb-6 tracking-[0.2em]">24H MOISTURE TREND</h4>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={mockTrendData}>
                        <defs>
                          <linearGradient id="colorMoist" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="url(#colorMoist)" strokeWidth={3} dot={{r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff'}} />
                     </AreaChart>
                  </ResponsiveContainer>
                </div>
                {/* Visual Arrow Indicator from Screenshot */}
                <div className="absolute right-0 top-[60%] -translate-y-1/2">
                   <ChevronRight size={48} className="text-blue-200" strokeWidth={1} />
                </div>
             </div>

             <div className="bg-agro-50/50 dark:bg-agro-900/10 p-5 rounded-2xl border border-agro-100 dark:border-agro-800 flex items-start gap-4">
                <div className="mt-0.5"><Zap size={18} className="text-agro-600" /></div>
                <div>
                   <h4 className="text-xs font-black text-agro-900 dark:text-agro-400 uppercase tracking-widest mb-1">AI Quick Tip</h4>
                   <p className="text-xs text-earth-600 dark:text-earth-400 leading-relaxed font-medium">
                      Optimal conditions. No action required for this zone.
                   </p>
                </div>
             </div>
             
             <button 
                  onClick={handleGenerateReport}
                  className="w-full nature-gradient text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 transition-all"
              >
                  <Brain size={20} /> DETAILED SCOUT REPORT
              </button>
          </div>
        </div>
      )}

      {/* Satellite Sync Section */}
      <div className="bg-agro-950 text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <Satellite size={200} />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl font-serif font-bold mb-2">Satellite Sync</h3>
          <p className="text-agro-300 text-sm mb-10 font-medium">Last updated 4 mins ago via Sentinel-2</p>
          <button 
            onClick={handleSatelliteScan}
            disabled={isScanningSatellite}
            className="w-full bg-[#14532d] hover:bg-[#166534] text-agro-100 font-black py-5 rounded-2xl transition-all border border-white/5 text-[11px] uppercase tracking-[0.2em] shadow-inner active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
          >
            {isScanningSatellite ? <><Loader2 size={18} className="animate-spin" /> DOWNLINKING DATA...</> : 'REQUEST HIGH-RES SCAN'}
          </button>
        </div>
      </div>

      {/* Scout Report Modal */}
      {showReportModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-earth-100 dark:border-earth-800 animate-in zoom-in-95 duration-300">
                  <div className="bg-blue-900 p-8 text-white flex justify-between items-center">
                      <div className="flex items-center gap-4">
                          <div className="bg-white/10 p-3 rounded-2xl">
                             <Brain size={28} className="text-blue-300" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">AI Scout Intelligence</h3>
                            <p className="text-xs text-blue-200 font-bold uppercase tracking-widest">Plot {activeData?.id.replace('tile-', '')} Analysis</p>
                          </div>
                      </div>
                      <button onClick={() => { setShowReportModal(false); setScoutReport(null); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <X size={24} />
                      </button>
                  </div>
                  <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                      {isGenerating ? (
                          <div className="flex flex-col items-center justify-center py-20">
                              <Loader2 size={48} className="text-blue-600 animate-spin mb-6" />
                              <p className="text-earth-500 dark:text-earth-400 font-bold animate-pulse">Running precision analysis on plot telemetry...</p>
                          </div>
                      ) : (
                          <div className="prose prose-earth dark:prose-invert max-w-none">
                              <div className="text-earth-700 dark:text-earth-200 leading-relaxed whitespace-pre-wrap font-medium">
                                  {scoutReport}
                              </div>
                              <div className="mt-10 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800 flex items-center gap-4">
                                  <Zap size={24} className="text-amber-500" />
                                  <p className="text-xs text-earth-500 dark:text-earth-400 font-medium">This report is generated using real-time sensor data processed through EnvirosAgro's diagnostic neural network.</p>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}

      {/* Satellite Scan Modal */}
      {showSatelliteModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-earth-950/80 backdrop-blur-md animate-in fade-in duration-300">
              <div className="bg-white dark:bg-earth-900 rounded-[3rem] shadow-2xl w-full max-w-2xl overflow-hidden border border-earth-100 dark:border-earth-800 animate-in zoom-in-95 duration-300">
                  <div className="bg-agro-950 p-8 text-white flex justify-between items-center">
                      <div className="flex items-center gap-4">
                          <div className="bg-white/10 p-3 rounded-2xl">
                             <Satellite size={28} className="text-agro-400" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">Sentinel-Sync High-Res Scan</h3>
                            <p className="text-xs text-agro-300 font-bold uppercase tracking-widest">Orbital Spectrum Interpretation</p>
                          </div>
                      </div>
                      <button onClick={() => { setShowSatelliteModal(false); setSatelliteReport(null); }} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                          <X size={24} />
                      </button>
                  </div>
                  <div className="p-10 max-h-[60vh] overflow-y-auto custom-scrollbar">
                      {isScanningSatellite ? (
                          <div className="flex flex-col items-center justify-center py-20">
                              <Loader2 size={48} className="text-agro-500 animate-spin mb-6" />
                              <p className="text-earth-500 dark:text-earth-400 font-bold animate-pulse">Requesting uplink from Sentinel-2 array...</p>
                          </div>
                      ) : (
                          <div className="prose prose-earth dark:prose-invert max-w-none">
                              <div className="text-earth-700 dark:text-earth-200 leading-relaxed whitespace-pre-wrap font-medium">
                                  {satelliteReport}
                              </div>
                              <div className="mt-10 p-6 bg-agro-50 dark:bg-agro-900/30 rounded-2xl border border-agro-100 dark:border-agro-800 flex items-center gap-4">
                                  <Zap size={24} className="text-agro-600" />
                                  <p className="text-xs text-earth-500 dark:text-earth-400 font-medium">NDVI and thermal deltas processed via Sentinel-Sync AI core.</p>
                              </div>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};

export default FarmScout;