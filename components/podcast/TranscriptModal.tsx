import React from 'react';
import { X, FileText, CheckCircle2, Check, Copy, Download } from 'lucide-react';

interface TranscriptModalProps {
  currentEpisode: any;
  setShowTranscript: (show: boolean) => void;
  handleCopyTranscript: () => void;
  copied: boolean;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  currentEpisode,
  setShowTranscript,
  handleCopyTranscript,
  copied,
}) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-hidden">
      <div className="w-full max-w-3xl h-[80vh] bg-white dark:bg-earth-900 rounded-[4rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-earth-100 dark:border-earth-800 flex flex-col">
        <div className="bg-agro-900 p-10 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><FileText size={180} /></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
              <FileText size={24} className="text-agro-300" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold tracking-tight">Episode Transcript</h3>
              <p className="text-xs text-agro-300 font-black uppercase tracking-[0.3em] mt-1">{currentEpisode.title}</p>
            </div>
          </div>
          <button
            onClick={() => setShowTranscript(false)}
            className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all group"
          >
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/30 dark:bg-earth-950/20">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="prose prose-earth dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap font-sans text-earth-700 dark:text-earth-200 leading-relaxed text-lg">
                {currentEpisode.transcript || "Transcript for this session is being synthesized by the AI core. Please check back shortly."}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-white dark:bg-earth-900 border-t border-earth-100 dark:border-earth-800 flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-agro-600" />
            <p className="text-[10px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.3em]">Verified AI Speech-to-Text Mapping Active</p>
          </div>
          <div className="flex gap-4 w-full sm:w-auto">
            <button
              onClick={handleCopyTranscript}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-agro-600 text-white shadow-lg' : 'bg-earth-100 dark:bg-earth-800 text-earth-700 dark:text-earth-300 hover:bg-earth-200'}`}
            >
              {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Text</>}
            </button>
            <button
              onClick={() => alert("Simulation: Full transcript PDF generated for offline review.")}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-agro-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-agro-800 transition-all shadow-xl shadow-agro-900/20 active:scale-95"
            >
              <Download size={16} /> Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
