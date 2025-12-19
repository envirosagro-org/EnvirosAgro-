
import React, { useState, useMemo } from 'react';
import { Grid3X3, Droplets, Thermometer, Sun, Sprout, Wind, Info, Zap, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FIELD_SIZE = 5; // 5x5 grid

interface TileData {
  id: string;
  moisture: number;
  ph: number;
  nitrogen: number;
  health: number;
}

export const FarmScout: React.FC = () => {
  const [selectedTile, setSelectedTile] = useState<string | null>('tile-0-0');
  
  const fieldData = useMemo(() => {
    const data: Record<string, TileData> = {};
    for (let r = 0; r < FIELD_SIZE; r++) {
      for (let c = 0; c < FIELD_SIZE; c++) {
        const id = `tile-${r}-${c}`;
        data[id] = {
          id,
          moisture: Math.floor(Math.random() * 40) + 30, // 30-70%
          ph: parseFloat((Math.random() * 2 + 5.5).toFixed(1)), // 5.5-7.5
          nitrogen: Math.floor(Math.random() * 50) + 100, // 100-150 ppm
          health: Math.floor(Math.random() * 20) + 80, // 80-100%
        };
      }
    }
    return data;
  }, []);

  const activeData = selectedTile ? fieldData[selectedTile] : null;

  const mockTrendData = [
    { time: '00:00', val: 65 },
    { time: '04:00', val: 68 },
    { time: '08:00', val: 62 },
    { time: '12:00', val: 55 },
    { time: '16:00', val: 50 },
    { time: '20:00', val: 58 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-agro-900 dark:text-white flex items-center gap-3 mb-2">
          <Grid3X3 className="text-agro-600" /> AI Field Scout
        </h2>
        <p className="text-earth-600 dark:text-earth-400">Live sensor telemetry visualization across your designated agricultural plots.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Field Map */}
        <div className="lg:col-span-2 bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-earth-900 dark:text-white">Field Block A-12</h3>
              <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Sensors Online
              </div>
           </div>
           
           <div className="grid grid-cols-5 gap-4 aspect-square">
              {/* Added explicit cast to TileData[] to fix unknown type errors on tile properties */}
              {(Object.values(fieldData) as TileData[]).map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => setSelectedTile(tile.id)}
                  className={`relative rounded-xl border-2 transition-all group overflow-hidden ${
                    selectedTile === tile.id 
                    ? 'border-agro-500 ring-4 ring-agro-50 dark:ring-agro-900/20' 
                    : 'border-earth-100 dark:border-earth-800 hover:border-agro-200'
                  }`}
                  style={{
                    backgroundColor: `rgba(22, 163, 74, ${tile.health / 100})`
                  }}
                >
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-[10px] text-white font-bold">SCAN</span>
                  </div>
                  {tile.moisture < 40 && (
                    <AlertCircle className="absolute top-1 right-1 text-red-500" size={12} />
                  )}
                </button>
              ))}
           </div>
           
           <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-xl">
                 <div className="text-xs text-earth-500 mb-1">Avg Moisture</div>
                 <div className="font-bold text-blue-600">54.2%</div>
              </div>
              <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-xl">
                 <div className="text-xs text-earth-500 mb-1">Avg Health</div>
                 <div className="font-bold text-green-600">92.1%</div>
              </div>
              <div className="p-3 bg-earth-50 dark:bg-earth-800 rounded-xl">
                 <div className="text-xs text-earth-500 mb-1">Alerts</div>
                 <div className="font-bold text-red-600">2 Zones</div>
              </div>
           </div>
        </div>

        {/* Tile Details Sidebar */}
        <div className="space-y-6">
           {activeData ? (
             <div className="bg-white dark:bg-earth-900 p-8 rounded-3xl shadow-sm border border-earth-100 dark:border-earth-800 animate-in fade-in slide-in-from-right-4">
                <h3 className="font-bold text-earth-900 dark:text-white mb-6 flex items-center gap-2">
                   <Info className="text-agro-600" /> Zone Detail: {activeData.id.replace('tile-', '')}
                </h3>
                
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-lg"><Droplets size={20}/></div>
                         <span className="text-sm font-medium dark:text-earth-300">Soil Moisture</span>
                      </div>
                      <span className="font-bold text-lg dark:text-white">{activeData.moisture}%</span>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-green-50 dark:bg-agro-900/20 text-green-600 rounded-lg"><Sprout size={20}/></div>
                         <span className="text-sm font-medium dark:text-earth-300">Nitrogen Level</span>
                      </div>
                      <span className="font-bold text-lg dark:text-white">{activeData.nitrogen} ppm</span>
                   </div>

                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="p-2 bg-amber-50 dark:bg-agro-900/20 text-amber-600 rounded-lg"><Sun size={20}/></div>
                         <span className="text-sm font-medium dark:text-earth-300">Acidity (pH)</span>
                      </div>
                      <span className="font-bold text-lg dark:text-white">{activeData.ph}</span>
                   </div>

                   <div className="pt-6 border-t border-earth-100 dark:border-earth-800">
                      <h4 className="text-xs font-bold uppercase text-earth-400 mb-4 tracking-widest">24h Moisture Trend</h4>
                      <div className="h-24 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={mockTrendData}>
                              <defs>
                                <linearGradient id="colorMoist" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <Area type="monotone" dataKey="val" stroke="#3b82f6" fill="url(#colorMoist)" strokeWidth={2} />
                           </AreaChart>
                        </ResponsiveContainer>
                      </div>
                   </div>

                   <div className="bg-agro-50 dark:bg-agro-900/20 p-4 rounded-2xl border border-agro-100 dark:border-agro-800">
                      <h4 className="text-sm font-bold text-agro-900 dark:text-agro-400 flex items-center gap-2 mb-2">
                        <Zap size={16} /> AI Advice
                      </h4>
                      <p className="text-xs text-agro-800 dark:text-agro-200 leading-relaxed">
                        {activeData.moisture < 40 
                          ? "Moisture critical. Scheduled irrigation recommended for next 2 hours." 
                          : "Optimal conditions. No action required for this zone."}
                      </p>
                   </div>
                </div>
             </div>
           ) : (
             <div className="bg-earth-50 dark:bg-earth-900/50 p-12 rounded-3xl border border-dashed border-earth-200 dark:border-earth-800 text-center">
                <Info className="mx-auto text-earth-300 mb-4" size={48} />
                <p className="text-earth-500">Select a zone on the field map to view detailed sensor data.</p>
             </div>
           )}
           
           <div className="bg-agro-900 text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">Satellite Sync</h3>
                <p className="text-agro-100 text-xs mb-4">Last updated 4 mins ago via Sentinel-2</p>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-xl transition-all border border-white/10 text-sm">
                  Request High-Res Scan
                </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
