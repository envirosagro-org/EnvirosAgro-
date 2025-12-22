import React from 'react';
import { FileText, X, CheckCircle2, Check, Copy } from 'lucide-react';

interface TranscriptModalProps {
  activeSegment: any;
  setShowTranscript: (show: boolean) => void;
  handleCopyTranscript: () => void;
  copied: boolean;
}

export const TranscriptModal: React.FC<TranscriptModalProps> = ({
  activeSegment,
  setShowTranscript,
  handleCopyTranscript,
  copied,
}) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white dark:bg-earth-900 w-full max-w-2xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/10 flex flex-col animate-in zoom-in-95 h-[70vh]">
        <div className="bg-agro-900 p-8 text-white flex justify-between items-center shrink-0 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><FileText size={180} /></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
              <FileText size={24} className="text-agro-300" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold tracking-tight">Report Transcript</h3>
              <p className="text-xs text-agro-300 font-black uppercase tracking-[0.3em] mt-1">{activeSegment.title}</p>
            </div>
          </div>
          <button onClick={() => setShowTranscript(false)} className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
            <X size={28} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar bg-earth-50/20 dark:bg-earth-950/20">
          <div className="prose prose-earth dark:prose-invert max-w-none">
            <div className="whitespace-pre-wrap font-mono text-sm leading-loose text-earth-700 dark:text-earth-300">
              {activeSegment.transcript || "Establishing downlink to retrieve textual logs..."}
            </div>
          </div>
        </div>

        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 border-t border-earth-100 dark:border-earth-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-agro-600" />
            <p className="text-[10px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Verified AI Speech-to-Text Mapping</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleCopyTranscript}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${copied ? 'bg-agro-600 text-white' : 'bg-white dark:bg-earth-800 text-earth-600 dark:text-earth-400 border border-earth-200 dark:border-earth-700'}`}
            >
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy Text</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
