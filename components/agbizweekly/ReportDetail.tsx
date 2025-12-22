import React from 'react';
import { ArrowLeft, Globe, Clock, Newspaper, Share2, Bookmark, CheckCircle2 } from 'lucide-react';

interface ReportDetailProps {
  report: any;
  allReports: any[];
  onBack: () => void;
  onSelectReport: (report: any) => void;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({ report, allReports, onBack, onSelectReport }) => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button
        onClick={onBack}
        className="mb-8 flex items-center gap-2 text-earth-500 hover:text-blue-600 font-bold transition-colors group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Newsroom
      </button>

      <div className="bg-white rounded-[3rem] shadow-xl border border-slate-100 overflow-hidden mb-12">
        <div className="relative aspect-video md:h-[450px] w-full bg-slate-900">
          <img src={report.image} className="w-full h-full object-cover opacity-70" alt={report.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white">
            <div className="flex gap-3 mb-4">
              <span className="bg-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{report.type}</span>
              <span className="bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">Industrial Data</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-6">{report.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-300 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-2"><Globe size={16} /> Market Intel</span>
              <span className="flex items-center gap-2"><Clock size={16} /> {report.readTime}</span>
              <span className="flex items-center gap-2"><Newspaper size={16} /> {report.date}</span>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-16 max-w-4xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed font-medium text-lg">
              {report.content}
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
            <div className="flex gap-4">
              <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                <Share2 size={24} />
              </button>
              <button className="p-3 bg-slate-50 rounded-full text-slate-400 hover:text-blue-600 transition-colors">
                <Bookmark size={24} />
              </button>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-agro-600 uppercase tracking-widest">
              <CheckCircle2 size={16} /> Verified Industrial Analysis
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-2xl font-serif font-bold text-slate-900 mb-8">Related Briefs</h3>
      <div className="grid md:grid-cols-2 gap-8">
        {allReports.filter(p => p.id !== report.id).map(related => (
          <div key={related.id} onClick={() => { onSelectReport(related); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-lg transition-all cursor-pointer group flex gap-6">
            <img src={related.image} className="w-24 h-24 object-cover rounded-2xl shrink-0" alt={related.title} />
            <div>
              <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">{related.title}</h4>
              <p className="text-xs text-slate-500 uppercase font-black tracking-widest">{related.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
