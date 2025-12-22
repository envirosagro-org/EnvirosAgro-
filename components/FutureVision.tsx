
import React, { useState } from 'react';
import { 
  Sparkles, Zap, Camera, Loader2, Download, Share2, ArrowRight,
  ShieldCheck, Globe, Activity, Terminal, X, RefreshCw, Layers
} from 'lucide-react';
import { generateFarmVision } from '../services/gemini';

export const FutureVision: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const steps = [
    "Uplink Established: AI Core Active",
    "Calibrating m(t) Projections...",
    "Synthesizing Regional Biomass Deltas...",
    "Rendering Optimized Future State..."
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setGeneratedImage(null);
    setLoadingStep(0);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);

    try {
      const img = await generateFarmVision(prompt);
      setGeneratedImage(img);
    } catch (err) {
      console.error(err);
    } finally {
      clearInterval(stepInterval);
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in duration-700">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 text-[10px] font-black uppercase tracking-[0.5em] mb-8 animate-pulse">
          <Sparkles size={16} fill="currentColor" /> Predictive Vision Lab
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-black text-agro-900 dark:text-white tracking-tighter mb-6">Future <span className="text-purple-600 italic">Simulations</span></h2>
        <p className="text-xl text-earth-500 dark:text-earth-400 max-w-2xl mx-auto font-medium">
          Visualize your localized $m(t)$ optimized future. Describe your ideal sustainable ecosystem and let our neural network render the outcome.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12 items-start">
        {/* Control Panel */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white dark:bg-earth-900 p-10 rounded-[3rem] shadow-xl border border-earth-100 dark:border-earth-800">
              <h3 className="text-xl font-bold text-earth-900 dark:text-white mb-8 flex items-center gap-3">
                 <Terminal className="text-purple-500" size={24} /> Vision Parameters
              </h3>
              <form onSubmit={handleGenerate} className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-earth-400 tracking-widest px-1">Describe Your Future State</label>
                    <textarea 
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="e.g. A vertical farm integrated with traditional coffee forests, utilizing solar energy and atmospheric water harvesters..."
                      className="w-full bg-earth-50 dark:bg-earth-800 border-2 border-transparent focus:border-purple-500 rounded-[2rem] px-6 py-5 text-sm font-medium transition-all outline-none min-h-[160px] resize-none dark:text-white"
                      disabled={isGenerating}
                    />
                 </div>
                 <button 
                   type="submit"
                   disabled={!prompt.trim() || isGenerating}
                   className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-5 rounded-2xl text-xs uppercase tracking-[0.3em] shadow-xl shadow-purple-600/20 transition-all flex items-center justify-center gap-4 active:scale-95 disabled:opacity-50"
                 >
                   {isGenerating ? <Loader2 className="animate-spin" /> : <><Zap size={20} /> Initialize Render</>}
                 </button>
              </form>
           </div>

           <div className="bg-agro-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform duration-1000"><Layers size={140} /></div>
              <h4 className="text-[10px] font-black text-agro-400 uppercase tracking-[0.4em] mb-4">Resilience Calibration</h4>
              <p className="text-sm font-medium leading-relaxed mb-6 opacity-80">
                Generated visions are based on active Environmental and Technical thrust variables synced from the global database.
              </p>
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-agro-300 text-[10px] font-black uppercase tracking-widest w-fit">
                 <ShieldCheck size={14} /> m(t) Verified
              </div>
           </div>
        </div>

        {/* Vision Display Area */}
        <div className="lg:col-span-8">
            <div className="bg-slate-900 rounded-[4rem] aspect-video flex flex-col items-center justify-center relative overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] border-8 border-slate-800 ring-1 ring-white/10 group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid.png')] opacity-[0.05] pointer-events-none"></div>
                
                {isGenerating ? (
                   <div className="text-center z-10 animate-in zoom-in duration-500">
                      <div className="relative mb-12">
                         <div className="w-32 h-32 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin"></div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <Activity size={40} className="text-purple-400 animate-pulse" />
                         </div>
                      </div>
                      <h4 className="text-white font-serif text-3xl font-bold mb-4 tracking-tight">{steps[loadingStep]}</h4>
                      <p className="text-purple-400 font-mono text-[10px] uppercase tracking-[0.5em] animate-pulse">Establishing Neural Synapse...</p>
                   </div>
                ) : generatedImage ? (
                   <div className="w-full h-full relative animate-in fade-in duration-1000">
                      <img src={generatedImage} className="w-full h-full object-cover" alt="Future Vision" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0">
                         <div>
                            <span className="bg-purple-600 text-white px-4 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-2 inline-block">Vision Node Render</span>
                            <h4 className="text-white font-serif text-3xl font-bold">{prompt.substring(0, 40)}...</h4>
                         </div>
                         <div className="flex gap-3">
                            <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all shadow-xl"><Download size={24}/></button>
                            <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all shadow-xl"><Share2 size={24}/></button>
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="text-center opacity-40 group-hover:opacity-60 transition-opacity">
                      <div className="w-40 h-40 bg-white/5 rounded-[4rem] flex items-center justify-center mx-auto mb-8 border border-white/5">
                        <Zap size={72} className="text-slate-600" />
                      </div>
                      <p className="text-slate-500 font-mono text-sm uppercase tracking-[0.6em] font-black">LENS_OFFLINE</p>
                      <p className="text-slate-600 text-xs mt-4">Input parameters to initialize futuristic rendering</p>
                   </div>
                )}
            </div>

            <div className="mt-8 flex justify-between items-center px-6">
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-earth-400">
                  <Globe size={14} className="text-blue-500" /> Source: Global Intelligence Ingest
               </div>
               <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-earth-400">
                  <Activity size={14} className="text-agro-500" /> Sync: Nominal
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};
