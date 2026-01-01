import React from 'react';
import { 
  ArrowLeft, Globe, Clock, Newspaper, Share2, 
  Bookmark, CheckCircle2, Zap, FileText, 
  TrendingUp, BarChart3, ArrowRight, Download,
  ExternalLink, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ReportDetailProps {
  report: any;
  allReports: any[];
  onBack: () => void;
  onSelectReport: (report: any) => void;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({ report, allReports, onBack, onSelectReport }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button
        onClick={onBack}
        className="mb-10 flex items-center gap-2 text-earth-400 hover:text-agro-600 font-black text-[10px] uppercase tracking-widest transition-all group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to industrial feed
      </button>

      <article className="bg-white dark:bg-earth-900 rounded-[4rem] shadow-cinematic border border-earth-100 dark:border-earth-800 overflow-hidden mb-20 relative">
        <div className="relative aspect-video lg:h-[550px] w-full bg-slate-900 overflow-hidden group">
          <img src={report.image} className="w-full h-full object-cover opacity-80 transition-transform duration-[15s] group-hover:scale-105" alt={report.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/20 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-5xl"
            >
                <div className="flex flex-wrap gap-3 mb-6">
                    <span className="bg-blue-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-blue-600/20">{report.type}</span>
                    <span className="bg-white/10 backdrop-blur-md px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-white/20">Industrial Intelligence</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-black leading-none tracking-tighter mb-8">{report.title}</h1>
                <div className="flex flex-wrap items-center gap-8 text-[10px] text-earth-200 font-black uppercase tracking-[0.3em]">
                    <span className="flex items-center gap-3"><Globe size={18} className="text-blue-400" /> Regional Node: Sector-Alpha</span>
                    <span className="flex items-center gap-3"><Clock size={18} className="text-blue-400" /> {report.readTime || '12 min'} analysis</span>
                    <span className="flex items-center gap-3"><Newspaper size={18} className="text-blue-400" /> Dispatch: {report.date}</span>
                </div>
            </motion.div>
          </div>
        </div>

        <div className="p-8 md:p-20 grid lg:grid-cols-12 gap-16 relative">
          {/* Main Content Body */}
          <div className="lg:col-span-8">
            <div className="prose prose-xl prose-earth dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-earth-800 dark:text-earth-200 leading-relaxed font-medium text-xl italic mb-12 border-l-4 border-agro-500 pl-8 bg-earth-50 dark:bg-earth-950/40 py-6 rounded-r-3xl">
                    {report.summary || "Strategizing the horizontal integration of technology, society, and nature across synchronized regional clusters."}
                </div>
                
                <div className="text-earth-700 dark:text-earth-300 font-medium leading-[1.8] space-y-8">
                    {report.content || `The implementation of Thrust EA (Environmental Agriculture) has reached a critical steady-state in the current cycle. Predictive modeling suggests that by optimizing soil retention factors (f) alongside rainfall duration (Dn), regional m(t) resilience scores can be stabilized above the 2.5 benchmark. This week's forensic analysis delves into the supply chain deltas observed in the vertical farming sector...`}
                </div>
            </div>

            <div className="mt-20 pt-10 border-t border-earth-100 dark:border-earth-800 flex flex-wrap gap-6 items-center justify-between">
                <div className="flex gap-4">
                    <button className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl text-earth-400 hover:text-agro-600 hover:shadow-lg transition-all active:scale-95 group">
                        <Share2 size={24} className="group-hover:rotate-12 transition-transform" />
                    </button>
                    <button className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl text-earth-400 hover:text-agro-600 hover:shadow-lg transition-all active:scale-95 group">
                        <Bookmark size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                    <button className="p-4 bg-earth-50 dark:bg-earth-800 rounded-2xl text-earth-400 hover:text-agro-600 hover:shadow-lg transition-all active:scale-95 group">
                        <Download size={24} className="group-hover:translate-y-0.5 transition-transform" />
                    </button>
                </div>
                <div className="flex items-center gap-4 bg-agro-50 dark:bg-agro-900/20 px-8 py-4 rounded-2xl border border-agro-100 dark:border-agro-800">
                    <CheckCircle2 size={24} className="text-agro-600 shadow-glow-green" />
                    <span className="text-[10px] font-black text-agro-600 dark:text-agro-400 uppercase tracking-[0.4em]">Node-Verified forensic data</span>
                </div>
            </div>
          </div>

          {/* Report Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-earth-50 dark:bg-earth-950 p-8 rounded-[3rem] border border-earth-100 dark:border-earth-800 shadow-inner">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 mb-8 flex items-center gap-3">
                    <TrendingUp size={16} className="text-blue-500" /> Market Impact
                </h4>
                <div className="space-y-6">
                    {[
                        { label: 'Supply Chain Velocity', val: '+12.4%', color: 'text-agro-600' },
                        { label: 'Regional Trust Index', val: '4.8/5', color: 'text-blue-600' },
                        { label: 'Thrust TA Compliance', val: 'Verified', color: 'text-purple-600' }
                    ].map((m, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-earth-100 dark:border-earth-800 pb-4 last:border-0 last:pb-0">
                           <span className="text-[10px] font-black text-earth-500 uppercase tracking-widest">{m.label}</span>
                           <span className={`text-sm font-black ${m.color}`}>{m.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-agro-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000 rotate-12"><Zap size={180} /></div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-agro-400 mb-6">Strategic Call</h4>
                <p className="text-sm text-agro-100 leading-relaxed relative z-10 font-bold italic mb-8">
                    "Transitioning from knowledge to execution requires bilateral integration with current finance nodes."
                </p>
                <button className="relative z-10 w-full bg-white text-agro-900 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-agro-50 transition-all active:scale-95">
                    Access Finance Portal
                </button>
            </div>

            <div className="p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2.5rem] border border-blue-100 dark:border-blue-900/30">
               <div className="flex items-start gap-4">
                  <Layers size={20} className="text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-2">Thrust Domain</h5>
                    <p className="text-[10px] font-medium text-earth-500 dark:text-blue-200 leading-relaxed">
                        This report falls under Industrial Engineering and Value Chain Development (Thrust IA).
                    </p>
                  </div>
               </div>
            </div>
          </aside>
        </div>
      </article>

      <section>
        <div className="flex items-center justify-between mb-12 px-6">
            <h3 className="text-4xl font-serif font-black text-earth-900 dark:text-white tracking-tight">Synchronized <span className="text-blue-600 italic">Briefs</span></h3>
            <button className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 hover:underline flex items-center gap-2 group">
                Full Archives <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
            {allReports.filter(p => p.id !== report.id).slice(0, 2).map(related => (
            <div 
                key={related.id} 
                onClick={() => { onSelectReport(related); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                className="bg-white dark:bg-earth-900 p-8 rounded-[3.5rem] border border-earth-100 dark:border-earth-800 hover:shadow-cinematic transition-all duration-700 cursor-pointer group flex flex-col sm:flex-row gap-8 items-center"
            >
                <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden shrink-0 border border-earth-50 dark:border-earth-800 shadow-sm group-hover:scale-105 transition-transform duration-1000">
                    <img src={related.image} className="w-full h-full object-cover" alt={related.title} />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest bg-blue-50 text-blue-600 border border-blue-100">Market Brief</span>
                        <span className="text-[8px] font-bold text-earth-400 uppercase tracking-widest">{related.date}</span>
                    </div>
                    <h4 className="text-xl font-serif font-bold text-earth-900 dark:text-white group-hover:text-blue-600 transition-colors mb-3 leading-tight">{related.title}</h4>
                    <div className="flex items-center gap-2 text-[9px] font-black text-blue-500 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                        Analyze Dossier <ArrowRight size={12} />
                    </div>
                </div>
            </div>
            ))}
        </div>
      </section>
    </div>
  );
};
