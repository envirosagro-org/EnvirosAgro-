import React, { useState } from 'react';
import { 
  Heart, Zap, ShieldCheck, Search, Plus, 
  Scale, Calculator, ArrowRight, Loader2,
  CheckCircle2, Info, Activity, Flame, Droplets,
  ArrowLeft, Download, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_FOODS = [
    { id: 'f1', name: 'Heirloom Spinach', source: 'Sector Alpha', nutrientDensity: 94, vitamins: ['A', 'C', 'K'], minerals: ['Iron', 'Magnesium'] },
    { id: 'f2', name: 'Regenerative Beef', source: 'Rift Valley Hub', nutrientDensity: 88, vitamins: ['B12', 'D'], minerals: ['Zinc', 'Selenium'] },
    { id: 'f3', name: 'Micro-biome Honey', source: 'Forest Node', nutrientDensity: 96, vitamins: ['B6'], minerals: ['Potassium'] }
];

export const NutrientTracker: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [log, setLog] = useState<any[]>([]);

  const filteredFoods = MOCK_FOODS.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAddLog = (food: any) => {
    setIsCalculating(true);
    setTimeout(() => {
        setLog(prev => [{ ...food, timestamp: new Date() }, ...prev]);
        setIsCalculating(false);
        setSelectedFood(null);
    }, 1500);
  };

  const totalDensity = log.length > 0 
    ? (log.reduce((acc, curr) => acc + curr.nutrientDensity, 0) / log.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-10">
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Search & Entry Section */}
        <div className="lg:col-span-7 space-y-8">
           <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5 -rotate-12"><Heart size={200} /></div>
                <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-3">
                    <Search className="text-rose-500" /> Catalog Lookup
                </h3>
                
                <div className="relative group mb-10">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-earth-300 group-focus-within:text-rose-500 transition-colors" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search density-verified produce..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-earth-50 dark:bg-earth-800 border border-earth-100 dark:border-earth-700 rounded-2xl pl-16 pr-6 py-5 text-base font-bold focus:outline-none focus:ring-8 focus:ring-rose-500/5 transition-all dark:text-white" 
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {filteredFoods.map(food => (
                        <button 
                            key={food.id}
                            onClick={() => setSelectedFood(food)}
                            className={`p-6 rounded-2xl border-2 transition-all text-left group ${selectedFood?.id === food.id ? 'bg-rose-50 border-rose-500 dark:bg-rose-900/30' : 'bg-earth-50 dark:bg-earth-800 border-transparent hover:border-earth-200'}`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[10px] font-black uppercase text-rose-600 dark:text-rose-400 tracking-widest">{food.source}</span>
                                <div className="text-right">
                                    <span className="text-lg font-black text-earth-900 dark:text-white block leading-none">{food.nutrientDensity}%</span>
                                    <span className="text-[8px] font-bold text-earth-400 uppercase tracking-tighter">Density</span>
                                </div>
                            </div>
                            <h4 className="font-bold text-earth-900 dark:text-white mb-2">{food.name}</h4>
                            <div className="flex gap-1">
                                {food.vitamins.map((v: string) => <span key={v} className="w-5 h-5 rounded-md bg-white dark:bg-earth-700 flex items-center justify-center text-[9px] font-black text-earth-400 group-hover:text-rose-500 transition-colors">{v}</span>)}
                            </div>
                        </button>
                    ))}
                </div>
           </div>

           <AnimatePresence>
            {selectedFood && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-rose-600 p-8 rounded-[3rem] text-white shadow-xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><Zap size={160} /></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-serif font-black">Final Verification</h3>
                            <button onClick={() => setSelectedFood(null)}><X size={24} /></button>
                        </div>
                        <p className="text-rose-100 font-medium mb-10 leading-relaxed max-w-md">
                            Confirm ingestion of **{selectedFood.name}**. This will recalibrate your personal health resilience score based on its actual biological integrity.
                        </p>
                        <button 
                            onClick={() => handleAddLog(selectedFood)}
                            disabled={isCalculating}
                            className="w-full bg-white text-rose-600 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-rose-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {isCalculating ? <><Loader2 className="animate-spin" /> SYNCHRONIZING...</> : <><Plus size={18} /> Confirm Integrity Log</>}
                        </button>
                    </div>
                </motion.div>
            )}
           </AnimatePresence>
        </div>

        {/* Resilience Analytics Section */}
        <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-sm font-black uppercase tracking-widest text-earth-400">Biological Resilience</h3>
                   <div className="p-3 bg-rose-50 dark:bg-rose-900/30 text-rose-600 rounded-xl">
                      <Activity size={20} />
                   </div>
                </div>

                <div className="text-center mb-12">
                   <div className="inline-flex flex-col items-center justify-center w-40 h-40 rounded-full border-8 border-rose-500 shadow-glow-rose relative">
                      <span className="text-5xl font-black text-earth-900 dark:text-white leading-none">{totalDensity}</span>
                      <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest mt-2">Score</span>
                      <div className="absolute -bottom-4 bg-white dark:bg-earth-800 px-4 py-1 rounded-full border border-earth-100 shadow-sm text-[9px] font-black text-agro-600 uppercase tracking-widest">v4.2 Calibrated</div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase text-earth-400 tracking-widest">Verification Tier</span>
                      <span className="text-xs font-bold text-earth-900 dark:text-white">Gold Standard (SA-Verified)</span>
                   </div>
                   <div className="h-1.5 w-full bg-earth-100 dark:bg-earth-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 w-[78%] shadow-[0_0_10px_#f43f5e]"></div>
                   </div>
                   <p className="text-[10px] text-earth-500 dark:text-earth-400 font-medium leading-relaxed italic text-center">
                    "Your biological integrity score is 12% above the regional average for Sector Alpha."
                   </p>
                </div>
            </div>

            <div className="bg-white dark:bg-earth-900 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-sm overflow-hidden flex-1">
                <div className="p-6 border-b border-earth-50 dark:border-earth-800 bg-earth-50/50 dark:bg-earth-950/30">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-earth-400">Transmission History</h4>
                </div>
                <div className="p-6 space-y-4 max-h-[300px] overflow-y-auto ea-scroll-area">
                    {log.length > 0 ? log.map((entry, i) => ( entry && entry.name && (
                        <div key={i} className="flex items-center justify-between py-4 border-b border-earth-50 dark:border-earth-800 last:border-0 animate-in slide-in-from-right-4 duration-500">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-rose-50 dark:bg-rose-900/20 text-rose-500 rounded-xl flex items-center justify-center">
                                 <CheckCircle2 size={20} />
                              </div>
                              <div>
                                 <h5 className="font-bold text-sm text-earth-900 dark:text-white">{entry.name}</h5>
                                 <p className="text-[9px] text-earth-400 font-medium uppercase tracking-widest">{entry.timestamp.toLocaleTimeString()}</p>
                              </div>
                           </div>
                           <span className="text-sm font-black text-rose-600">+{entry.nutrientDensity}</span>
                        </div>
                    ))) : (
                        <div className="py-20 text-center text-earth-300">
                           <Calculator size={40} className="mx-auto mb-4 opacity-20" />
                           <p className="text-[10px] font-black uppercase tracking-widest">No Integrity Data Logged</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
