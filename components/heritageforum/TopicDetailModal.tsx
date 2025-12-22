import React from 'react';
import { X, Info, MessageCircle, FileText, Download, Star, Zap, Plus, ChevronRight, ShieldCheck, Terminal, Loader2 } from 'lucide-react';

interface TopicDetailModalProps {
  activeTopic: any;
  setActiveTopic: (topic: any) => void;
  topicView: 'OVERVIEW' | 'THREADS' | 'DOCS' | 'DOWNLOADS';
  setTopicView: (view: 'OVERVIEW' | 'THREADS' | 'DOCS' | 'DOWNLOADS') => void;
  mockThreads: any[];
  handleDownloadManual: (fileName: string) => void;
  isDownloading: string | null;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({
  activeTopic,
  setActiveTopic,
  topicView,
  setTopicView,
  mockThreads,
  handleDownloadManual,
  isDownloading,
}) => {
  return (
    <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-earth-950/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="bg-white dark:bg-earth-900 w-full max-w-3xl rounded-[3.5rem] shadow-2xl overflow-hidden border-2 border-earth-100 dark:border-earth-800 flex flex-col animate-in zoom-in-95">
        <div className={`p-12 ${activeTopic.color} dark:bg-rose-950/20 relative overflow-hidden shrink-0 transition-all duration-500 ${topicView !== 'OVERVIEW' ? 'py-8' : 'py-12'}`}>
          <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">{React.cloneElement(activeTopic.icon as React.ReactElement<any>, { size: 200 })}</div>
          <button onClick={() => setActiveTopic(null)} className="absolute top-8 right-8 bg-white/40 hover:bg-white text-earth-900 p-2 rounded-full transition-all"><X size={24} /></button>

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className={`bg-white dark:bg-earth-800 rounded-[2rem] shadow-xl transition-all duration-500 ${topicView !== 'OVERVIEW' ? 'p-3 mb-2 scale-75' : 'p-6 mb-6'}`}>
              {React.cloneElement(activeTopic.icon as React.ReactElement<any>, { size: topicView !== 'OVERVIEW' ? 32 : 48 })}
            </div>
            <h3 className={`font-serif font-bold text-earth-900 dark:text-white leading-tight transition-all duration-500 ${topicView !== 'OVERVIEW' ? 'text-2xl' : 'text-4xl mb-2'}`}>{activeTopic.title}</h3>
            {topicView === 'OVERVIEW' && <p className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-500 mb-6">Network Domain Node</p>}
          </div>
        </div>

        {/* Topic Tab Switcher */}
        <div className="flex px-12 border-b border-earth-100 dark:border-earth-800 bg-white dark:bg-earth-900">
          {[
            { id: 'OVERVIEW', label: 'Overview', icon: <Info size={14} /> },
            { id: 'THREADS', label: 'Threads', icon: <MessageCircle size={14} /> },
            { id: 'DOCS', label: 'Documentation', icon: <FileText size={14} /> },
            { id: 'DOWNLOADS', label: 'Downloads', icon: <Download size={14} /> }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTopicView(t.id as any)}
              className={`px-5 py-4 text-[10px] font-black uppercase tracking-widest border-b-2 transition-all flex items-center gap-2 ${topicView === t.id ? 'border-rose-600 text-rose-600' : 'border-transparent text-earth-400 hover:text-earth-900 dark:hover:text-white'}`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className="p-12 space-y-10 min-h-[400px] max-h-[550px] overflow-y-auto custom-scrollbar">
          {topicView === 'OVERVIEW' && (
            <div className="animate-in fade-in duration-500">
              <section>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600 mb-4">Strategic Overview</h4>
                <p className="text-xl text-earth-700 dark:text-earth-300 font-medium leading-relaxed">
                  {activeTopic.detail}
                </p>
              </section>

              <div className="grid md:grid-cols-2 gap-6 mt-10">
                <div className="bg-earth-50 dark:bg-earth-800/50 p-6 rounded-3xl border border-earth-100 dark:border-earth-700">
                  <h5 className="font-bold text-earth-900 dark:text-white mb-3 flex items-center gap-2"><Star size={16} className="text-amber-500" /> Active Threads</h5>
                  <p className="text-sm text-earth-600 dark:text-earth-400 mb-6">Explore communal data sharing and dialogue within this domain.</p>
                  <button onClick={() => setTopicView('THREADS')} className="w-full bg-white dark:bg-earth-900 py-3 rounded-xl border-2 border-earth-100 dark:border-earth-700 text-xs font-black uppercase tracking-widest hover:bg-rose-50 transition-all">Open Threads</button>
                </div>
                <div className="bg-agro-50 dark:bg-agro-900/10 p-6 rounded-3xl border border-agro-100 dark:border-agro-900/50">
                  <h5 className="font-bold text-agro-900 dark:text-agro-200 mb-3 flex items-center gap-2"><Zap size={16} className="text-agro-600" /> Resource Access</h5>
                  <p className="text-sm text-agro-800 dark:text-agro-400 mb-6">Technical manuals and standardized protocols linked to this category.</p>
                  <button onClick={() => setTopicView('DOWNLOADS')} className="w-full bg-agro-600 text-white py-3 rounded-xl shadow-lg shadow-agro-600/20 text-xs font-black uppercase tracking-widest hover:bg-agro-700 transition-all">Download Manuals</button>
                </div>
              </div>
            </div>
          )}

          {topicView === 'THREADS' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600">Recent Discussions</h4>
                <button className="bg-rose-600 text-white p-2 rounded-lg hover:bg-rose-700 shadow-lg shadow-rose-600/20"><Plus size={16} /></button>
              </div>
              {mockThreads.filter(t => t.topicId === activeTopic.id).map(thread => (
                <div key={thread.id} className="p-5 bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 hover:shadow-md transition-all group cursor-pointer flex justify-between items-center">
                  <div>
                    <h5 className="font-bold text-earth-900 dark:text-white group-hover:text-rose-600 transition-colors">{thread.title}</h5>
                    <p className="text-xs text-earth-400 mt-1">Started by {thread.author} • {thread.lastActive}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-bold text-earth-700 dark:text-earth-300 leading-none">{thread.replies}</p>
                      <p className="text-[8px] font-black uppercase text-earth-400">Replies</p>
                    </div>
                    <ChevronRight size={18} className="text-earth-200 group-hover:text-rose-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
              {mockThreads.filter(t => t.topicId === activeTopic.id).length === 0 && (
                <div className="text-center py-20 bg-earth-50 dark:bg-earth-800/30 rounded-3xl border-2 border-dashed border-earth-200 dark:border-earth-700">
                  <MessageCircle size={48} className="mx-auto text-earth-200 mb-4 opacity-30" />
                  <p className="text-earth-400 font-bold uppercase tracking-widest text-sm">No active threads in this domain</p>
                  <button className="mt-6 bg-rose-600 text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Start the first thread</button>
                </div>
              )}
            </div>
          )}

          {topicView === 'DOCS' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 prose prose-rose dark:prose-invert max-w-none">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-2xl text-rose-600">
                  <FileText size={24} />
                </div>
                <h4 className="text-2xl font-serif font-bold text-earth-900 dark:text-white m-0">Framework Documentation</h4>
              </div>
              <div className="text-lg text-earth-700 dark:text-earth-300 leading-relaxed italic border-l-4 border-rose-600 pl-8 py-2 mb-10">
                {activeTopic.fullDoc}
              </div>
              <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <Terminal className="absolute top-0 right-0 p-8 opacity-5" size={200} />
                <h5 className="font-bold text-agro-400 flex items-center gap-2 mb-4"><ShieldCheck size={18} /> Technical Validation</h5>
                <p className="text-sm text-slate-300 leading-relaxed relative z-10">
                  All procedural knowledge in this domain has been cross-referenced with the Global Resilience Ledger and adheres to current FAO Sustainability Guidelines.
                  <br /><br />
                  <strong>Last Audit Hash:</strong> <span className="font-mono text-[10px] text-blue-400">ea-7742-heritage-topic-{activeTopic.id}</span>
                </p>
              </div>
            </div>
          )}

          {topicView === 'DOWNLOADS' && (
            <div className="animate-in slide-in-from-bottom-4 duration-500 space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-600 mb-6">Standardized Manuals</h4>
              <div className="grid gap-4">
                {activeTopic.manuals.map((manual: any) => (
                  <div key={manual.name} className="p-5 bg-white dark:bg-earth-800 rounded-2xl border border-earth-100 dark:border-earth-700 flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-earth-50 dark:bg-earth-950/30 rounded-xl text-earth-400 group-hover:text-blue-600 transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h5 className="font-bold text-earth-900 dark:text-white text-sm">{manual.name}</h5>
                        <p className="text-[10px] text-earth-400 font-black uppercase tracking-widest mt-0.5">{manual.size}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDownloadManual(manual.name)}
                      disabled={!!isDownloading}
                      className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-90 disabled:opacity-50"
                    >
                      {isDownloading === manual.name ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-earth-50 dark:bg-earth-800/30 rounded-[2.5rem] text-center border-2 border-dashed border-earth-200 dark:border-earth-700 mt-8">
                <p className="text-xs text-earth-500 dark:text-earth-400 leading-relaxed font-medium">
                  Downloading these assets increases your local **Integrity (In)** coefficient. Ensure you synchronize your device with the Network Node after review.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="p-8 bg-earth-50 dark:bg-earth-950/50 text-center border-t border-earth-100 dark:border-earth-800 flex items-center justify-between px-12 shrink-0">
          <div className="flex items-center gap-3">
            <Info size={18} className="text-earth-400" />
            <span className="text-[10px] font-black text-earth-500 dark:text-earth-400 uppercase tracking-widest">Authorized Network Information</span>
          </div>
          <button
            onClick={() => setTopicView('DOCS')}
            className={`text-[10px] font-black uppercase tracking-widest hover:underline ${topicView === 'DOCS' ? 'text-earth-400 cursor-default no-underline' : 'text-rose-600'}`}
            disabled={topicView === 'DOCS'}
          >
            Full Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
