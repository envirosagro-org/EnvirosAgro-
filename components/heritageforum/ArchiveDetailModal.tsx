import React from 'react';
import { FileCheck, X, Database, Quote, Activity, Feather, Terminal, Globe, Calendar, FileDown, Loader2, ShieldAlert } from 'lucide-react';

interface ArchiveDetailModalProps {
  selectedArchiveRecord: any;
  setSelectedArchiveRecord: (record: any) => void;
  handleDownloadManual: (fileName: string) => void;
  isDownloading: string | null;
}

export const ArchiveDetailModal: React.FC<ArchiveDetailModalProps> = ({
  selectedArchiveRecord,
  setSelectedArchiveRecord,
  handleDownloadManual,
  isDownloading,
}) => {
  return (
    <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 bg-earth-950/95 backdrop-blur-3xl animate-in fade-in duration-300 overflow-y-auto">
      <div className="bg-[#fdfcf9] dark:bg-earth-950 w-full max-w-4xl rounded-[4rem] shadow-2xl overflow-hidden border-4 border-rose-900/10 flex flex-col my-8 animate-in zoom-in-95">
        <div className="bg-[#3d1a1a] p-10 text-white flex justify-between items-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12"><FileText size={200} /></div>
          <div className="relative z-10 flex items-center gap-5">
            <div className="p-4 bg-white/10 rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
              <FileCheck size={28} className="text-rose-400" />
            </div>
            <div>
              <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-2 inline-block">Historical Record Node</span>
              <h3 className="text-3xl font-serif font-bold tracking-tight">{selectedArchiveRecord.title}</h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedArchiveRecord(null)}
            className="relative z-10 p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90 active:scale-90"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-12 md:p-16">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 space-y-12">
              <section>
                <h4 className="text-xs font-black text-rose-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Database size={16} /> Record Transcription
                </h4>
                <div className="bg-white dark:bg-earth-900 p-8 rounded-[2.5rem] border border-earth-100 dark:border-earth-800 shadow-inner relative group">
                  <Quote size={48} className="absolute top-6 right-8 text-earth-100 dark:text-earth-800 pointer-events-none" />
                  <p className="text-xl text-earth-700 dark:text-earth-300 leading-relaxed font-medium italic relative z-10">
                    "{selectedArchiveRecord.fullContent}"
                  </p>
                </div>
              </section>

              <div className="bg-earth-50 dark:bg-earth-900/50 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800">
                <h4 className="text-xs font-black text-rose-600 uppercase tracking-[0.3em] mb-6">Technical Specifications</h4>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { label: "Scan Quality", val: selectedArchiveRecord.meta.quality, icon: <Activity size={16} /> },
                    { label: "Original Medium", val: selectedArchiveRecord.meta.medium, icon: <Feather size={16} /> },
                    { label: "SHA-256 Hash", val: selectedArchiveRecord.meta.hash, icon: <Terminal size={16} />, mono: true },
                    { label: "Asset Size", val: selectedArchiveRecord.size, icon: <BoxIcon size={16} /> }
                  ].map((spec, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="p-2.5 bg-white dark:bg-earth-800 rounded-xl shadow-sm text-earth-400 shrink-0">{spec.icon}</div>
                      <div>
                        <p className="text-[10px] font-black text-earth-400 uppercase tracking-widest leading-none mb-1.5">{spec.label}</p>
                        <p className={`text-sm font-bold text-earth-800 dark:text-earth-200 ${spec.mono ? 'font-mono text-xs opacity-60' : ''}`}>{spec.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="bg-white dark:bg-earth-900 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-sm">
                <h4 className="text-[10px] font-black text-earth-400 uppercase tracking-[0.4em] mb-8 border-b border-earth-100 dark:border-earth-800 pb-4">Provenance Data</h4>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Region of Origin</p>
                    <p className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-lg uppercase tracking-tight">
                      <Globe size={18} className="text-blue-500" /> {selectedArchiveRecord.region}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-earth-400 uppercase mb-2">Chronology</p>
                    <p className="font-bold text-earth-900 dark:text-white flex items-center gap-2 text-lg">
                      <Calendar size={18} className="text-agro-600" /> {selectedArchiveRecord.date}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-earth-400 uppercase mb-4">Metadata Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedArchiveRecord.tags.map((t: string) => (
                        <span key={t} className="px-3 py-1 bg-earth-50 dark:bg-earth-800 text-[10px] font-black uppercase text-earth-500 rounded-lg">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownloadManual(selectedArchiveRecord.title)}
                disabled={!!isDownloading}
                className="w-full bg-rose-900 text-white font-black py-5 rounded-[2rem] shadow-xl shadow-rose-900/20 hover:scale-[1.01] active:scale-95 transition-all text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isDownloading === selectedArchiveRecord.title ? <Loader2 size={18} className="animate-spin" /> : <><FileDown size={20} /> Access Full Scan</>}
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-center gap-3 shrink-0">
          <ShieldAlert size={18} className="text-rose-600" />
          <p className="text-[9px] text-earth-500 dark:text-earth-400 font-black uppercase tracking-[0.4em]">Verified Historical Data Node • No Unauthorized Modifications</p>
        </div>
      </div>
    </div>
  );
};

function BoxIcon({ size }: { size: number }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-box"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>;
}
