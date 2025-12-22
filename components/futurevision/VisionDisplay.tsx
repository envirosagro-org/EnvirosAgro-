import React from 'react';
import { Activity, Download, Share2, Zap, Globe } from 'lucide-react';

interface VisionDisplayProps {
  isGenerating: boolean;
  generatedImage: string | null;
  loadingStep: number;
  steps: string[];
  prompt: string;
}

export const VisionDisplay: React.FC<VisionDisplayProps> = ({
  isGenerating,
  generatedImage,
  loadingStep,
  steps,
  prompt,
}) => {
  return (
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
                <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all shadow-xl"><Download size={24} /></button>
                <button className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-white border border-white/10 hover:bg-white/20 transition-all shadow-xl"><Share2 size={24} /></button>
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
  );
};
