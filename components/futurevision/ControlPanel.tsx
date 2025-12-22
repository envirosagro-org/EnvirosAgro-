import React from 'react';
import { Terminal, Loader2, Zap, Layers, ShieldCheck } from 'lucide-react';

interface ControlPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isGenerating: boolean;
  handleGenerate: (e: React.FormEvent) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  prompt,
  setPrompt,
  isGenerating,
  handleGenerate,
}) => {
  return (
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
  );
};
